import { customise } from "./inject";

// The closing blessing and the family signature.
export const footer = customise("footer", {
  family: "- पाटील परिवार",
  quote: {
    firstLine: "आपली उपस्थिती हेच आमच्यासाठी",
    secondLine: "बाप्पाचे आशीर्वाद आहेत.",
  },
});
