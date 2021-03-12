const nodemailer = require("nodemailer");
const { generateTemplate } = require("./mailtemplate");

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	secure: true,
	// service: "Gmail",
	auth: {
		user: process.env.NM_USER,
		pass: process.env.NM_PASSWORD
	}
});

module.exports.sendActivationEmail = (email, token) => {
	transporter.sendMail({
		from: `"MountainMadness" <${process.env.NM_USER}>`,
		to: email,
		subject: "Thanks for joining us!",
		html: generateTemplate(token)
	})
};


module.exports.contactUsEmail = (email, subject) => {
	transporter.sendMail({
		from: `"MountainMadness" <${process.env.NM_USER}>`,
		to: email,
		subject: "Nos ha llegado su Comentario",
		text: "Recibirá su respuesta proximamente",
		html: `
				<h1>¡Gracias por contactarnos!</h1>
				<p>Hemos recibido su mensaje sobre ${subject}</p>
				<p>Lo contactaremos lo antes posible</p>
			`
	})
};
