import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "malikmani156.mm@gmail.com",
    pass: "nqfrazjnnonjucnr",
  },
});

export const sendMail = async (to,subject,text,html) => {
    const info = await transporter.sendMail({
      from: 'malikmani156.mm@gmail.com', 
      to,
      subject,
      text,
      html
    });
 
}
