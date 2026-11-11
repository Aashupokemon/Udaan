const state = {
  locale: "en",
  screen: "landing",
  prev: "landing",
  phone: "",
  otpCode: "",
  sketchId: null,
  theme: "dark",
  color: "#6fe6d8",
  paint: {},
  history: []
};

const localeNames = { en: "English", hi: "हिंदी" };

const i18n = {
  en: {
    title: "UDAAN",
    tagline: "Help that reaches you.",
    phoneLabel: "Mobile number",
    phonePlaceholder: "+919876543210",
    codeLabel: "6-digit code",
    otpTitle: "Check your phone",
    otpSubtitle: "We sent a 6-digit code to your number.",
    otpHint: "Code expires in a few minutes.",
    demoHint: "Demo build - the code is 123456.",
    nextLabel: "I have the code",
    createAccount: "Create account",
    resendLabel: "Resend code",
    resendHint: "Code not received? Try again.",
    registerTitle: "Set up your UDAAN account",
    registerSubtitle: "Create a password and a quick PIN you can use to sign in fast.",
    passwordLabel: "Password",
    passwordHint: "Use something only you know.",
    pinLabel: "PIN (4-6 digits)",
    pinHint: "You will use this to sign in quickly.",
    pinConfirmLabel: "Confirm PIN",
    confirmMismatch: "PINs do not match.",
    loginTitle: "Sign in to UDAAN",
    loginSubtitle: "Sign in once with a code, then save a PIN for fast sign-in.",
    meTitle: "Your UDAAN account",
    resourcesTitle: "Available help",
    resourcesSubtitle: "Basic, public information to get started. Verified local data comes later.",
    categoriesLabel: "What kind of help are you looking for?",
    disclaimer: "UDAAN is not an emergency service. If someone is in immediate danger, call local emergency services (for example 112).",
    footerNote: "Udaan app • demo build",
    otpSent: "Code sent.",
    otpVerified: "Code verified.",
    success: "Done.",
    errorBadPhone: "Enter a valid mobile number with country code.",
    errorOtpSent: "Could not send the code. Try again.",
    errorOtpBad: "Check the code and try again.",
    errorOtpUsed: "This code has already been used. Request a new one.",
    errorOtpExpired: "The code expired. Request a new one.",
    errorOtpAttempts: "Too many tries. Request a new code.",
    errorNoAccount: "No account found for this number. Start with a code to create one.",
    errorPasswordShort: "Password must be at least 8 characters.",
    errorPinShort: "PIN must be 4-6 digits.",
    errorPinMismatch: "PINs do not match.",
    errorPasswordWeak: "Pick a stronger password.",
    errorSessionInvalid: "Sign in again.",
    errorUnknown: "Something went wrong. Try again.",
    signIn: "Sign in",
    browseHelp: "Browse help",
    sendCode: "Send code",
    noAccount: "New here? Start here.",
    back: "Back",
    accountNameFallback: "Account",
    pinSignIn: "Sign in with PIN",
    signOut: "Sign out",
    language: "App language",
    comingSoon: "This part is still landing.",
    comingSoonSub: "The app shell is here; the next page is being built.",
    home: "Back home",
    trustCopy1: "Phone number only - no email required.",
    trustCopy2: "PIN sign-in you can use fast.",
    trustCopy3: "Starts with public sample data.",
    heroSub: "Support that follows through. Sign in with your mobile number to get started.",
    videoLabel: "UDAAN · initiative film",
    playVideo: "Play film",
    pauseVideo: "Pause film",
    aboutEyebrow: "The initiative",
    aboutTitle: "A help network that follows through.",
    aboutLead: "UDAAN is a community effort to put verified local help within reach of anyone with a phone number - no email, no app store, no forms.",
    aboutParas: [
      "Most people in trouble are not short of information, they are short of the right next step. Numbers are scattered across posters and PDFs, in languages people do not read, and half of them lead nowhere.",
      "UDAAN collects the few numbers that actually work, checks them, keeps them close, and then follows the request through - from the first call to the point where someone is actually helped."
    ],
    pillar1Title: "One number to start",
    pillar1Body: "Sign in with your phone. A code, then a PIN - no email, no password to forget.",
    pillar2Title: "Help in your language",
    pillar2Body: "Everything switches between Hindi and English, including the emergency list.",
    pillar3Title: "Built to be used",
    pillar3Body: "Large tap targets, simple pages, and a sketch corner for quieter moments.",
    ctaTitle: "Start with your phone number",
    ctaSub: "Sign in to pick up where you left off, or create an account with a password and a quick PIN.",
    registerCta: "Create account",
    finePrint: "No email needed. A 6-digit code, then a PIN for next time.",
    browseLink: "Just looking? Browse the help directory",
    home: "Home",
    menuLabel: "Menu",
    navAbout: "About",
    navJoin: "Join us",
    navSdg: "Sustainable Development Goals",
    navInitiatives: "Government initiatives",
    navSketch: "Sketch",
    navCareers: "Careers",
    navContact: "Contact us",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    musicPlay: "Play music",
    musicPause: "Pause music",
    musicCredit: "Gymnopedie No. 1 - Erik Satie, performed by Teknopazzo (CC0 1.0)",
    aboutPageTitle: "About UDAAN",
    aboutPageSub: "A community help network, built in the open.",
    aboutPageParas: [
      "UDAAN started with one observation: in an emergency, people do not need more information, they need the next step. The right number, what to say, and what to do while help is on the way.",
      "So we built a small, fast, bilingual app that puts verified helplines, first-aid steps and government schemes in one place, and keeps working on a basic phone and a slow connection.",
      "Everything here is public and checkable. Numbers are traced to the authority that runs them, and anything we cannot verify yet is labelled as sample data."
    ],
    founderRole: "Founder, UDAAN",
    founderNote: "Ayush founded UDAAN and leads its product and field work. The idea came from watching a family spend twenty minutes searching for a number that should have been one tap away.",
    sdgEyebrow: "Global goals",
    sdgTitle: "Sustainable Development Goals",
    sdgSub: "Where UDAAN's work connects to the global goals, with the 2030 target behind each one.",
    sdgGlobalTitle: "Where the 17 goals stand in 2025",
    sdgGlobalOk: "On track or moderate (35%)",
    sdgGlobalSlow: "Marginal or stagnating (47%)",
    sdgGlobalBad: "Regressed since 2015 (18%)",
    sdgStatLabel: "Latest data",
    sdgStatusOntrack: "On track",
    sdgStatusModerate: "Moderate progress",
    sdgStatusSlow: "Too slow",
    sdgStatusRegress: "Regressing",
    sdgSourcePrefix: "Source:",
    sdgSourceLink: "The Sustainable Development Goals Report 2025 (UN)",
    sdgTarget: "2030 target",
    sdgProgress: "Progress (demo)",
    sdgOurs: "How UDAAN helps",
    initEyebrow: "Schemes",
    initTitle: "Government initiatives",
    initSub: "Schemes worth knowing, what they give you, and the official page to apply on.",
    initBenefit: "What you get",
    initHow: "How to apply",
    initOpen: "Open official page",
    careersTitle: "Careers",
    careersSoon: "Coming soon",
    careersBody: "We are not hiring through this screen yet. Roles in engineering, field operations and design will be listed here when we open them.",
    contactTitle: "Contact us",
    contactSub: "One inbox, read by the team.",
    contactNote: "Corrections to helpline numbers, partnership ideas, or anything urgent about the app.",
    emailCta: "Write to us",
    typeEmergency: "Emergency number",
    typeHelpline: "Helpline",
    typeGuidance: "Guidance",
    regionLabel: "Region",
    emergencyTab: "Emergency",
    emergencyTitle: "Emergency numbers in India",
    emergencySub: "Tap any number to call. 112 is the single number for police, fire and ambulance anywhere in India.",
    firstTitle: "What to do first",
    firstSteps: [
      "In danger right now? Dial 112 - police, fire and ambulance through one number, free from any phone.",
      "Can't speak safely? Text 112 with where you are and what is happening.",
      "Tell them exactly where you are: floor, landmark, or the nearest road.",
      "Get somewhere safer if you can, and stay on the line until they say you can hang up.",
      "Only once you are safe: 181 for a woman in danger, 1098 for a child, 1930 for money lost online."
    ],
    callLabel: "Call",
    groupEmergency: "Core emergency",
    groupMedical: "Medical & mental health",
    groupWomen: "Women & children",
    groupOther: "Other helplines",
    emergencyNote: "These are government services, not UDAAN. Numbers are national; a few state lines differ.",
    aidTab: "First aid",
    aidTitle: "What to do in an emergency",
    aidSub: "Practical first aid for the things that happen in daily life. Read a case once now - it is easier to follow when it matters.",
    aidBreathing: "Breathing & heart",
    aidBleeding: "Bleeding & injuries",
    aidBurns: "Burns, heat & bites",
    aidOther: "Fits, poisons & fainting",
    callNow: "Call 112",
    dontLabel: "Don't:",
    aidNote: "General guidance, not medical advice. For anything life-threatening, call 112 first.",
    sketchTab: "Sketch",
    sketchTitle: "Sketch & colour",
    sketchSub: "Pick a drawing, choose a colour and fill the shapes. A quiet way to pass the time.",
    sketchPickTitle: "Pick a sketch",
    sketchPickSub: "Line drawings on UDAAN's themes: flight, safety, health, shelter and learning.",
    colourLabel: "Colour",
    undo: "Undo",
    clear: "Start over",
    save: "Save picture",
    sketchBack: "All sketches",
    sketchNote: "Drawings stay in this browser tab only - nothing is uploaded.",
    savedMsg: "Picture saved.",
    saveFail: "Could not save the picture here.",
    topicFlight: "Flight",
    topicSafety: "Safety",
    topicHealth: "Health",
    topicHome: "Shelter",
    topicLearn: "Learning"
  },
  hi: {
    title: "उड़ान",
    tagline: "जो तुम तक पहुँचे।",
    phoneLabel: "मोबाइल नंबर",
    phonePlaceholder: "+919876543210",
    codeLabel: "6 अंकों का कोड",
    otpTitle: "अपने फ़ोन की जाँच करें",
    otpSubtitle: "हमने तुम्हारे नंबर पर 6 अंकों का कोड भेजा है।",
    otpHint: "कोड कुछ मिनट में समाप्त हो जाता है।",
    demoHint: "डेमो बिल्ड - कोड है 123456।",
    nextLabel: "कोड मिल गया",
    createAccount: "अकाउंट बनाएँ",
    resendLabel: "कोड दोबारा भेजें",
    resendHint: "कोड नहीं मिला? दोबारा कोशिश करें।",
    registerTitle: "अपना UDAAN अकाउंट सेट करें",
    registerSubtitle: "एक पासवर्ड और जल्दी साइनइन के लिए एक PIN बनाएँ।",
    passwordLabel: "पासवर्ड",
    passwordHint: "कुछ ऐसा चुनें जो सिर्फ तुम जानते हो।",
    pinLabel: "PIN (4-6 अंक)",
    pinHint: "तुम इसे जल्दी साइनइन के लिए इस्तेमाल करोगे।",
    pinConfirmLabel: "PIN दोबारा लिखें",
    confirmMismatch: "PIN मेल नहीं खा रहे।",
    loginTitle: "UDAAN में साइनइन करें",
    loginSubtitle: "एक बार कोड से साइनइन करें, फिर तेज़ साइनइन के लिए PIN सहेजें।",
    meTitle: "तुम्हारा UDAAN अकाउंट",
    resourcesTitle: "उपलब्ध मदद",
    resourcesSubtitle: "शुरू करने के लिए बुनियादी सार्वजनिक जानकारी। पुष्टि की गई स्थानीय जानकारी बाद में आएगी।",
    categoriesLabel: "तुम किस तरह की मदद खोज रहे हो?",
    disclaimer: "UDAAN आपातकालीन सेवा नहीं है। अगर किसी को तुरंत खतरा है, तो स्थानीय आपातकालीन सेवाओं को कॉल करें (उदाहरण के लिए 112)।",
    footerNote: "उड़ान ऐप · डेमो बिल्ड",
    otpSent: "कोड भेजा गया।",
    otpVerified: "कोड पुष्टि हो गया।",
    success: "हो गया।",
    errorBadPhone: "देश का कोड सहित एक मान्य मोबाइल नंबर डालें।",
    errorOtpSent: "कोड नहीं भेज सके। दोबारा कोशिश करें।",
    errorOtpBad: "कोड जाँचें और दोबारा कोशिश करें।",
    errorOtpUsed: "यह कोड पहले ही इस्तेमाल हो चुका है। नया कोड माँगें।",
    errorOtpExpired: "कोड समाप्त हो गया। नया कोड माँगें।",
    errorOtpAttempts: "बहुत बार कोशिश हो गई। नया कोड माँगें।",
    errorNoAccount: "इस नंबर का कोई अकाउंट नहीं मिला। अकाउंट बनाने के लिए कोड से शुरू करें।",
    errorPasswordShort: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
    errorPinShort: "PIN 4-6 अंकों का होना चाहिए।",
    errorPinMismatch: "PIN मेल नहीं खा रहे।",
    errorPasswordWeak: "ज़्यादा मज़बूत पासवर्ड चुनें।",
    errorSessionInvalid: "दोबारा साइनइन करें।",
    errorUnknown: "कुछ गड़बड़ हो गई। दोबारा कोशिश करें।",
    signIn: "साइन इन",
    browseHelp: "मदद देखें",
    sendCode: "कोड भेजें",
    noAccount: "पहली बार आए हो? यहाँ से शुरू करें।",
    back: "वापस",
    accountNameFallback: "अकाउंट",
    pinSignIn: "PIN से साइन इन",
    signOut: "साइन आउट",
    language: "ऐप की भाषा",
    comingSoon: "यह हिस्सा अभी बन रहा है।",
    comingSoonSub: "ऐप का ढाँचा तैयार है; अगला पेज बन रहा है।",
    home: "होम पर वापस",
    trustCopy1: "सिर्फ मोबाइल नंबर - ईमेल की ज़रूरत नहीं।",
    trustCopy2: "तेज़ साइन इन के लिए PIN।",
    trustCopy3: "सार्वजनिक सैंपल डेटा से शुरुआत।",
    heroSub: "मदद जो पूरी होने तक साथ रहे। अपने मोबाइल नंबर से साइन इन करके शुरू करें।",
    videoLabel: "उड़ान · पहल फ़िल्म",
    playVideo: "फ़िल्म चलाएँ",
    pauseVideo: "फ़िल्म रोकें",
    aboutEyebrow: "इस पहल के बारे में",
    aboutTitle: "मदद जो आख़िर तक साथ रहे।",
    aboutLead: "उड़ान एक सामूहिक पहल है - जिसके पास सिर्फ़ एक फ़ोन नंबर है, उस तक भरोसेमंद स्थानीय मदद पहुँचाने के लिए। न ईमेल, न ऐप स्टोर, न फ़ॉर्म।",
    aboutParas: [
      "मुसीबत में फँसे लोगों के पास जानकारी की कमी नहीं होती, सही अगले कदम की होती है। नंबर पोस्टर और PDF में बिखरे हैं, उन भाषकाओं में जो लोग पढ़ नहीं पाते, और आधे तो कहीं जाते ही नहीं।",
      "उड़ान उन कुछ नंबरों को इकट्ठा करता है जो सच में काम करते हैं, उन्हें जाँचता है, पास रखता है - और फिर अनुरोध के साथ चलता है, पहली कॉल से लेकर उस पल तक जब सच में मदद मिलती है।"
    ],
    pillar1Title: "शुरुआत एक नंबर से",
    pillar1Body: "फ़ोन नंबर से साइन इन करें। एक कोड, फिर एक PIN - न ईमेल, न भूलने वाला पासवर्ड।",
    pillar2Title: "आपकी भाषा में मदद",
    pillar2Body: "सब कुछ हिंदी और अंग्रेज़ी में बदलता है, आपातकालीन सूची भी।",
    pillar3Title: "इस्तेमाल के लिए बना",
    pillar3Body: "बड़े टैप बटन, सरल पेज, और थोड़ी देर के लिए एक स्केच कोना।",
    ctaTitle: "अपने मोबाइल नंबर से शुरू करें",
    ctaSub: "जहाँ छोड़ा था वहीं से शुरू करने के लिए साइन इन करें, या पासवर्ड और PIN के साथ अकाउंट बनाएँ।",
    registerCta: "अकाउंट बनाएँ",
    finePrint: "ईमेल की ज़रूरत नहीं। 6 अंकों का कोड, फिर अगली बार के लिए PIN।",
    browseLink: "सिर्फ़ देखना है? मदद की सूची देखें",
    home: "होम",
    menuLabel: "मेन्यू",
    navAbout: "हमारे बारे में",
    navJoin: "जुड़िए",
    navSdg: "सतत विकास लक्ष्य",
    navInitiatives: "सरकारी योजनाएँ",
    navSketch: "स्केच",
    navCareers: "करियर",
    navContact: "संपर्क करें",
    themeLight: "लाइट थीम चुनें",
    themeDark: "डार्क थीम चुनें",
    musicPlay: "संगीत चलाएँ",
    musicPause: "संगीत रोकें",
    musicCredit: "जिम्नोपेडी नं. 1 - एरिक सैती, वादन टेक्नोपाज़ो (CC0 1.0)",
    aboutPageTitle: "उड़ान के बारे में",
    aboutPageSub: "एक सामुदायिक मदद नेटवर्क, खुले तौर पर बनाया गया।",
    aboutPageParas: [
      "उड़ान की शुरुआत एक बात से हुई: आपात स्थिति में लोगों को ज़्यादा जानकारी नहीं, अगला कदम चाहिए। सही नंबर, क्या कहना है, और मदद आने तक क्या करना है।",
      "इसलिए हमने एक छोटा, तेज़, द्विभाषी ऐप बनाया जो जाँचे हुए हेल्पलाइन नंबर, प्राथमिक मदद और सरकारी योजनाएँ एक जगह रखता है, और साधारण फ़ोन व धीमे नेट पर भी चलता है।",
      "यहाँ सब कुछ सार्वजनिक और जाँचने योग्य है। नंबर उसी संस्था तक जोड़े गए हैं जो उन्हें चलाती है, और जो अभी जाँचा नहीं गया वह सैंपल डेटा कहकर लिखा है।"
    ],
    founderRole: "संस्थापक, उड़ान",
    founderNote: "आयुष ने उड़ान शुरू किया और इसके उत्पाद व फ़ील्ड काम का नेतृत्व करते हैं। विचार एक परिवार को बीस मिनट तक ऐसा नंबर ढूँढ़ते देखकर आया जो एक टैप दूर होना चाहिए था।",
    sdgEyebrow: "वैश्विक लक्ष्य",
    sdgTitle: "सतत विकास लक्ष्य",
    sdgSub: "उड़ान का काम किन वैश्विक लक्ष्यों से जुड़ता है, और हर लक्ष्य के पीछे 2030 का क्या लक्ष्य है।",
    sdgGlobalTitle: "2025 में 17 लक्ष्य कहाँ खड़े हैं",
    sdgGlobalOk: "राह पर या मध्यम प्रगति (35%)",
    sdgGlobalSlow: "मामूली या ठहराव (47%)",
    sdgGlobalBad: "2015 से पीछे (18%)",
    sdgStatLabel: "नवीनतम आँकड़े",
    sdgStatusOntrack: "राह पर",
    sdgStatusModerate: "मध्यम प्रगति",
    sdgStatusSlow: "बहुत धीमी",
    sdgStatusRegress: "पीछे जा रहा",
    sdgSourcePrefix: "स्रोत:",
    sdgSourceLink: "सतत विकास लक्ष्य रिपोर्ट 2025 (संयुक्त राष्ट्र)",
    sdgTarget: "2030 लक्ष्य",
    sdgProgress: "प्रगति (डेमो)",
    sdgOurs: "उड़ान कैसे मदद करता है",
    initEyebrow: "योजनाएँ",
    initTitle: "सरकारी योजनाएँ",
    initSub: "जानने लायक योजनाएँ, उनसे क्या मिलता है, और आवेदन की आधिकारिक लिंक।",
    initBenefit: "क्या मिलता है",
    initHow: "आवेदन कैसे करें",
    initOpen: "आधिकारिक पेज खोलें",
    careersTitle: "करियर",
    careersSoon: "जल्द आ रहा है",
    careersBody: "अभी हम इस स्क्रीन से भर्ती नहीं कर रहे। इंजीनियरिंग, फ़ील्ड ऑपरेशन और डिज़ाइन की भूमिकाएँ खुलने पर यहाँ दिखेंगी।",
    contactTitle: "संपर्क करें",
    contactSub: "एक ही इनबॉक्स, टीम पढ़ती है।",
    contactNote: "हेल्पलाइन नंबर में सुधार, साझेदारी के विचार, या ऐप से जुड़ी कोई ज़रूरी बात।",
    emailCta: "हमें लिखें",
    typeEmergency: "आपातकालीन नंबर",
    typeHelpline: "हेल्पलाइन",
    typeGuidance: "जानकारी",
    regionLabel: "क्षेत्र",
    emergencyTab: "इमरजेंसी",
    emergencyTitle: "भारत के आपातकालीन नंबर",
    emergencySub: "किसी भी नंबर पर टैप करके कॉल करें। 112 पूरे भारत में पुलिस, फायर और एम्बुलेंस के लिए एक ही नंबर है।",
    firstTitle: "सबसे पहले क्या करें",
    firstSteps: [
      "अभी खतरे में हैं? 112 पर कॉल करें - पुलिस, फायर और एम्बुलेंस एक ही नंबर से, किसी भी फ़ोन से मुफ़्त।",
      "सुरक्षित रूप से बोल नहीं सकते? 112 पर मैसेज करें - आप कहाँ हैं और क्या हो रहा है।",
      "उन्हें ठीक-ठीक बताएँ कि आप कहाँ हैं: मंज़िल, कोई पहचान की जगह, या सबसे नज़दीकी सड़क।",
      "मौका हो तो किसी सुरक्षित जगह चले जाएँ, और फ़ोन तब तक मत काटें जब तक वे न कहें।",
      "सुरक्षित होने के बाद ही: खतरे में महिला के लिए 181, बच्चे के लिए 1098, ऑनलाइन पैसा गँवाने पर 1930।"
    ],
    callLabel: "कॉल",
    groupEmergency: "मुख्य आपातकाल",
    groupMedical: "मेडिकल और मानसिक स्वास्थ्य",
    groupWomen: "महिलाएँ और बच्चे",
    groupOther: "अन्य हेल्पलाइन",
    emergencyNote: "ये सरकारी सेवाएँ हैं, UDAAN की नहीं। नंबर राष्ट्रीय हैं; कुछ राज्यों की लाइनें अलग होती हैं।",
    aidTab: "प्राथमिक मदद",
    aidTitle: "आपात स्थिति में क्या करें",
    aidSub: "रोज़मर्रा की आपात स्थितियों के लिए काम की प्राथमिक मदद। एक बार पढ़ लें - ज़रूरत के समय याद रखना आसान होता है।",
    aidBreathing: "साँस और दिल",
    aidBleeding: "खून बहना और चोट",
    aidBurns: "जलना, गर्मी और काटना",
    aidOther: "दौरे, ज़हर और बेहोशी",
    callNow: "112 पर कॉल",
    dontLabel: "न करें:",
    aidNote: "यह सामान्य मार्गदर्शन है, डॉक्टरी सलाह नहीं। जान का खतरा हो तो पहले 112 पर कॉल करें।",
    sketchTab: "स्केच",
    sketchTitle: "स्केच और रंग भरें",
    sketchSub: "एक चित्र चुनें, रंग चुनें और आकृतियाँ भरें। समय बिताने का एक शांत तरीका।",
    sketchPickTitle: "स्केच चुनें",
    sketchPickSub: "UDAAN के विषयों पर रेखा-चित्र: उड़ान, सुरक्षा, स्वास्थ्य, आश्रय और सीखना।",
    colourLabel: "रंग",
    undo: "पूर्ववत करें",
    clear: "फिर से शुरू करें",
    save: "चित्र सहेजें",
    sketchBack: "सभी स्केच",
    sketchNote: "चित्र सिर्फ़ इसी ब्राउज़र टैब में रहते हैं - कुछ भी अपलोड नहीं होता।",
    savedMsg: "चित्र सहेजा गया।",
    saveFail: "यहाँ चित्र सहेजा नहीं जा सका।",
    topicFlight: "उड़ान",
    topicSafety: "सुरक्षा",
    topicHealth: "स्वास्थ्य",
    topicHome: "आश्रय",
    topicLearn: "सीखना"
  }
};

