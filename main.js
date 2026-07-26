gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ============================
   0. Lenis 스무스 스크롤 + gsap 연동
============================ */
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ============================
   1. main 섹션 - 페이지 진입 애니메이션 (스크롤 X, 로드시 바로)
   주의: .from()은 "현재 스타일 -> from에 준 값" 이 아니라
   "from에 준 값 -> 현재(=최종) 스타일" 로 재생된다.
   따라서 여기서 미리 opacity:0 을 gsap.set으로 박아두면
   "현재 스타일"까지 0이 되어 버려서 끝나고도 계속 안 보이게 된다.
   -> 별도의 set 없이 from()만 사용해서, 최종값은 항상 CSS 원래 값(보이는 상태)이 되게 한다.
============================ */
function initMainSection() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".line1", { opacity: 0, x: -40, rotate: 20, duration: 0.9 })
    .from(".flower-img", { opacity: 0, y: -20, rotate: -10, duration: 0.6 }, "-=0.5")
    .from(".title", { opacity: 0, y: 20, duration: 0.7 }, "-=0.2")
    .from(".wedding-img img", { opacity: 0, scale: 0.85, duration: 0.9, ease: "power2.out" }, "-=0.3")
    .from(".tape1", { opacity: 0, x: -30, y: -20, rotate: -90, duration: 0.5, ease: "back.out(2)" }, "-=0.4")
    .from(".tape2", { opacity: 0, x: 30, y: 20, rotate: -90, duration: 0.5, ease: "back.out(2)" }, "-=0.35")
    .from(
      [".main-txt > p", ".main-txt > h2", ".txt-line", ".txt-date", ".txt-location"],
      { opacity: 0, y: 24, duration: 0.6, stagger: 0.15 },
      "-=0.3"
    )
    .from(".line2", { opacity: 0, x: 40, rotate: -20, duration: 0.8 }, "-=0.2");
}

/* ============================
   2. invitation 섹션 - 큐피트/하트/편지글 등장
============================ */
function initInvitationSection() {
  const trigger = {
    trigger: ".inviation",
    start: "top 75%",
  };

  const cupidTl = gsap.timeline({ scrollTrigger: trigger });

  cupidTl
    .from(".cupid1", {
      opacity: 0,
      x: -220,
      y: -30,
      rotate: -35,
      scale: 0.6,
      duration: 1.1,
      ease: "power3.out",
    })
    .from(
      ".cupid2",
      {
        opacity: 0,
        x: 220,
        y: -30,
        rotate: 35,
        scale: 0.6,
        duration: 1.1,
        ease: "power3.out",
      },
      "<" // 좌우 동시에 날아옴
    )
    .from(
      ".heart",
      {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: "back.out(2)",
      },
      "-=0.25" // 큐피트가 하트 옆에 붙기 직전 하트 팝인
    );

  gsap.from(".invitation-txt .txt-title", {
    scrollTrigger: trigger,
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.35,
  });

  gsap.from(".invitation-txt p", {
    scrollTrigger: trigger,
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
  });

  gsap.from(".invitation-img", {
    scrollTrigger: {
      trigger: ".invitation-img",
      start: "top 90%",
    },
    opacity: 0,
    y: 60,
    rotate: -6,
    duration: 1,
    ease: "power2.out",
  });
}

/* ============================
   3. dateNloca 섹션 - 날짜/캘린더/위치 안내
============================ */
function initDateLocaSection() {
  gsap.from(".dateNloca-img img", {
    scrollTrigger: { trigger: ".dateNloca-img", start: "top 85%" },
    opacity: 0,
    scale: 0.6,
    rotate: -20,
    duration: 0.7,
    ease: "back.out(1.7)",
  });

  gsap.from(".dateNloca .date h2, .dateNloca .date p", {
    scrollTrigger: { trigger: ".dateNloca .date", start: "top 85%" },
    opacity: 0,
    y: 16,
    duration: 0.6,
    stagger: 0.1,
  });

  gsap.from(".date2-cal > div", {
    scrollTrigger: { trigger: ".date2", start: "top 80%" },
    opacity: 0,
    scaleY: 0,
    duration: 0.5,
    stagger: 0.12,
    ease: "power2.out",
  });

  const countTl = gsap.timeline({
    scrollTrigger: { trigger: ".date-txt", start: "top 85%" },
  });
  countTl
    .from(".date-txt p", { opacity: 0, y: 14, duration: 0.5 })
    .from(".date-txt .count", { opacity: 0, scale: 0.85, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");

  gsap.from(".location-txt .txt-title, .location-txt p", {
    scrollTrigger: { trigger: ".location-txt", start: "top 85%" },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
  });

  gsap.from(".location-map .map", {
    scrollTrigger: { trigger: ".location-map", start: "top 85%" },
    opacity: 0,
    scale: 0.95,
    duration: 0.6,
    ease: "power2.out",
  });

  gsap.from(".location-info li", {
    scrollTrigger: { trigger: ".location-info", start: "top 88%" },
    opacity: 0,
    x: -24,
    duration: 0.5,
    stagger: 0.1,
  });

  gsap.from(".map-list li", {
    scrollTrigger: { trigger: ".map-list", start: "top 90%" },
    opacity: 0,
    y: 20,
    scale: 0.9,
    duration: 0.45,
    stagger: 0.08,
    ease: "back.out(1.7)",
  });
}

/* ============================
   4. schedule 섹션
============================ */
function initScheduleSection() {
  gsap.from(".schedule .txt-title", {
    scrollTrigger: { trigger: ".schedule", start: "top 80%" },
    opacity: 0,
    y: 24,
    duration: 0.7,
    ease: "power2.out",
  });

  gsap.utils.toArray(".schedule-item").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: "top 88%" },
      opacity: 0,
      x: i % 2 === 0 ? -30 : 30,
      duration: 0.7,
      ease: "power2.out",
    });
  });

  initSchedulePathAndBird();
}

