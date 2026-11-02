(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const projects = {
    reliability: {
      title: 'Can we trust what an LLM says?', label: 'HALLUCINATION DETECTION & RELIABILITY IN LLMS', image: 'reliability',
      lead: 'An applied machine learning exploration of a simple question: can a classifier identify an unsupported LLM response?',
      problem: 'A response can sound convincing and still conflict with the knowledge it is supposed to use. I explored hallucination detection using the HaluEval dataset.',
      build: 'I used TF-IDF features and compared classification models: Logistic Regression, Random Forest, XGBoost, LightGBM, and CatBoost. XGBoost was the strongest model in my earlier experiment.',
      steps: ['Use the question, reference knowledge, and LLM response as the input context.', 'Transform text using a saved TF-IDF vectorizer.', 'Use the trained classifier to predict hallucinated or reliable responses.'],
      stack: ['Python', 'HaluEval', 'TF-IDF', 'scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost'],
      note: 'Research / learning project. The next step is a Streamlit interface for question, reference knowledge, response, prediction, and confidence. A public demo is not available.'
    },
    drone: {
      title: 'A different perspective on response.', label: 'RAPID RESPONSE DRONE MAPPER', image: 'drone',
      lead: 'A hackathon prototype that brings image analysis and map-based exploration into one Streamlit workflow.',
      problem: 'A folder of aerial imagery can be difficult to review image by image. I wanted to explore how multimodal AI could help organise an initial view of potential hazards.',
      build: 'Built with Python, Streamlit, and Google GenAI during the GDG VIT Chennai Build with Gemma hackathon. Uploaded images are analysed and organised into summaries, a map, a table, and a gallery.',
      steps: ['Upload a ZIP containing drone images.', 'Process imagery with Pillow and Google GenAI to produce hazard summaries and severity estimates.', 'Review the results across a map, data table, and image gallery.'],
      stack: ['Python', 'Streamlit', 'Google GenAI / Gemma', 'pandas', 'Pillow', 'piexif'],
      github: 'https://github.com/naren214/rapid-response-dronemapper',
      demo: 'https://rapid-response-dronemapper-5mfhmxho42ajqjsbn9appzm.streamlit.app/',
      note: 'Hackathon prototype. Location handling includes a mock fallback, and AI estimates are exploratory. This is not an operational emergency response system.'
    },
    unheard: {
      title: 'Your trackpad has a sound.', label: 'UNHEARD / BUILDHOURS', image: 'unheard',
      lead: 'An experiment in making music feel more like drawing. Move a pointer, create a phrase, and explore a different kind of browser interaction.',
      problem: 'I wanted to explore a music interface built around gestures rather than a conventional keyboard, using the browser itself as the instrument.',
      build: 'A React application with Canvas, Pointer Events, and Web Audio synthesis. Six instrument-inspired presets cover sitar, bansuri, tabla, piano, electric guitar, and synthesizer.',
      steps: ['Choose an instrument-inspired preset, tempo, and scale.', 'Use trackpad or pointer gestures to shape synthesised notes.', 'Build a composition with per-instrument state, undo / redo, and local saving.'],
      stack: ['React', 'Vite', 'Canvas 2D', 'Pointer Events', 'Web Audio', 'Local storage'],
      github: 'https://github.com/naren214/BuildHours',
      note: 'Browser-based creative coding project. Presets are synthesised sounds inspired by instruments, rather than recorded instruments.'
    },
    watchlist: {
      title: 'For the “I’ll watch it later” list.', label: 'MOVIE WATCHLIST', image: 'watchlist',
      lead: 'A full-stack application for turning scattered movie recommendations into a personal collection.',
      problem: 'Movie recommendations are easy to lose across chats and notes. I built a place to search for films, save them, and keep track of what I want to watch next.',
      build: 'Next.js and TypeScript on the application side, MongoDB with Mongoose for persistence, and the OMDb API for movie information. REST routes handle collection updates.',
      steps: ['Search the OMDb catalogue and add a film to the collection.', 'Filter and sort by watch state, including Want to Watch and Watched.', 'Keep personal ratings and notes alongside each saved movie.'],
      stack: ['Next.js', 'TypeScript', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'OMDb API', 'REST'],
      github: 'https://github.com/naren214/Movie_Watchlist', demo: 'https://movie-watchlist-seven-pied.vercel.app/',
      note: 'The project artwork is a visual summary. Explore the repository for the actual application screens and setup.'
    }
  };
  const credentials = [
    ['Summer Research Internship', 'VIT Chennai · May–Jul 2026', 'summer-research-internship'],
    ['Python Programming Internship', 'DecodeLabs · Jul 2026', 'decodelabs-internship-certificate'],
    ['Build with Gemma Hackathon Participation', 'GDG On Campus VIT Chennai · Jul 2026', 'build-with-gemma-hackathon'],
    ['Introduction to Front-End Development', 'Meta via Coursera · Jun 2026', 'introduction-to-front-end-development'],
    ['Python for Data Science, AI & Development', 'IBM via Coursera · Jul 2026', 'python-for-data-science-ai-development'],
    ['Create Your UI/UX Portfolio with GitHub', 'Coursera · Jul 2026', 'create-your-uiux-portfolio-with-github'],
    ['n8n Mail Bot Workshop', 'Microsoft Innovations Club VITC · Jul 2026', 'n8n-mail-bot-mic'],
    ['WikiRace AI Workshop', 'Microsoft Innovations Club VITC · Jul 2026', 'wikirace-ai-mic'],
    ['n8n Mail Bot Challenge', 'HackerRank · Jul 2026', 'n8n-mail-bot-hackerrank'],
    ['WikiRace AI Challenge', 'HackerRank · Jul 2026', 'wikirace-ai-hackerrank']
  ];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const dialog = $('#project-dialog');
  const openProject = key => {
    const item = projects[key];
    if (!item) return;
    $('#project-dialog-content').innerHTML = `<div class="dialog-art"><img src="assets/projects/${item.image}.svg" alt="${escapeHTML(item.label)} visual summary" width="1200" height="750"></div><div class="dialog-inner"><span class="mono">${escapeHTML(item.label)}</span><h2 id="dialog-title">${escapeHTML(item.title)}</h2><p class="dialog-lead">${escapeHTML(item.lead)}</p><div class="dialog-grid"><div><h3>THE QUESTION</h3><p>${escapeHTML(item.problem)}</p></div><div><h3>THE BUILD</h3><p>${escapeHTML(item.build)}</p></div></div><div class="dialog-process"><h3>How it comes together</h3><ol>${item.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></div><div class="dialog-tech"><div class="tags">${item.stack.map(tech => `<span>${escapeHTML(tech)}</span>`).join('')}</div></div><div class="dialog-actions">${item.github ? `<a class="button" href="${item.github}" target="_blank" rel="noopener noreferrer">Explore the code <span aria-hidden="true">↗</span></a>` : `<a class="button" href="mailto:narenkavi3@gmail.com?subject=Let%E2%80%99s%20talk%20about%20your%20LLM%20reliability%20project">Discuss the project <span aria-hidden="true">↗</span></a>`}${item.demo ? `<a class="text-link" href="${item.demo}" target="_blank" rel="noopener noreferrer">Open live demo <span aria-hidden="true">↗</span></a>` : ''}</div><p class="dialog-note">${escapeHTML(item.note)}</p></div>`;
    dialog.showModal();
    dialog.scrollTop = 0;
  };
  $$('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
  $$('dialog').forEach(modal => {
    $('.dialog-close', modal).addEventListener('click', () => modal.close());
    modal.addEventListener('click', event => {
      if (event.target !== modal) return;
      const bounds = modal.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
    });
  });
  $$('.filter-button').forEach(button => button.addEventListener('click', () => {
    $$('.filter-button').forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    const filter = button.dataset.filter;
    let count = 0;
    $$('.project-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    $('.project-count').textContent = `SHOWING ${String(count).padStart(2, '0')} PROJECT${count === 1 ? '' : 'S'}`;
  }));
  $('#credential-archive').innerHTML = credentials.map(([title, issuer, slug]) => `<a class="archive-row" aria-label="View ${escapeHTML(title)} certificate PDF (opens in a new tab)" href="assets/certificates/${slug}.pdf" target="_blank" rel="noopener noreferrer"><img src="assets/certificates/${slug}.jpg" alt="" width="64" height="47" loading="lazy"><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(issuer)}</p></div><span class="archive-action">View PDF <span aria-hidden="true">↗</span></span></a>`).join('');
  $('#all-credentials').addEventListener('click', () => $('#credentials-dialog').showModal());
  const menuToggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  const closeMenu = () => { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); mobileNav.hidden = true; };
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !expanded;
  });
  $$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) {closeMenu(); menuToggle.focus();} });
  document.addEventListener('click', event => { if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
  window.matchMedia('(min-width:701px)').addEventListener('change', event => {if (event.matches) closeMenu();});
  let toastTimer;
  const showToast = message => {
    const toast = $('.toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {toast.hidden = true;}, 3500);
  };
  $('[data-copy-email]').addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText('narenkavi3@gmail.com');
      else {
        const field = document.createElement('textarea');
        field.value = 'narenkavi3@gmail.com';
        field.setAttribute('readonly', '');
        field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.append(field); field.select();
        const copied = document.execCommand('copy'); field.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      showToast('Email copied. Let’s build something.');
    } catch { showToast('Email: narenkavi3@gmail.com'); }
  });
  const updateTime = () => { $('#local-time').textContent = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()) + ' IST'; };
  updateTime(); setInterval(updateTime, 60000);
  $('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) $$('.desktop-nav a').forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)); });
    }, {rootMargin:'-15% 0px -65% 0px', threshold:0});
    $$('main section[id]').forEach(section => sectionObserver.observe(section));
  }
})();
