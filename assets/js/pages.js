window.DEFAULT_SITE_CONFIG = {
  bio: {
    subtitle: 'Nhật Tình',
    paragraphs: [
      'Mình là Nhật Tình — Lập trình viên Full-Stack. Chuyên môn chính tập trung vào phát triển hệ thống Back-end phân tán, thiết kế RESTful API hiệu năng cao và lập trình các giải pháp tự động hóa (Automation Bot, Cloudflare Serverless).',
      'Định hướng làm việc thực chiến: luôn đặt tính bảo mật, tốc độ xử lý và khả năng mở rộng ổn định của sản phẩm lên hàng đầu.'
    ]
  },
  projects: [
    {
      title: 'Facebook',
      desc: 'Trang cá nhân Facebook chính thức — kết nối, giao lưu và hỗ trợ trực tiếp.',
      url: 'https://facebook.com',
      icon: 'ri-facebook-circle-line',
      image: '',
      isSpa: false,
      spaRoute: ''
    },
    {
      title: 'GitHub',
      desc: 'Kho lưu trữ mã nguồn mở, công cụ tự động hóa và các dự án cá nhân.',
      url: 'https://github.com',
      icon: 'ri-github-line',
      image: '',
      isSpa: false,
      spaRoute: ''
    },
    {
      title: 'LocketGold',
      desc: 'Trung tâm máy chủ DoH & tải cấu hình Locket Gold VIP vĩnh viễn.',
      url: '/locketlam',
      icon: 'ri-shield-flash-line',
      image: '',
      isSpa: true,
      spaRoute: 'locketlam'
    },
    {
      title: 'Dự án',
      desc: 'Tổng hợp các sản phẩm phần mềm, website và giải pháp kỹ thuật đã triển khai.',
      url: '/du-an',
      icon: 'ri-folder-3-line',
      image: '',
      isSpa: true,
      spaRoute: 'du-an'
    }
  ],
  myProjects: [
    {
      title: 'Website Cá Nhân Nhật Tình',
      desc: 'Trang hồ sơ cá nhân với hiệu ứng đại dương, Live2D & trình quản trị PWA.',
      url: 'https://nhattinh486-art.github.io/',
      icon: 'ri-global-line',
      image: ''
    },
    {
      title: 'LocketGold DNS & Config',
      desc: 'Hệ thống máy chủ DoH và cấu hình Shadowrocket tiện lợi.',
      url: '/locketlam',
      icon: 'ri-shield-flash-line',
      image: ''
    }
  ],
  social: [
    {
      title: 'TikTok',
      desc: '@nhattinh',
      url: 'https://tiktok.com',
      icon: 'ri-tiktok-line',
      image: '',
      fullWidth: false
    },
    {
      title: 'GitHub',
      desc: 'nhattinh',
      url: 'https://github.com',
      icon: 'ri-github-line',
      image: '',
      fullWidth: false
    },
    {
      title: 'Zalo',
      desc: 'Nhật Tình',
      url: 'https://zalo.me',
      icon: 'ri-chat-3-line',
      image: '',
      fullWidth: false
    },
    {
      title: 'WeChat',
      desc: 'Nhật Tình',
      url: 'https://www.wechat.com',
      icon: 'ri-wechat-line',
      image: '',
      fullWidth: false
    },
    {
      title: 'Facebook',
      desc: 'Trang cá nhân Nhật Tình — Hỗ trợ & kết nối',
      url: 'https://facebook.com',
      icon: 'ri-facebook-circle-line',
      image: '',
      fullWidth: true
    }
  ],
  dnsServers: [
    {
      name: 'Máy Chủ 01',
      url: 'https://cloudflare-dns.com/dns-query',
      fileUrl: ''
    },
    {
      name: 'Máy Chủ 02',
      url: 'https://dns.google/dns-query',
      fileUrl: ''
    },
    {
      name: 'Máy Chủ 03',
      url: 'https://dns.quad9.net/dns-query',
      fileUrl: ''
    }
  ],
  shadowrocketUrls: {
    conf: 'https://raw.githubusercontent.com/nhattinh/locketgold/main/LocketGold.conf',
    sgmodule: 'https://raw.githubusercontent.com/nhattinh/locketgold/main/LocketGold.sgmodule',
    dns: 'https://cloudflare-dns.com/dns-query'
  },
  adminCodes: ['NHATTINH2026', 'LOCKETGOLD', 'ADMIN']
};