/* 스크롤에 맞춰 중앙 물결선이 그려지고, 새가 그 선을 따라 내려간다 */
function initSchedulePathAndBird() {
  const path = document.querySelector("#schedulePath");
  const bird = document.querySelector(".schedule-bird");
  if (!path || !bird) return;

  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".schedule-list",
      start: "top 75%",
      end: "bottom 60%",
      scrub: 1,
    },
  });

  // 선 그리기와 새 이동을 같은 진행률(0)에서 시작해 동시에 진행
  tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0).to(
    bird,
    {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
      },
      ease: "none",
    },
    0
  );
}

/* ============================
   5. 실시간 카운트다운 (결혼식: 2026-10-10 13:30)
============================ */
function initCountdown() {
  const countEl = document.querySelector(".date-txt .count");
  if (!countEl) return;

  const target = new Date(2026, 9, 10, 13, 30, 0).getTime(); // month는 0부터 시작 -> 9 = 10월

  function update() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      countEl.textContent = "저희 결혼식이 진행 중입니다";
      clearInterval(timer);
      return;
    }

    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((diff % (1000 * 60)) / 1000);

    countEl.textContent = `${day}일 ${hour}시간 ${min}분 ${sec}초`;
  }

  update();
  const timer = setInterval(update, 1000);
}

/* ============================
   6. 웨딩 사진첩 팝업 (2열 리스트 + 클릭시 슬라이드 뷰어)
============================ */
function initImgPopup() {
  const openBtn = document.querySelector(".img-more-btn");
  const popup = document.querySelector(".img-popup");
  const closeBtn = document.querySelector(".img-popup-close");
  const card = document.querySelector(".img-popup-card");
  const thumbs = gsap.utils.toArray(".img-popup-list img");
  if (!openBtn || !popup || !card) return;

  function openPopup() {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
    lenis.stop();

    gsap.fromTo(
      card,
      { opacity: 0, y: 30, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
    );
    gsap.fromTo(
      ".img-popup-list",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, delay: 0.1, ease: "power2.out" }
    );
  }

  function closePopup() {
    gsap.to(card, {
      opacity: 0,
      y: 20,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        popup.classList.remove("active");
        document.body.style.overflow = "";
        lenis.start();
      },
    });
  }

  openBtn.addEventListener("click", openPopup);
  closeBtn.addEventListener("click", closePopup);

  // 어두운 배경 클릭 시 닫기
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  // ESC로 닫기 (슬라이더가 열려있지 않을 때만 팝업을 닫음)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("active") && !document.querySelector(".img-slider.active")) {
      closePopup();
    }
  });

  // 썸네일 클릭 -> 해당 사진부터 슬라이드 뷰어 오픈
  const images = thumbs.map((img) => img.getAttribute("src"));
  const openSlider = initImgSlider(images);

  thumbs.forEach((img, i) => {
    img.closest(".img-popup-list").addEventListener("click", () => openSlider(i));
  });
}

/* 사진 슬라이드 뷰어: 클릭한 사진부터 좌우로 넘겨볼 수 있음 */
function initImgSlider(images) {
  const slider = document.querySelector(".img-slider");
  const sliderImg = document.querySelector(".img-slider-img");
  const closeBtn = document.querySelector(".img-slider-close");
  const prevBtn = document.querySelector(".img-slider-prev");
  const nextBtn = document.querySelector(".img-slider-next");
  const currentEl = document.querySelector(".img-slider-count .current");
  const totalEl = document.querySelector(".img-slider-count .total");
  if (!slider || !sliderImg || images.length === 0) return () => {};

  let index = 0;
  totalEl.textContent = images.length;

  function render(direction = 0) {
    currentEl.textContent = index + 1;
    if (direction === 0) {
      sliderImg.src = images[index];
      return;
    }
    gsap.to(sliderImg, {
      opacity: 0,
      x: direction * -24,
      duration: 0.15,
      ease: "power1.in",
      onComplete: () => {
        sliderImg.src = images[index];
        gsap.fromTo(sliderImg, { opacity: 0, x: direction * 24 }, { opacity: 1, x: 0, duration: 0.25, ease: "power1.out" });
      },
    });
  }

  function open(startIndex) {
    index = startIndex;
    render(0);
    slider.classList.add("active");
    document.body.style.overflow = "hidden";
    lenis.stop();
    gsap.fromTo(".img-slider-stage", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  }

  function close() {
    slider.classList.remove("active");
    document.body.style.overflow = "";
    lenis.start();
  }

  function next() {
    index = (index + 1) % images.length;
    render(1);
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    render(-1);
  }

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  slider.addEventListener("click", (e) => {
    if (e.target === slider) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!slider.classList.contains("active")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // 터치 스와이프로도 넘기기
  let touchStartX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  slider.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) < 40) return;
      diff < 0 ? next() : prev();
    },
    { passive: true }
  );

  return open;
}

