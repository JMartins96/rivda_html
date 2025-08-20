function updateLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n; 
    el.innerHTML = translations[lang][key];
  });

    // Placeholder translations
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });
}

// Custom Language menu

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "linguas-dropdown": */
x = document.getElementsByClassName("linguas-dropdown");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "linguas-dropdown-custom");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            // Update html lang attribute
            const selectedLang = this.innerHTML.trim().toLowerCase();
            document.documentElement.setAttribute("lang", selectedLang);
            updateLanguage(selectedLang);
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("linguas-dropdown-custom");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 

//  ---------------------------
// Accordeon style Atividades

var coll = document.getElementsByClassName("atividade-título");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // Toggle active class
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    var darkMode = document.getElementsByClassName("dark-mode");
    if (darkMode.length == 0){
      var arrow = this.querySelector(".arrow-whiteMode");
    }
    else{
      var arrow = this.querySelector(".arrow-darkMode");
    }
    // Close all other boxes and reset arrows
    for (let j = 0; j < coll.length; j++) {
      if (coll[j] !== this) {
        coll[j].classList.remove("active");
        coll[j].nextElementSibling.style.maxHeight = null; // Close other boxes
        if (darkMode.length == 0 ){
          coll[j].querySelector(".arrow-whiteMode").src = "img/Down Arrow.svg"; // Reset others' arrows
        }
        else{
          coll[j].querySelector(".arrow-darkMode").src = "img/Down Arrow_white.svg";
        }
      }
    }

  // Open or close the current content
      if (content.style.maxHeight) {
        content.style.maxHeight = null; // Close if currently open
        if (darkMode.length == 0 ){
          arrow.src = "img/Down Arrow.svg"; // Change to down if closed
        }
        else{
          arrow.src = "img/Down Arrow_white.svg"; // Change to down if closed
        }
      } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Open and set height
        if (darkMode.length == 0 ){
          arrow.src = "img/Up Arrow.svg"; // Change to up if open
        }
        else{
          arrow.src = "img/Up Arrow_white.svg"; // Change to up if open
        }
      }
  });
}


document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("contacto");
    const reuniaoDiv = document.querySelector(".reuniao");

    function toggleReuniao() {
      if (checkbox.checked) {
        reuniaoDiv.classList.add("visible");
      } else {
        reuniaoDiv.classList.remove("visible");
      }
    }

    // Run on page load
    toggleReuniao();

    // Listen for changes
    checkbox.addEventListener("change", toggleReuniao);
  });


document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('.form-solicit input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        checkboxes.forEach(function (otherCheckbox) {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
});


// Make mobile navigation

const body = document.querySelector("body");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".main-menu")

btnNavEl.addEventListener('click', function(){
  headerEl.classList.toggle('nav-open');
  body.classList.toggle("nav-open");
})

// Remove nav-open class when a nav link is clicked
document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    headerEl.classList.remove("nav-open");
    body.classList.remove("nav-open");
  });
});

const btnPrivacidade = document.getElementById("openPrivacidade");
const btnClosePrivacidade = document.querySelector("[name='priv-close-outline']")
btnPrivacidade.addEventListener('click', function(){
  headerEl.classList.toggle('open-privacidade');
  body.classList.toggle("open-privacidade");
})
btnClosePrivacidade.addEventListener('click', function(){
  headerEl.classList.toggle('open-privacidade');
  body.classList.toggle("open-privacidade");
})


// Toggle dark mode

const btnNavTheme = document.querySelector(".theme__toggle");

btnNavTheme.addEventListener('click', function(){
  body.classList.toggle('dark-mode');
})


// Form submission confirmation

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Stop default submit/reload

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("✅ Solicitação enviada com sucesso! Em breve será contactado pela equipa da RIVDA. ");
        form.reset(); // optional: clear form
      } else {
        alert("❌ Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("❌ Falha na ligação ao servidor.");
    }
  });
});