window.SITE_CONFIG = window.DEFAULT_SITE_CONFIG;

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderProjectVideo(videoUrl) {
  const url = (videoUrl || '').trim();
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `
      <div class="w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] aspect-video bg-black">
        <iframe
          src="https://www.youtube.com/embed/${ytMatch[1]}"
          title="Video Demo Dự Án"
          class="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }
  const gdMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (gdMatch) {
    return `
      <div class="w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] aspect-video bg-black">
        <iframe
          src="https://drive.google.com/file/d/${gdMatch[1]}/preview"
          title="Video Demo Dự Án"
          class="w-full h-full"
          allow="autoplay"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }
  return `
    <div class="w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-black">
      <video src="${escHtml(url)}" controls playsinline preload="metadata" class="w-full max-h-[420px] mx-auto"></video>
    </div>
  `;
}

function renderCardVisual(item, defaultIcon, sizeClass) {
  if (item.image && item.image.trim()) {
    return `<img src="${escHtml(item.image)}" alt="${escHtml(item.title)}" class="${sizeClass || 'w-8 h-8'} rounded-lg object-cover shrink-0 border border-sky-400/30" />`;
  }
  return `<i class="${escHtml(item.icon || defaultIcon)} text-[1.6rem] text-[#38bdf8] shrink-0 mt-0.5 group-hover:scale-110 transition-transform"></i>`;
}