const CATEGORIES = [
  { id: "emergency", labelEn: "Emergency & urgent help", labelHi: "तत्काल और आपातकालीन सहायता", icon: "alert" },
  { id: "safety", labelEn: "Safety & harassment", labelHi: "सुरक्षा और परेशानी", icon: "shield" },
  { id: "health", labelEn: "Health & mental well-being", labelHi: "स्वास्थ्य और मानसिक स्वास्थ्य", icon: "heart" },
  { id: "basic-needs", labelEn: "Food, shelter & essentials", labelHi: "भोजन, आवास और ज़रूरी चीज़ें", icon: "home" },
  { id: "legal", labelEn: "Rights, police & legal help", labelHi: "अधिकार, पुलिस और कानूनी मदद", icon: "scale" },
  { id: "children", labelEn: "Children & students", labelHi: "बच्चे और छात्र", icon: "book" },
  { id: "women", labelEn: "Women & families", labelHi: "महिलाएँ और परिवार", icon: "people" },
  { id: "elderly", labelEn: "Older adults & caregivers", labelHi: "बुज़ुर्ग और देखभालकर्ता", icon: "care" },
  { id: "migrants", labelEn: "Migrants & displaced people", labelHi: "प्रवासी और विस्थापित लोग", icon: "plane" },
  { id: "disability", labelEn: "Disability support", labelHi: "दिव्यांग सहायता", icon: "wheelchair" }
];

