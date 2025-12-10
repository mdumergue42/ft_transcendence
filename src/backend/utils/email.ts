import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: parseInt(process.env.SMTP_PORT!),
	secure: true,
	auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});


transporter.verify((error, success) => {
	if (error) {
		console.error("SMTP error: ", error);
	} else {
		console.log("SMTP ok");
	}
})

export async function sendMail(to: string, subject: string, html: string) {
	await transporter.sendMail({
		from:`"ft_transcendence" <${process.env.SMTP_USER}>`, to, subject, html
	});
}

export async function sendVerifEmail(user: { id_user: number; username: string; email: string }, token:string) {
	const verifLink = `${process.env.BACKEND_URL}/api/auth/verify-email?id_user=${user.id_user}&token=${token}`;

	const html = `
	<p>Hello ${user.username},</p>
	<p>Click on button for check your email :</p>
	<a href="${verifLink}"
		style=="display:inline-block;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
		Check my email
	</a>
	<p>This link will expire in 24 hours.</p>`;

	await transporter.sendMail({
		from: `"ft_transcendence" <${process.env.SMTP_USER}>`,
		to: user.email,
		subject: 'Check your email',
		html
	});
}

export async function send2faCodeEmail(user: { id_user: number; username: string; email: string }, code: string) {
	const html = `
	<h2>Secure connection</h2>
	<p>Hello <b>${user.username}</b>,</p>
	<div style="font-size: 28px; font-weight: bold; padding: 10px; background: #f0f0f0; width: max-content; border-radius: 8px;">
	${code}
	</div>
	<p>This code expire in <b>5 minutes</b></p>`;

	await transporter.sendMail({
		from: `"ft_transcendence" <${process.env.SMTP_USER}>`,
		to: user.email,
		subject: 'Check your email',
		html
	});
}