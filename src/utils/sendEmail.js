// import transporter from "../config/email.js";

// export const sendEmail = async ({ to, subject, html }) => {
//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to,
//     subject,
//     html,
//   };

//   return transporter.sendMail(mailOptions);
// };


import { Resend } from "resend";

const resend = new Resend('re_V9FDLN6Z_CFekYZTdvgc1dDRW5TtpRwwA');

export const sendEmail = async ({ to, subject, html, text }) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Failed to send email");
  }
  return data;
};
