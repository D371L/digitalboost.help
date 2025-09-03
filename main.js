/* helpers */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

/* ===== starfield background ===== */
function starfield(){
    const c = document.getElementById('stars');
    const x = c.getContext('2d');
    let W = innerWidth, H = innerHeight;
    function resize(){
        W = innerWidth; H = innerHeight;
        const DPR = devicePixelRatio || 1;
        c.width = W * DPR; c.height = H * DPR;
        x.setTransform(DPR,0,0,DPR,0,0);
    }
    resize(); addEventListener('resize', resize);
    const stars = Array.from({length: 140}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: 0.2 + Math.random() * 0.9,
        s: 0.6 + Math.random() * 1.8
    }));
    (function tick(){
        x.clearRect(0,0,W,H);
        stars.forEach(st => {
            st.x -= st.z * 0.35; if (st.x < -2) st.x = W+2;
            x.globalAlpha = st.z; x.fillStyle = '#9ad9ff';
            x.fillRect(st.x, st.y, st.s, st.s);
        });
        requestAnimationFrame(tick);
    })();
}

/* ===== i18n ===== */
const locales = {
    en:{nav_services:"SERVICES",nav_work:"WORK",nav_team:"TEAM",nav_partners:"PARTNERS",nav_contact:"CONTACT",
        hero_title:"Your Partner in Digital Growth",hero_sub:"Expert Website Development & SEO Optimization",
        cta_audit:"Get a Free Audit",cta_work:"See Our Work",
        hero_badge_1:"Fast load",hero_badge_2:"SEO ready",hero_badge_3:"Mobile first",
        services_title:"OUR SERVICES",
        s1_title:"SEO Optimization",s1_text:"Boost your visibility on search engines through technical improvements, keyword strategy, and quality link building.",
        s1_li1:"Core Web Vitals and speed",s1_li2:"On-page structure and content",s1_li3:"Backlinks with quality control",
        s2_title:"Web Development",s2_text:"Modern, responsive, high-performing websites tailored to your goals.",
        s2_li1:"Clean code & reliable stack",s2_li2:"CMS or static by need",s2_li3:"Accessibility built in",
        s3_title:"Digital Branding",s3_text:"Clear identity, intuitive UX, sleek UI that convert.",
        s3_li1:"Brand voice & visuals",s3_li2:"Design system & UI kit",s3_li3:"Landing pages that sell",
        work_title:"OUR WORK – YOUR SUCCESS",
        w1_t:"Logistics landing and store",w1_p:"Faster load, higher conversions, better mobile UX.",
        w2_t:"Contractor services catalog",w2_p:"Clear navigation and SEO growth in a crowded niche.",
        w3_t:"Medical site and booking",w3_p:"Brand refresh, content structure, and appointment flow.",
        team_title:"OUR TEAM",
        partners_title:"PARTNERS",
        contact_title_1:"Ready to",contact_title_2:"level up",contact_sub:"Leave your info and we’ll contact you soon.",
        f_name:"Full name",f_phone:"Phone",f_email:"Email",f_msg:"Message",
        ph_name:"Full name",ph_phone:"+972",ph_email:"you@example.com",ph_msg:"Tell us about your project",
        f_send:"Send",f_note:"By sending you agree to our privacy policy.",toast_ok:"Thank you. We’ll get back to you soon.",
        privacy:"Privacy Policy",terms:"Terms"},
    ru:{nav_services:"УСЛУГИ",nav_work:"РАБОТЫ",nav_team:"КОМАНДА",nav_contact:"КОНТАКТЫ",
        hero_title:"Ваш партнер в цифровом росте",hero_sub:"Профессиональная разработка сайтов и SEO-оптимизация",
        cta_audit:"Получить бесплатный аудит",cta_work:"Посмотреть работы",
        hero_badge_1:"Быстрая загрузка",hero_badge_2:"Готовность к SEO",hero_badge_3:"Mobile first",
        services_title:"НАШИ УСЛУГИ",
        s1_title:"SEO оптимизация",s1_text:"Рост видимости за счёт технических улучшений, стратегии ключевых слов и качественных ссылок.",
        s1_li1:"Core Web Vitals и скорость",s1_li2:"Структура и контент",s1_li3:"Контроль качества ссылок",
        s2_title:"Разработка сайтов",s2_text:"Современные, быстрые и адаптивные сайты под цели бизнеса.",
        s2_li1:"Чистый код и надёжный стек",s2_li2:"CMS или статический сайт",s2_li3:"Доступность по стандартам",
        s3_title:"Цифровой брендинг",s3_text:"Ясная айдентика, понятный UX и аккуратный UI.",
        s3_li1:"Голос бренда и визуалы",s3_li2:"Дизайн-система и UI kit",s3_li3:"Лендинги с конверсией",
        work_title:"НАШИ РАБОТЫ — ВАШ УСПЕХ",
        w1_t:"Лендинг и магазин для логистики",w1_p:"Быстрее загрузка, выше конверсия, удобный мобильный UX.",
        w2_t:"Каталог услуг подрядчиков",w2_p:"Понятная навигация и рост SEO в нише.",
        w3_t:"Медицинский сайт с записью",w3_p:"Рефреш бренда, структура контента и запись на приём.",
        team_title:"КОМАНДА",
        partners_title:"ПАРТНЁРЫ",
        contact_title_1:"Готовы",contact_title_2:"расти",contact_sub:"Оставьте контакты — свяжемся скоро.",
        f_name:"Имя и фамилия",f_phone:"Телефон",f_email:"Email",f_msg:"Сообщение",
        ph_name:"Имя и фамилия",ph_phone:"+972",ph_email:"you@example.com",ph_msg:"Опишите задачу",
        f_send:"Отправить",f_note:"Отправляя форму, вы соглашаетесь с политикой конфиденциальности.",toast_ok:"Спасибо! Мы скоро свяжемся.",
        privacy:"Политика конфиденциальности",terms:"Условия"},
    he:{nav_services:"שירותים",nav_work:"פרויקטים",nav_team:"צוות",nav_contact:"צור קשר",
        hero_title:"השותף שלכם לצמיחה דיגיטלית",hero_sub:"פיתוח אתרים ואופטימיזציית SEO",
        cta_audit:"בדיקת אתר חינם",cta_work:"לראות פרויקטים",
        hero_badge_1:"טעינה מהירה",hero_badge_2:"מוכן ל-SEO",hero_badge_3:"נייד תחילה",
        services_title:"השירותים שלנו",
        s1_title:"אופטימיזציית SEO",s1_text:"נראות גבוהה בגוגל בעזרת SEO טכני, מחקר מלים וקישורים איכותיים.",
        s1_li1:"מהירות ו-Core Web Vitals",s1_li2:"מבנה ותוכן",s1_li3:"בניית קישורים מבוקרת",
        s2_title:"פיתוח אתרים",s2_text:"אתרים מודרניים ומהירים לפי מטרות העסק.",
        s2_li1:"קוד נקי וסטאק אמין",s2_li2:"CMS או סטטי לפי צורך",s2_li3:"נגישות כחלק מהעיצוב",
        s3_title:"מיתוג דיגיטלי",s3_text:"זהות ברורה, UX נוח ו-UI מלוטש.",
        work_title:"העבודות שלנו וההצלחה שלכם",
        w1_t:"דף נחיתה וחנות לוגיסטיקה",w1_p:"טעינה מהירה יותר, המרות גבוהות יותר וחוויית מובייל טובה.",
        w2_t:"קטלוג שירותי קבלנים",w2_p:"ניווט ברור וצמיחה אורגנית.",
        w3_t:"אתר רפואי ותורים",w3_p:"רענון מותג ומבנה תוכן.",
        team_title:"הצוות שלנו",
        partners_title:"שותפים",
        contact_title_1:"מוכנים",contact_title_2:"לעלות שלב",contact_sub:"השאירו פרטים ונחזור אליכם.",
        f_name:"שם מלא",f_phone:"טלפון",f_email:"אימייל",f_msg:"הודעה",
        ph_name:"שם מלא",ph_phone:"+972",ph_email:"you@example.com",ph_msg:"ספרו בקצרה על הפרויקט",
        f_send:"שליחה",f_note:"שליחה מהווה אישור למדיניות הפרטיות.",toast_ok:"תודה! נחזור אליכם בקרוב.",
        privacy:"מדיניות פרטיות",terms:"תנאים"}
};
let currentLang='en';
const t = k => locales[currentLang]?.[k] ?? k;

