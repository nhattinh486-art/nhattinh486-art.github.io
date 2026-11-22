(function () {
  // ===== Built-in FuiToast =====
  if (typeof window.FuiToast === 'undefined') {
    const container = document.createElement('div');
    container.className = 'lam-toast-container';
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(container));

    function showToast(msg, iconClass, color) {
      if (!container.isConnected) document.body.appendChild(container);
      const toast = document.createElement('div');
      toast.className = 'lam-toast';
      toast.innerHTML = `<i class="${iconClass}" style="color:${color};font-size:1.05rem;"></i><span>${msg}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-8px)';
        setTimeout(() => toast.remove(), 260);
      }, 2800);
    }

    window.FuiToast = {
      success: (m) => showToast(m, 'ri-checkbox-circle-fill', '#34d399'),
      info: (m) => showToast(m, 'ri-information-fill', '#38bdf8'),
      warning: (m) => showToast(m, 'ri-alert-fill', '#fbbf24'),
      error: (m) => showToast(m, 'ri-close-circle-fill', '#f87171')
    };
  }

  // ===== Cookie Helpers =====
  function setCookie(name, value, minutes) {
    let expires = '';
    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value || '') + expires + '; path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
  }

  // ===== 1. Theme (Dark Default) =====
  const htmlEl = document.documentElement;
  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.classList.remove('dark');
    } else {
      htmlEl.classList.add('dark');
    }
    const icon = document.querySelector('.change-theme i');
    if (icon) {
      icon.className = theme === 'light' ? 'ri-moon-clear-line' : 'ri-sun-line';
    }
  }

  const savedTheme = getCookie('theme') || localStorage.getItem('lamdev_theme') || 'dark';
  applyTheme(savedTheme);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.change-theme');
    if (!btn) return;
    const next = htmlEl.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    setCookie('theme', next, 365 * 24 * 60);
    localStorage.setItem('lamdev_theme', next);
  });

  // ===== 2. Loading Screen v2 =====
  const loadingOverlay = document.querySelector('.td-loading-v2');
  const loadingBarFill = document.getElementById('loading-bar-fill');
  const loadingPercent = document.getElementById('loading-percentage');
  const loadingGreeting = document.getElementById('loading-greeting');

  if (loadingGreeting) {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) loadingGreeting.textContent = 'Chào buổi sáng! Chúc bạn ngày mới năng lượng ☀️';
    else if (h >= 12 && h < 18) loadingGreeting.textContent = 'Chào buổi chiều! Code nhẹ nhàng thôi nhé 🌤️';
    else if (h >= 18 && h < 22) loadingGreeting.textContent = 'Chào buổi tối! Thư giãn cùng nhạc chill nào 🌙';
    else loadingGreeting.textContent = 'Đêm muộn rồi, nhớ giữ gìn sức khỏe nhé 🌌';
  }

  let progress = 0;
  const loadTimer = setInterval(() => {
    progress += Math.floor(Math.random() * 22) + 12;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadTimer);
      setTimeout(() => {
        if (loadingOverlay) loadingOverlay.classList.add('hidden-loader');
      }, 280);
    }
    if (loadingBarFill) loadingBarFill.style.width = progress + '%';
    if (loadingPercent) loadingPercent.textContent = progress + '%';
  }, 90);

  // ===== 3. Lock Screen & Animated Ocean Canvas =====
  const lockScreen = document.querySelector('.td-lock-screen');
  const lockDescEl = document.querySelector('.web_desc');
  const pickupLines = [
    'Gió đưa cành trúc la đà, chào mừng bạn đến với nhà Nhật Tình 🐳',
    'Ngoài kia bão tố mưa sa, vào đây nghe nhạc cùng ta cho chill 🎵',
    'Code có thể có bug, nhưng tình cảm dành cho bạn thì không ❤️',
    'Chạm nhẹ màn hình để mở khóa thế giới đại dương xanh 🌊',
    'Một tách cà phê, vài dòng code, và một bản nhạc lofi ☕'
  ];

  let lockLineIdx = 0;
  if (lockDescEl) {
    setInterval(() => {
      lockLineIdx = (lockLineIdx + 1) % pickupLines.length;
      lockDescEl.style.opacity = '0';
      setTimeout(() => {
        lockDescEl.textContent = pickupLines[lockLineIdx];
        lockDescEl.style.opacity = '1';
      }, 250);
    }, 7000);
  }

  // Animated Ocean Starfield Canvas inside Lock Screen
  const lockCanvas = document.getElementById('lockscreen-bg');
  if (lockCanvas) {
    const lctx = lockCanvas.getContext('2d');
    let lw, lh;
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.5,
      s: Math.random() * 0.0006 + 0.0002,
      a: Math.random()
    }));

    function resizeLockCanvas() {
      lw = lockCanvas.width = window.innerWidth;
      lh = lockCanvas.height = window.innerHeight;
    }
    resizeLockCanvas();
    window.addEventListener('resize', resizeLockCanvas);

    (function drawLockBg() {
      if (lockScreen && !lockScreen.classList.contains('unlocked')) {
        lctx.clearRect(0, 0, lw, lh);
        stars.forEach((st) => {
          st.y -= st.s;
          if (st.y < 0) st.y = 1;
          st.a += 0.02;
          const alpha = 0.35 + Math.abs(Math.sin(st.a)) * 0.65;
          lctx.beginPath();
          lctx.arc(st.x * lw, st.y * lh, st.r, 0, Math.PI * 2);
          lctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          lctx.fill();
        });
      }
      requestAnimationFrame(drawLockBg);
    })();
  }

  let hasUnlockedOnce = false;
  function unlockScreen() {
    if (!lockScreen) return;
    lockScreen.classList.add('unlocked');
    if (!hasUnlockedOnce) {
      hasUnlockedOnce = true;
      setTimeout(maybeShowMusicPrompt, 900);
    }
  }

  if (lockScreen) {
    lockScreen.addEventListener('click', unlockScreen);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.scrollY === 0 && lockScreen && hasUnlockedOnce) {
      // Optional re-lock only when user returns at very top if desired; keep smooth
    }
  });

  // ===== 4. Magic Sparkle Stars =====
  let starIndex = 0;
  const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  function animateMagicStar(star) {
    star.style.setProperty('--star-left', `${randRange(-10, 100)}%`);
    star.style.setProperty('--star-top', `${randRange(-40, 80)}%`);
    star.style.animation = 'none';
    star.offsetHeight; // reflow
    star.style.animation = '';
  }
  const magicStars = document.getElementsByClassName('magic-star');
  for (const star of magicStars) {
    setTimeout(() => {
      animateMagicStar(star);
      setInterval(() => animateMagicStar(star), 1000);
    }, starIndex++ * (1000 / 3));
  }

  // ===== 5. Sticky Header & Popup Menu =====
  const headerEl = document.getElementById('main-header');
  const menuToggleBtn = document.getElementById('header-menu-toggle');
  const headerPopup = document.getElementById('header-popup');

  window.addEventListener('scroll', () => {
    if (headerEl) {
      if (window.scrollY > 20) headerEl.classList.add('not-top');
      else headerEl.classList.remove('not-top');
    }

    // Scroll-to-top %
    const scrollBtn = document.getElementById('croll-to-top');
    if (scrollBtn) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, Math.round((window.scrollY / docH) * 100)) : 0;
      const pctSpan = scrollBtn.querySelector('.scroll-percent');
      if (pctSpan) pctSpan.textContent = pct + '%';
      if (window.scrollY > 80) scrollBtn.classList.add('show');
      else scrollBtn.classList.remove('show');
    }
  }, { passive: true });

  if (menuToggleBtn && headerPopup) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = headerPopup.classList.toggle('hidden');
      const icon = menuToggleBtn.querySelector('i');
      if (icon) icon.className = isHidden ? 'ri-menu-3-line' : 'ri-close-line';
    });

    document.addEventListener('click', (e) => {
      if (!headerPopup.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        headerPopup.classList.add('hidden');
        const icon = menuToggleBtn.querySelector('i');
        if (icon) icon.className = 'ri-menu-3-line';
      }
    });
  }

  // ===== 6. Sakura Petal Canvas =====
  const sakuraCanvas = document.getElementById('canvas_sakura');
  let sakuraEnabled = true;
  window.toggleSakura = function () {
    sakuraEnabled = !sakuraEnabled;
    if (sakuraCanvas) sakuraCanvas.style.display = sakuraEnabled ? 'block' : 'none';
  };

  if (sakuraCanvas) {
    const sctx = sakuraCanvas.getContext('2d');
    let sw = (sakuraCanvas.width = window.innerWidth);
    let sh = (sakuraCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      sw = sakuraCanvas.width = window.innerWidth;
      sh = sakuraCanvas.height = window.innerHeight;
    });

    class SakuraPetal {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * sw;
        this.y = initial ? Math.random() * sh : -20;
        this.size = Math.random() * 8 + 7;
        this.speedY = Math.random() * 1.1 + 0.7;
        this.speedX = Math.random() * 0.8 - 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.04;
        this.opacity = Math.random() * 0.5 + 0.4;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.012) * 0.4;
        this.angle += this.spin;
        if (this.y > sh + 20 || this.x > sw + 20 || this.x < -20) {
          this.reset(false);
        }
      }
      draw() {
        sctx.save();
        sctx.translate(this.x, this.y);
        sctx.rotate(this.angle);
        sctx.globalAlpha = this.opacity;
        sctx.fillStyle = '#fbcfe8';
        sctx.beginPath();
        sctx.moveTo(0, -this.size / 2);
        sctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
        sctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
        sctx.fill();
        sctx.restore();
      }
    }

    const petals = Array.from({ length: 10 }, () => new SakuraPetal());
    (function loopSakura() {
      if (sakuraEnabled) {
        sctx.clearRect(0, 0, sw, sh);
        petals.forEach((p) => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(loopSakura);
    })();
  }

  // ===== 7. Click Floating Wishes =====
  const wishes = [
    '💜 Phúc thọ vô biên',
    '♥️ Năm mới vui vẻ',
    '💙 Tài lộc vào nhà',
    '🌸 Vạn sự như ý',
    '✨ An khang thịnh vượng',
    '🐳 Code không bug',
    '🍀 May mắn ngập tràn',
    '💎 Tỷ sự như mơ',
    '🚀 Thành công rực rỡ',
    '💖 Bình an hạnh phúc',
    '🎵 Chill cùng Nhật Tình',
    '⚡ Năng lượng tích cực'
  ];
  const wishColors = ['#38bdf8', '#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#22d3ee'];
  let wishIdx = 0;

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('button, a, input, #toast-prompt, #now-playing-card, .td-lock-screen')) return;
    const span = document.createElement('span');
    span.className = 'click-wish';
    span.textContent = wishes[wishIdx];
    wishIdx = (wishIdx + 1) % wishes.length;
    span.style.color = wishColors[Math.floor(Math.random() * wishColors.length)];
    span.style.left = e.pageX + 'px';
    span.style.top = e.pageY - 20 + 'px';
    document.body.appendChild(span);

    if (typeof $ !== 'undefined') {
      $(span).animate({ top: e.pageY - 180, opacity: 0 }, 1500, function () {
        $(this).remove();
      });
    } else {
      span.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
      requestAnimationFrame(() => {
        span.style.transform = 'translateY(-160px)';
        span.style.opacity = '0';
      });
      setTimeout(() => span.remove(), 1500);
    }
  });

  // ===== 8. Music Player & Prompt =====
  function getPlaylist() {
    const cfg = window.SITE_CONFIG || {};
    if (Array.isArray(cfg.music)) {
      return cfg.music.filter((m) => m && m.url && m.url.trim());
    }
    return [];
  }

  let currentTrackIdx = 0;
  const audioEl = new Audio();
  audioEl.preload = 'none';
  let isPlaying = false;
  let collapseTimer = null;

  const promptEl = document.getElementById('toast-prompt');
  const nowPlayingCard = document.getElementById('now-playing-card');
  const npTitle = document.getElementById('np-title');
  const npArtist = document.getElementById('np-artist');
  const npProgress = document.getElementById('np-progress');
  const npDisc = document.getElementById('np-disc');
  const npPlayIcon = document.getElementById('np-play-icon');

  function maybeShowMusicPrompt() {
    if (!getPlaylist().length || getCookie('skip_music_prompt') || isPlaying || !promptEl) return;
    promptEl.classList.add('show');
  }

  function updateMusicUI() {
    const list = getPlaylist();
    const track = list[currentTrackIdx % Math.max(1, list.length)] || { title: 'Chưa có nhạc', artist: 'Nhật Tình' };
    if (npTitle) npTitle.textContent = track.title;
    if (npArtist) npArtist.textContent = track.artist;
    document.querySelectorAll('.mini-music-btn i').forEach((ic) => {
      ic.className = isPlaying ? 'ri-pause-circle-line' : 'ri-play-circle-line';
    });
    if (npPlayIcon) {
      npPlayIcon.className = isPlaying ? 'ri-pause-fill' : 'ri-play-fill';
    }
    if (npDisc) {
      if (isPlaying) npDisc.classList.remove('spin-paused');
      else npDisc.classList.add('spin-paused');
    }
  }

  function expandNowPlayingTemporarily() {
    if (!nowPlayingCard) return;
    nowPlayingCard.classList.add('visible', 'expanded');
    clearTimeout(collapseTimer);
    collapseTimer = setTimeout(() => {
      nowPlayingCard.classList.remove('expanded');
    }, 3500);
  }

  function playTrack(idx) {
    const list = getPlaylist();
    if (!list.length) {
      if (typeof FuiToast !== 'undefined') {
        FuiToast.info('Chưa có bài hát nào. Hãy tải nhạc lên trong trang Admin!');
      }
      return;
    }
    currentTrackIdx = ((idx % list.length) + list.length) % list.length;
    const track = list[currentTrackIdx];
    audioEl.src = track.url;
    audioEl.play().then(() => {
      isPlaying = true;
      updateMusicUI();
      expandNowPlayingTemporarily();
      if (typeof FuiToast !== 'undefined') {
        FuiToast.success(`🎵 Đang phát: ${track.title} — ${track.artist}`);
      }
    }).catch(() => {
      isPlaying = false;
      updateMusicUI();
      if (typeof FuiToast !== 'undefined') {
        FuiToast.warning('Trình duyệt chặn tự phát hoặc không tải được nhạc, hãy bấm Play lại nhé!');
      }
    });
  }

  function toggleMusic() {
    if (!audioEl.src) {
      playTrack(currentTrackIdx);
      return;
    }
    if (isPlaying) {
      audioEl.pause();
      isPlaying = false;
    } else {
      audioEl.play();
      isPlaying = true;
    }
    updateMusicUI();
    expandNowPlayingTemporarily();
  }

  audioEl.addEventListener('ended', () => {
    playTrack(currentTrackIdx + 1);
  });

  audioEl.addEventListener('timeupdate', () => {
    if (npProgress && audioEl.duration) {
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      npProgress.style.width = pct + '%';
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.mini-music-btn') || e.target.closest('#np-play-btn')) {
      toggleMusic();
    }
    if (e.target.closest('#np-next-btn')) {
      playTrack(currentTrackIdx + 1);
    }
    if (e.target.closest('#btn-accept-music')) {
      if (promptEl) promptEl.classList.remove('show');
      playTrack(currentTrackIdx);
    }
    if (e.target.closest('#btn-skip-music')) {
      if (promptEl) promptEl.classList.remove('show');
      setCookie('skip_music_prompt', '1', 10);
    }
  });

  // ===== 9. Rotating Quote Pill =====
  const quotes = [
    'Code không bug là code chưa từng được chạy.',
    'Thà thức khuya fix bug còn hơn ngủ sớm mà lòng bất an.',
    'Đừng sợ thất bại, hãy sợ việc không dám bắt đầu.',
    'Mỗi dòng code là một viên gạch xây nên tương lai.',
    'Bug còn chạy được thì nó không phải lỗi mà là tính năng.',
    'Đơn giản là đỉnh cao của sự tinh tế.',
    'Học hỏi không ngừng, tối ưu từng mili-giây.',
    'Cà phê biến thành code, code biến thành giá trị.'
  ];
  let quoteInterval = null;
  function initQuotePill() {
    clearInterval(quoteInterval);
    const quoteEl = document.getElementById('cham-ngon');
    if (!quoteEl) return;
    quoteInterval = setInterval(() => {
      const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
      if (typeof $ !== 'undefined') {
        $('#cham-ngon').fadeOut(300, function () {
          $(this).text(nextQuote).fadeIn(300);
        });
      } else {
        quoteEl.textContent = nextQuote;
      }
    }, 5321);
  }

  // ===== 10. Real-time Clock =====
  const clockEl = document.getElementById('real-time');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ===== 11. Scroll-to-Top Click =====
  document.addEventListener('click', (e) => {
    if (e.target.closest('#croll-to-top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ===== 12. Whale Mascot FAB =====
  window.tapWhaleMascot = function () {
    if (typeof FuiToast !== 'undefined') {
      FuiToast.success('🐳 Cá voi xanh Nhật Tình chào bạn! Chúc bạn code mượt nhé!');
    }
    if (typeof window.showWaifuTip === 'function') {
      window.showWaifuTip('Cá voi xanh vừa vẫy đuôi chào bạn kìa! 🐳✨', 3500);
    }
  };

  // ===== 13. Keyboard Easter Eggs ("minh" or "lamdev") =====
  let keyBuffer = '';
  function triggerEasterEgg(word) {
    const burst = document.createElement('div');
    burst.className = 'egg-burst';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1700);

    const symbols = [word.toUpperCase(), '✨', '🚀', '💙', '💖', '🌸', '🐳'];
    for (let i = 0; i < 42; i++) {
      const piece = document.createElement('span');
      piece.className = 'egg-piece';
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.color = '#38bdf8';
      piece.style.fontSize = Math.random() * 12 + 14 + 'px';
      piece.style.setProperty('--dur', (Math.random() * 1.8 + 1.8).toFixed(2) + 's');
      piece.style.setProperty('--rot', Math.floor(Math.random() * 720 - 360) + 'deg');
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3800);
    }

    if (typeof FuiToast !== 'undefined') {
      FuiToast.success(`🎉 Easter Egg "${word.toUpperCase()}" đã được kích hoạt!`);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-12);
    if (keyBuffer.endsWith('nhattinh')) {
      triggerEasterEgg('Nhật Tình');
      keyBuffer = '';
    } else if (keyBuffer.endsWith('tinh')) {
      triggerEasterEgg('Tình');
      keyBuffer = '';
    }
  });

  // ===== 14. Copy to Clipboard, Fancybox, Locket Ping, FAQ =====
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-ws-copy]');
    if (copyBtn) {
      const text = copyBtn.getAttribute('data-ws-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          if (typeof FuiToast !== 'undefined') {
            FuiToast.success('Đã sao chép vào bộ nhớ tạm!');
          }
        });
      }
    }

    const faqBtn = e.target.closest('.faq-toggle');
    if (faqBtn) {
      const answer = faqBtn.nextElementSibling;
      const icon = faqBtn.querySelector('i');
      if (answer) answer.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    }
  });

  function initLocketPing() {
    document.querySelectorAll('.server-ping-badge[data-ping-url]').forEach((badge) => {
      const url = badge.getAttribute('data-ping-url');
      const start = performance.now();
      fetch(url, { mode: 'no-cors', cache: 'no-store' })
        .then(() => {
          const ms = Math.round(performance.now() - start);
          badge.textContent = `${ms}ms • Online`;
          badge.className = 'server-ping-badge text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono';
        })
        .catch(() => {
          badge.textContent = 'Offline';
          badge.className = 'server-ping-badge text-[11px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-mono';
        });
    });
  }

  window.onSpaPageLoaded = function (routeKey) {
    initQuotePill();
    initLocketPing();
    initDownloadProfilePage(routeKey);
    initGetUrlPages(routeKey);
    if (typeof Fancybox !== 'undefined') {
      Fancybox.bind('[data-fancybox]');
    }
  };

  // ===== 15. LocketGold Server Selection & Admin Code Download Gate =====
  function getValidAdminCodes() {
    const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG || {};
    const codes = Array.isArray(cfg.adminCodes) && cfg.adminCodes.length ? cfg.adminCodes : ['NHATTINH2026', 'LOCKETGOLD', 'ADMIN'];
    return codes.map((c) => String(c).trim().toUpperCase());
  }

  document.addEventListener('click', (e) => {
    const projBtn = e.target.closest('.select-project-btn');
    if (projBtn) {
      const idx = projBtn.getAttribute('data-project-idx') || '0';
      sessionStorage.setItem('selected_project_idx', idx);
    }

    const srvBtn = e.target.closest('.select-server-btn');
    if (!srvBtn) return;
    const name = srvBtn.getAttribute('data-server-name') || 'Máy Chủ 01';
    const url = srvBtn.getAttribute('data-server-url') || 'https://cloudflare-dns.com/dns-query';
    const fileUrl = srvBtn.getAttribute('data-server-file') || '';
    sessionStorage.setItem('selected_dns_server', JSON.stringify({ name, url, fileUrl }));
  });

  function initDownloadProfilePage(routeKey) {
    if (routeKey !== 'tai-ho-so') return;
    const nameEl = document.getElementById('selected-server-name');
    const urlEl = document.getElementById('selected-server-url');
    const linkInput = document.getElementById('input-locket-link');
    const codeInput = document.getElementById('input-admin-code');
    const statusEl = document.getElementById('verify-status');
    const downloadBtn = document.getElementById('btn-download-profile');
    if (!linkInput || !codeInput || !downloadBtn) return;

    let server = { name: 'Máy Chủ 01', url: 'https://cloudflare-dns.com/dns-query', fileUrl: '' };
    try {
      const saved = sessionStorage.getItem('selected_dns_server');
      if (saved) server = JSON.parse(saved);
    } catch (_) {}

    if (nameEl) nameEl.textContent = server.name;
    if (urlEl) urlEl.textContent = server.url;

    function validateInputs() {
      const linkVal = linkInput.value.trim();
      const codeVal = codeInput.value.trim().toUpperCase();
      const isLinkValid = /^https?:\/\/.+/i.test(linkVal);
      const isCodeValid = getValidAdminCodes().includes(codeVal);

      if (isLinkValid && isCodeValid) {
        downloadBtn.disabled = false;
        if (statusEl) {
          statusEl.textContent = '✅ Xác thực thành công! Bạn có thể bấm tải xuống file hồ sơ.';
          statusEl.className = 'text-xs text-emerald-400 font-medium';
        }
      } else {
        downloadBtn.disabled = true;
        if (statusEl) {
          if (!linkVal && !codeVal) {
            statusEl.textContent = 'Vui lòng nhập đầy đủ Link Locket và đúng mã từ Admin để mở khóa nút tải xuống.';
            statusEl.className = 'text-xs text-[hsl(var(--muted-foreground))]';
          } else if (!isLinkValid) {
            statusEl.textContent = '⚠️ Link Locket phải bắt đầu bằng https:// hoặc http://';
            statusEl.className = 'text-xs text-amber-400';
          } else {
            statusEl.textContent = '🔒 Mã Admin chưa chính xác. Vui lòng kiểm tra lại!';
            statusEl.className = 'text-xs text-rose-400';
          }
        }
      }
    }

    linkInput.addEventListener('input', validateInputs);
    codeInput.addEventListener('input', validateInputs);

    function extractLocketName(rawLink) {
      try {
        const u = new URL(rawLink.trim());
        const parts = u.pathname.split('/').filter(Boolean);
        const last = parts.length ? parts[parts.length - 1] : '';
        const clean = decodeURIComponent(last).replace(/[^a-zA-Z0-9._-]/g, '');
        if (clean) return clean;
      } catch (_) {}
      const fallback = rawLink.trim().split('/').filter(Boolean).pop() || '';
      return fallback.split('?')[0].replace(/[^a-zA-Z0-9._-]/g, '') || 'User';
    }

    downloadBtn.addEventListener('click', async () => {
      if (downloadBtn.disabled) return;
      const locketName = extractLocketName(linkInput.value);
      const targetFilename = `Locketgold-${locketName}.mobileconfig`;

      if (server.fileUrl && server.fileUrl.trim()) {
        try {
          const res = await fetch(server.fileUrl);
          if (res.ok) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = targetFilename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(blobUrl);
            if (typeof FuiToast !== 'undefined') {
              FuiToast.success(`Đã tải xuống ${targetFilename}!`);
            }
            return;
          }
        } catch (_) {}
        const a = document.createElement('a');
        a.href = server.fileUrl;
        a.download = targetFilename;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (typeof FuiToast !== 'undefined') {
          FuiToast.success(`Đã tải xuống ${targetFilename}!`);
        }
        return;
      }
      const mobileconfig = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>DNSSettings</key>
      <dict>
        <key>DNSProtocol</key>
        <string>HTTPS</string>
        <key>ServerURL</key>
        <string>${server.url}</string>
      </dict>
      <key>PayloadDescription</key>
      <string>LocketGold DNS DoH - Nhat Tinh (${server.name})</string>
      <key>PayloadDisplayName</key>
      <string>LocketGold (${server.name})</string>
      <key>PayloadIdentifier</key>
      <string>com.nhattinh.locketgold.dns</string>
      <key>PayloadType</key>
      <string>com.apple.dnsSettings.managed</string>
      <key>PayloadUUID</key>
      <string>A1B2C3D4-E5F6-4789-9012-NHATTINH2026</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
    </dict>
  </array>
  <key>PayloadDisplayName</key>
  <string>LocketGold - Nhật Tình (${server.name})</string>
  <key>PayloadIdentifier</key>
  <string>com.nhattinh.locketgold.profile</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>B2C3D4E5-F6A7-4890-1234-NHATTINH2026</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`;

      const blob = new Blob([mobileconfig], { type: 'application/x-apple-aspen-config' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = targetFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);

      if (typeof FuiToast !== 'undefined') {
        FuiToast.success(`Đã tải xuống ${targetFilename}!`);
      }
    });
  }

  // ===== 16. Lay URL & Danh Sach URL (Admin Code Gate) =====
  function initGetUrlPages(routeKey) {
    if (routeKey === 'danh-sach-url') {
      if (sessionStorage.getItem('url_admin_verified') !== '1') {
        if (typeof window.navigateSpa === 'function') {
          window.navigateSpa('lay-url', true);
        }
      }
      return;
    }

    if (routeKey !== 'lay-url') return;
    const codeInput = document.getElementById('input-url-admin-code');
    const statusEl = document.getElementById('url-verify-status');
    const verifyBtn = document.getElementById('btn-verify-url-code');
    if (!codeInput || !verifyBtn) return;

    function handleVerify() {
      const code = codeInput.value.trim().toUpperCase();
      if (getValidAdminCodes().includes(code)) {
        sessionStorage.setItem('url_admin_verified', '1');
        if (typeof FuiToast !== 'undefined') {
          FuiToast.success('Xác thực thành công! Đang mở danh sách URL...');
        }
        if (typeof window.navigateSpa === 'function') {
          window.navigateSpa('danh-sach-url', true);
        }
      } else {
        if (statusEl) {
          statusEl.textContent = '🔒 Mã Admin chưa chính xác. Vui lòng thử lại!';
          statusEl.className = 'text-xs text-rose-400 font-medium';
        }
        if (typeof FuiToast !== 'undefined') {
          FuiToast.error('Mã Admin chưa chính xác!');
        }
      }
    }

    verifyBtn.addEventListener('click', handleVerify);
    codeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleVerify();
    });
  }

  // Disable right-click context menu like original
  document.addEventListener('contextmenu', (e) => e.preventDefault());
})();
