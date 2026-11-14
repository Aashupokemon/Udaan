// Repacks the aapt2 output into a valid APK:
//  - aapt2 on Windows writes bundled asset names with backslashes, which
//    AssetManager cannot open, so asset entries are rebuilt from disk,
//  - classes.dex is injected (aapt2 does not add it),
//  - entries are ordered manifest -> dex -> resources, the rest alphabetically.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const here = __dirname;
const build = path.join(here, 'build');
const buf = fs.readFileSync(path.join(build, 'base.apk'));

let eocd = -1;
for (let i = buf.length - 22; i >= 0; i--) {
  if (buf.readUInt32LE(i) === 0x06054b50) {
    eocd = i;
    break;
  }
}
if (eocd < 0) throw new Error('not a zip: no end-of-central-directory record');

const count = buf.readUInt16LE(eocd + 10);
let off = buf.readUInt32LE(eocd + 16);
const entries = new Map();

for (let i = 0; i < count; i++) {
  if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('bad central directory header');
  const method = buf.readUInt16LE(off + 10);
  const csize = buf.readUInt32LE(off + 20);
  const nameLen = buf.readUInt16LE(off + 28);
  const extraLen = buf.readUInt16LE(off + 30);
  const commentLen = buf.readUInt16LE(off + 32);
  const localOff = buf.readUInt32LE(off + 42);
  const name = buf.toString('utf8', off + 46, off + 46 + nameLen);
  off += 46 + nameLen + extraLen + commentLen;

  // Skip the backslash-named asset entries; they are rebuilt from disk below.
  if (name.indexOf(String.fromCharCode(92)) !== -1) continue;

  const lnameLen = buf.readUInt16LE(localOff + 26);
  const lextraLen = buf.readUInt16LE(localOff + 28);
  const start = localOff + 30 + lnameLen + lextraLen;
  const raw = buf.subarray(start, start + csize);
  entries.set(name, method === 8 ? zlib.inflateRawSync(raw) : Buffer.from(raw));
}

function walk(dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = prefix + entry.name;
    if (entry.isDirectory()) walk(full, name + '/');
    else entries.set('assets/' + name, fs.readFileSync(full));
  }
}
walk(path.join(build, 'assets'), '');
entries.set('classes.dex', fs.readFileSync(path.join(build, 'dex', 'classes.dex')));

const order = ['AndroidManifest.xml', 'classes.dex', 'resources.arsc'];
const names = Array.from(entries.keys()).sort((a, b) => {
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
});

const localParts = [];
const centralParts = [];
let offset = 0;

for (const name of names) {
  const data = entries.get(name);
  const store = /\.(arsc|png|mp4|mp3|wav|jpg)$/i.test(name);
  const body = store ? data : zlib.deflateRawSync(data, { level: 9 });
  const crc = zlib.crc32(data) >>> 0;
  const nameBuf = Buffer.from(name, 'utf8');

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0, 6);
  local.writeUInt16LE(store ? 0 : 8, 8);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  localParts.push(local, nameBuf, body);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0, 8);
  central.writeUInt16LE(store ? 0 : 8, 10);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(nameBuf.length, 28);
  central.writeUInt32LE(offset, 42);
  centralParts.push(central, nameBuf);

  offset += 30 + nameBuf.length + body.length;
}

const localBuf = Buffer.concat(localParts);
const centralBuf = Buffer.concat(centralParts);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(names.length, 8);
end.writeUInt16LE(names.length, 10);
end.writeUInt32LE(centralBuf.length, 12);
end.writeUInt32LE(localBuf.length, 16);

fs.writeFileSync(path.join(build, 'repacked.apk'), Buffer.concat([localBuf, centralBuf, end]));
console.log('packed ' + names.length + ' entries');