function applyLang(lang){
    if(!locales[lang]) return;
    currentLang = lang; localStorage.setItem('db_lang', lang);
    const dir = lang==='he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    $$('.lbtn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
    $$('[data-i18n]').forEach(el => el.textContent = t(el.getAttribute('data-i18n')));
    $$('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.getAttribute('data-i18n-placeholder')));
}
function i18nInit(){
    const saved = localStorage.getItem('db_lang');
    if(saved && locales[saved]) currentLang = saved;
    applyLang(currentLang);
    $$('.lbtn').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.lang)));
}

/* ===== Ticker: build seamless content and center start ===== */
function buildTicker(){
    const phrases = ["ACCESSIBILITY","ANALYTICS","PERFORMANCE","SECURITY"];
    const wrap = $('#tickerInner');
    // build long repeating line
    let str = "";
    for(let i=0;i<24;i++){ // 24 makes it wide enough for any screen, duplicates
        str += `<span>${phrases[i % phrases.length]}</span>`;
    }
    wrap.innerHTML = str;
}

/* ===== Slider: infinite, responsive, swipe, autoplay ===== */
function slider(root){
    const viewport = root.querySelector('.viewport');
    const track = root.querySelector('.track');
    const prev = root.querySelector('.sbtn.prev');
    const next = root.querySelector('.sbtn.next');
    const dotsWrap = $('#sdots');

    let slides = [...track.children];
    let index = 0, perView = 1, slideW = 0, autoTimer;

    function calc(){
        const w = viewport.clientWidth;
        perView = w >= 1200 ? 3 : w >= 900 ? 2 : 1;
        slideW = w / perView;
        // set widths
        track.style.transition = 'none';
        [...track.children].forEach(el => el.style.width = `${slideW}px`);
        // rebuild clones for infinite
        track.innerHTML = '';
        const clonesBefore = slides.slice(-perView).map(el => el.cloneNode(true));
        const clonesAfter  = slides.slice(0, perView).map(el => el.cloneNode(true));
        clonesBefore.forEach(el => track.appendChild(el));
        slides.forEach(el => track.appendChild(el));
        clonesAfter.forEach(el => track.appendChild(el));
        // update ref to all nodes
        index = perView; // start at first real slide
        track.style.transform = `translateX(${-index*slideW}px)`;
        requestAnimationFrame(()=> track.style.transition = 'transform .45s ease');
        // dots
        dotsWrap.innerHTML = '';
        for(let i=0;i<Math.ceil(slides.length/perView);i++){
            const b = document.createElement('button');
            if(i===0) b.classList.add('active');
            b.addEventListener('click', ()=>goTo(i*perView + perView));
            dotsWrap.appendChild(b);
        }
    }

    function goTo(to){
        index = to;
        track.style.transform = `translateX(${-index*slideW}px)`;
        updateDots();
    }
    function updateDots(){
        const logical = Math.floor((index - perView) / perView) % Math.ceil(slides.length/perView);
        $$('#sdots button').forEach((b,k)=>b.classList.toggle('active', k===((logical+Math.ceil(slides.length/perView))%Math.ceil(slides.length/perView))));
    }
    function nextSlide(){ goTo(index + perView); }
    function prevSlide(){ goTo(index - perView); }

    track.addEventListener('transitionend', ()=>{
        if(index >= slides.length + perView){
            track.style.transition='none';
            index = perView;
            track.style.transform = `translateX(${-index*slideW}px)`;
            requestAnimationFrame(()=> track.style.transition='transform .45s ease');
        }
        if(index < perView){
            track.style.transition='none';
            index = slides.length + perView - perView;
            track.style.transform = `translateX(${-index*slideW}px)`;
            requestAnimationFrame(()=> track.style.transition='transform .45s ease');
        }
    });

    // swipe
    let startX = 0, dx = 0, dragging = false;
    viewport.addEventListener('pointerdown', e=>{ dragging=true; startX=e.clientX; track.style.transition='none'; viewport.setPointerCapture(e.pointerId); });
    viewport.addEventListener('pointermove', e=>{
        if(!dragging) return;
        dx = e.clientX - startX;
        track.style.transform = `translateX(${-(index*slideW - dx)}px)`;
    });
    function endSwipe(){
        if(!dragging) return;
        dragging=false; track.style.transition='transform .45s ease';
        if(Math.abs(dx) > slideW*0.2){ dx>0 ? prevSlide() : nextSlide(); } else { goTo(index); }
        dx = 0;
    }
    viewport.addEventListener('pointerup', endSwipe);
    viewport.addEventListener('pointercancel', endSwipe);
    viewport.addEventListener('pointerleave', endSwipe);

    // autoplay
    function startAuto(){ stopAuto(); autoTimer = setInterval(nextSlide, 4500); }
    function stopAuto(){ if(autoTimer) clearInterval(autoTimer); }
    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
    addEventListener('resize', calc);

    calc(); startAuto();
}

/* ===== interactions ===== */
document.addEventListener('DOMContentLoaded', () => {
    // year
    $('#year').textContent = new Date().getFullYear();
    // burger
    $('#burger').addEventListener('click', () => $('#navm').toggleAttribute('hidden'));
    // starfield
    starfield();
    // i18n
    i18nInit();
    // ticker
    buildTicker();
    // slider
    slider($('#workSlider'));
    // form
    const form = $('#form'), toast = $('#toast');
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        console.log('lead:', data); // подключим реальный endpoint позже
        toast.textContent = t('toast_ok'); toast.style.display='block';
        form.reset(); setTimeout(()=>toast.style.display='none', 3500);
    });
});