const RESOURCES = [
  {
    id: "emergency-112",
    category: "emergency",
    titleEn: "Call 112 for emergencies",
    titleHi: "आपातकाल में 112 पर कॉल करें",
    bodyEn: "112 is the single European emergency number. In many countries it connects police, fire and medical services.",
    bodyHi: "112 यूरोप का एकीकृत आपातकालीन नंबर है। कई देशों में यह पुलिस, फायर और मेडिकल सेवाओं से जोड़ता है।",
    type: "emergency-number",
    value: "112",
    noteEn: "Not a UDAAN service. If you are in immediate danger, call this first.",
    noteHi: "यह UDAAN की सेवा नहीं है। अगर तुम्हें तुरंत खतरा है, तो सबसे पहले इस पर कॉल करें।"
  },
  {
    id: "emergency-local",
    category: "emergency",
    titleEn: "Find your country's emergency numbers",
    titleHi: "अपने देश के आपातकालीन नंबर खोजें",
    bodyEn: "Emergency numbers vary by country. Check your local government or telecom provider for the correct number.",
    bodyHi: "आपातकालीन नंबर देश के हिसाब से अलग होते हैं। सही नंबर के लिए अपनी स्थानीय सरकार या टेलिकॉम प्रदाता से जाँच करें।",
    type: "help-center"
  },
  {
    id: "women-india",
    category: "women",
    titleEn: "Women Helpline (India)",
    titleHi: "महिला हेल्पलाइन (भारत)",
    bodyEn: "A 24-hour women's emergency helpline in India.",
    bodyHi: "भारत में महिलाओं के लिए 24 घंटे की आपातकालीन हेल्पलाइन।",
    type: "helpline",
    value: "181",
    region: "India"
  },
  {
    id: "children-india",
    category: "children",
    titleEn: "Childline (India)",
    titleHi: "चाइल्डलाइन (भारत)",
    bodyEn: "A 24-hour helpline for children in distress in India.",
    bodyHi: "भारत में तकलीफ़ में होने वाले बच्चों के लिए 24 घंटे की हेल्पलाइन।",
    type: "helpline",
    value: "1098",
    region: "India"
  },
  {
    id: "mental-general",
    category: "health",
    titleEn: "Talk to someone about how you feel",
    titleHi: "अपनी भावनाओं के बारे में किसी से बात करें",
    bodyEn: "If you are feeling overwhelmed, a trusted helpline or health worker can help. Many countries run free mental health support lines.",
    bodyHi: "अगर तुम्हें ज़्यादा दबाव या उदासी महसूस हो रही है, तो किसी भरोसेमंद हेल्पलाइन या स्वास्थ्य कर्मी की मदद ले सकते हो। कई देश मुफ़्त मानसिक स्वास्थ्य सहायता लाइन चलाते हैं।",
    type: "help-center"
  },
  {
    id: "basic-needs-general",
    category: "basic-needs",
    titleEn: "Find food, shelter and essentials near you",
    titleHi: "पास में भोजन, आवास और ज़रूरी चीज़ें खोजें",
    bodyEn: "Local community centres, charities and municipal services often help with food, shelter and essentials. Search for services in your area.",
    bodyHi: "स्थानीय समुदाय केंद्र, धर्मार्थ संस्थान और नगरपालिका की सेवाएँ अक्सर भोजन, आवास और ज़रूरी चीज़ों में मदद करती हैं। अपने क्षेत्र की सेवाएँ खोजें।",
    type: "help-center"
  },
  {
    id: "legal-general",
    category: "legal",
    titleEn: "Know your basic rights",
    titleHi: "अपने मूल अधिकार जानें",
    bodyEn: "You have the right to ask why you are being stopped, to have someone you trust present, and to contact a lawyer where available.",
    bodyHi: "तुम्हें पूछने का अधिकार है कि तुम्हें क्यों रोका जा रहा है, एक भरोसेमंद व्यक्ति को साथ रखने का, और जहाँ उपलब्ध हो वहाँ वकील से संपर्क करने का।",
    type: "help-center"
  }
];

const EMERGENCY_GROUPS = ["emergency", "medical", "women", "other"];

const EMERGENCY_INDIA = [
  {
    group: "emergency",
    value: "112",
    nameEn: "National emergency number",
    nameHi: "राष्ट्रीय आपातकालीन नंबर",
    descEn: "One number for police, fire and ambulance in every state and UT. Free, 24x7, works from any phone.",
    descHi: "हर राज्य और केंद्रशासित प्रदेश में पुलिस, फायर और एम्बुलेंस के लिए एक ही नंबर। मुफ़्त, 24x7, किसी भी फ़ोन से।",
    highlight: true
  },
  {
    group: "emergency",
    value: "100",
    nameEn: "Police",
    nameHi: "पुलिस",
    descEn: "Police control room. Still works in most states, and 112 routes here too.",
    descHi: "पुलिस कंट्रोल रूम। ज़्यादातर राज्यों में अब भी चलता है, और 112 भी यहीं जोड़ता है।"
  },
  {
    group: "emergency",
    value: "101",
    nameEn: "Fire & rescue",
    nameHi: "फायर और रेस्क्यू",
    descEn: "Fire brigade and rescue services.",
    descHi: "फायर ब्रिगेड और बचाव सेवा।"
  },
  {
    group: "medical",
    value: "108",
    nameEn: "Emergency ambulance",
    nameHi: "इमरजेंसी एम्बुलेंस",
    descEn: "Ambulance for accidents, trauma and critical illness. Run by state health services.",
    descHi: "दुर्घटना, चोट और गंभीर बीमारी के लिए एम्बुलेंस। राज्य स्वास्थ्य सेवाएँ चलाती हैं।"
  },
  {
    group: "medical",
    value: "102",
    nameEn: "Ambulance for mothers & infants",
    nameHi: "माँ और शिशु के लिए एम्बुलेंस",
    descEn: "Patient transport, mainly for pregnant women, mothers and young children.",
    descHi: "मरीज़ परिवहन, खासकर गर्भवती महिलाओं, माँ और छोटे बच्चों के लिए।"
  },
  {
    group: "medical",
    value: "104",
    nameEn: "Health advice helpline",
    nameHi: "स्वास्थ्य सलाह हेल्पलाइन",
    descEn: "Medical guidance over the phone from state health departments.",
    descHi: "राज्य स्वास्थ्य विभागों से फ़ोन पर मेडिकल सलाह।"
  },
  {
    group: "medical",
    value: "14416",
    nameEn: "Tele-MANAS mental health support",
    nameHi: "टेली-मानस मानसिक स्वास्थ्य सहायता",
    descEn: "Free 24x7 counselling in many Indian languages. Also 1-800-891-4416.",
    descHi: "कई भारतीय भाषाओं में मुफ़्त 24x7 काउंसलिंग। साथ में 1-800-891-4416।"
  },
  {
    group: "medical",
    value: "1097",
    nameEn: "AIDS helpline",
    nameHi: "एड्स हेल्पलाइन",
    descEn: "Confidential HIV/AIDS information and referral.",
    descHi: "गोपनीय HIV/एड्स जानकारी और रेफ़रल।"
  },
  {
    group: "women",
    value: "181",
    nameEn: "Women helpline",
    nameHi: "महिला हेल्पलाइन",
    descEn: "Support for women facing violence or domestic abuse, including referral to police, hospitals and one-stop centres.",
    descHi: "हिंसा या घरेलू शोषण का सामना कर रही महिलाओं के लिए सहायता, पुलिस, अस्पताल और वन-स्टॉप सेंटर तक रेफ़रल के साथ।"
  },
  {
    group: "women",
    value: "1091",
    nameEn: "Women helpline (police)",
    nameHi: "महिला हेल्पलाइन (पुलिस)",
    descEn: "Police women's safety helpline. Delhi and several states; elsewhere use 112 or 181.",
    descHi: "पुलिस की महिला सुरक्षा हेल्पलाइन। दिल्ली और कई राज्यों में; बाकी जगह 112 या 181।"
  },
  {
    group: "women",
    value: "1098",
    nameEn: "Childline",
    nameHi: "चाइल्डलाइन",
    descEn: "24x7 free line for any child in distress, or an adult calling for a child.",
    descHi: "किसी भी संकट में बच्चे के लिए, या बच्चे की ओर से कॉल करने वाले बड़े के लिए 24x7 मुफ़्त लाइन।"
  },
  {
    group: "women",
    value: "14567",
    nameEn: "Elderline (senior citizens)",
    nameHi: "एल्डरलाइन (वरिष्ठ नागरिक)",
    descEn: "Help for older adults: pension, abuse, care and legal guidance.",
    descHi: "बुज़ुर्गों के लिए मदद: पेंशन, शोषण, देखभाल और कानूनी सलाह।"
  },
  {
    group: "other",
    value: "1930",
    nameEn: "Cyber crime & online fraud",
    nameHi: "साइबर क्राइम और ऑनलाइन धोखाधड़ी",
    descEn: "Report money lost online, fast. Calling within the first hour gives the best chance of a freeze.",
    descHi: "ऑनलाइन पैसा गँवाने की शिकायत जल्दी करें। पहले घंटे में कॉल करने से पैसा रोकने का सबसे अच्छा मौक़ा मिलता है।"
  },
  {
    group: "other",
    value: "1033",
    nameEn: "National highway accident",
    nameHi: "राष्ट्रीय राजमार्ग दुर्घटना",
    descEn: "Accident, breakdown or hazard on a national highway (NHAI), 24x7.",
    descHi: "राष्ट्रीय राजमार्ग पर दुर्घटना, गाड़ी खराबी या खतरा (NHAI), 24x7।"
  },
  {
    group: "other",
    value: "1078",
    nameEn: "Disaster management control room",
    nameHi: "आपदा प्रबंधन कंट्रोल रूम",
    descEn: "Floods, earthquakes, cyclones and other disasters (NDMA).",
    descHi: "बाढ़, भूकंप, चक्रवात और अन्य आपदाएँ (NDMA)।"
  },
  {
    group: "other",
    value: "1322",
    nameEn: "Railway security helpline",
    nameHi: "रेलवे सुरक्षा हेल्पलाइन",
    descEn: "Theft, harassment or emergencies on a train or at a station.",
    descHi: "ट्रेन या स्टेशन पर चोरी, परेशानी या आपातकाल।"
  },
  {
    group: "other",
    value: "1363",
    nameEn: "Tourist helpline",
    nameHi: "पर्यटक हेल्पलाइन",
    descEn: "Help for travellers, in 12 languages, from the Ministry of Tourism.",
    descHi: "पर्यटन मंत्रालय से यात्रियों के लिए मदद, 12 भाषाओं में।"
  }
];

const AID_GROUPS = ["breathing", "bleeding", "burns", "other"];

