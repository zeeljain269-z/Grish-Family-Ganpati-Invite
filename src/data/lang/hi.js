// Hindi content pack for the Temple Darbar theme.
//
// Only text: everything structural (ids, asset keys, photo keys, calendar
// stamps, map links) stays in the Marathi base and merges through
// mergeLang() in ../inject.js. Lists line up position-by-position with
// the base, so an entry here must keep its place.
//
// Hindi convention on this page uses Latin digits for dates and clock
// times - "14 सितंबर 2026", not "१४". Devanagari numerals read as
// deliberately archaic in Hindi, while in Marathi they read as normal.

export const ui = {
  musicOn: "संगीत चालू करें",
  musicOff: "संगीत बंद करें",
  curtainSeal: "॥ गणेशाय नमः ॥",
  calendarLabel: "कैलेंडर में जोड़ें",
  mapsButton: "मैप खोलें",
  calendarFallback: "गणपति उत्सव",
  heroAlt: "नक्काशीदार संगमरमरी मंडप में सिंहासन पर विराजमान श्री गणेश",
  scrollCue: "नीचे स्क्रॉल करें",
};

export const hero = {
  shlok: "॥ श्री गणेशाय नमः ॥",
  subtitle: "इस वर्ष हमारे घर",
  heading: ["बाप्पा का", "आगमन"],
  date: "14 और 15 सितंबर",
  invitation: {
    familyName: "पाटील परिवार की ओर से",
    tag: "सप्रेम आमंत्रण",
    message: [
      "गणराय के आगमन के इस मंगल क्षण पर आप सभी उपस्थित रहकर उत्सव की शोभा बढ़ाएँ।",
    ],
  },
};

export const family = {
  // मराठी आधार में यही पंक्ति है, पर उसे यहाँ दोहराना ज़रूरी है: समूह फोटो के
  // नीचे यही कैप्शन दिखता है, और आधार बदलने पर हिंदी चुपचाप न बदले।
  caption: "पाटील परिवार",
  heading: "सप्रेम आमंत्रण",
  members: [
    { name: "राजेश पाटील" },
    { name: "मीरा पाटील" },
    { name: "आरव पाटील" },
    { name: "अनया पाटील" },
  ],
};

export const timeline = {
  heading: "गणेश उत्सव",
  subtitle:
    "इस वर्ष हमारे घर 14 सितंबर 2026 को गणराय की स्थापना होगी और बाप्पा का मुकाम 5 दिनों का रहेगा।",
  tip: "इस मंगल अवसर पर आप सभी सपरिवार उपस्थित रहकर बाप्पा का आशीर्वाद प्राप्त करें, यह विनम्र निवेदन है।",
  events: [
    { title: "मूर्ति स्थापना", label: "स्थापना", date: "14 सितंबर 2026", time: "सुबह 10:00 बजे" },
    { title: "प्रातः आरती", label: "आरती", date: "प्रतिदिन", time: "सुबह 8:00 बजे" },
    { title: "संध्या आरती", label: "दीप आरती", date: "प्रतिदिन", time: "शाम 7:30 बजे" },
    { title: "सत्यनारायण पूजा", label: "सत्यनारायण पूजा", date: "17 सितंबर 2026", time: "सुबह 10:30 बजे" },
    { title: "महाप्रसाद", label: "महाप्रसाद", date: "17 सितंबर 2026", time: "रात 8:30 बजे" },
    { title: "सांस्कृतिक कार्यक्रम", label: "कार्यक्रम", date: "18 सितंबर 2026", time: "शाम 6:00 बजे" },
    { title: "विसर्जन", label: "विसर्जन", date: "20 सितंबर 2026", time: "शाम 5:00 बजे" },
  ],
};

export const saveTheDate = {
  events: [{ summary: "गणपति स्थापना - पाटील निवास" }],
};

export const location = {
  heading: "स्थान",
  venue: "पाटील निवास",
  address: "प्लॉट नं. 12, गणेशनगर, शिवाजीनगर, पुणे, महाराष्ट्र",
  footerMessage: ["बाप्पा के दर्शन के लिए अवश्य आइए"],
};

export const footer = {
  family: "- पाटील परिवार",
  quote: {
    firstLine: "आपकी उपस्थिति ही हमारे लिए",
    secondLine: "बाप्पा का आशीर्वाद है।",
  },
};

export const blessings = {
  tag: "ASHIRWAD",
  heading: "बाप्पा का आशीर्वाद",
  subtitle: "स्पर्श करें और बाप्पा का आशीर्वाद प्राप्त करें",
  note: "फिर से स्पर्श करें",
  buttonText: "पुष्प वर्षा करें",
  lines: [
    "सुख, समृद्धि और आरोग्य प्राप्त हो।",
    "विघ्नहर्ता आपकी सभी बाधाएँ दूर करें।",
    "घर में सदैव आनंद और शांति बनी रहे।",
    "मन की सभी इच्छाएँ पूर्ण हों।",
    "बुद्धि, यश और कीर्ति आपको प्राप्त हो।",
  ],
};

export const scratchBlessing = {
  heading: "आपके लिए आशीर्वाद",
  hint: "खुरचकर देखिए",
  quote: ["जहाँ भक्ति, वहाँ बाप्पा.", "आपके घर सुख, समृद्धि", "और आरोग्य का वास हो."],
  signature: "॥ गणपति बाप्पा मोरया ॥",
};

// आठवणींची भिंत. यहाँ केवल पाठ है: फोटो की asset कुंजियाँ मराठी आधार से ही
// आती हैं और क्रम से मर्ज होती हैं, इसलिए ग्राहक की अपनी तस्वीरें - जो पूरी
// सूची बदल देती हैं - इस पैक से अछूती रहती हैं।
export const gallery = {
  tag: "यादें",
  heading: "पिछले वर्षों के गणपति",
  subtitle: "हमारे घर हर साल विराजमान बाप्पा",
  photos: [
    { caption: "2022" },
    { caption: "2023" },
    { caption: "2024" },
    { caption: "2025" },
  ],
};
