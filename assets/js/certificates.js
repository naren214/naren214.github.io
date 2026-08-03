(function() {
  "use strict";

  const certificates = [
    {
      title: "Create Your UI/UX Portfolio with GitHub",
      issuer: "Coursera",
      date: "July 2026",
      description: "Completed a guided UI/UX portfolio project using GitHub.",
      thumbnail: "assets/img/certificates/create-your-uiux-portfolio-with-github.jpg",
      pdf: "assets/certificates/create-your-uiux-portfolio-with-github.pdf"
    },
    {
      title: "DecodeLabs Virtual Internship Program",
      issuer: "DecodeLabs",
      date: "July 2026",
      description: "Completed a virtual internship in Python programming.",
      thumbnail: "assets/img/certificates/decodelabs-internship-certificate.jpg",
      pdf: "assets/certificates/decodelabs-internship-certificate.pdf"
    },
    {
      title: "DecodeLabs Internship Offer Letter",
      issuer: "DecodeLabs",
      date: "June 2026",
      description: "Received an internship offer for the Python programming track.",
      thumbnail: "assets/img/certificates/decodelabs-offer-letter.jpg",
      pdf: "assets/certificates/decodelabs-offer-letter.pdf"
    },
    {
      title: "Introduction to Front-End Development",
      issuer: "Meta via Coursera",
      date: "June 2026",
      description: "Completed Meta's introductory front-end development course.",
      thumbnail: "assets/img/certificates/introduction-to-front-end-development.jpg",
      pdf: "assets/certificates/introduction-to-front-end-development.pdf"
    },
    {
      title: "n8n Mail Bot",
      issuer: "HackerRank",
      date: "July 2026",
      description: "Participated in the n8n Mail Bot building challenge.",
      thumbnail: "assets/img/certificates/n8n-mail-bot-hackerrank.jpg",
      pdf: "assets/certificates/n8n-mail-bot-hackerrank.pdf"
    },
    {
      title: "n8n Mail Bot Workshop",
      issuer: "Microsoft Innovations Club VITC",
      date: "July 2026",
      description: "Participated in a hands-on automation workshop.",
      thumbnail: "assets/img/certificates/n8n-mail-bot-mic.jpg",
      pdf: "assets/certificates/n8n-mail-bot-mic.pdf"
    },
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM via Coursera",
      date: "July 2026",
      description: "Completed IBM's Python course for data science and AI.",
      thumbnail: "assets/img/certificates/python-for-data-science-ai-development.jpg",
      pdf: "assets/certificates/python-for-data-science-ai-development.pdf"
    },
    {
      title: "WikiRace AI",
      issuer: "HackerRank",
      date: "July 2026",
      description: "Participated in the WikiRace AI building challenge.",
      thumbnail: "assets/img/certificates/wikirace-ai-hackerrank.jpg",
      pdf: "assets/certificates/wikirace-ai-hackerrank.pdf"
    },
    {
      title: "WikiRace AI Workshop",
      issuer: "Microsoft Innovations Club VITC",
      date: "July 2026",
      description: "Participated in a hands-on AI workshop.",
      thumbnail: "assets/img/certificates/wikirace-ai-mic.jpg",
      pdf: "assets/certificates/wikirace-ai-mic.pdf"
    }
  ];

  const grid = document.querySelector("#certificates-grid");

  if (!grid) {
    return;
  }

  function createPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "certificate-placeholder";
    placeholder.innerHTML = '<i class="bi bi-file-earmark-pdf"></i>';
    return placeholder;
  }

  certificates.forEach((certificate, index) => {
    const column = document.createElement("div");
    column.className = "col-lg-4 col-md-6";
    column.setAttribute("data-aos", "fade-up");
    column.setAttribute("data-aos-delay", String(100 + (index % 3) * 100));

    const card = document.createElement("article");
    card.className = "certificate-card";

    const media = document.createElement("div");
    media.className = "certificate-media";

    if (certificate.thumbnail) {
      const image = document.createElement("img");
      image.src = certificate.thumbnail;
      image.alt = certificate.title + " certificate preview";
      image.loading = "lazy";
      image.onerror = function() {
        media.replaceChildren(createPlaceholder());
      };
      media.appendChild(image);
    } else {
      media.appendChild(createPlaceholder());
    }

    const body = document.createElement("div");
    body.className = "certificate-body";

    const meta = document.createElement("div");
    meta.className = "certificate-meta";
    meta.textContent = certificate.issuer + " • " + certificate.date;

    const title = document.createElement("h3");
    title.textContent = certificate.title;

    const description = document.createElement("p");
    description.textContent = certificate.description;

    const actions = document.createElement("div");
    actions.className = "certificate-actions";

    const viewLink = document.createElement("a");
    viewLink.className = "certificate-btn";
    viewLink.href = certificate.pdf;
    viewLink.target = "_blank";
    viewLink.rel = "noopener";
    viewLink.innerHTML = '<i class="bi bi-box-arrow-up-right"></i><span>View Certificate</span>';

    const downloadLink = document.createElement("a");
    downloadLink.className = "certificate-btn certificate-btn-outline";
    downloadLink.href = certificate.pdf;
    downloadLink.download = "";
    downloadLink.innerHTML = '<i class="bi bi-download"></i><span>Download PDF</span>';

    actions.append(viewLink, downloadLink);
    body.append(meta, title, description, actions);
    card.append(media, body);
    column.appendChild(card);
    grid.appendChild(column);
  });
})();