const AID_CASES = [
  {
    id: "cpr",
    group: "breathing",
    callNow: true,
    titleEn: "Not breathing, or unresponsive",
    titleHi: "साँस नहीं आ रही, या बेहोश",
    stepsEn: [
      "Tap their shoulders and shout - do they respond?",
      "Ask someone to call 112 and put the phone on speaker.",
      "Tilt the head back, lift the chin, and look and listen for breathing for 10 seconds.",
      "Not breathing normally: push hard in the centre of the chest, 100-120 times a minute, about 5-6 cm deep.",
      "Keep going until help arrives or they start breathing. Swap with someone every 2 minutes if you can."
    ],
    stepsHi: [
      "कंधे थपथपाएँ और आवाज़ दें - वे जवाब दे रहे हैं या नहीं?",
      "किसी को 112 पर कॉल करने को कहें और फ़ोन स्पीकर पर रखें।",
      "सिर पीछे झुकाएँ, ठुड्डी उठाएँ, 10 सेकंड तक देखें-सुनें कि साँस आ रही है या नहीं।",
      "साँस सामान्य न हो: सीने के बीच में ज़ोर से दबाएँ, मिनट में 100-120 बार, करीब 5-6 सेमी गहरा।",
      "मदद आने या साँस लौटने तक जारी रखें। हो सके तो हर 2 मिनट में दूसरे से बदलें।"
    ],
    dontEn: "Do not spend time feeling for a pulse if you are not trained - start compressions instead.",
    dontHi: "प्रशिक्षित न हों तो नाड़ी ढूँढ़ने में समय न लगाएँ - सीधे सीने का दबाव शुरू करें।"
  },
  {
    id: "choking",
    group: "breathing",
    callNow: true,
    titleEn: "Choking",
    titleHi: "दम घुटना (कुछ फँसना)",
    stepsEn: [
      "Ask \"are you choking?\" - if they can cough or speak, encourage them to keep coughing.",
      "Cannot breathe, speak or cough: give 5 firm back blows between the shoulder blades.",
      "If that fails, give 5 abdominal thrusts just above the navel, pulling inwards and upwards.",
      "Keep alternating 5 and 5. Call 112 if it is still stuck.",
      "If they collapse, start CPR."
    ],
    stepsHi: [
      "\"क्या आपका दम घुट रहा है?\" पूछें - खाँसी या आवाज़ आ रही हो तो खाँसने दें।",
      "साँस, आवाज़ या खाँसी नहीं: कंधों के बीच 5 ज़ोरदार थपकियाँ दें।",
      "काम न आए तो नाभि के ऊपर 5 पेट दबाव (हाइमलिक) दें, अंदर और ऊपर की ओर।",
      "5-5 बार बदलते रहें। फिर भी न निकले तो 112 पर कॉल करें।",
      "बेहोश हो जाएँ तो CPR शुरू करें।"
    ],
    dontEn: "Do not put your fingers in the mouth blindly, and do not give water.",
    dontHi: "मुँह में अंधाधुंध उँगली न डालें, और पानी न दें।"
  },
  {
    id: "heart-attack",
    group: "breathing",
    callNow: true,
    titleEn: "Chest pain / possible heart attack",
    titleHi: "सीने में दर्द / दिल का दौरा",
    stepsEn: [
      "Call 112 now and say \"chest pain, possible heart attack\".",
      "Sit them down, keep them still, and loosen tight clothing.",
      "If they are awake and not allergic, let them chew one aspirin (300 mg).",
      "Do not let them walk or drive themselves anywhere.",
      "If they go unresponsive and stop breathing, start CPR."
    ],
    stepsHi: [
      "अभी 112 पर कॉल करें और कहें \"सीने में दर्द, दिल का दौरा हो सकता है\"।",
      "बैठाएँ, हिलने न दें, और तंग कपड़े ढीले करें।",
      "होश में हों और एलर्जी न हो तो एक एस्पिरिन (300 मि.ग्रा.) चबाने दें।",
      "उन्हें चलने या खुद गाड़ी चलाने न दें।",
      "बेहोश होकर साँस रुक जाए तो CPR शुरू करें।"
    ],
    dontEn: "Do not wait to see if the pain passes.",
    dontHi: "दर्द खुद ठीक होने का इंतज़ार न करें।"
  },
  {
    id: "stroke",
    group: "breathing",
    callNow: true,
    titleEn: "Face drooping, weak arm, slurred speech",
    titleHi: "चेहरा टेढ़ा, हाथ कमज़ोर, बोली लड़खड़ाना",
    stepsEn: [
      "Think FAST: Face drooping, Arm weakness, Speech slurred - Time to call 112.",
      "Call 112, say \"possible stroke\", and note the exact time symptoms started.",
      "If they are drowsy, lay them on their side so the airway stays clear.",
      "Do not give food, drink or medicines.",
      "Stay with them until help arrives."
    ],
    stepsHi: [
      "FAST याद रखें: चेहरा टेढ़ा, हाथ कमज़ोर, बोली लड़खड़ाई - तुरंत 112।",
      "112 पर कॉल करके कहें \"स्ट्रोक हो सकता है\", और लक्षण शुरू होने का सही समय याद रखें।",
      "नींद जैसी हालत हो तो करवट पर लिटाएँ ताकि साँस की नली खुली रहे।",
      "खाना, पानी या दवा न दें।",
      "मदद आने तक साथ रहें।"
    ],
    dontEn: "Do not give aspirin - if the stroke is caused by bleeding it can make things worse.",
    dontHi: "एस्पिरिन न दें - खून बहने वाले स्ट्रोक में हालत बिगड़ सकती है।"
  },
  {
    id: "bleeding",
    group: "bleeding",
    callNow: true,
    titleEn: "Heavy bleeding",
    titleHi: "ज़्यादा खून बहना",
    stepsEn: [
      "Press hard on the wound with a clean cloth or gauze, and keep pressing.",
      "If blood soaks through, add another cloth on top - do not remove the first one.",
      "Raise the injured part above the level of the heart if you can.",
      "Call 112 if it is spurting, will not stop after 10 minutes of pressure, or the wound is deep.",
      "Keep them lying down and warm."
    ],
    stepsHi: [
      "साफ़ कपड़े या गॉज़ से घाव पर ज़ोर से दबाएँ, दबाव बनाए रखें।",
      "खून रिस आए तो ऊपर से दूसरा कपड़ा रखें - पहला न हटाएँ।",
      "हो सके तो घायल हिस्से को दिल से ऊँचा रखें।",
      "खून फुहार में निकले, 10 मिनट दबाने पर भी न रुके, या घाव गहरा हो तो 112 पर कॉल करें।",
      "उन्हें लिटाए रखें और गर्म रखें।"
    ],
    dontEn: "Do not pull out anything stuck in the wound - press around it instead.",
    dontHi: "घाव में धँसी चीज़ न खींचें - उसके आसपास दबाएँ।"
  },
  {
    id: "fracture",
    group: "bleeding",
    titleEn: "Suspected broken bone or sprain",
    titleHi: "हड्डी टूटना या मोच",
    stepsEn: [
      "Keep the limb still and supported in the position you found it.",
      "For swelling, hold a cold pack wrapped in cloth on it for 15-20 minutes.",
      "Pad around it and splint only if you must move them.",
      "Call 112 for an open wound, a bent limb, numbness, or if they cannot move it."
    ],
    stepsHi: [
      "अंग को जैसा मिला वैसा ही स्थिर रखें और सहारा दें।",
      "सूजन पर कपड़े में लपेटा ठंडा पैक 15-20 मिनट रखें।",
      "हिलाना ज़रूरी हो तो चारों ओर गद्दी लगाएँ और पट्टी से सहारा दें।",
      "खुला घाव, टेढ़ा अंग, सुन्नपन, या हिला न पाएँ तो 112 पर कॉल करें।"
    ],
    dontEn: "Do not try to straighten the bone or massage the area.",
    dontHi: "हड्डी सीधी करने या मालिश करने की कोशिश न करें।"
  },
  {
    id: "burns",
    group: "burns",
    titleEn: "Burns and scalds",
    titleHi: "जलना और भाप से जलना",
    stepsEn: [
      "Cool the burn under cool running water for 20 minutes - start straight away.",
      "Remove rings, watches and tight clothes near the burn before it swells.",
      "Cover loosely with cling film or a clean, non-fluffy cloth.",
      "Call 112 for burns bigger than the person's palm, or on the face, hands, feet or joints.",
      "Electrical and chemical burns always need a hospital."
    ],
    stepsHi: [
      "जले हिस्से को 20 मिनट तक ठंडे बहते पानी में रखें - तुरंत शुरू करें।",
      "सूजन से पहले अंगूठी, घड़ी और तंग कपड़े हटा दें।",
      "क्लिंग फ़िल्म या साफ़, रोएँ रहित कपड़े से ढीला ढकें।",
      "हथेली से बड़ा जला हो, या चेहरे, हाथ, पैर या जोड़ पर हो तो 112 पर कॉल करें।",
      "बिजली या रसायन से जला हर मामला अस्पताल जाना चाहिए।"
    ],
    dontEn: "No ice, butter, oil or toothpaste, and do not burst blisters.",
    dontHi: "बर्फ़, मक्खन, तेल या टूथपेस्ट न लगाएँ, और छाले न फोड़ें।"
  },
  {
    id: "heatstroke",
    group: "burns",
    callNow: true,
    titleEn: "Heatstroke",
    titleHi: "लू लगना (हीट स्ट्रोक)",
    stepsEn: [
      "Move them to shade or a cool room and remove extra clothing.",
      "Cool fast: wet cloths on the neck, armpits and groin, plus a fan or cool water.",
      "If they are fully awake, give small sips of water.",
      "Confusion, hot dry skin or collapse: call 112 now.",
      "Keep cooling them while you wait."
    ],
    stepsHi: [
      "छाया या ठंडी जगह ले जाएँ और अतिरिक्त कपड़े हटाएँ।",
      "तेज़ी से ठंडा करें: गर्दन, बगल और कमर पर गीला कपड़ा, पंखा या ठंडा पानी।",
      "पूरी तरह होश में हों तो थोड़ा-थोड़ा पानी पिलाएँ।",
      "भ्रम, गर्म सूखी त्वचा या बेहोशी हो तो अभी 112 पर कॉल करें।",
      "इंतज़ार में ठंडा करते रहें।"
    ],
    dontEn: "Do not leave them alone, and do not give alcohol or caffeine.",
    dontHi: "अकेला न छोड़ें, और शराब या कैफ़ीन न दें।"
  },
  {
    id: "snakebite",
    group: "burns",
    callNow: true,
    titleEn: "Snake bite",
    titleHi: "साँप काटना",
    stepsEn: [
      "Move away from the snake and keep the person calm and still.",
      "Keep the bitten limb still and below heart level; remove rings and tight items.",
      "Note the time of the bite. Do not try to catch or kill the snake.",
      "Get to a hospital fast - antivenom is the only real treatment.",
      "Call 112 if you cannot arrange transport."
    ],
    stepsHi: [
      "साँप से दूर हटें और व्यक्ति को शांत और स्थिर रखें।",
      "काटे गए अंग को स्थिर और दिल से नीचे रखें; अंगूठी और तंग चीज़ें हटाएँ।",
      "काटने का समय याद रखें। साँप को पकड़ने या मारने की कोशिश न करें।",
      "जल्दी अस्पताल पहुँचें - असली इलाज सिर्फ़ एंटीवेनम है।",
      "सवारी का इंतज़ाम न हो तो 112 पर कॉल करें।"
    ],
    dontEn: "Do not cut, suck or tie a tight band above the bite, and no ice.",
    dontHi: "काटने की जगह काटें, चूसें या कसकर पट्टी न बाँधें, और बर्फ़ न लगाएँ।"
  },
  {
    id: "seizure",
    group: "other",
    titleEn: "Seizure (fits)",
    titleHi: "दौरा (मिर्गी का झटका)",
    stepsEn: [
      "Clear hard objects away and cushion the head - do not hold them down.",
      "Time the fit. Most stop within 2-3 minutes.",
      "When the jerking stops, turn them onto their side.",
      "Call 112 if it lasts over 5 minutes, repeats, or happens in water.",
      "Stay with them until they are fully awake."
    ],
    stepsHi: [
      "आसपास की कड़ी चीज़ें हटाएँ और सिर के नीचे कुछ रखें - उन्हें बाँधें नहीं।",
      "दौरे का समय देखें। ज़्यादातर 2-3 मिनट में रुक जाते हैं।",
      "झटके रुकने पर करवट पर लिटाएँ।",
      "5 मिनट से ज़्यादा चले, दोबारा हो, या पानी में हो तो 112 पर कॉल करें।",
      "पूरी तरह होश आने तक साथ रहें।"
    ],
    dontEn: "Do not put anything in the mouth - not water, not a spoon.",
    dontHi: "मुँह में कुछ न डालें - पानी या चम्मच भी नहीं।"
  },
  {
    id: "poisoning",
    group: "other",
    callNow: true,
    titleEn: "Poisoning or overdose",
    titleHi: "ज़हर या दवा की ज़्यादा मात्रा",
    stepsEn: [
      "Call 112, or the national poison helpline on 1800-116-117.",
      "Note what was taken, how much and when, and keep the container or packet.",
      "If they are unconscious but breathing, turn them onto their side.",
      "If they stop breathing, start CPR.",
      "Follow what the helpline tells you - treatments differ by poison."
    ],
    stepsHi: [
      "112 पर कॉल करें, या राष्ट्रीय ज़हर हेल्पलाइन 1800-116-117।",
      "क्या लिया, कितना और कब - याद रखें, और डिब्बा या पैकेट संभालकर रखें।",
      "बेहोश हों पर साँस आ रही हो तो करवट पर लिटाएँ।",
      "साँस रुक जाए तो CPR शुरू करें।",
      "हेल्पलाइन जो कहे वही करें - हर ज़हर का इलाज अलग होता है।"
    ],
    dontEn: "Do not make them vomit, and do not give milk or water unless told to.",
    dontHi: "उल्टी कराने की कोशिश न करें, और बिना कहे दूध या पानी न दें।"
  },
  {
    id: "fainting",
    group: "other",
    titleEn: "Fainting",
    titleHi: "बेहोशी / चक्कर",
    stepsEn: [
      "Lay them flat and raise the legs about 30 cm.",
      "Loosen tight clothing and give them fresh air - ask people to step back.",
      "Check that they are breathing normally.",
      "When they wake, let them lie for a few minutes, then sit up slowly.",
      "Call 112 if they do not wake within a minute, or were hurt when they fell."
    ],
    stepsHi: [
      "सीधा लिटाएँ और पैर करीब 30 सेमी ऊपर उठाएँ।",
      "तंग कपड़े ढीले करें और हवा पहुँचाएँ - लोगों से पीछे हटने को कहें।",
      "देखें कि साँस सामान्य आ रही है।",
      "होश आने पर कुछ मिनट लेटे रहने दें, फिर धीरे से बैठाएँ।",
      "एक मिनट में होश न आए, या गिरते समय चोट लगी हो तो 112 पर कॉल करें।"
    ],
    dontEn: "Do not sit or stand them up straight away.",
    dontHi: "तुरंत बैठाएँ या खड़ा न करें।"
  }
];

const NAV_ITEMS = [
  { href: "#/about", labelKey: "navAbout", icon: "info" },
  { href: "#/login", labelKey: "navJoin", icon: "user" },
  { href: "#/sdg", labelKey: "navSdg", icon: "globe" },
  { href: "#/initiatives", labelKey: "navInitiatives", icon: "landmark" },
  { href: "#/sketch", labelKey: "navSketch", icon: "pencil" },
  { href: "#/careers", labelKey: "navCareers", icon: "briefcase" },
  { href: "#/contact", labelKey: "navContact", icon: "mail" }
];

