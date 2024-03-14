
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },

});

type emailProps = {
    to: string;
    subject: string;
    text: string;
};

export const sendEmail = async ({to,subject,text} : emailProps) => {
    try {
        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to,
            subject,
            text,
        });
    } catch (error) {
        console.error(error);
    }
};

    