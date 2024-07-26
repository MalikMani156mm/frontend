import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  port: 465,
  auth: {
    user: "malikmani156.mm@gmail.com",
    pass: "vtvlsxhtywdfvjqz",
  },
});

export const sendMail = async (to,subject,text,html) => {
  const info = await transporter.sendMail({
    from: 'malikmani156.mm@gmail.com>', // sender address
    to,
    subject,
    text,
    html
  });

 
}