const SDG_GOALS = [
  {
    n: 1,
    status: "slow",
    nameEn: "No poverty",
    nameHi: "गरीबी का अंत",
    statEn: "808 million people - about 1 in 10 - still live in extreme poverty in 2025. Only one in five countries is on track to halve its national poverty rate by 2030.",
    statHi: "2025 में करीब 80.8 करोड़ लोग - यानी 10 में से 1 - अत्यधिक गरीबी में हैं। पाँच में से सिर्फ़ एक देश 2030 तक राष्ट्रीय गरीबी दर आधी करने की राह पर है।",
    targetEn: "By 2030, eradicate extreme poverty for all people everywhere, everywhere measured as living on less than $2.15 a day.",
    targetHi: "2030 तक हर जगह अत्यधिक गरीबी (प्रतिदिन $2.15 से कम पर जीवन) समाप्त करना।",
    oursEn: "A free help directory that works on a basic phone and a slow connection.",
    oursHi: "मुफ़्त मदद सूची, जो साधारण फ़ोन और धीमे नेट पर भी चले।"
  },
  {
    n: 3,
    status: "moderate",
    nameEn: "Good health and well-being",
    nameHi: "अच्छा स्वास्थ्य और तंदुरुस्ती",
    statEn: "Maternal mortality fell from 228 deaths per 100,000 live births in 2015 to 197 in 2023. Under-five mortality dropped from 44 to 37 deaths per 1,000 live births.",
    statHi: "2015 में 100,000 जीवित जन्मों पर 228 मातृ मृत्यु थीं, 2023 में 197। पाँच वर्ष से छोटे बच्चों की मृत्यु 1,000 जीवित जन्मों पर 44 से 37 हो गई।",
    targetEn: "By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births, and end preventable deaths of newborns and children under 5.",
    targetHi: "2030 तक मातृ मृत्यु अनुपात 100,000 जीवित जन्मों पर 70 से कम लाना, और नवजात व 5 वर्ष से छोटे बच्चों की रोकी जा सकने वाली मौतें समाप्त करना।",
    oursEn: "Emergency numbers and first-aid steps in one place, in the language people read.",
    oursHi: "आपातकालीन नंबर और प्राथमिक मदद एक जगह, उसी भाषा में जो लोग पढ़ते हैं।"
  },
  {
    n: 5,
    status: "slow",
    nameEn: "Gender equality",
    nameHi: "लैंगिक समानता",
    statEn: "Women held 27.2% of seats in national parliaments on 1 January 2025 - up 4.9 percentage points since 2015, but still far from parity.",
    statHi: "1 जनवरी 2025 को राष्ट्रीय संसदों की 27.2% सीटें महिलाओं के पास थीं - 2015 से 4.9 फ़ीसदी अंक ज़्यादा, पर बराबरी अभी दूर है।",
    targetEn: "By 2030, ensure women's full and effective participation and equal opportunities for leadership at all levels of decision-making.",
    targetHi: "2030 तक निर्णय लेने के हर स्तर पर महिलाओं की पूरी और असरदार भागीदारी व नेतृत्व के बराबर अवसर सुनिश्चित करना।",
    oursEn: "Women's helplines surfaced first, with what to say when you call.",
    oursHi: "महिला हेल्पलाइन सबसे पहले, और कॉल पर क्या कहना है यह भी।"
  },
  {
    n: 10,
    status: "regress",
    nameEn: "Reduced inequalities",
    nameHi: "असमानता में कमी",
    statEn: "By 2025 more than three-quarters of the world's extreme poor live in sub-Saharan Africa or in fragile and conflict-affected countries.",
    statHi: "2025 तक दुनिया के तीन-चौथाई से ज़्यादा अत्यधिक गरीब सब-सहारा अफ़्रीका या संघर्ष-प्रभावित देशों में रहते हैं।",
    targetEn: "By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average.",
    targetHi: "2030 तक आबादी के निचले 40% की आय राष्ट्रीय औसत से तेज़ दर पर लगातार बढ़ाना।",
    oursEn: "No email, no app store: one phone number is the only requirement.",
    oursHi: "न ईमेल, न ऐप स्टोर: सिर्फ़ एक फ़ोन नंबर ही ज़रूरी।"
  },
  {
    n: 16,
    status: "regress",
    nameEn: "Peace, justice and strong institutions",
    nameHi: "शांति, न्याय और मज़बूत संस्थाएँ",
    statEn: "120 million people are forcibly displaced - more than double the number in 2015 - as conflict and weak institutions drive people from their homes.",
    statHi: "12 करोड़ लोग ज़बरदस्ती विस्थापित हैं - 2015 से दोगुने से ज़्यादा - क्योंकि संघर्ष और कमज़ोर संस्थाएँ लोगों को घर छोड़ने पर मजबूर करते हैं।",
    targetEn: "Significantly reduce all forms of violence everywhere, and ensure equal access to justice for all.",
    targetHi: "हर जगह हिंसा के सभी रूपों को खासा कम करना, और सभी के लिए न्याय तक बराबर पहुँच सुनिश्चित करना।",
    oursEn: "Verified helplines and plain-language explanations of your rights.",
    oursHi: "जाँचे हुए हेल्पलाइन नंबर और आपके अधिकारों की सरल भाषा में जानकारी।"
  },
  {
    n: 17,
    status: "regress",
    nameEn: "Partnerships for the goals",
    nameHi: "लक्ष्यों के लिए साझेदारी",
    statEn: "Developing countries face a $4 trillion annual SDG financing gap, and official development assistance fell 7.1% in 2024 after five years of growth.",
    statHi: "विकासशील देशों के सामने सालाना 4 ट्रिलियन डॉलर का SDG वित्त अंतर है, और 2024 में आधिकारिक विकास सहायता पाँच साल की बढ़त के बाद 7.1% गिरी।",
    targetEn: "Strengthen domestic resource mobilisation, and assist developing countries in attaining long-term debt sustainability.",
    targetHi: "घरेलू संसाधन जुटाना मज़बूत करना, और विकासशील देशों को दीर्घकालिक कर्ज़ स्थिरता में मदद करना।",
    oursEn: "Open helpline data that any team can reuse, check and correct.",
    oursHi: "खुला हेल्पलाइन डेटा, जिसे कोई भी टीम दोबारा इस्तेमाल, जाँच और सुधार सके।"
  }
];

const INITIATIVES = [
  {
    id: "pmjay",
    url: "https://pmjay.gov.in",
    nameEn: "Ayushman Bharat PM-JAY",
    nameHi: "आयुष्मान भारत PM-JAY",
    benefitEn: "Free hospital care up to ₹5 lakh a year for eligible families.",
    benefitHi: "पात्र परिवारों के लिए सालाना ₹5 लाख तक मुफ़्त अस्पताल इलाज।",
    howEn: "Check eligibility on the official portal or at a hospital's Arogya Mitra desk, then get an Ayushman card.",
    howHi: "आधिकारिक पोर्टल या अस्पताल के आरोग्य मित्र डेस्क पर पात्रता जाँचें, फिर आयुष्मान कार्ड बनवाएँ।"
  },
  {
    id: "eshram",
    url: "https://eshram.gov.in",
    nameEn: "e-Shram",
    nameHi: "ई-श्रम",
    benefitEn: "A free digital ID for informal workers, with accident cover and links to welfare schemes.",
    benefitHi: "असंगठित श्रमिकों के लिए मुफ़्त डिजिटल पहचान, दुर्घटना बीमा और योजनाओं से जुड़ाव।",
    howEn: "Register free with Aadhaar, bank details and a phone number on the portal or at a CSC.",
    howHi: "पोर्टल पर या CSC पर आधार, बैंक विवरण और फ़ोन नंबर से मुफ़्त पंजीकरण करें।"
  },
  {
    id: "pmjdy",
    url: "https://pmjdy.gov.in",
    nameEn: "Pradhan Mantri Jan Dhan Yojana",
    nameHi: "प्रधानमंत्री जन धन योजना",
    benefitEn: "A zero-balance bank account with a RuPay card and accident cover.",
    benefitHi: "रुपे कार्ड और दुर्घटना बीमा के साथ ज़ीरो-बैलेंस बैंक खाता।",
    howEn: "Walk into any bank branch with Aadhaar and ask for a Jan Dhan account.",
    howHi: "आधार लेकर किसी भी बैंक शाखा जाएँ और जन धन खाता खुलवाएँ।"
  },
  {
    id: "ujjwala",
    url: "https://www.pmuy.gov.in",
    nameEn: "Pradhan Mantri Ujjwala Yojana",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना",
    benefitEn: "A free LPG connection for eligible women from low-income households.",
    benefitHi: "कम आय वाले परिवारों की पात्र महिलाओं के लिए मुफ़्त LPG कनेक्शन।",
    howEn: "Apply at your nearest LPG distributor with Aadhaar, ration card and bank details.",
    howHi: "नज़दीकी LPG वितरक पर आधार, राशन कार्ड और बैंक विवरण के साथ आवेदन करें।"
  },
  {
    id: "pmayg",
    url: "https://pmayg.dord.gov.in",
    nameEn: "Pradhan Mantri Awas Yojana (Gramin)",
    nameHi: "प्रधानमंत्री आवास योजना (ग्रामीण)",
    benefitEn: "Financial assistance to build a pucca house.",
    benefitHi: "पक्का घर बनाने के लिए आर्थिक सहायता।",
    howEn: "Apply through your Gram Panchayat; first check your family on the SECC / Awaas+ list.",
    howHi: "ग्राम पंचायत के ज़रिए आवेदन करें; पहले SECC / आवास+ सूची में अपना परिवार जाँचें।"
  },
  {
    id: "nsp",
    url: "https://scholarships.gov.in",
    nameEn: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    benefitEn: "Scholarships for students from low-income families, with one application window.",
    benefitHi: "कम आय वाले परिवारों के विद्यार्थियों के लिए छात्रवृत्ति, एक ही आवेदन खिड़की।",
    howEn: "Register on the portal, upload documents and apply before the yearly deadline.",
    howHi: "पोर्टल पर पंजीकरण करें, दस्तावेज़ अपलोड करें और सालाना अंतिम तारीख से पहले आवेदन करें।"
  }
];

const PAPER = "#fbf7ef";
const INK = "#243934";
const PALETTE = ["#f6b26b", "#e2705a", "#d0688a", "#9f8cc4", "#7cc4d8", "#2f9086", "#7fb069", "#e6c79c", "#14524d", "#2b2b2b", PAPER];

const SKETCHES = [
  {
    id: "kite",
    topic: "flight",
    titleEn: "Kite in the sky",
    titleHi: "आसमान में पतंग",
    viewBox: "0 0 200 200",
    body: `
      <circle class="region" data-region="sun" cx="42" cy="40" r="16"/>
      <path class="region" data-region="cloud" d="M112 44 C 112 34 124 28 134 32 C 140 22 158 24 162 36 C 174 36 178 48 168 52 H120 C 112 52 108 48 112 44 Z"/>
      <path class="region" data-region="hill" d="M0 200 V 172 C 34 148 70 150 100 176 C 130 150 168 148 200 174 V 200 Z"/>
      <path class="region" data-region="kite" d="M100 28 L 152 92 L 100 164 L 48 92 Z"/>
      <path class="line" d="M100 28 V 164"/>
      <path class="line" d="M48 92 H 152"/>
      <path class="line" d="M100 164 V 172"/>
      <path class="line" d="M100 184 V 186"/>
      <path class="region" data-region="bow1" d="M100 172 L 110 178 L 100 184 L 90 178 Z"/>
      <path class="region" data-region="bow2" d="M100 186 L 108 191 L 100 196 L 92 191 Z"/>
    `
  },
  {
    id: "shield",
    topic: "safety",
    titleEn: "Safety shield",
    titleHi: "सुरक्षा की ढाल",
    viewBox: "0 0 200 200",
    body: `
      <path class="region" data-region="shield-out" d="M100 22 L 160 46 V 100 C 160 138 134 166 100 178 C 66 166 40 138 40 100 V 46 Z"/>
      <path class="region" data-region="shield-in" d="M100 42 L 140 58 V 100 C 140 128 122 148 100 158 C 78 148 60 128 60 100 V 58 Z"/>
      <circle class="region" data-region="gem" cx="100" cy="96" r="18"/>
      <path class="line" d="M91 96 L 98 103 L 111 89"/>
    `
  },
  {
    id: "heart",
    topic: "health",
    titleEn: "Heart of care",
    titleHi: "देखभाल का दिल",
    viewBox: "0 0 200 200",
    body: `
      <path class="region" data-region="heart" d="M100 172 C 36 130 20 96 38 68 C 56 40 92 46 100 76 C 108 46 144 40 162 68 C 180 96 164 130 100 172 Z"/>
      <rect class="region" data-region="cross-v" x="88" y="78" width="24" height="58" rx="6"/>
      <rect class="region" data-region="cross-h" x="71" y="95" width="58" height="24" rx="6"/>
    `
  },
  {
    id: "home",
    topic: "home",
    titleEn: "A safe home",
    titleHi: "एक सुरक्षित घर",
    viewBox: "0 0 200 200",
    body: `
      <circle class="region" data-region="sun" cx="172" cy="40" r="13"/>
      <path class="region" data-region="roof" d="M14 98 L 100 32 L 186 98 Z"/>
      <rect class="region" data-region="wall" x="40" y="96" width="120" height="78" rx="5"/>
      <rect class="region" data-region="win-l" x="54" y="112" width="22" height="22" rx="4"/>
      <rect class="region" data-region="win-r" x="124" y="112" width="22" height="22" rx="4"/>
      <rect class="region" data-region="door" x="86" y="126" width="28" height="48" rx="4"/>
      <path class="region" data-region="lawn" d="M0 184 C 40 176 70 180 100 184 C 130 180 160 176 200 184 V 200 H 0 Z"/>
    `
  },
  {
    id: "book",
    topic: "learn",
    titleEn: "Open book",
    titleHi: "खुली किताब",
    viewBox: "0 0 200 200",
    body: `
      <path class="region" data-region="page-l" d="M98 64 C 78 52 54 50 32 56 V 148 C 54 142 78 144 98 156 Z"/>
      <path class="region" data-region="page-r" d="M102 64 C 122 52 146 50 168 56 V 148 C 146 142 122 144 102 156 Z"/>
      <path class="line" d="M98 64 V 156"/>
      <path class="line" d="M102 64 V 156"/>
      <path class="line" d="M48 74 C 62 72 78 76 88 82"/>
      <path class="line" d="M48 92 C 62 90 78 94 88 100"/>
      <path class="line" d="M48 110 C 62 108 78 112 88 118"/>
      <path class="line" d="M112 82 C 122 76 138 72 152 74"/>
      <path class="line" d="M112 100 C 122 94 138 90 152 92"/>
      <path class="line" d="M112 118 C 122 112 138 108 152 110"/>
    `
  }
];