const translations = {
  pt: {
    // Navbar
    missao: "Missão",
    atividade: "Áreas de Atividade",
    contacte: "Contacte-nos",

    // Hero section
    mainHeading: "Soluções Inovadoras <br /> para o seu Negócio",
    mainButton: "Contacte-nos",

    // Missão
    missaoTitulo: "Missão",
    missaoSub1: "→ RIVDA - Investimento Imobiliário com Visão, Rigor e Parceria",
    missaoTexto1: "A RIVDA SA é uma empresa portuguesa focada na identificação, desenvolvimento e valorização de ativos imobiliários, atuando em todas as fases do ciclo — da aquisição à comercialização. Com uma abordagem estratégica e analítica, aposta em parcerias e projetos sustentáveis para maximizar valor e impulsionar a inovação no setor.",
    missaoSub2: "→ Equipa Experiente",
    missaoTexto2: "A equipa da RIVDA possui uma sólida experiência no mercado imobiliário, adquirida ao longo de anos de atuação em projetos de diferentes escalas e complexidades. ",
    missaoLema: "“Estratégia, visão e execução. A base de cada oportunidade que ajudamos a transformar”",

    // Atividades
    atividadeTitulo: "Áreas de atividade",
    atividade1: "Análise Estratégica de Ativos e Oportunidades",
    atividade1Texto1: "Identificamos e avaliamos o potencial de projetos e negócios com base em critérios financeiros, urbanísticos, legais e operacionais. Apoiamos investidores, promotores e proprietários na tomada de decisão informada, com foco na valorização sustentável e no retorno a médio e longo prazo.",
    atividade1Texto2: "A nossa intervenção pode compreender:",
    atividade1Lista1: "Estudos de viabilidade e cenários de uso;",
    atividade1Lista2: "Avaliação de riscos e due diligence técnica;",
    atividade1Lista3: "Diagnóstico de ativos subutilizados ou com potencial de reconversão;" , 
    atividade1Lista4: "Estruturação de oportunidades para investidores.",
    atividade2: "Estratégias de Desenvolvimento e Reposicionamento",
    atividade2Texto1: "Concebemos soluções para transformar imóveis ou negócios com base nas tendências do mercado, planeamento urbano e vocação do ativo. Atuamos desde a definição do conceito até à preparação para implementação ou comercialização.",
    atividade2Texto2: "Nas nossas soluções atendemos:",
    atividade2Lista1: "Modelos de ocupação e definição de usos;",
    atividade2Lista2: "Reestruturação de portefólios e reposicionamento de imóveis;",
    atividade2Lista3: "Planos de valorização e regeneração urbana;",
    atividade2Lista4: "Otimização de ativos operacionais (ex. infraestruturas, hotelaria, logística, comercial).",
    atividade3: "Alinhamento de Negócios e Parcerias Estratégicas",
    atividade3Texto1: "Apoiamos entidades privadas e investidores na estruturação de operações, alianças ou aquisições, articulando interesses e recursos de forma equilibrada. Atuamos como ponte entre oportunidades concretas e capital interessado, com foco em segurança, valor e execução.",
    atividade3Texto2: "Na nossa contribuição pode englobar:",
    atividade3Lista1: "Apoio na negociação e estruturação de parcerias;",
    atividade3Lista2: "Alinhamento entre promotores, proprietários e investidores;",
    atividade3Lista3: "Desenvolvimento de pipelines de investimento;",
    atividade3Lista4: "Preparação de ativos para venda ou captação de capital.",

    // Formulário
    formTitulo: "Faça Uma Solicitação",
    formSolicit: "Tipo de Solicitação:",
    formSolicitOpt1: "Quero vender um imóvel",
    formSolicitOpt2: "Procuro um parceiro para um projeto",
    formSolicitOpt3: "Quero comprar um imóvel",
    formSolicitOpt4: "Outro",
    formSolicitOpt4Box: "Introduza texto",
    formAssunto: "Assunto:" , 
    formAssuntoBox: "Insira aqui o seu texto" ,
    formDescrpt: "Descrição:",
    formDescrptBox: "Insira aqui o seu texto",
    formContactoCheck: "Marcação de Contacto (opcional)",
    formContactoData: "Sugestão de Data para reunião/visita",
    formContactoHora: "Hora",
    formNome: "Nome:",
    formNomeBox: "Nome",
    formTel: "Telemóvel:",
    formTelBox: "Telemóvel",
    formEmail: "E-mail:",
    formEmailBox: "E-mail",
    formContactoPref: "Deseja ser contactado por:",
    formContactoPref1: "E-mail",
    formContactoPref2: "Telemóvel",
    formContactoPref3: "WhatsApp",
    formRGPD: "Autorizo a recolha e o tratamento dos meus dados pessoais para os fins indicados, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).",
    formSubmit: "Submeter Pedido",

    // Footer
    rodapeContactos: "Contactos",
    rodapeContactosMorada: "Morada:",
    rodapeContactosMorada1: "Rua Bernardo Sequeira 213",
    rodapeContactosMorada2: "4715-671 Braga, Portugal",
    rodapeContactosTel: "Telefone:",
    rodapeContactosTel1: "+351253897123",
    rodapeContactosTel2: "Chamada para a rede fixa nacional",
    rodapeContactosEmail: "Email:",
    rodapeContactosEmail1: "rivda@rivda-sa.pt",
    rodapeDisclaimer: "Disclaimer",
    rodapeDisclaimerText: "A RIVDA SA não é uma instituição financeira, sociedade gestora,intermediário financeiro, nem entidade autorizada ou supervisionada pela Comissão do Mercado de Valores Mobiliários (CMVM). As informações e conteúdos disponibilizados neste website têm natureza exclusivamente informativa e estratégica, e não constituem nem devem ser interpretados como uma solicitação, recomendação personalizada, proposta de investimento, ou qualquer forma de captação pública de capital. A RIVDA SA presta serviços de análise, estruturação e apoio técnico em projetos imobiliários e empresariais, dirigidos exclusivamente a entidades e investidores profissionais, em contexto privado e mediante avaliação prévia. Antes de tomar qualquer decisão de investimento, os utilizadores devem obter aconselhamento jurídico, fiscal ou financeiro junto de entidades devidamente habilitadas.",
    rodapePrivacidade: "Política de Privacidade",
    rodapeDireitos: "© RIVDA 2025",

    // Política de Privacidade
    privacidadeTitulo: "Política de Privacidade",
    privacidadeText1: "A RIVDA compromete-se a proteger a privacidade e segurança dos dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação nacional aplicável.",
    privacidadeSub1: "(1) Dados Recolhidos e Finalidade",
    privacidadeSub1Text1: "Identificação e Contactos: Nome, email, telefone, cargo e empresa.",
    privacidadeSub1Text2: "Dados de Navegação: Cookies, endereço IP, dispositivo e preferências.",
    privacidadeSub1Text3: "Os dados são utilizados para:",
    privacidadeSub1List1: "Prestação de serviços e suporte;",
    privacidadeSub1List2: "Comunicação e envio de informações;",
    privacidadeSub1List3: "Cumprimento de obrigações legais;",
    privacidadeSub1List4: "Melhoramento da experiência no website.",
    privacidadeSub2: "(2) Partilha de Dados",
    privacidadeSub2Text1: "Não vendemos nem comercializamos dados pessoais. Poderemos partilhar com:",
    privacidadeSub2List1: "Subcontratantes que garantam conformidade com o RGPD;",
    privacidadeSub2List2: "Autoridades legais, quando exigido.",
    privacidadeSub3: "(3) Segurança e Retenção de Dados",
    privacidadeSub3Text1: "Implementamos medidas técnicas e organizacionais para proteger os dados contra acessos indevidos, incluindo encriptação, firewalls e controlo de acessos. Os dados são mantidos apenas pelo período necessário ao cumprimento das finalidades legais e contratuais.",
    privacidadeSub4: "(4) Direitos dos Titulares",
    privacidadeSub4Text1: "Nos termos do RGPD, pode:",
    privacidadeSub4List1: "Aceder, retificar ou apagar os seus dados;",
    privacidadeSub4List2: "Opor-se ao tratamento ou solicitar limitação;",
    privacidadeSub4List3: "Solicitar a portabilidade dos dados.",
    privacidadeSub4Text2: ">Para exercer os seus direitos, contacte-nos: rivda@rivda-sa.pt.",
    privacidadeSub5: "(5) Cookies",
    privacidadeSub5Text1: "Utilizamos cookies para melhorar a experiência no website. Pode configurar as suas preferências no navegador.",
    privacidadeSub6: "(6) Alterações e Contacto",
    privacidadeSub6Text1: "Esta política pode ser atualizada. Para mais informações, contacte-nos:",
    privacidadeSub6List1: "Email: rivda@rivda-sa.pt",
    privacidadeSub6List2: "Morada: Rua Bernardo Sequeira, nº 231, Sala 3 4715-010 Braga, Portugal",
    privacidadeSub6List3: "Telefone: +351 253 176 493",
    privacidadeSign: "Agosto de 2025 | A Administração"
  },

  en: {
    // Navbar
    missao: "Mission",
    atividade: "Business Areas",
    contacte: "Contact Us",

    // Hero section
    mainHeading: "Innovative Solutions <br /> for Your Business",
    mainButton: "Contact Us",

    // Mission
    missaoTitulo: "Mission",
    missaoSub1: "→ RIVDA - Real Estate Investment with Vision, Rigor and Partnership",
    missaoTexto1: "RIVDA SA is a Portuguese company focused on identifying, developing, and enhancing real estate assets, operating in all stages of the cycle—from acquisition to commercialization. With a strategic and analytical approach, it invests in partnerships and sustainable projects to maximize value and drive innovation in the sector.",
    missaoSub2: "→ Experienced Team",
    missaoTexto2: "The RIVDA team has solid experience in the real estate market, gained over years of working on projects of different scales and complexities.",
    missaoLema: "“Strategy, vision, and execution. The foundation of every opportunity we help transform”",

    // Activities
    atividadeTitulo: "Business Areas",
    atividade1: "Strategic Analysis of Assets and Opportunities",
    atividade1Texto1: "We identify and assess the potential of projects and businesses based on financial, urban, legal, and operational criteria. We support investors, developers, and owners in making informed decisions, focusing on sustainable value creation and medium- to long-term returns.",
    atividade1Texto2: "Our intervention may include:",
    atividade1Lista1: "Feasibility studies and usage scenarios;",
    atividade1Lista2: "Risk assessment and technical due diligence;",
    atividade1Lista3: "Diagnosis of underutilized assets or those with conversion potential;",
    atividade1Lista4: "Structuring opportunities for investors.",
    atividade2: "Development and Repositioning Strategies",
    atividade2Texto1: "We design solutions to transform properties or businesses based on market trends, urban planning, and asset vocation. We act from concept definition to preparation for implementation or commercialization.",
    atividade2Texto2: "Our solutions include:",
    atividade2Lista1: "Occupancy models and definition of uses;",
    atividade2Lista2: "Portfolio restructuring and asset repositioning;",
    atividade2Lista3: "Urban value enhancement and regeneration plans;",
    atividade2Lista4: "Optimization of operational assets (e.g., infrastructure, hospitality, logistics, retail).",
    atividade3: "Business Alignment and Strategic Partnerships",
    atividade3Texto1: "We support private entities and investors in structuring operations, alliances, or acquisitions, balancing interests and resources. We act as a bridge between concrete opportunities and interested capital, focusing on security, value, and execution.",
    atividade3Texto2: "Our contribution may include:",
    atividade3Lista1: "Support in negotiation and partnership structuring;",
    atividade3Lista2: "Alignment between developers, owners, and investors;",
    atividade3Lista3: "Development of investment pipelines;",
    atividade3Lista4: "Preparation of assets for sale or capital raising.",

    // Form
    formTitulo: "Submit a Request",
    formSolicit: "Type of Request:",
    formSolicitOpt1: "I want to sell a property",
    formSolicitOpt2: "Looking for a partner for a project",
    formSolicitOpt3: "I want to buy a property",
    formSolicitOpt4: "Other",
    formSolicitOpt4Box: "Enter Text",
    formAssunto: "Subject:",
    formAssuntoBox: "Enter your text here",
    formDescrpt: "Description:",
    formDescrptBox: "Enter your text here",
    formContactoCheck: "Contact Appointment (optional)",
    formContactoData: "Suggested Date for meeting/visit",
    formContactoHora: "Time",
    formNome: "Name:",
    formNomeBox: "Name",
    formTel: "Phone:",
    formTelBox: "Phone",
    formEmail: "Email:",
    formEmailBox: "Email",
    formContactoPref: "Preferred contact method:",
    formContactoPref1: "Email",
    formContactoPref2: "Phone",
    formContactoPref3: "WhatsApp",
    formRGPD: "I authorize the collection and processing of my personal data for the indicated purposes, in accordance with the General Data Protection Regulation (GDPR).",
    formSubmit: "Submit Request",

    // Footer
    rodapeContactos: "Contacts",
    rodapeContactosMorada: "Address:",
    rodapeContactosMorada1: "Rua Bernardo Sequeira 213",
    rodapeContactosMorada2: "4715-671 Braga, Portugal",
    rodapeContactosTel: "Phone:",
    rodapeContactosTel1: "+351253897123",
    rodapeContactosTel2: "Call to Portuguese landline network",
    rodapeContactosEmail: "Email:",
    rodapeContactosEmail1: "rivda@rivda-sa.pt",
    rodapeDisclaimer: "Disclaimer",
    rodapeDisclaimerText: "RIVDA SA is not a financial institution, management company, financial intermediary, nor an entity authorized or supervised by the Portuguese Securities Market Commission (CMVM). The information and content provided on this website are exclusively informative and strategic in nature, and do not constitute nor should be interpreted as a solicitation, personalized recommendation, investment proposal, or any form of public fundraising. RIVDA SA provides analysis, structuring, and technical support services in real estate and business projects, directed exclusively at entities and professional investors, in a private context and subject to prior evaluation. Before making any investment decision, users should seek legal, tax, or financial advice from properly qualified entities.",
    rodapePrivacidade: "Privacy Policy",
    rodapeDireitos: "© RIVDA 2025",

    // Privacy Policy
    privacidadeTitulo: "Privacy Policy",
    privacidadeText1: "RIVDA is committed to protecting the privacy and security of personal data, in compliance with the General Data Protection Regulation (GDPR) and applicable national legislation.",
    privacidadeSub1: "(1) Data Collected and Purpose",
    privacidadeSub1Text1: "Identification and Contacts: Name, email, phone, position, and company.",
    privacidadeSub1Text2: "Browsing Data: Cookies, IP address, device, and preferences.",
    privacidadeSub1Text3: "The data is used for:",
    privacidadeSub1List1: "Provision of services and support;",
    privacidadeSub1List2: "Communication and sending information;",
    privacidadeSub1List3: "Compliance with legal obligations;",
    privacidadeSub1List4: "Improving the website experience.",
    privacidadeSub2: "(2) Data Sharing",
    privacidadeSub2Text1: "We do not sell or trade personal data. We may share with:",
    privacidadeSub2List1: "Subcontractors that ensure GDPR compliance;",
    privacidadeSub2List2: "Legal authorities, when required.",
    privacidadeSub3: "(3) Data Security and Retention",
    privacidadeSub3Text1: "We implement technical and organizational measures to protect data against unauthorized access, including encryption, firewalls, and access control. Data is kept only for the period necessary to comply with legal and contractual purposes.",
    privacidadeSub4: "(4) Data Subject Rights",
    privacidadeSub4Text1: "Under the GDPR, you may:",
    privacidadeSub4List1: "Access, rectify, or delete your data;",
    privacidadeSub4List2: "Object to processing or request limitation;",
    privacidadeSub4List3: "Request data portability.",
    privacidadeSub4Text2: "To exercise your rights, contact us: rivda@rivda-sa.pt.",
    privacidadeSub5: "(5) Cookies",
    privacidadeSub5Text1: "We use cookies to improve your website experience. You can configure your preferences in the browser.",
    privacidadeSub6: "(6) Changes and Contact",
    privacidadeSub6Text1: "This policy may be updated. For more information, contact us:",
    privacidadeSub6List1: "Email: rivda@rivda-sa.pt",
    privacidadeSub6List2: "Address: Rua Bernardo Sequeira, nº 231, Sala 3 4715-010 Braga, Portugal",
    privacidadeSub6List3: "Phone: +351 253 176 493",
    privacidadeSign: "August 2025 | The Management",
  },

  es: {
    // Navbar
    missao: "Misión",
    atividade: "Áreas de Actividad",
    contacte: "Contáctenos",

    // Hero section
    mainHeading: "Soluciones Innovadoras <br /> para su Negocio",
    mainButton: "Contáctenos",

    // Misión
    missaoTitulo: "Misión",
    missaoSub1: "→ RIVDA - Inversión Inmobiliaria con Visión, Rigor y Asociación",
    missaoTexto1: "RIVDA SA es una empresa portuguesa enfocada en la identificación, desarrollo y valorización de activos inmobiliarios, actuando en todas las fases del ciclo —desde la adquisición hasta la comercialización. Con un enfoque estratégico y analítico, apuesta por asociaciones y proyectos sostenibles para maximizar el valor e impulsar la innovación en el sector.",
    missaoSub2: "→ Equipo Experimentado",
    missaoTexto2: "El equipo de RIVDA tiene una sólida experiencia en el mercado inmobiliario, adquirida a lo largo de años de trabajo en proyectos de diferentes escalas y complejidades.",
    missaoLema: "“Estrategia, visión y ejecución. La base de cada oportunidad que ayudamos a transformar”",

    // Áreas de Actividad
    atividadeTitulo: "Áreas de Actividad",
    atividade1: "Análisis Estratégico de Activos y Oportunidades",
    atividade1Texto1: "Identificamos y evaluamos el potencial de proyectos y negocios en base a criterios financieros, urbanísticos, legales y operativos. Apoyamos a inversores, promotores y propietarios en la toma de decisiones informadas, con enfoque en la valorización sostenible y el retorno a medio y largo plazo.",
    atividade1Texto2: "Nuestra intervención puede incluir:",
    atividade1Lista1: "Estudios de viabilidad y escenarios de uso;",
    atividade1Lista2: "Evaluación de riesgos y due diligence técnica;",
    atividade1Lista3: "Diagnóstico de activos infrautilizados o con potencial de reconversión;",
    atividade1Lista4: "Estructuración de oportunidades para inversores.",
    atividade2: "Estrategias de Desarrollo y Reposicionamiento",
    atividade2Texto1: "Concebimos soluciones para transformar inmuebles o negocios basándonos en tendencias de mercado, planificación urbana y vocación del activo. Actuamos desde la definición del concepto hasta la preparación para la implementación o comercialización.",
    atividade2Texto2: "Nuestras soluciones incluyen:",
    atividade2Lista1: "Modelos de ocupación y definición de usos;",
    atividade2Lista2: "Reestructuración de carteras y reposicionamiento de inmuebles;",
    atividade2Lista3: "Planes de valorización y regeneración urbana;",
    atividade2Lista4: "Optimización de activos operativos (ej. infraestructuras, hotelería, logística, comercial).",
    atividade3: "Alineación de Negocios y Asociaciones Estratégicas",
    atividade3Texto1: "Apoyamos a entidades privadas e inversores en la estructuración de operaciones, alianzas o adquisiciones, articulando intereses y recursos de forma equilibrada. Actuamos como puente entre oportunidades concretas y capital interesado, con enfoque en seguridad, valor y ejecución.",
    atividade3Texto2: "Nuestra contribución puede incluir:",
    atividade3Lista1: "Apoyo en la negociación y estructuración de asociaciones;",
    atividade3Lista2: "Alineación entre promotores, propietarios e inversores;",
    atividade3Lista3: "Desarrollo de pipelines de inversión;",
    atividade3Lista4: "Preparación de activos para venta o captación de capital.",

    // Formulario
    formTitulo: "Haga una Solicitud",
    formSolicit: "Tipo de Solicitud:",
    formSolicitOpt1: "Quiero vender una propiedad",
    formSolicitOpt2: "Busco un socio para un proyecto",
    formSolicitOpt3: "Quiero comprar una propiedad",
    formSolicitOpt4: "Otro",
    formSolicitOpt4Box: "Introducir texto",
    formAssunto: "Asunto:",
    formAssuntoBox: "Ingrese su texto aquí",
    formDescrpt: "Descripción:",
    formDescrptBox: "Ingrese su texto aquí",
    formContactoCheck: "Solicitud de Contacto (opcional)",
    formContactoData: "Sugerencia de Fecha para reunión/visita",
    formContactoHora: "Hora",
    formNome: "Nombre:",
    formNomeBox: "Nombre",
    formTel: "Teléfono:",
    formTelBox: "Teléfono",
    formEmail: "Correo electrónico:",
    formEmailBox: "Correo electrónico",
    formContactoPref: "¿Cómo prefiere ser contactado?",
    formContactoPref1: "Correo electrónico",
    formContactoPref2: "Teléfono",
    formContactoPref3: "WhatsApp",
    formRGPD: "Autorizo la recogida y el tratamiento de mis datos personales para los fines indicados, de conformidad con el Reglamento General de Protección de Datos (RGPD).",
    formSubmit: "Enviar Solicitud",

    // Pie de página
    rodapeContactos: "Contactos",
    rodapeContactosMorada: "Dirección:",
    rodapeContactosMorada1: "Rua Bernardo Sequeira 213",
    rodapeContactosMorada2: "4715-671 Braga, Portugal",
    rodapeContactosTel: "Teléfono:",
    rodapeContactosTel1: "+351253897123",
    rodapeContactosTel2: "Llamada a la red fija portugués",
    rodapeContactosEmail: "Correo electrónico:",
    rodapeContactosEmail1: "rivda@rivda-sa.pt",
    rodapeDisclaimer: "Aviso Legal",
    rodapeDisclaimerText: "RIVDA SA no es una institución financiera, sociedad gestora, intermediario financiero, ni entidad autorizada o supervisada por la Comisión del Mercado de Valores Mobiliarios (CMVM). La información y los contenidos disponibles en este sitio web tienen carácter exclusivamente informativo y estratégico, y no constituyen ni deben interpretarse como una solicitud, recomendación personalizada, propuesta de inversión o cualquier forma de captación pública de capital. RIVDA SA presta servicios de análisis, estructuración y apoyo técnico en proyectos inmobiliarios y empresariales, dirigidos exclusivamente a entidades e inversores profesionales, en un contexto privado y previa evaluación. Antes de tomar cualquier decisión de inversión, los usuarios deben obtener asesoramiento jurídico, fiscal o financiero de entidades debidamente habilitadas.",
    rodapePrivacidade: "Política de Privacidad",
    rodapeDireitos: "© RIVDA 2025",

    // Política de Privacidad
    privacidadeTitulo: "Política de Privacidad",
    privacidadeText1: "RIVDA se compromete a proteger la privacidad y seguridad de los datos personales, en conformidad con el Reglamento General de Protección de Datos (RGPD) y la legislación nacional aplicable.",
    privacidadeSub1: "(1) Datos Recogidos y Finalidad",
    privacidadeSub1Text1: "Identificación y Contactos: Nombre, correo electrónico, teléfono, cargo y empresa.",
    privacidadeSub1Text2: "Datos de Navegación: Cookies, dirección IP, dispositivo y preferencias.",
    privacidadeSub1Text3: "Los datos se utilizan para:",
    privacidadeSub1List1: "Prestación de servicios y soporte;",
    privacidadeSub1List2: "Comunicación y envío de información;",
    privacidadeSub1List3: "Cumplimiento de obligaciones legales;",
    privacidadeSub1List4: "Mejora de la experiencia en el sitio web.",
    privacidadeSub2: "(2) Compartición de Datos",
    privacidadeSub2Text1: "No vendemos ni comercializamos datos personales. Podemos compartir con:",
    privacidadeSub2List1: "Subcontratistas que garanticen conformidad con el RGPD;",
    privacidadeSub2List2: "Autoridades legales, cuando sea requerido.",
    privacidadeSub3: "(3) Seguridad y Retención de Datos",
    privacidadeSub3Text1: "Implementamos medidas técnicas y organizativas para proteger los datos contra accesos no autorizados, incluyendo encriptación, cortafuegos y control de accesos. Los datos se mantienen solo durante el período necesario para cumplir con las finalidades legales y contractuales.",
    privacidadeSub4: "(4) Derechos de los Titulares",
    privacidadeSub4Text1: "De acuerdo con el RGPD, puede:",
    privacidadeSub4List1: "Acceder, rectificar o eliminar sus datos;",
    privacidadeSub4List2: "Oponerse al tratamiento o solicitar limitación;",
    privacidadeSub4List3: "Solicitar la portabilidad de los datos.",
    privacidadeSub4Text2: "Para ejercer sus derechos, contáctenos: rivda@rivda-sa.pt.",
    privacidadeSub5: "(5) Cookies",
    privacidadeSub5Text1: "Utilizamos cookies para mejorar la experiencia en el sitio web. Puede configurar sus preferencias en el navegador.",
    privacidadeSub6: "(6) Cambios y Contacto",
    privacidadeSub6Text1: "Esta política puede ser actualizada. Para más información, contáctenos:",
    privacidadeSub6List1: "Correo electrónico: rivda@rivda-sa.pt",
    privacidadeSub6List2: "Dirección: Rua Bernardo Sequeira, nº 231, Sala 3 4715-010 Braga, Portugal",
    privacidadeSub6List3: "Teléfono: +351 253 176 493",
    privacidadeSign: "Agosto de 2025 | La Administración",
  }
};