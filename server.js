// server.js — API Rivda (8082) atrás de https://rivda-sa.pt/api/*
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8081;

// Estamos atrás de proxy (Nginx)
app.set("trust proxy", 1);

// CORS (ajusta se precisares)
app.use(cors({
  origin: ["https://rivda-sa.pt", "https://www.rivda-sa.pt"],
  credentials: true
}));

// Body parsers nativos
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get("/api/health", (_, res) => res.status(200).send("OK"));

// Handler comum (aceita /api/send-email e /send-email)
async function handleSendEmail(req, res) {
  try {
    const formData = req.body;
    const user = "noreply.advir@gmail.com"; // Teu email
    const pass = "ihpgedswadmqtceh"; // Palavra-passe ou App Password
    if (!user || !pass) {
    return res.status(500).send("Configuração de email em falta (GMAIL_USER/GMAIL_PASS).");
  }

  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { 
      user: "noreply.advir@gmail.com", // Teu email
      pass: "ihpgedswadmqtceh" // Palavra-passe ou App Password 
      }
    });

  const mailOptions={
    from: user,
    to: "jlmartins@rivda-sa.pt",
    subject: `Nova Solicitação: ${formData.assunto||"(sem assunto)"}`,
    text:
    `Nome: ${formData.nome || ""}
    Telemóvel: ${formData.telemóvel || formData.telemovel || ""}
    Email: ${formData.email || ""}
    Assunto: ${formData.assunto || ""}
    Descrição: ${formData.descrição || formData.descricao || ""}
    Desejo de Contacto: ${formData.contacto || ""}
    Data de Contacto: ${formData["reunião-data"] || formData["reuniao-data"] || ""}
    Hora de Contacto: ${formData["reunião-hora"] || formData["reuniao-hora"] || ""}
    Contacto Preferido: ${formData["contacto-preferência"] || formData["contacto-preferencia"] || ""}`
  };

  await transporter.sendMail(mailOptions);
    res.send("Solicitação enviada com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    res.status(500).send("Erro ao enviar email.");
  }
}

// Monta as rotas (com e sem /api para compatibilidade)
app.post("/api/send-email", handleSendEmail);
app.post("/send-email", handleSendEmail);

// Não servir frontend aqui (o 4000 já serve via Nginx)
// // Para testes locais apenas:
// // const path = require("path");
// // app.use(express.static(path.join(__dirname, "rivda_html")));
// // app.get("/", (_, res) => res.sendFile(path.join(__dirname, "rivda_html", "index.html")));

app.listen(PORT, "127.0.0.1", () => {
  console.log(`API Rivda a ouvir em 127.0.0.1:${PORT} (proxy: https://rivda-sa.pt/api/*)`);
});

