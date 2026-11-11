export const CATEGORIES = [
  { id: "emergency", labelEn: "Emergency & urgent help", labelHi: "तत्काल और आपातकालीन सहायता", icon: "alert" },
  { id: "safety", labelEn: "Safety & harassment", labelHi: "सुरक्षा और परेशानी", icon: "shield" },
  { id: "health", labelEn: "Health & mental well-being", labelHi: "स्वास्थ्य और मानसिक-स्वस्थ्य", icon: "heart" },
  { id: "basic-needs", labelEn: "Food, shelter & essentials", labelHi: "भोजन, आवास और ज़रूरी चीज़ें", icon: "home" },
  { id: "legal", labelEn: "Rights, police & legal help", labelHi: "अधिकार, पुलिस और कानूनी मदद", icon: "scale" },
  { id: "children", labelEn: "Children & students", labelHi: "बच्चे और छात्र", icon: "book" },
  { id: "women", labelEn: "Women & families", labelHi: "महिला और परिवार", icon: "people" },
  { id: "elderly", labelEn: "Older adults & caregivers", labelHi: "बुजुर्ग और देखभालकर्ता", icon: "care" },
  { id: "migrants", labelEn: "Migrants & displaced people", labelHi: "प्रवासी और विस्थापित लोग", icon: "plane" },
  { id: "disability", labelEn: "Disability support", labelHi: "दिव्यांग सहायता", icon: "wheelchair" }
];

// Public, globally useful starting resources. Replace with verified local data later.
// NOTE: this app stays out of emergency routing. If someone is in immediate danger, call local emergency services (e.g. 112).
export const RESOURCES = [
  {
    id: "emergency-112",
    category: "emergency",
    titleEn: "Call 112 for emergencies",
    titleHi: "आपातकालीन स्थिति में 112 पर कॉल करें",
    bodyEn: "112 is the single European emergency number. In many countries it connects police, fire and medical services.",
    bodyHi: "112 यूरोप का एकीकृत आपातकालीन नंबर है। कई देशों में यह पुलिस, फायर और मेडिकल सेवाओं से जोड़ता है।",
    type: "emergency-number",
    value: "112",
    noteEn: "Not a UDAAN service. If you are in immediate danger, call this first.",
    noteHi: "यह UDAAN की सेवा नहीं है। यदि तुम्हें तुरंत खतरा है, तो सबसे पहले इस पर कॉल करें।"
  },
  {
    id: "emergency-local",
    category: "emergency",
    titleEn: "Find your country's emergency numbers",
    titleHi: "अपने देश के आपातकालीन नंबर खोजें",
    bodyEn: "Emergency numbers vary by country. Check your local government or telecom provider for the correct number.",
    bodyHi: "आपातकालीन नंबर देश के हिसाब से अलग होते हैं। सही नंबर के लिए अपने स्थानीय सरकार या टेलिकॉम प्रदाता की जाँच करें।",
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
    region: "IN"
  },
  {
    id: "children-india",
    category: "children",
    titleEn: "Childline (India)",
    titleHi: "चाइल्डलाइन (भारत)",
    bodyEn: "A 24-hour helpline for children in distress in India.",
    bodyHi: "भारत में तकलीफ में होने वाले बच्चों के लिए 24 घंटे की हेल्पलाइन।",
    type: "helpline",
    value: "1098",
    region: "IN"
  },
  {
    id: "mental-general",
    category: "health",
    titleEn: "Talk to someone about how you feel",
    titleHi: "अपनी महसूस के बारे में किसी से बात करें",
    bodyEn: "If you are feeling overwhelmed, a trusted helpline or health worker can help. Many countries run free mental health support lines.",
    bodyHi: " यदि तुम्हें ज़्यादा दबाव या उदासी महसूस हो रही है, तो किसी भरोसेमंद हेल्पलाइन या स्वास्थ्य कर्मी की मदद ले सकते हैं। कई देश मुफ्त मानसिक-स्वास्थ्य सपोर्ट लाइन चलाते हैं।",
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
    bodyHi: "तुम्हें पूछने का अधिकार है कि 왜 तुम्हें रोका जा रहा है, एक भरोसेमंद व्यक्ति को साथ रखने, और जहाँ उपलब्ध हो वहाँ किसी वकील से संपर्क करने का।",
    type: "help-center"
  }
];
