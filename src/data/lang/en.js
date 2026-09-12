// English content pack for the Temple Darbar theme.
//
// Romanised rather than translated where the festival has its own words:
// Aagman, Muhurat, Aarti, Sthapana, Visarjan, Prasad, Darshan, Parivar and
// Nivas stay as they are, because that is what the families sending these
// invites call them - in Pune and in New Jersey. Only ordinary sentences
// and interface labels (Date / Time / Venue) become English. Wording is
// kept identical to the fort theme's pack wherever the two share a string.
//
// Structure, ids and asset keys stay in the Marathi base; see ../inject.js.

export const ui = {
  musicOn: "Play music",
  musicOff: "Mute music",
  curtainSeal: "Ganesha Namah",
  calendarLabel: "Add to calendar",
  mapsButton: "Open Maps",
  calendarFallback: "Ganpati Utsav",
  heroAlt: "Shri Ganesha on a marble throne under a carved temple archway",
  scrollCue: "Scroll down",
};

export const hero = {
  shlok: "|| Shri Ganeshaya Namah ||",
  subtitle: "This year, at our home",
  heading: ["Bappache", "Aagman"],
  date: "14th and 15th of september",
  invitation: {
    familyName: "From the Patil Parivar",
    tag: "warmly invites you",
    message: [
      "Please join us for this auspicious moment of Bappa's aagman and make our utsav complete.",
    ],
  },
};

export const family = {
  heading: "A Warm Invitation",
  // This design shows one group photo (mode: "group"), so the caption under
  // it is the line that actually renders - `members` below only applies if a
  // customer switches to the per-person carousel.
  caption: "Patil Parivar",
  members: [
    { name: "Rajesh Patil" },
    { name: "Meera Patil" },
    { name: "Aarav Patil" },
    { name: "Anaya Patil" },
  ],
};

export const timeline = {
  heading: "Ganesh Utsav",
  subtitle:
    "Bappa's sthapana at our home is on 14 September 2026, and Bappa stays with us for five days.",
  tip: "We humbly request you to join us with your family on this auspicious occasion and receive Bappa's blessings.",
  events: [
    { title: "Murti Sthapana", label: "Sthapana", date: "14 September 2026", time: "10:00 am" },
    { title: "Morning Aarti", label: "Aarti", date: "Every day", time: "8:00 am" },
    { title: "Evening Aarti", label: "Deep Aarti", date: "Every day", time: "7:30 pm" },
    { title: "Satyanarayan Puja", label: "Satyanarayan Puja", date: "17 September 2026", time: "10:30 am" },
    { title: "Mahaprasad", label: "Mahaprasad", date: "17 September 2026", time: "8:30 pm" },
    { title: "Cultural Programme", label: "Programme", date: "18 September 2026", time: "6:00 pm" },
    { title: "Visarjan", label: "Visarjan", date: "20 September 2026", time: "5:00 pm" },
  ],
};

export const saveTheDate = {
  events: [{ summary: "Ganpati Sthapana - Patil Nivas" }],
};

export const location = {
  heading: "Venue",
  venue: "Patil Nivas",
  address: "Plot No. 12, Ganeshnagar, Shivajinagar, Pune, Maharashtra",
  footerMessage: ["Do come for Bappa's darshan"],
};

export const footer = {
  family: "- Patil Parivar",
  quote: {
    firstLine: "Your presence itself is",
    secondLine: "Bappa's blessing upon us.",
  },
};

export const blessings = {
  tag: "BLESSINGS",
  heading: "Bappa's Blessings",
  subtitle: "Touch to receive Bappa's blessing",
  note: "Touch again",
  buttonText: "Shower flowers",
  lines: [
    "May happiness, health and prosperity be yours.",
    "May Vighnaharta clear every obstacle in your path.",
    "May joy and peace always fill your home.",
    "May every wish in your heart be fulfilled.",
    "May wisdom, success and honour follow you.",
  ],
};

export const scratchBlessing = {
  heading: "A Blessing For You",
  hint: "Scratch to reveal",
  quote: ["Where there is devotion, there is Bappa.", "May your home know happiness,", "prosperity and good health."],
  signature: "|| Ganpati Bappa Morya ||",
};

// The memories wall. Text only: the photographs' asset keys stay in the
// Marathi base and merge position-by-position, so a customer's own uploads -
// which replace the list wholesale - are untouched by this pack.
export const gallery = {
  tag: "Memories",
  heading: "Ganpati in Years Gone By",
  subtitle: "Bappa at our home, year after year",
  photos: [
    { caption: "2022" },
    { caption: "2023" },
    { caption: "2024" },
    { caption: "2025" },
  ],
};
