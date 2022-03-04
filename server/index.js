const nodemailer = require('nodemailer');
const router = require('express').Router();
const html = `
<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Contato</title>
      </head>
      <body>
        <form id="suggestion-form" method="post" action="/sendmail">
            <label><span>Name</span></label>
            <input id="name" name="name" type="text" placeholder="Name" required/>
            <br>
            <label>E-mail</label>
            <input id="email" name="email" type="email" placeholder="E-mail" required></input>
            <br>
            <label><span>Suggestions</span></label>
            <input id="message" name="message" type="text" placeholder="How can we improve?" required></input>
            <br>
            <button type="submit" value="submit"><span>Submit</span></button>
        </form>
      </body>
</html>`
const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'nomedousuario',
        pass: 'senha-do-endereço-de-email'
    },
    logger: false, // log to console
    debug: false // include SMTP traffic in the logs
});

sendEmail = (req, res) => {
    const mailmsg = {
        from: 'nomedousuario',
        subject: 'Teste',
        text: 'Mensagem de: ' + req.body.name + ', email: [' + req.body.email + '] ' + req.body.message,
        to: 'email@teste.com.br'
    }; // preencher destinatário do email
    transporter.sendMail(mailmsg).then((trans) => {
        res.status(200).send('E-mail enviado ✔️ com sucesso');
    }).catch((error) => {
        res.status(500).send('Houve um erro ao enviar e-mail. Detalhe: ' + error);
    });
}

router.post('/contato', sendEmail);
router.get('/contato', (req, res) => {
    res.status(200).send(html);
});

module.exports = router;