const DEMO_CODE = "123456";

const root = document.getElementById("main");
const appState = document.getElementById("app-state");

function render() {
  const dict = i18n[state.locale];
  root.innerHTML = buildScreen(state.screen, dict, state);
  appState.textContent = JSON.stringify({ locale: state.locale, screen: state.screen });
  wireScreen(state.screen, dict, state);
  document.documentElement.lang = state.locale;
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.setAttribute("aria-pressed", state.locale === "hi" ? "true" : "false");
    langToggle.textContent = state.locale === "hi" ? "English" : "हिंदी";
  }
  const footerNote = document.querySelector(".footer-note");
  if (footerNote) footerNote.textContent = dict.footerNote;
  const disclaimer = document.querySelector(".disclaimer");
  if (disclaimer) disclaimer.textContent = dict.disclaimer;
  const tabNames = { emergency: dict.emergencyTab, aid: dict.aidTab, sketch: dict.sketchTab };
  document.querySelectorAll("[data-tab]").forEach(el => {
    const name = el.getAttribute("data-tab");
    const label = el.querySelector("[data-tab-label]");
    if (label && tabNames[name]) label.textContent = tabNames[name];
    if (name === state.screen) {
      el.setAttribute("aria-current", "page");
    } else {
      el.removeAttribute("aria-current");
    }
  });
  renderChrome(dict, state);
}

function navIcon(name) {
  const icons = {
    info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 10.6v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1" fill="currentColor"/>',
    user: '<circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 20c1-4.4 3.9-6.2 7.5-6.2s6.5 1.8 7.5 6.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.2 12h17.6" stroke="currentColor" stroke-width="1.4"/><path d="M12 3c3.2 3 3.2 15 0 18c-3.2-3-3.2-15 0-18Z" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    landmark: '<path d="M3.5 9.5 12 4l8.5 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M6 10.5v7M10 10.5v7M14 10.5v7M18 10.5v7M3.5 20h17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    pencil: '<path d="M3.5 20.5l1.2-4.2L15.8 5.2l3 3L7.7 19.3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 7.5V5.6c0-.9.7-1.6 1.6-1.6h2.8c.9 0 1.6.7 1.6 1.6V7.5" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.4 6.4 12 12.6 20.6 6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
  };
  return `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">${icons[name] || icons.info}</svg>`;
}

function renderChrome(dict, state) {
  const panel = document.getElementById("menu-panel");
  if (panel) {
    panel.innerHTML = NAV_ITEMS.map(item => {
      const active = item.href === "#/" + state.screen;
      return `<a href="${item.href}"${active ? ' aria-current="page"' : ""}><span class="mi" aria-hidden="true">${navIcon(item.icon)}</span><span>${escapeHtml(dict[item.labelKey])}</span></a>`;
    }).join("");
  }
  const homeBtn = document.getElementById("home-btn");
  if (homeBtn) {
    homeBtn.setAttribute("aria-label", dict.home);
    homeBtn.setAttribute("title", dict.home);
  }
  const menuBtn = document.getElementById("menu-btn");
  if (menuBtn) {
    menuBtn.setAttribute("aria-label", dict.menuLabel);
    menuBtn.setAttribute("title", dict.menuLabel);
  }
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    const nextLabel = state.theme === "light" ? dict.themeDark : dict.themeLight;
    themeBtn.setAttribute("aria-pressed", String(state.theme === "light"));
    themeBtn.setAttribute("aria-label", nextLabel);
    themeBtn.setAttribute("title", nextLabel);
  }
  const audio = document.getElementById("bg-music");
  const musicLabel = document.querySelector("#music-btn .music-label");
  if (musicLabel) {
    musicLabel.textContent = audio && !audio.paused ? dict.musicPause : dict.musicPlay;
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("udaan-theme", theme);
  } catch (err) {
    /* storage unavailable */
  }
}

function initChrome() {
  const menuBtn = document.getElementById("menu-btn");
  const panel = document.getElementById("menu-panel");
  const closeMenu = () => {
    if (panel) panel.setAttribute("hidden", "");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  };
  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!panel || !menuBtn) return;
    if (panel.hasAttribute("hidden")) {
      panel.removeAttribute("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    } else {
      closeMenu();
    }
  });
  panel?.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.getElementById("home-btn")?.addEventListener("click", () => {
    closeMenu();
    if (state.screen === "landing") {
      render();
    } else {
      location.hash = "#/landing";
    }
  });

  document.getElementById("theme-btn")?.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme(state.theme);
    render();
  });

  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  if (audio && musicBtn) {
    audio.volume = 0.22;
    let musicPref = "on";
    try {
      const stored = localStorage.getItem("udaan-music");
      if (stored === "on" || stored === "off") musicPref = stored;
    } catch (err) {
      /* storage unavailable */
    }
    const rememberMusic = () => {
      try {
        localStorage.setItem("udaan-music", audio.paused ? "off" : "on");
      } catch (err) {
        /* storage unavailable */
      }
    };
    const sync = () => {
      const playing = !audio.paused;
      const dict = i18n[state.locale];
      musicBtn.setAttribute("aria-pressed", String(playing));
      musicBtn.setAttribute("title", dict.musicCredit);
      const label = musicBtn.querySelector(".music-label");
      if (label) label.textContent = playing ? dict.musicPause : dict.musicPlay;
    };
    musicBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (audio.paused) {
        try {
          await audio.play();
        } catch (err) {
          /* blocked until a gesture */
        }
      } else {
        audio.pause();
      }
      rememberMusic();
      sync();
    });
    audio.addEventListener("play", () => {
      rememberMusic();
      sync();
    });
    audio.addEventListener("pause", () => {
      rememberMusic();
      sync();
    });
    sync();
    if (musicPref === "on") {
      const attempt = audio.play();
      if (attempt && attempt.catch) attempt.catch(() => sync());
      document.addEventListener("pointerdown", function once() {
        if (audio.paused) {
          const retry = audio.play();
          if (retry && retry.catch) retry.catch(() => {});
        }
        document.removeEventListener("pointerdown", once);
      }, { once: true });
    }
  }
}

function buildScreen(screen, dict, state) {
  switch (screen) {
    case "login":
      return loginHtml(dict, state);
    case "otp":
      return otpHtml(dict, state);
    case "register":
      return registerHtml(dict, state);
    case "me":
      return meHtml(dict, state);
    case "resources":
      return resourcesHtml(dict, state);
    case "emergency":
      return emergencyHtml(dict, state);
    case "sketch":
      return sketchHtml(dict, state);
    case "aid":
      return aidHtml(dict, state);
    case "about":
      return aboutHtml(dict, state);
    case "sdg":
      return sdgHtml(dict, state);
    case "initiatives":
      return initiativesHtml(dict, state);
    case "careers":
      return careersHtml(dict, state);
    case "contact":
      return contactHtml(dict, state);
    default:
      return landingHtml(dict);
  }
}

function backLink(dict, state) {
  return `<div class="back-link-wrap"><a href="#" data-go="${escapeHtml(state.prev || "landing")}" class="back-link">${dict.back}</a></div>`;
}

const pillarIcons = [
  `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="7" y="2.5" width="10" height="19" rx="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10.6 18.4H13.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 12H21" stroke="currentColor" stroke-width="1.4"/><path d="M12 3C15.2 6 15.2 18 12 21C8.8 18 8.8 6 12 3Z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  `<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3.5L13.9 9.2L19.5 11L13.9 12.8L12 18.5L10.1 12.8L4.5 11L10.1 9.2Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
];

function landingHtml(dict) {
  const pillars = [
    [dict.pillar1Title, dict.pillar1Body],
    [dict.pillar2Title, dict.pillar2Body],
    [dict.pillar3Title, dict.pillar3Body]
  ];
  return `
    <section class="hero-shell reveal">
      <div class="video-card">
        <video class="hero-video" id="hero-video" autoplay muted loop playsinline preload="metadata">
          <source src="assets/udaan-intro.mp4" type="video/mp4">
        </video>
        <div class="video-shade" aria-hidden="true"></div>
        <div class="video-copy">
          <span class="eyebrow">${dict.videoLabel}</span>
          <h1 class="hero-title">${escapeHtml(dict.tagline)}</h1>
          <p class="hero-sub">${dict.heroSub}</p>
        </div>
        <button type="button" class="video-toggle" id="video-toggle" aria-pressed="true">
          <span class="video-toggle-icon" aria-hidden="true"></span>
          <span class="video-toggle-label">${dict.pauseVideo}</span>
        </button>
      </div>
    </section>

    <section class="about-panel reveal">
      <span class="eyebrow">${dict.aboutEyebrow}</span>
      <h2 class="section-h2">${dict.aboutTitle}</h2>
      <p class="lead">${dict.aboutLead}</p>
      ${dict.aboutParas.map(p => `<p class="body-copy">${escapeHtml(p)}</p>`).join("")}
      <div class="pillars">
        ${pillars.map((p, i) => `
          <div class="pillar">
            <span class="pillar-icon" aria-hidden="true">${pillarIcons[i]}</span>
            <h3>${escapeHtml(p[0])}</h3>
            <p>${escapeHtml(p[1])}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="cta-panel reveal">
      <span class="eyebrow">${dict.signIn} &middot; ${dict.registerCta}</span>
      <h2 class="section-h2">${dict.ctaTitle}</h2>
      <p class="lead">${dict.ctaSub}</p>
      <div class="cta-actions">
        <a href="#" data-go="login" class="btn btn-primary btn-lg">${dict.signIn}</a>
        <a href="#" data-go="register" class="btn btn-ghost btn-lg">${dict.registerCta}</a>
      </div>
      <p class="fine">${dict.finePrint}</p>
      <div class="trust-grid">
        <div class="trust-item"><span class="trust-mark" aria-hidden="true">✓</span><span class="trust-text">${dict.trustCopy1}</span></div>
        <div class="trust-item"><span class="trust-mark" aria-hidden="true">✓</span><span class="trust-text">${dict.trustCopy2}</span></div>
        <div class="trust-item"><span class="trust-mark" aria-hidden="true">✓</span><span class="trust-text">${dict.trustCopy3}</span></div>
      </div>
      <a class="text-link" href="#" data-go="resources">${dict.browseLink}</a>
    </section>
  `;
}

function loginHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.loginTitle}</h1>
      <p class="card-sub">${dict.loginSubtitle}</p>
      <form id="login-form" class="phone-form">
        <label class="field-label" for="login-phone">${dict.phoneLabel}</label>
        <input id="login-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="${dict.phonePlaceholder}" value="${escapeHtml(state.phone)}" required class="input">
        <button type="submit" class="btn btn-primary btn-full">${dict.sendCode}</button>
      </form>
      <p class="switch"><a href="#" data-go="login">${dict.noAccount}</a></p>
    </section>
  `;
}

function otpHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.otpTitle}</h1>
      <p class="card-sub">${dict.otpSubtitle}</p>
      <p class="hint-line">${state.phone ? escapeHtml(state.phone) + " · " : ""}${dict.otpHint}</p>
      <form id="otp-form" class="phone-form">
        <label class="field-label" for="otp-code">${dict.codeLabel}</label>
        <input id="otp-code" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]*" maxlength="6" placeholder="000000" required class="input code-input">
        <button type="submit" class="btn btn-primary btn-full">${dict.nextLabel}</button>
      </form>
      <p class="hint-line">${dict.demoHint}</p>
      <p class="switch"><button type="button" id="resend-code" class="switch-link">${dict.resendLabel}</button></p>
    </section>
  `;
}

function registerHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.registerTitle}</h1>
      <p class="card-sub">${dict.registerSubtitle}</p>
      <form id="register-form">
        <div class="field">
          <label for="reg-password">${dict.passwordLabel}</label>
          <input id="reg-password" name="password" type="password" autocomplete="new-password" placeholder="••••••••" required class="input">
          <p class="field-hint">${dict.passwordHint}</p>
        </div>
        <div class="field">
          <label for="reg-pin">${dict.pinLabel}</label>
          <input id="reg-pin" name="pin" type="password" inputmode="numeric" autocomplete="off" pattern="[0-9]*" maxlength="6" placeholder="1234" required class="input">
          <p class="field-hint">${dict.pinHint}</p>
        </div>
        <div class="field">
          <label for="reg-pin-confirm">${dict.pinConfirmLabel}</label>
          <input id="reg-pin-confirm" name="pinConfirm" type="password" inputmode="numeric" autocomplete="off" pattern="[0-9]*" maxlength="6" placeholder="1234" required class="input">
        </div>
        <button type="submit" class="btn btn-primary btn-full">${dict.createAccount}</button>
      </form>
    </section>
  `;
}

function meHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.meTitle}</h1>
      <div class="account-head">
        <div class="account-avatar" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="42" height="42"><circle cx="16" cy="11" r="6" fill="currentColor"/><path d="M4 29 C 8 23, 12 23, 16 26 C 20 23, 24 23, 28 29 Z" fill="currentColor"/></svg>
        </div>
        <div>
          <p class="account-name">${dict.accountNameFallback}</p>
          <p class="account-phone">${escapeHtml(state.phone || dict.phonePlaceholder)}</p>
        </div>
      </div>
      <div class="account-actions">
        <button type="button" class="btn btn-ghost" id="pin-signin-btn">${dict.pinSignIn}</button>
        <button type="button" class="btn btn-ghost" id="signout-btn">${dict.signOut}</button>
      </div>
      <div class="row-sm">
        <span class="label">${dict.language}</span>
        <span class="value" id="lang-me-toggle">${localeNames[state.locale]}</span>
      </div>
    </section>
    <section class="card flow">
      <h2 class="section-title">${dict.resourcesTitle}</h2>
      <p class="card-sub">${dict.resourcesSubtitle}</p>
      ${categoriesHtml(dict, state)}
    </section>
  `;
}

function resourcesHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.resourcesTitle}</h1>
      <p class="card-sub">${dict.resourcesSubtitle}</p>
      ${categoriesHtml(dict, state)}
    </section>
  `;
}

function aboutHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <span class="eyebrow">${dict.aboutEyebrow}</span>
      <h1 class="card-title">${dict.aboutPageTitle}</h1>
      <p class="card-sub">${dict.aboutPageSub}</p>
      ${dict.aboutPageParas.map(p => `<p class="body-copy">${escapeHtml(p)}</p>`).join("")}
      <div class="founder-card">
        <div class="founder-avatar" aria-hidden="true">AG</div>
        <div class="founder-meta">
          <p class="founder-name">Ayush Gupta</p>
          <p class="founder-role">${dict.founderRole}</p>
        </div>
      </div>
      <p class="body-copy">${dict.founderNote}</p>
      <p class="hint-line">${dict.musicCredit}</p>
    </section>
  `;
}

function sdgHtml(dict, state) {
  const statusLabels = {
    ontrack: dict.sdgStatusOntrack,
    moderate: dict.sdgStatusModerate,
    slow: dict.sdgStatusSlow,
    regress: dict.sdgStatusRegress
  };
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <span class="eyebrow">${dict.sdgEyebrow}</span>
      <h1 class="card-title">${dict.sdgTitle}</h1>
      <p class="card-sub">${dict.sdgSub}</p>
      <div class="sdg-summary">
        <p class="sdg-summary-title">${dict.sdgGlobalTitle}</p>
        <div class="stack-bar" role="img" aria-label="35% on track or moderate, 47% marginal or stagnating, 18% regressed">
          <span class="s-ok" style="width:35%"></span>
          <span class="s-slow" style="width:47%"></span>
          <span class="s-bad" style="width:18%"></span>
        </div>
        <ul class="stack-legend">
          <li><i class="s-ok"></i>${dict.sdgGlobalOk}</li>
          <li><i class="s-slow"></i>${dict.sdgGlobalSlow}</li>
          <li><i class="s-bad"></i>${dict.sdgGlobalBad}</li>
        </ul>
        <p class="sdg-source">${dict.sdgSourcePrefix} <a href="https://unstats.un.org/sdgs/report/2025/" target="_blank" rel="noopener noreferrer">${dict.sdgSourceLink}</a></p>
      </div>
      ${SDG_GOALS.map(g => `
        <article class="sdg-card">
          <div class="sdg-head">
            <span class="sdg-num">${g.n}</span>
            <div>
              <h2 class="sdg-name">${escapeHtml(state.locale === "hi" ? g.nameHi : g.nameEn)}</h2>
              <span class="status-chip ${g.status}">${statusLabels[g.status]}</span>
            </div>
          </div>
          <p class="sdg-stat"><span class="sdg-stat-label">${dict.sdgStatLabel}</span>${escapeHtml(state.locale === "hi" ? g.statHi : g.statEn)}</p>
          <p class="sdg-target"><strong>${dict.sdgTarget}:</strong> ${escapeHtml(state.locale === "hi" ? g.targetHi : g.targetEn)}</p>
          <p class="sdg-ours"><strong>${dict.sdgOurs}:</strong> ${escapeHtml(state.locale === "hi" ? g.oursHi : g.oursEn)}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function initiativesHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <span class="eyebrow">${dict.initEyebrow}</span>
      <h1 class="card-title">${dict.initTitle}</h1>
      <p class="card-sub">${dict.initSub}</p>
      ${INITIATIVES.map(init => {
        const name = state.locale === "hi" ? init.nameHi : init.nameEn;
        const benefit = state.locale === "hi" ? init.benefitHi : init.benefitEn;
        const how = state.locale === "hi" ? init.howHi : init.howEn;
        return `
          <article class="init-card">
            <h2 class="init-name">${escapeHtml(name)}</h2>
            <p class="init-label">${dict.initBenefit}</p>
            <p class="init-benefit">${escapeHtml(benefit)}</p>
            <p class="init-label">${dict.initHow}</p>
            <p class="init-how">${escapeHtml(how)}</p>
            <a class="init-link" href="${init.url}" target="_blank" rel="noopener noreferrer">${dict.initOpen} <span aria-hidden="true">↗</span></a>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function careersHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.careersTitle}</h1>
      <div class="soon-card">
        <span class="soon-badge">${dict.careersSoon}</span>
        <p class="body-copy">${dict.careersBody}</p>
      </div>
      <a class="text-link" href="mailto:udaan@gmail.com">${dict.emailCta} - udaan@gmail.com</a>
    </section>
  `;
}

function contactHtml(dict, state) {
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.contactTitle}</h1>
      <p class="card-sub">${dict.contactSub}</p>
      <a class="mail-card" href="mailto:udaan@gmail.com">
        <span class="mail-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22"><rect x="2.5" y="5" width="19" height="14" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.4 6.4 12 12.6 20.6 6.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
        </span>
        <span class="mail-text">udaan@gmail.com</span>
      </a>
      <p class="body-copy">${dict.contactNote}</p>
      <a class="text-link" href="mailto:udaan@gmail.com">${dict.emailCta}</a>
    </section>
  `;
}

function aidHtml(dict, state) {
  const groupTitles = {
    breathing: dict.aidBreathing,
    bleeding: dict.aidBleeding,
    burns: dict.aidBurns,
    other: dict.aidOther
  };
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.aidTitle}</h1>
      <p class="card-sub">${dict.aidSub}</p>
      ${AID_GROUPS.map(g => {
        const items = AID_CASES.filter(c => c.group === g);
        if (!items.length) return "";
        return `
          <div class="aid-group">
            <h2 class="group-title">${escapeHtml(groupTitles[g])}</h2>
            ${items.map(c => aidCase(dict, state, c)).join("")}
          </div>
        `;
      }).join("")}
      <p class="hint-line">${dict.aidNote}</p>
      <a class="text-link" href="#/emergency">${dict.emergencyTab}</a>
    </section>
  `;
}

function aidCase(dict, state, c) {
  const title = state.locale === "hi" ? c.titleHi : c.titleEn;
  const steps = state.locale === "hi" ? c.stepsHi : c.stepsEn;
  const dont = state.locale === "hi" ? c.dontHi : c.dontEn;
  return `
    <details class="aid-card">
      <summary class="aid-summary">
        <span class="aid-title">${escapeHtml(title)}</span>
        ${c.callNow ? `<span class="aid-flag">${dict.callNow}</span>` : ""}
      </summary>
      <div class="aid-body">
        <ol class="aid-steps">
          ${steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
        </ol>
        ${dont ? `<p class="aid-dont"><strong>${dict.dontLabel}</strong> ${escapeHtml(dont)}</p>` : ""}
      </div>
    </details>
  `;
}

function sketchSvg(sketch, paint, interactive) {
  const start = sketch.body.replace(/data-region="([^"]+)"/g, (m, id) => `data-region="${id}" fill="${(paint && paint[id]) || PAPER}"`);
  return `<svg class="sketch${interactive ? " is-editor" : ""}" viewBox="${sketch.viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(sketch.titleEn)}">${start}</svg>`;
}

function topicLabel(dict, topic) {
  const map = {
    flight: dict.topicFlight,
    safety: dict.topicSafety,
    health: dict.topicHealth,
    home: dict.topicHome,
    learn: dict.topicLearn
  };
  return map[topic] || "";
}

function sketchHtml(dict, state) {
  const sketch = SKETCHES.find(s => s.id === state.sketchId);
  if (!sketch) {
    return `
      <section class="card flow">
        ${backLink(dict, state)}
        <h1 class="card-title">${dict.sketchTitle}</h1>
        <p class="card-sub">${dict.sketchPickSub}</p>
        <div class="sketch-grid">
          ${SKETCHES.map(s => `
            <button type="button" class="sketch-card" data-sketch="${s.id}">
              <span class="sketch-thumb">${sketchSvg(s, null, false)}</span>
              <span class="sketch-card-title">${escapeHtml(state.locale === "hi" ? s.titleHi : s.titleEn)}</span>
              <span class="sketch-card-topic">${escapeHtml(topicLabel(dict, s.topic))}</span>
            </button>
          `).join("")}
        </div>
        <p class="hint-line">${dict.sketchNote}</p>
      </section>
    `;
  }
  return `
    <section class="card flow">
      <div class="back-link-wrap"><button type="button" class="back-link" id="sketch-back">${dict.sketchBack}</button></div>
      <h1 class="card-title">${escapeHtml(state.locale === "hi" ? sketch.titleHi : sketch.titleEn)}</h1>
      <p class="card-sub">${dict.sketchSub}</p>
      <div class="sketch-stage">${sketchSvg(sketch, state.paint, true)}</div>
      <div class="palette" role="group" aria-label="${dict.colourLabel}">
        ${PALETTE.map(c => `<button type="button" class="swatch" data-color="${c}" style="background:${c}" aria-pressed="${state.color === c}" aria-label="${c}"></button>`).join("")}
      </div>
      <div class="tools">
        <button type="button" class="btn btn-ghost" id="sketch-undo">${dict.undo}</button>
        <button type="button" class="btn btn-ghost" id="sketch-clear">${dict.clear}</button>
      </div>
      <button type="button" class="btn btn-primary btn-full" id="sketch-save">${dict.save}</button>
      <p class="hint-line">${dict.sketchNote}</p>
    </section>
  `;
}

function applyPaint(paint) {
  document.querySelectorAll(".sketch.is-editor .region").forEach(el => {
    const id = el.getAttribute("data-region");
    el.setAttribute("fill", (paint && paint[id]) || PAPER);
  });
}

function saveSketch(dict) {
  try {
    const svg = document.querySelector(".sketch.is-editor");
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "800");
    clone.setAttribute("height", "800");
    clone.querySelectorAll(".region").forEach(el => {
      el.setAttribute("stroke", INK);
      el.setAttribute("stroke-width", "2.2");
      el.setAttribute("stroke-linejoin", "round");
    });
    clone.querySelectorAll(".line").forEach(el => {
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", INK);
      el.setAttribute("stroke-width", "2");
      el.setAttribute("stroke-linecap", "round");
      el.setAttribute("stroke-linejoin", "round");
    });
    const xml = new XMLSerializer().serializeToString(clone);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, 800, 800);
      ctx.drawImage(img, 0, 0, 800, 800);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "udaan-sketch.png";
      a.click();
      flashOk(dict.savedMsg);
    };
    img.onerror = () => flashError(dict.saveFail);
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
  } catch (err) {
    flashError(dict.saveFail);
  }
}