/* ============================
   7. 마음 전하실 곳 - 계좌 아코디언 + 복사
============================ */
function initHeartMoney() {
  gsap.from(".heartmoney .txt-title, .heartmoney-desc", {
    scrollTrigger: { trigger: ".heartmoney", start: "top 82%" },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
  });

  gsap.from(".account-group", {
    scrollTrigger: { trigger: ".heartmoney", start: "top 75%" },
    opacity: 0,
    y: 24,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
  });

  document.querySelectorAll(".account-toggle").forEach((btn) => {
    const panel = document.getElementById(btn.dataset.target);
    if (!panel) return;

    btn.addEventListener("click", () => {
      const isOpen = btn.classList.toggle("open");

      if (isOpen) {
        const targetHeight = panel.scrollHeight;
        gsap.fromTo(
          panel,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.35,
            ease: "power2.inOut",
            onComplete: () => {
              panel.style.height = "auto";
            },
          }
        );
      } else {
        gsap.set(panel, { height: panel.scrollHeight });
        gsap.to(panel, { height: 0, duration: 0.3, ease: "power2.inOut" });
      }
    });
  });

  document.querySelectorAll(".account-copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // 클립보드 API를 못 쓰는 환경 대비 fallback
        const temp = document.createElement("textarea");
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }

      const original = btn.textContent;
      btn.textContent = "복사완료";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 1500);
    });
  });
}

/* ============================
   8. 한마디 전하는 곳 - 방명록
   주의: 백엔드가 없어 localStorage에만 저장됨.
   -> 이 브라우저(=신랑/신부 본인 기기)에서만 보이고,
      실제 하객들끼리는 서로의 메시지를 못 봄.
      진짜 방명록으로 쓰려면 별도 서버/DB 연동이 필요함.
============================ */
function initGuestbook() {
  gsap.from(".guestbook .txt-title, .guestbook-desc, .guestbook-form", {
    scrollTrigger: { trigger: ".guestbook", start: "top 82%" },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
  });

  const form = document.querySelector(".guestbook-form");
  const nameInput = document.querySelector(".guestbook-name");
  const msgInput = document.querySelector(".guestbook-msg");
  const list = document.querySelector(".guestbook-list");
  if (!form || !list) return;

  const STORAGE_KEY = "wedding_guestbook_messages";

  function loadMessages() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  function formatDate(timestamp) {
    const d = new Date(timestamp);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  function createItem(entry) {
    const li = document.createElement("li");
    li.className = "guestbook-item";
    li.innerHTML = `
      <div class="guestbook-item-head">
        <span class="guestbook-item-name"></span>
        <span class="guestbook-item-date">${formatDate(entry.date)}</span>
      </div>
      <p class="guestbook-item-msg"></p>
    `;
    li.querySelector(".guestbook-item-name").textContent = entry.name;
    li.querySelector(".guestbook-item-msg").textContent = entry.msg;
    return li;
  }

  function renderAll() {
    const messages = loadMessages();
    list.innerHTML = "";
    if (messages.length === 0) {
      const empty = document.createElement("li");
      empty.className = "guestbook-empty";
      empty.textContent = "아직 남겨진 메시지가 없어요. 첫 축하 인사를 남겨주세요!";
      list.appendChild(empty);
      return;
    }
    messages
      .slice()
      .reverse()
      .forEach((entry) => list.appendChild(createItem(entry)));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();
    if (!name || !msg) return;

    const messages = loadMessages();
    messages.push({ name, msg, date: Date.now() });
    saveMessages(messages);

    renderAll();
    gsap.from(list.firstElementChild, { opacity: 0, y: -12, duration: 0.4, ease: "power2.out" });

    form.reset();
  });

  renderAll();
}

/* ============================
   9. thankyou 섹션
============================ */
function initThankYou() {
  gsap.from(".thankyou .txt-title, .thankyou .txt-line, .thankyou-txt, .thankyou-sign", {
    scrollTrigger: { trigger: ".thankyou", start: "top 82%" },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMainSection();
  initInvitationSection();
  initDateLocaSection();
  initScheduleSection();
  initCountdown();
  initImgPopup();
  initHeartMoney();
  initGuestbook();
  initThankYou();
});