const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "rivda_html")));
const cors = require("cors");
app.use(cors());

// Rota para tratar envio do formulário
app.post("/send-email", (req, res) => {
  const formData = req.body;
  console.log(formData);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Ex.: smtp.gmail.com
    port: 587,
    secure: false,
    auth: {
      user: "noreply.advir@gmail.com", // Teu email
      pass: "ihpgedswadmqtceh" // Palavra-passe ou App Password
    }
  });

  const mailOptions = {
    from: "noreply.advir@gmail.com",
    to: "rivda@rivda-sa.pt", // Email que vai receber
    //  to: "rivda@rivda-sa.pt",
    subject: `Nova Solicitação: ${formData.assunto}`,
    text: `
      Nome: ${formData.nome}
      Telemóvel: ${formData.telemóvel}
      Email: ${formData.email}
      Tipo de Solicitação: ${Object.keys(formData)
  .filter(k => ['vender-imóvel', 'parceiro-projeto', 'comprar-imóvel', 'outro'].includes(k))
  .map(k => k === 'outro' ? `Outro (${formData['outro-texto'] || ''})` : k)
  .join(', ')}
      Assunto: ${formData.assunto}
      Descrição: ${formData.descrição}
      Desejo de Contacto: ${formData.contacto}
      Data de Contacto: ${formData['reunião-data']}
      Hora de Contacto: ${formData['reunião-hora']}
      Contacto Preferido: ${formData['contacto-preferência']}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar email:", error);
      return res.status(500).send("Erro ao enviar email.");
    }
    res.send("Solicitação enviada com sucesso!");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});