import { customise } from "./inject";

// The festival block. The events render as a centre-line timeline - one
// card per event, alternating sides, exactly the shared `timeline` shape
// the other designs use. A customer who fills in the schedule in the
// editor gets this timeline for free; the sample below is what the design
// shows until they do.
export const timeline = customise("timeline", {
  tag: "FESTIVAL",
  heading: "गणेश उत्सव",
  subtitle:
    "यावर्षी आमच्या घरी १४ सप्टेंबर २०२६ रोजी गणरायाची स्थापना होणार असून बाप्पाचा मुक्काम ५ दिवसांचा असणार आहे.",
  tip: "या मंगल प्रसंगी आपण सर्वांनी सहकुटुंब उपस्थित राहून बाप्पाचे आशीर्वाद घ्यावेत, ही नम्र विनंती.",
  events: [
    {
      id: "sthapana",
      title: "मूर्ती स्थापना",
      label: "स्थापना",
      date: "१४ सप्टेंबर २०२६",
      time: "सकाळी १०:०० वाजता",
    },
    {
      id: "sakali-aarti",
      title: "सकाळची आरती",
      label: "आरती",
      date: "दररोज",
      time: "सकाळी ८:०० वाजता",
    },
    {
      id: "sandhyakal-aarti",
      title: "संध्याकाळची आरती",
      label: "दीपआरती",
      date: "दररोज",
      time: "संध्याकाळी ७:३० वाजता",
    },
    {
      id: "satyanarayan-pooja",
      title: "सत्यनारायण पूजा",
      label: "सत्यनारायण पूजा",
      date: "१७ सप्टेंबर २०२६",
      time: "सकाळी १०:३० वाजता",
    },
    {
      id: "mahaprasad",
      title: "महाप्रसाद",
      label: "महाप्रसाद",
      date: "१७ सप्टेंबर २०२६",
      time: "रात्री ८:३० वाजता",
    },
    {
      id: "sanskritik-karyakram",
      title: "सांस्कृतिक कार्यक्रम",
      label: "कार्यक्रम",
      date: "१८ सप्टेंबर २०२६",
      time: "सायंकाळी ६:०० वाजता",
    },
    {
      id: "visarjan",
      title: "विसर्जन",
      label: "विसर्जन",
      date: "२० सप्टेंबर २०२६",
      time: "सायंकाळी ५:०० वाजता",
    },
  ],
});

// Powers the add-to-calendar button. Stamps are YYYYMMDDTHHMMSS.
export const saveTheDate = customise("saveTheDate", {
  events: [
    {
      summary: "गणपती स्थापना - पाटील निवास",
      start: "20260914T080000",
      end: "20260914T113000",
    },
  ],
});
