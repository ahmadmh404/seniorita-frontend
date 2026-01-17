import emailjs from "emailjs";

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const emailJs = emailjs(serviceID, templateID, userID);
