const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});

module.exports.send = (fromEmail, toEmail) => {

    transporter.sendMail({
      from: fromEmail,
      to: toEmail, 
      subject: 'A tomar por culo', 
      text: `Alguien te ha mandado a tomar por culo!`,
      html: `<b>Holita</b>`
    })
        .then(info => console.log(info))
        .catch(error => console.log(error));
}