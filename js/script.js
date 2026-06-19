(function () {
  /* ── Current language ── */
  let currentLang = localStorage.getItem('cv-lang') || 'en';

  /* ── I18n: apply translations to DOM ── */
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('cv-lang', lang);

    const t = i18n[lang];
    if (!t) return;

    /* html lang + direction */
    document.documentElement.lang = lang === 'ar' ? 'ar' : lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');

    /* lang buttons */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* name badge */
    var badgeEl = document.getElementById('badge');
    if (badgeEl) badgeEl.textContent = t.badge;

    /* theme labels */
    var themeLabel = document.getElementById('themeLabel');
    if (themeLabel) {
      var isLight = document.body.classList.contains('light');
      themeLabel.textContent = isLight ? t.themeLight : t.themeDark;
    }

    /* profile */
    setText('profile-title', t.profile);
    setText('profile-text', t.profileText);

    /* skills headings */
    setText('skills-title', t.technicalSkills);
    setText('cloud-label', t.cloud);
    setText('containers-label', t.containers);
    setText('cicd-label', t.cicd);
    setText('iac-label', t.iac);
    setText('security-label', t.security);
    setText('monitoring-label', t.monitoring);
    setText('networking-label', t.networking);
    setText('virt-label', t.virt);

    /* languages section */
    setText('lang-title', t.languages);
    setText('lang-arabic-name', t.langArabic);
    setText('lang-arabic-level', t.langArabicLevel);
    setText('lang-french-name', t.langFrench);
    setText('lang-french-level', t.langFrenchLevel);
    setText('lang-english-name', t.langEnglish);
    setText('lang-english-level', t.langEnglishLevel);

    /* achievements */
    setText('ach-title', t.achievements);
    var achList = document.getElementById('ach-list');
    if (achList) {
      achList.innerHTML = '';
      t.ach.forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        achList.appendChild(li);
      });
    }

    /* education */
    setText('edu-title', t.education);
    var eduContainer = document.getElementById('edu-container');
    if (eduContainer) {
      eduContainer.innerHTML = '';
      t.edu.forEach(function (item) {
        var div = document.createElement('div');
        div.className = 'edu-item' + (eduContainer.children.length > 0 ? ' mt-1' : '');
        div.innerHTML = '<strong>' + item.title + '</strong><br />' +
          '<span class="meta">' + item.desc + '</span>' +
          '<span class="meta">' + item.meta + '</span>';
        eduContainer.appendChild(div);
      });
    }

    /* experience */
    var expContainer = document.getElementById('exp-container');
    if (expContainer) {
      expContainer.innerHTML = '';
      t.exp.forEach(function (exp, idx) {
        var block = document.createElement('div');
        block.className = 'exp-block fade-in';

        var header = document.createElement('div');
        header.className = 'exp-header';
        header.innerHTML = '<span><span class="role">' + exp.role + '</span> <span class="company">· ' + exp.company + '</span></span>' +
          '<span class="period">' + exp.period + '</span>';
        block.appendChild(header);

        var desc = document.createElement('div');
        desc.className = 'exp-desc';

        var ul = document.createElement('ul');
        exp.bullets.forEach(function (b) {
          var li = document.createElement('li');
          li.textContent = b;
          ul.appendChild(li);
        });
        desc.appendChild(ul);

        var techDiv = document.createElement('div');
        techDiv.className = 'tech-stack';
        exp.tech.forEach(function (tName) {
          var span = document.createElement('span');
          span.textContent = tName;
          techDiv.appendChild(span);
        });
        desc.appendChild(techDiv);

        block.appendChild(desc);
        expContainer.appendChild(block);
      });

      /* re-observe new fade-in elements */
      observeFadeIn();
    }

    /* footer */
    setText('footer-text', t.footer);
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ── Dark mode toggle ── */
  var toggle = document.getElementById('themeToggle');
  var themeIcon = toggle && toggle.querySelector('i');
  var themeLabel = document.getElementById('themeLabel');

  function setTheme(theme) {
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('cv-theme', theme);
    var t = i18n[currentLang];
    if (themeLabel && t) {
      themeLabel.textContent = theme === 'light' ? t.themeLight : t.themeDark;
    }
    if (themeIcon) {
      themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  var savedTheme = localStorage.getItem('cv-theme');
  if (savedTheme) setTheme(savedTheme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = document.body.classList.contains('light') ? 'dark' : 'light';
      setTheme(next);
    });
  }

  /* ── Language switcher ── */
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(this.dataset.lang);
    });
  });

  /* ── Download as PDF ── */
  var pdfBtn = document.getElementById('downloadPdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.print();
    });
  }

  /* ── Scroll animations (Intersection Observer) ── */
  function observeFadeIn() {
    var els = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { observer.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ── Init ── */
  applyLang(currentLang);
  observeFadeIn();
})();