window.SPA_PAGES = {
  home: {
    title: 'Nhật Tình',
    docTitle: 'Hồ Sơ-Nhật Tình',
    render: () => {
      const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG;
      const bio = cfg.bio || window.DEFAULT_SITE_CONFIG.bio;
      const projects = cfg.projects || window.DEFAULT_SITE_CONFIG.projects;

      return `
      <!-- Hero Section -->
      <section class="flex flex-col items-center gap-y-5 text-center pt-2">
        <div class="relative w-32 h-32 flex items-center justify-center">
          <div class="w-28 h-28 rounded-full border border-sky-500/40 p-1 bg-gradient-to-tr from-sky-500/20 to-cyan-400/20 shadow-lg shadow-sky-500/20 overflow-hidden">
            <img
              src="./assets/img/avatar.jpg"
              alt="Nhật Tình Avatar"
              class="w-full h-full rounded-full object-cover"
            />
          </div>
          <!-- Decorative Dragon/Ocean Halo Frame -->
          <svg class="crown3" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="100" cy="100" r="88" stroke="url(#frameGrad)" stroke-width="2.5" stroke-dasharray="14 8 4 8" />
            <circle cx="100" cy="100" r="95" stroke="url(#frameGrad2)" stroke-width="1.2" opacity="0.6" />
            <path d="M100 4 L106 16 L100 13 L94 16 Z" fill="#38bdf8" />
            <path d="M100 196 L106 184 L100 187 L94 184 Z" fill="#22d3ee" />
            <defs>
              <linearGradient id="frameGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop stop-color="#38bdf8" />
                <stop offset="0.5" stop-color="#22d3ee" />
                <stop offset="1" stop-color="#0284c7" />
              </linearGradient>
              <linearGradient id="frameGrad2" x1="200" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
                <stop stop-color="#f472b6" />
                <stop offset="1" stop-color="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="flex flex-col items-center gap-y-2">
          <div class="flex items-center gap-x-2">
            <h1 class="text-3xl font-bold tracking-tight">Nhật Tình</h1>
            <i class="ri-verified-badge-fill text-sky-400 text-xl" title="Verified"></i>
          </div>

          <p class="text-sky-400 font-medium text-[0.95rem]">
            Đơn Giản • Hiệu Quả • Khác Biệt • Sáng Tạo Không Giới Hạn
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            <span class="inline-flex items-center gap-1">
              <i class="ri-map-pin-line text-sky-400"></i>
              Việt Nam
            </span>
          </div>
        </div>
      </section>

      <!-- Bio Section -->
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Bio</h2>
        </div>
        <div class="flex-1 flex flex-col gap-y-3 text-[0.92rem] leading-relaxed">
          <p class="font-semibold text-sky-400">${escHtml(bio.subtitle)}</p>
          ${(bio.paragraphs || []).map((p) => `<p class="text-[hsl(var(--muted-foreground))]">${escHtml(p)}</p>`).join('')}
          <div class="flex flex-wrap items-center justify-start gap-3 pt-2">
            <a href="/info" data-spa="info" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
              <span>←</span> Mạng xã hội &amp; Hỗ trợ
            </a>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Projects</h2>
        </div>
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${projects.map((p) => {
            const isSpa = p.isSpa || (p.url && p.url.startsWith('/'));
            const spaRoute = p.spaRoute || (p.url ? p.url.replace(/^\//, '') : 'home');
            const attrs = isSpa
              ? `href="${escHtml(p.url || '/')}" data-spa="${escHtml(spaRoute)}" class="spa-link profile-card p-4 flex items-start gap-3.5 group"`
              : `href="${escHtml(p.url || '#')}" target="_blank" rel="noopener" class="profile-card p-4 flex items-start gap-3.5 group"`;
            return `
              <a ${attrs}>
                ${renderCardVisual(p, 'ri-links-line', 'w-9 h-9')}
                <div class="flex flex-col gap-1 min-w-0">
                  <h3 class="font-semibold text-[0.95rem] group-hover:text-sky-400 transition-colors">${escHtml(p.title)}</h3>
                  <p class="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">${escHtml(p.desc)}</p>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>

      <!-- Skills Section -->
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Skills</h2>
        </div>
        <div class="flex-1 flex flex-col gap-y-3.5">
          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <h3 class="sm:w-1/4 text-sm font-medium text-[hsl(var(--muted-foreground))] pt-1">LocketGold</h3>
            <div class="flex-1 flex flex-wrap gap-2">
              <span class="skill-tag">Shadowrocket</span>
              <span class="skill-tag">DNS over HTTPS (DoH)</span>
              <span class="skill-tag">Apple Mobileconfig</span>
              <span class="skill-tag">.conf</span>
              <span class="skill-tag">.sgmodule</span>
              <span class="skill-tag">Cloudflare DNS</span>
              <span class="skill-tag">Google DNS</span>
              <span class="skill-tag">Quad9 DNS</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <h3 class="sm:w-1/4 text-sm font-medium text-[hsl(var(--muted-foreground))] pt-1">Web &amp; Media</h3>
            <div class="flex-1 flex flex-wrap gap-2">
              <span class="skill-tag">HTML5</span>
              <span class="skill-tag">CSS3</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">Tailwind CSS</span>
              <span class="skill-tag">PWA (Mobile App)</span>
              <span class="skill-tag">SPA Router</span>
              <span class="skill-tag">GitHub Pages</span>
              <span class="skill-tag">GitHub API</span>
              <span class="skill-tag">LameJS (MP3)</span>
              <span class="skill-tag">Canvas 2D</span>
              <span class="skill-tag">Live2D</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <h3 class="sm:w-1/4 text-sm font-medium text-[hsl(var(--muted-foreground))] pt-1">Hệ Thống Máy</h3>
            <div class="flex-1 flex flex-wrap gap-2">
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">npm</span>
              <span class="skill-tag">.NET</span>
              <span class="skill-tag">Docker</span>
              <span class="skill-tag">Git</span>
              <span class="skill-tag">GitHub CLI</span>
              <span class="skill-tag">VS Code</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-start gap-2">
            <h3 class="sm:w-1/4 text-sm font-medium text-[hsl(var(--muted-foreground))] pt-1">AI &amp; Tích Hợp</h3>
            <div class="flex-1 flex flex-wrap gap-2">
              <span class="skill-tag">Gemini AI</span>
              <span class="skill-tag">Vercel</span>
              <span class="skill-tag">Netlify</span>
              <span class="skill-tag">Chrome DevTools</span>
              <span class="skill-tag">AutoCAD</span>
              <span class="skill-tag">Canva</span>
              <span class="skill-tag">Google Docs</span>
              <span class="skill-tag">Google Sheets</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Rotating Quote Pill -->
      <div class="flex justify-center pt-2">
        <div class="inline-flex items-center gap-2.5 rounded-3xl border border-sky-500/30 bg-sky-500/5 px-4 py-2 text-xs sm:text-sm text-[hsl(var(--muted-foreground))] shadow-sm">
          <span class="relative flex h-2.5 w-2.5 shrink-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400"></span>
          </span>
          <span id="cham-ngon" class="italic">Code không bug là code chưa từng được chạy.</span>
        </div>
      </div>
    `;
    }
  },

  info: {
    title: 'Nhật Tình',
    docTitle: 'Thông Tin & Mạng Xã Hội — Nhật Tình',
    render: () => {
      const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG;
      const social = cfg.social || window.DEFAULT_SITE_CONFIG.social;

      return `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-start gap-3">
          <a href="/" data-spa="home" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Về Trang Chủ
          </a>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Social</h2>
        </div>
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${social.map((s) => `
            <a href="${escHtml(s.url || '#')}" target="_blank" rel="noopener" class="profile-card p-3.5 flex items-center gap-3 group ${s.fullWidth ? 'sm:col-span-2' : ''}">
              ${s.image && s.image.trim()
                ? `<img src="${escHtml(s.image)}" alt="${escHtml(s.title)}" class="w-8 h-8 rounded-lg object-cover shrink-0 border border-sky-400/30" />`
                : `<i class="${escHtml(s.icon || 'ri-share-line')} text-2xl text-sky-400 shrink-0"></i>`}
              <div class="min-w-0">
                <h3 class="font-semibold text-sm group-hover:text-sky-400">${escHtml(s.title)}</h3>
                <p class="text-xs text-[hsl(var(--muted-foreground))] truncate">${escHtml(s.desc)}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
    }
  },

  'du-an': {
    title: 'Nhật Tình',
    docTitle: 'Dự Án — Nhật Tình',
    render: () => {
      const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG;
      const list = cfg.myProjects || window.DEFAULT_SITE_CONFIG.myProjects || [];

      return `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-start gap-3">
          <a href="/" data-spa="home" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Về Trang Chủ
          </a>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-x-6 md:gap-y-0">
        <div class="md:min-w-36 shrink-0">
          <h2 class="text-xl font-semibold">Dự Án</h2>
        </div>
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${list.length ? list.map((item, idx) => `
              <a href="/chi-tiet-du-an" data-spa="chi-tiet-du-an" data-project-idx="${idx}" class="spa-link select-project-btn profile-card p-4 flex items-start gap-3.5 group">
                ${renderCardVisual(item, 'ri-folder-3-line', 'w-10 h-10')}
                <div class="flex flex-col gap-1 min-w-0">
                  <h3 class="font-semibold text-[0.95rem] group-hover:text-sky-400 transition-colors">${escHtml(item.title)}</h3>
                  <p class="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">${escHtml(item.desc)}</p>
                </div>
              </a>
            `).join('') : '<p class="text-sm text-[hsl(var(--muted-foreground))]">Chưa có dự án nào được thêm.</p>'}
        </div>
      </section>
    `;
    }
  },

  'chi-tiet-du-an': {
    title: 'Nhật Tình',
    docTitle: 'Chi Tiết Dự Án — Nhật Tình',
    render: () => {
      const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG;
      const list = cfg.myProjects || window.DEFAULT_SITE_CONFIG.myProjects || [];
      let idx = 0;
      try {
        const saved = parseInt(sessionStorage.getItem('selected_project_idx'), 10);
        if (!isNaN(saved) && list[saved]) idx = saved;
      } catch (_) {}
      const item = list[idx] || { title: 'Dự án', desc: '', url: '#', adminUrl: '', githubUrl: '' };
      const isInternalUrl = item.url && item.url.startsWith('/');

      return `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-start gap-3">
          <a href="/du-an" data-spa="du-an" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Quay lại Dự án
          </a>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-x-6 md:gap-y-0">
        <div class="md:min-w-36 shrink-0">
          <h2 class="text-xl font-semibold">Chi Tiết</h2>
        </div>
        <div class="flex-1 profile-card p-5 flex flex-col gap-4">
          <div class="flex items-start gap-4 border-b border-[hsl(var(--border))] pb-4">
            ${renderCardVisual(item, 'ri-folder-3-line', 'w-12 h-12')}
            <div class="min-w-0">
              <h3 class="text-lg font-bold text-sky-400">${escHtml(item.title)}</h3>
              <p class="text-sm text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">${escHtml(item.desc)}</p>
            </div>
          </div>

          ${renderProjectVideo(item.videoUrl)}

          <div class="flex flex-col gap-2.5">
            ${item.url ? (isInternalUrl
              ? `<a href="${escHtml(item.url)}" data-spa="${escHtml(item.url.replace(/^\//, ''))}" class="spa-link flex items-center justify-between rounded-xl border border-sky-500/40 bg-sky-500/15 px-4 py-3 text-sm font-semibold text-sky-400 hover:bg-sky-500/25 transition-colors">
                  <span class="flex items-center gap-2"><i class="ri-global-line text-lg"></i> Mở Link Dự Án</span>
                  <i class="ri-arrow-right-line"></i>
                </a>`
              : `<a href="${escHtml(item.url)}" target="_blank" rel="noopener" class="flex items-center justify-between rounded-xl border border-sky-500/40 bg-sky-500/15 px-4 py-3 text-sm font-semibold text-sky-400 hover:bg-sky-500/25 transition-colors">
                  <span class="flex items-center gap-2"><i class="ri-global-line text-lg"></i> Mở Link Dự Án</span>
                  <i class="ri-external-link-line"></i>
                </a>`) : ''}

            ${item.adminUrl && item.adminUrl.trim() ? `
              <a href="${escHtml(item.adminUrl)}" target="_blank" rel="noopener" class="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                <span class="flex items-center gap-2"><i class="ri-admin-line text-lg"></i> Mở Link Admin Dự Án</span>
                <i class="ri-external-link-line"></i>
              </a>
            ` : ''}

            ${item.githubUrl && item.githubUrl.trim() ? `
              <a href="${escHtml(item.githubUrl)}" target="_blank" rel="noopener" class="flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-3 text-sm font-semibold hover:border-sky-400 hover:text-sky-400 transition-colors">
                <span class="flex items-center gap-2"><i class="ri-github-fill text-lg"></i> Mở Link GitHub</span>
                <i class="ri-external-link-line"></i>
              </a>
            ` : ''}
          </div>
        </div>
      </section>
    `;
    }
  },

  locketlam: {
    title: 'Nhật Tình',
    docTitle: 'LocketGold — Nhật Tình',
    render: () => {
      const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG;
      const servers = cfg.dnsServers || window.DEFAULT_SITE_CONFIG.dnsServers;

      return `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-between gap-3">
          <a href="/" data-spa="home" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Về Trang Chủ
          </a>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Locket DNS</h2>
        </div>
        <div class="flex-1 flex flex-col gap-3">
          ${servers.map((srv) => `
            <div class="profile-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <i class="ri-server-line text-2xl text-sky-400"></i>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-sm">${escHtml(srv.name)}</h3>
                    <span class="server-ping-badge text-[11px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-mono" data-ping-url="${escHtml(srv.url)}">Checking...</span>
                  </div>
                  <p class="text-xs text-[hsl(var(--muted-foreground))] font-mono truncate max-w-[260px]">${escHtml(srv.url)}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <a
                  href="/tai-ho-so"
                  data-spa="tai-ho-so"
                  data-server-name="${escHtml(srv.name)}"
                  data-server-url="${escHtml(srv.url)}"
                  data-server-file="${escHtml(srv.fileUrl || '')}"
                  class="spa-link select-server-btn rounded-lg bg-sky-500/15 border border-sky-500/40 px-3.5 py-1.5 text-xs font-medium text-sky-400 hover:bg-sky-500/25 transition-colors"
                >
                  Tải Hồ Sơ
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Shadowrocket</h2>
        </div>
        <div class="flex-1 profile-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="font-semibold text-sm">Cấu hình Shadowrocket / Mobileconfig</h3>
            <p class="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Hỗ trợ iOS 15 – iOS 19, chặn thu hồi chứng chỉ &amp; mở khóa Locket Gold.</p>
          </div>
          <a href="/lay-url" data-spa="lay-url" class="spa-link rounded-lg bg-sky-500/15 border border-sky-500/40 px-3.5 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500/25 shrink-0 transition-colors">
            <i class="ri-links-line mr-1"></i>Lấy URL
          </a>
        </div>
      </section>

      <section id="huong-dan" class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Hướng Dẫn</h2>
        </div>
        <div class="flex-1 profile-card p-4 flex flex-col gap-2 text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
          <p><strong class="text-[hsl(var(--foreground))]">Bước 1:</strong> Tải ứng dụng Shadowrocket hoặc cài đặt hồ sơ DNS DoH.</p>
          <p><strong class="text-[hsl(var(--foreground))]">Bước 2:</strong> Chọn 1 trong các máy chủ có độ trễ thấp nhất (ping xanh).</p>
          <p><strong class="text-[hsl(var(--foreground))]">Bước 3:</strong> Vào Cài đặt iPhone → Cài đặt chung → VPN &amp; Quản lý thiết bị → Tin cậy hồ sơ.</p>
          <p><strong class="text-[hsl(var(--foreground))]">Bước 4:</strong> Khởi động lại Locket và tận hưởng Gold VIP!</p>
        </div>
      </section>
    `;
    }
  },

  'tai-ho-so': {
    title: 'Nhật Tình',
    docTitle: 'Tải Hồ Sơ LocketGold — Nhật Tình',
    render: () => `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-between gap-3">
          <a href="/locketlam" data-spa="locketlam" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Quay lại LocketGold
          </a>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Xác Thực</h2>
        </div>
        <div class="flex-1 profile-card p-5 flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center text-xl">
                <i class="ri-shield-keyhole-line"></i>
              </div>
              <div>
                <h3 id="selected-server-name" class="font-semibold text-sm">Máy Chủ 01</h3>
                <p id="selected-server-url" class="text-xs text-[hsl(var(--muted-foreground))] font-mono">https://cloudflare-dns.com/dns-query</p>
              </div>
            </div>
            <span class="rounded-full bg-sky-500/15 px-2.5 py-1 text-[11px] font-medium text-sky-400">
              Yêu cầu xác nhận
            </span>
          </div>

          <div class="flex flex-col gap-3.5">
            <div class="flex flex-col gap-1.5">
              <label for="input-locket-link" class="text-xs font-semibold text-[hsl(var(--foreground))]">
                1. Nhập Link Locket của bạn
              </label>
              <input
                id="input-locket-link"
                type="url"
                placeholder="https://locket.camera/links/..."
                class="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))/0.7] px-3.5 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="input-admin-code" class="text-xs font-semibold text-[hsl(var(--foreground))]">
                2. Nhập mã do Admin cung cấp
              </label>
              <input
                id="input-admin-code"
                type="text"
                placeholder="Nhập mã xác thực từ Admin..."
                class="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))/0.7] px-3.5 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors font-mono"
              />
            </div>

            <p id="verify-status" class="text-xs text-[hsl(var(--muted-foreground))]">
              Vui lòng nhập đầy đủ Link Locket và đúng mã từ Admin để mở khóa nút tải xuống.
            </p>

            <button
              type="button"
              id="btn-download-profile"
              disabled
              class="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-45 disabled:cursor-not-allowed hover:bg-sky-400 shadow-md shadow-sky-500/20"
            >
              <i class="ri-download-cloud-2-line text-lg"></i>
              <span>Tải Xuống File Hồ Sơ (.mobileconfig)</span>
            </button>
          </div>
        </div>
      </section>
    `
  },

  'lay-url': {
    title: 'Nhật Tình',
    docTitle: 'Lấy URL Cấu Hình — Nhật Tình',
    render: () => `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-start gap-3">
          <a href="/locketlam" data-spa="locketlam" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Quay lại LocketGold
          </a>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Xác Thực</h2>
        </div>
        <div class="flex-1 profile-card p-5 flex flex-col gap-4">
          <div class="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-3">
            <div class="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center text-xl">
              <i class="ri-key-2-line"></i>
            </div>
            <div>
              <h3 class="font-semibold text-sm">Lấy URL Shadowrocket &amp; DNS</h3>
              <p class="text-xs text-[hsl(var(--muted-foreground))]">Nhập mã xác nhận do Admin cung cấp để xem liên kết</p>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <label for="input-url-admin-code" class="text-xs font-semibold text-[hsl(var(--foreground))]">
              Mã do Admin cung cấp
            </label>
            <input
              id="input-url-admin-code"
              type="text"
              placeholder="Nhập mã Admin tại đây..."
              class="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))/0.7] px-3.5 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors font-mono"
            />
            <p id="url-verify-status" class="text-xs text-[hsl(var(--muted-foreground))]">
              Vui lòng nhập đúng mã do Admin cung cấp để tiếp tục.
            </p>
            <button
              type="button"
              id="btn-verify-url-code"
              class="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-400 transition-all shadow-md shadow-sky-500/20"
            >
              <i class="ri-shield-check-line text-lg"></i>
              <span>Xác Nhận &amp; Mở URL</span>
            </button>
          </div>
        </div>
      </section>
    `
  },

  'danh-sach-url': {
    title: 'Nhật Tình',
    docTitle: 'Danh Sách URL — Nhật Tình',
    render: () => {
      const cfg = window.SITE_CONFIG || window.DEFAULT_SITE_CONFIG;
      const urls = cfg.shadowrocketUrls || window.DEFAULT_SITE_CONFIG.shadowrocketUrls;

      return `
      <section class="flex flex-col gap-y-5 md:flex-row md:gap-y-0">
        <div class="md:min-w-36">
          <h2 class="text-xl font-semibold">Menu</h2>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-between gap-3">
          <a href="/locketlam" data-spa="locketlam" class="spa-link inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium hover:border-sky-400 hover:text-sky-400 transition-all">
            <span>←</span> Quay lại LocketGold
          </a>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
            <i class="ri-checkbox-circle-line"></i> Đã xác thực
          </span>
        </div>
      </section>

      <section class="flex flex-col gap-y-5 md:flex-row md:gap-x-6 md:gap-y-0">
        <div class="md:min-w-40 shrink-0">
          <h2 class="text-xl font-semibold">Danh Sách URL</h2>
        </div>
        <div class="flex-1 flex flex-col gap-3">
          ${[
            {
              label: '1. Link .conf (Shadowrocket)',
              icon: 'ri-file-code-line',
              url: urls.conf
            },
            {
              label: '2. Link .sgmodule (Module)',
              icon: 'ri-puzzle-line',
              url: urls.sgmodule
            },
            {
              label: '3. Link DNS (DoH)',
              icon: 'ri-global-line',
              url: urls.dns
            }
          ].map((item) => `
            <div class="profile-card p-4 flex flex-col gap-2.5">
              <div class="flex items-center gap-2 text-sm font-semibold text-sky-400">
                <i class="${item.icon} text-lg"></i>
                <span>${item.label}</span>
              </div>
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  readonly
                  value="${escHtml(item.url)}"
                  class="flex-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))/0.7] px-3 py-2 text-xs font-mono text-[hsl(var(--foreground))] outline-none"
                />
                <button
                  type="button"
                  data-ws-copy="${escHtml(item.url)}"
                  class="rounded-xl bg-sky-500/15 border border-sky-500/40 px-4 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500/25 transition-colors shrink-0"
                >
                  <i class="ri-file-copy-line mr-1"></i>Copy Link
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    }
  }
};