function emergencyHtml(dict, state) {
  const titles = {
    emergency: dict.groupEmergency,
    medical: dict.groupMedical,
    women: dict.groupWomen,
    other: dict.groupOther
  };
  return `
    <section class="card flow">
      ${backLink(dict, state)}
      <h1 class="card-title">${dict.emergencyTitle}</h1>
      <p class="card-sub">${dict.emergencySub}</p>
      <div class="first-steps">
        <h2 class="group-title">${dict.firstTitle}</h2>
        <ol class="step-list">
          ${dict.firstSteps.map((step, i) => `
            <li class="step${i === 0 ? " is-first" : ""}">
              <span class="step-num" aria-hidden="true">${i + 1}</span>
              <span class="step-text">${escapeHtml(step)}</span>
            </li>
          `).join("")}
        </ol>
      </div>
      ${EMERGENCY_GROUPS.map(g => {
        const items = EMERGENCY_INDIA.filter(n => n.group === g);
        if (!items.length) return "";
        return `
          <div class="emergency-group">
            <h2 class="group-title">${escapeHtml(titles[g])}</h2>
            <div class="emergency-list">
              ${items.map(n => emergencyCard(state, n)).join("")}
            </div>
          </div>
        `;
      }).join("")}
      <p class="hint-line">${dict.emergencyNote}</p>
    </section>
  `;
}

function emergencyCard(state, n) {
  const name = state.locale === "hi" ? n.nameHi : n.nameEn;
  const desc = state.locale === "hi" ? n.descHi : n.descEn;
  return `
    <a class="emergency-row${n.highlight ? " is-primary" : ""}" href="tel:${escapeHtml(n.value)}">
      <span class="emergency-num">${escapeHtml(n.value)}</span>
      <span class="emergency-text">
        <span class="emergency-name">${escapeHtml(name)}</span>
        <span class="emergency-desc">${escapeHtml(desc)}</span>
      </span>
      <span class="emergency-call" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="17" height="17"><path d="M6.5 3.5 H9.5 L11 8 L8.8 9.6 C 9.8 12.2 11.8 14.2 14.4 15.2 L16 13 L20.5 14.5 V17.5 C 20.5 19.1 19.1 20.4 17.5 20.2 C 10.3 19.3 4.7 13.7 3.8 6.5 C 3.6 4.9 4.9 3.5 6.5 3.5 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
      </span>
    </a>
  `;
}

function categoriesHtml(dict, state) {
  return `
    <div class="categories" role="list">
      ${CATEGORIES.map(c => {
        const items = RESOURCES.filter(r => r.category === c.id);
        if (!items.length) return "";
        const label = state.locale === "hi" ? c.labelHi : c.labelEn;
        return `
          <div class="category" role="listitem">
            <button type="button" class="category-btn" data-category="${escapeHtml(c.id)}" aria-expanded="false">
              <span class="category-icon" aria-hidden="true">${categoryIcon(c.icon)}</span>
              <span class="category-label">${escapeHtml(label)}</span>
              <span class="category-chevron" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 6 L8 10 L12 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div class="category-list" hidden>
              ${items.map(r => resourceCard(dict, state, r)).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function resourceCard(dict, state, r) {
  const title = state.locale === "hi" ? r.titleHi : r.titleEn;
  const body = state.locale === "hi" ? r.bodyHi : r.bodyEn;
  const note = state.locale === "hi" ? r.noteHi : r.noteEn;
  const typeLabel =
    r.type === "emergency-number" ? dict.typeEmergency : r.type === "helpline" ? dict.typeHelpline : dict.typeGuidance;
  return `
    <article class="resource-card">
      <div class="resource-head">
        <span class="resource-type">${escapeHtml(typeLabel)}</span>
        ${r.value ? `<span class="resource-value">${escapeHtml(r.value)}</span>` : ""}
      </div>
      <h3 class="resource-title">${escapeHtml(title || "")}</h3>
      <p class="resource-body">${escapeHtml(body || "")}</p>
      ${note ? `<p class="resource-note">${escapeHtml(note)}</p>` : ""}
      ${r.region ? `<p class="resource-meta">${dict.regionLabel}: ${escapeHtml(r.region)}</p>` : ""}
    </article>
  `;
}

function categoryIcon(name) {
  const paths = {
    alert: '<path d="M12 4 L21 20 H3 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10 V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1" fill="currentColor"/>',
    shield: '<path d="M12 3 L20 6 V12 C20 16.4 16.6 19.8 12 21 C7.4 19.8 4 16.4 4 12 V6 Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    heart: '<path d="M12 20 C 4 14.5 3 9.5 6 7 C 8.4 5.2 11 6.6 12 8.6 C 13 6.6 15.6 5.2 18 7 C 21 9.5 20 14.5 12 20 Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    home: '<path d="M4 11 L12 4 L20 11 V20 H14 V15 H10 V20 H4 Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    scale: '<path d="M12 3 V19 M6 19 H18 M5 8 H19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M5 8 L2.5 14 H7.5 Z M19 8 L16.5 14 H21.5 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    book: '<path d="M4 5 H10 C 11 5 12 6 12 7 C 12 6 13 5 14 5 H20 V19 H14 C 13 19 12 20 12 20 C 12 20 11 19 10 19 H4 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    people: '<circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 20 C 4 15.6 6.4 14 9 14 C 11.6 14 14 15.6 15 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16 14.4 C 18.6 14.4 20.4 16 21 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    care: '<circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5 20 C 6 15.4 8.6 13.6 12 13.6 C 15.4 13.6 18 15.4 19 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 17 V19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    plane: '<path d="M2 13 L21 6 L14 21 L11.4 14.6 Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M11.4 14.6 L21 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    wheelchair: '<circle cx="11" cy="16" r="5.4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="13" cy="5.4" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 8 V13 H18 L20.5 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  return `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">${paths[name] || paths.heart}</svg>`;
}

function wingSvg(cls) {
  return `
    <svg class="${cls}" viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <path d="M24 98 C 44 58, 88 30, 156 22" stroke-width="3.2"/>
        <path d="M34 100 C 56 68, 96 44, 146 38" stroke-width="2.6" opacity="0.8"/>
        <path d="M50 102 C 70 78, 104 60, 138 56" stroke-width="2.2" opacity="0.62"/>
        <path d="M70 102 C 86 86, 112 74, 132 72" stroke-width="1.8" opacity="0.45"/>
      </g>
    </svg>
  `;
}

function wireScreen(screen, dict, state) {
  const go = (to) => {
    if (to !== state.screen) state.prev = state.screen;
    state.screen = to;
    state.otpCode = "";
    try {
      history.replaceState(null, "", "#/" + to);
    } catch (err) {
      /* ignore */
    }
    render();
  };

  document.querySelectorAll("[data-go]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      go(el.getAttribute("data-go"));
    });
  });

  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const list = btn.nextElementSibling;
      if (!list) return;
      const isHidden = list.hasAttribute("hidden");
      if (isHidden) {
        list.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      } else {
        list.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  if (screen === "otp") {
    document.getElementById("resend-code")?.addEventListener("click", (e) => {
      e.preventDefault();
      state.otpCode = DEMO_CODE;
      flashOk(dict.otpSent);
    });
    document.getElementById("otp-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = (new FormData(e.target).get("code") || "").trim();
      if (code.length !== 6) {
        flashError(dict.errorOtpBad);
        return;
      }
      if (code !== DEMO_CODE) {
        flashError(dict.errorOtpBad);
        return;
      }
      state.otpCode = code;
      go("register");
    });
  }

  if (screen === "register") {
    document.getElementById("register-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const password = String(data.get("password") || "");
      const pin = String(data.get("pin") || "").trim();
      const pinConfirm = String(data.get("pinConfirm") || "").trim();

      if (password.length < 8) {
        flashError(dict.errorPasswordShort);
        return;
      }
      if (/^(.)\1+$/.test(password)) {
        flashError(dict.errorPasswordWeak);
        return;
      }
      if (!/^\d{4,6}$/.test(pin)) {
        flashError(dict.errorPinShort);
        return;
      }
      if (pin !== pinConfirm) {
        flashError(dict.errorPinMismatch);
        return;
      }
      go("me");
    });
  }

  if (screen === "login") {
    document.getElementById("login-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = String(new FormData(e.target).get("phone") || "").trim();
      if (!/^\+?\d{8,15}$/.test(phone.replace(/[\s-]/g, ""))) {
        flashError(dict.errorBadPhone);
        return;
      }
      state.phone = phone;
      go("otp");
    });
  }

  if (screen === "me") {
    document.getElementById("signout-btn")?.addEventListener("click", () => {
      state.phone = "";
      state.otpCode = "";
      state.prev = "landing";
      state.screen = "landing";
      render();
    });
    document.getElementById("pin-signin-btn")?.addEventListener("click", () => go("login"));
    document.getElementById("lang-me-toggle")?.addEventListener("click", () => {
      state.locale = state.locale === "hi" ? "en" : "hi";
      render();
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(el => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.06 });
      reveals.forEach(el => io.observe(el));
    }
    setTimeout(() => reveals.forEach(el => el.classList.add("is-in")), 900);
  }

  if (screen === "landing") {
    const video = document.getElementById("hero-video");
    const toggle = document.getElementById("video-toggle");
    if (video && toggle) {
      const label = toggle.querySelector(".video-toggle-label");
      const sync = () => {
        const playing = !video.paused;
        toggle.setAttribute("aria-pressed", String(playing));
        toggle.classList.toggle("is-paused", !playing);
        if (label) label.textContent = playing ? dict.pauseVideo : dict.playVideo;
      };
      toggle.addEventListener("click", () => {
        if (video.paused) {
          const again = video.play();
          if (again && again.catch) again.catch(() => {});
        } else {
          video.pause();
        }
        sync();
      });
      video.addEventListener("play", sync);
      video.addEventListener("pause", sync);
      video.addEventListener("loadeddata", () => {
        const again = video.play();
        if (again && again.catch) again.catch(() => {});
      });
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && video.paused) {
          const again = video.play();
          if (again && again.catch) again.catch(() => {});
        }
      });
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(() => {});
      sync();
    }
  }

  if (screen === "sketch") {
    document.querySelectorAll("[data-sketch]").forEach(card => {
      card.addEventListener("click", () => {
        state.sketchId = card.getAttribute("data-sketch");
        state.paint = {};
        state.history = [];
        render();
      });
    });

    document.getElementById("sketch-back")?.addEventListener("click", () => {
      state.sketchId = null;
      state.paint = {};
      state.history = [];
      render();
    });

    const stage = document.querySelector(".sketch-stage");
    stage?.addEventListener("click", (e) => {
      const region = e.target.closest(".region");
      if (!region) return;
      const id = region.getAttribute("data-region");
      if (!id) return;
      state.history.push({ ...state.paint });
      if (state.history.length > 40) state.history.shift();
      state.paint[id] = state.color;
      region.setAttribute("fill", state.color);
    });

    document.querySelectorAll(".swatch").forEach(sw => {
      sw.addEventListener("click", () => {
        state.color = sw.getAttribute("data-color");
        document.querySelectorAll(".swatch").forEach(o => {
          o.setAttribute("aria-pressed", String(o === sw));
        });
      });
    });

    document.getElementById("sketch-undo")?.addEventListener("click", () => {
      const prev = state.history.pop();
      state.paint = prev ? { ...prev } : {};
      applyPaint(state.paint);
    });

    document.getElementById("sketch-clear")?.addEventListener("click", () => {
      state.history.push({ ...state.paint });
      state.paint = {};
      applyPaint(state.paint);
    });

    document.getElementById("sketch-save")?.addEventListener("click", () => saveSketch(dict));
  }
}

let flashTimer = null;
function showFlash(msg, cls) {
  const wrap = root.querySelector(".card") || root;
  const flash = document.createElement("div");
  flash.className = `flash ${cls}`;
  flash.setAttribute("role", "status");
  flash.textContent = msg;
  wrap.prepend(flash);
  if (flashTimer) clearTimeout(flashTimer);
  flashTimer = setTimeout(() => flash.remove(), 2400);
}
function flashError(msg) {
  showFlash(msg, "error");
}
function flashOk(msg) {
  showFlash(msg, "ok");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.getElementById("lang-toggle")?.addEventListener("click", () => {
  state.locale = state.locale === "hi" ? "en" : "hi";
  render();
});

const SCREENS = ["landing", "login", "otp", "register", "me", "resources", "emergency", "sketch", "aid", "about", "sdg", "initiatives", "careers", "contact"];

function screenFromHash() {
  const name = String(location.hash || "").replace(/^#\/?/, "");
  return SCREENS.includes(name) ? name : "landing";
}

window.addEventListener("hashchange", () => {
  const next = screenFromHash();
  if (next !== state.screen) {
    state.prev = state.screen;
    state.screen = next;
    render();
  }
});

try {
  const saved = localStorage.getItem("udaan-theme");
  if (saved === "light" || saved === "dark") state.theme = saved;
} catch (err) {
  /* storage unavailable */
}
applyTheme(state.theme);
initChrome();

state.screen = screenFromHash();
if (state.screen === "me" && !state.phone) state.phone = "+91 98765 43210";
render();
