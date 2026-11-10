(() => {
  'use strict';

  // Change this date to move the countdown. ISO 8601 with the IST offset.
  const LAUNCH_ISO = '2027-07-01T00:00:00+05:30';
  const LAUNCH_AT = new Date(LAUNCH_ISO).getTime();
  const STORAGE_KEY = 'udaan:lang';
  const LOCALES = ['en', 'hi'];

  const copy = {
    en: {
      pageTitle: 'UDAAN — Help that reaches you',
      metaDescription:
        'UDAAN is building a verified, consent-first way to find local help in India — and to see what happened next.',
      badge: 'Coming soon',
      eyebrow: 'A new way to find local help',
      headlinePrefix: 'Help that',
      headlineSr: 'Help that reaches you.',
      rotators: ['reaches you.', 'follows through.', 'is verified.'],
      lede:
        'UDAAN connects people to verified local organisations, sends a referral with consent, and shows what happened next. Nationwide access — real coverage only where partners are ready.',
      ctaPrimary: "See what's coming",
      ctaSecondary: 'Follow the build',
      micro: 'UDAAN is not an emergency service. If someone is in immediate danger, call 112.',
      countLabel: 'Targeting public beta · mid 2027',
      countLive: "We're live.",
      launchReached: 'The countdown is over. Follow the build for the launch note.',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      sectionEyebrow: "What we're building",
      sectionTitle: 'Three promises, built in',
      sectionLede: 'Not another directory. Trust, consent, and a next step.',
      card1Title: 'Verified local coverage',
      card1Body:
        "Every listing has an owner, an area, a capacity limit, and a date it was last confirmed. If we can't verify it, we say so.",
      card2Title: 'Consent, not small print',
      card2Body:
        'You see exactly which organisation receives which details, why, and for how long. You can withdraw at any time.',
      card3Title: 'Follow-through you can see',
      card3Body:
        'A tracking code shows received, accepted, contacted, and the next step — not just a listing that may be out of date.',
      quote:
        "“Nationwide access. Verified local coverage. Honest answers when help isn't there yet.”",
      footerTagline: 'Unified Digital Assistance & Action Network',
      footerNote:
        'UDAAN is a working name. Launch timing and coverage are indicative while the pilot is built.',
      viewRepo: 'View on GitHub',
      reportIssue: 'Send a note',
      madeIn: 'Made in India'
    },
    hi: {
      pageTitle: 'UDAAN — मदद, जो आप तक पहुँचे',
      metaDescription:
        'UDAAN भारत में सत्यापित और सहमति-आधारित तरीके से स्थानीय मदद खोजने और आगे क्या हुआ, यह देखने का काम कर रहा है।',
      badge: 'जल्द आ रहा है',
      eyebrow: 'स्थानीय मदद पाने का नया तरीका',
      headlinePrefix: 'ऐसी मदद जो',
      headlineSr: 'ऐसी मदद जो आप तक पहुँचे।',
      rotators: ['आप तक पहुँचे।', 'साथ निभाए।', 'सत्यापित हो।'],
      lede:
        'UDAAN लोगों को सत्यापित स्थानीय संगठनों से जोड़ता है, सहमति के साथ रेफ़रल भेजता है और दिखाता है कि आगे क्या हुआ। देशभर में पहुँच — असली सहायता सिर्फ़ वहाँ, जहाँ साझेदार तैयार हैं।',
      ctaPrimary: 'देखें क्या बन रहा है',
      ctaSecondary: 'बिल्ड से जुड़ें',
      micro: 'UDAAN आपातकालीन सेवा नहीं है। तुरंत ख़तरा हो तो 112 पर कॉल करें।',
      countLabel: 'सार्वजनिक बीटा का लक्ष्य · 2027 के मध्य',
      countLive: 'हम लाइव हैं।',
      launchReached: 'उलटी गिनती पूरी हो गई। लॉन्च अपडेट के लिए बिल्ड से जुड़ें।',
      days: 'दिन',
      hours: 'घंटे',
      minutes: 'मिनट',
      seconds: 'सेकंड',
      sectionEyebrow: 'हम क्या बना रहे हैं',
      sectionTitle: 'तीन वादे, शुरू से आख़िर तक',
      sectionLede: 'एक और डायरेक्टरी नहीं — भरोसा, सहमति और अगला कदम।',
      card1Title: 'सत्यापित स्थानीय कवरेज',
      card1Body:
        'हर लिस्टिंग के पीछे मालिक, क्षेत्र, क्षमता की सीमा और आख़िरी पुष्टि की तारीख़ होती है। जो सत्यापित नहीं है, हम साफ़ बताते हैं।',
      card2Title: 'सहमति, छोटे अक्षरों में नहीं',
      card2Body:
        'आप देखते हैं कि कौन-सा संगठन कौन-सी जानकारी, क्यों और कब तक पाएगा। आप कभी भी सहमति वापस ले सकते हैं।',
      card3Title: 'हर कदम, आपकी नज़र में',
      card3Body:
        'ट्रैकिंग कोड दिखाता है कि रेफ़रल मिला, स्वीकार हुआ, संपर्क हुआ और अगला कदम क्या है — सिर्फ़ एक पुरानी लिस्टिंग नहीं।',
      quote:
        '“देशभर में पहुँच। सत्यापित स्थानीय कवरेज। जहाँ मदद नहीं है, वहाँ साफ़ जवाब।”',
      footerTagline: 'यूनिफ़ाइड डिजिटल असिस्टेंस एंड एक्शन नेटवर्क',
      footerNote:
        'UDAAN एक कार्यशील नाम है। पायलट बनने तक लॉन्च की तारीख़ और कवरेज सांकेतिक हैं।',
      viewRepo: 'GitHub पर देखें',
      reportIssue: 'संदेश भेजें',
      madeIn: 'भारत में बन रहा है'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const rotator = $('#rotator');
  const countdownNote = $('#countdownNote');
  const countdownLabel = $('#countdown-label');
  const countdown = {
    days: $('#days'),
    hours: $('#hours'),
    minutes: $('#minutes'),
    seconds: $('#seconds')
  };

  let lang = 'en';
  let rotateTimer = null;
  let tickTimer = null;
  let rotateIndex = 0;

  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* Private mode or storage disabled: language still works for the session. */
      }
    }
  };

  const storedLang = safeStorage.get(STORAGE_KEY);
  if (LOCALES.includes(storedLang)) {
    lang = storedLang;
  } else if ((navigator.language || 'en').toLowerCase().startsWith('hi')) {
    lang = 'hi';
  }

  const pad = (value) => String(value).padStart(2, '0');

  function applyLanguage(nextLang) {
    lang = LOCALES.includes(nextLang) ? nextLang : 'en';
    const dictionary = copy[lang];

    document.documentElement.lang = lang;
    document.title = dictionary.pageTitle;

    const description = $('meta[name="description"]');
    if (description) {
      description.setAttribute('content', dictionary.metaDescription);
    }

    $$('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    $$('.lang-btn').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });

    rotateIndex = 0;
    if (rotator) {
      rotator.textContent = dictionary.rotators[0];
    }

    countdownNote.hidden = true;
    tick();
    safeStorage.set(STORAGE_KEY, lang);
  }

  function startRotation() {
    stopRotation();
    if (!rotator || reduceMotion.matches) {
      return;
    }

    rotateTimer = window.setInterval(() => {
      const words = copy[lang].rotators;
      rotateIndex = (rotateIndex + 1) % words.length;
      rotator.classList.add('is-out');

      window.setTimeout(() => {
        rotator.textContent = words[rotateIndex];
        rotator.classList.remove('is-out');
      }, 300);
    }, 3400);
  }

  function stopRotation() {
    if (rotateTimer !== null) {
      window.clearInterval(rotateTimer);
      rotateTimer = null;
    }
    if (rotator) {
      rotator.classList.remove('is-out');
    }
  }

  function tick() {
    const remaining = LAUNCH_AT - Date.now();

    if (remaining <= 0) {
      countdown.days.textContent = '00';
      countdown.hours.textContent = '00';
      countdown.minutes.textContent = '00';
      countdown.seconds.textContent = '00';
      countdownLabel.textContent = copy[lang].countLive;
      countdownNote.hidden = false;
      countdownNote.textContent = copy[lang].launchReached;
      if (tickTimer !== null) {
        window.clearInterval(tickTimer);
        tickTimer = null;
      }
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    countdown.days.textContent = String(Math.floor(totalSeconds / 86400));
    countdown.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    countdown.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    countdown.seconds.textContent = pad(totalSeconds % 60);
  }

  function startCountdown() {
    tick();
    if (tickTimer === null) {
      tickTimer = window.setInterval(tick, 1000);
    }
  }

  function setupReveals() {
    const elements = $$('.reveal');

    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function setupHeader() {
    const header = $('#siteHeader');
    if (!header) {
      return;
    }

    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function setupParticles() {
    const canvas = $('#drift');
    if (!canvas || reduceMotion.matches) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = null;
    let running = true;

    const seed = () => {
      const count = Math.min(48, Math.max(18, Math.round(width / 30)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.16 + 0.035),
        alpha: Math.random() * 0.3 + 0.07
      }));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y < -12) {
          particle.y = height + 12;
          particle.x = Math.random() * width;
        }
        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(167, 243, 208, ${particle.alpha})`;
        context.fill();
      });

      if (running) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      running = false;
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });
  }

  $$('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.lang);
      startRotation();
    });
  });

  const onMotionChange = () => {
    if (reduceMotion.matches) {
      stopRotation();
      $$('.reveal').forEach((element) => element.classList.add('is-visible'));
    } else {
      startRotation();
    }
  };

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', onMotionChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(onMotionChange);
  }

  const year = $('#year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  applyLanguage(lang);
  startCountdown();
  startRotation();
  setupReveals();
  setupHeader();
  setupParticles();
})();
