package com.udaan.app;

import android.content.res.AssetManager;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Locale;

/** Serves the bundled web app from an in-process loopback server. */
public class AssetServer {
    private final AssetManager assets;
    private final String root;
    private ServerSocket socket;

    public AssetServer(AssetManager assets, String root) {
        this.assets = assets;
        this.root = root;
    }

    public int getPort() {
        return socket.getLocalPort();
    }

    public void start() throws IOException {
        socket = new ServerSocket(0, 50, InetAddress.getByName("127.0.0.1"));
        Thread accept = new Thread(new Runnable() {
            @Override
            public void run() {
                while (!socket.isClosed()) {
                    final Socket client;
                    try {
                        client = socket.accept();
                    } catch (IOException e) {
                        break;
                    }
                    Thread worker = new Thread(new Runnable() {
                        @Override
                        public void run() {
                            try {
                                serve(client);
                            } catch (Exception ignored) {
                            } finally {
                                try {
                                    client.close();
                                } catch (IOException ignored) {
                                }
                            }
                        }
                    });
                    worker.setDaemon(true);
                    worker.start();
                }
            }
        });
        accept.setDaemon(true);
        accept.start();
    }

    public void stop() {
        try {
            if (socket != null) socket.close();
        } catch (IOException ignored) {
        }
    }

    private void serve(Socket client) throws IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(client.getInputStream(), "UTF-8"));
        String requestLine = reader.readLine();
        if (requestLine == null) return;

        String rangeHeader = null;
        String header;
        while ((header = reader.readLine()) != null && header.length() > 0) {
            String lower = header.toLowerCase(Locale.US);
            if (lower.startsWith("range:")) rangeHeader = header.substring(6).trim();
        }

        String[] parts = requestLine.split(" ");
        if (parts.length < 2) return;
        String path = parts[1];
        int query = path.indexOf('?');
        if (query >= 0) path = path.substring(0, query);
        if (path.equals("/") || path.isEmpty()) path = "/index.html";
        if (path.contains("..")) {
            send(client, 400, "text/plain; charset=utf-8", "Bad request".getBytes("UTF-8"), null);
            return;
        }

        byte[] body;
        try {
            body = readAsset(root + path);
        } catch (IOException missing) {
            send(client, 404, "text/plain; charset=utf-8", "Not found".getBytes("UTF-8"), null);
            return;
        }

        if (rangeHeader != null && rangeHeader.toLowerCase(Locale.US).startsWith("bytes=")) {
            long[] range = parseRange(rangeHeader.substring(6).trim(), body.length);
            if (range != null) {
                int start = (int) range[0];
                int end = (int) range[1];
                byte[] slice = new byte[end - start + 1];
                System.arraycopy(body, start, slice, 0, slice.length);
                String contentRange = "bytes " + start + "-" + end + "/" + body.length;
                send(client, 206, mimeType(path), slice, contentRange);
                return;
            }
        }

        send(client, 200, mimeType(path), body, null);
    }

    private long[] parseRange(String spec, int length) {
        try {
            int dash = spec.indexOf('-');
            if (dash < 0) return null;
            String first = spec.substring(0, dash).trim();
            String second = spec.substring(dash + 1).trim();
            long start = first.length() == 0 ? length - Long.parseLong(second) : Long.parseLong(first);
            long end = second.length() == 0 ? length - 1 : Long.parseLong(second);
            if (start < 0) start = 0;
            if (end > length - 1) end = length - 1;
            if (start > end) return null;
            return new long[] { start, end };
        } catch (Exception e) {
            return null;
        }
    }

    private byte[] readAsset(String path) throws IOException {
        InputStream in = assets.open(path);
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buffer = new byte[16384];
            int read;
            while ((read = in.read(buffer)) != -1) out.write(buffer, 0, read);
            return out.toByteArray();
        } finally {
            in.close();
        }
    }

    private String mimeType(String path) {
        String p = path.toLowerCase(Locale.US);
        if (p.endsWith(".html")) return "text/html; charset=utf-8";
        if (p.endsWith(".css")) return "text/css; charset=utf-8";
        if (p.endsWith(".js")) return "application/javascript; charset=utf-8";
        if (p.endsWith(".json") || p.endsWith(".webmanifest")) return "application/json; charset=utf-8";
        if (p.endsWith(".png")) return "image/png";
        if (p.endsWith(".svg")) return "image/svg+xml";
        if (p.endsWith(".mp4")) return "video/mp4";
        if (p.endsWith(".mp3")) return "audio/mpeg";
        if (p.endsWith(".wav")) return "audio/wav";
        if (p.endsWith(".txt")) return "text/plain; charset=utf-8";
        return "application/octet-stream";
    }

    private void send(Socket client, int status, String type, byte[] body, String contentRange)
            throws IOException {
        String reason = status == 200 ? "OK" : status == 206 ? "Partial Content" : "Error";
        StringBuilder head = new StringBuilder();
        head.append("HTTP/1.1 ").append(status).append(' ').append(reason).append("\r\n");
        head.append("Content-Type: ").append(type).append("\r\n");
        head.append("Content-Length: ").append(body.length).append("\r\n");
        head.append("Accept-Ranges: bytes\r\n");
        head.append("Cache-Control: no-store\r\n");
        if (contentRange != null) head.append("Content-Range: ").append(contentRange).append("\r\n");
        head.append("Connection: close\r\n\r\n");
        OutputStream out = client.getOutputStream();
        out.write(head.toString().getBytes("UTF-8"));
        out.write(body);
        out.flush();
    }
}
