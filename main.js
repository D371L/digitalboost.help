const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function starfield(){
    const c = document.getElementById('stars');
    if(!c) return;
    const x = c.getContext('2d');
    let W = innerWidth, H = innerHeight, DPR = devicePixelRatio || 1;

    function resize(){
        W = innerWidth; H = innerHeight; DPR = devicePixelRatio || 1;
        c.width = W * DPR; c.height = H * DPR;
        x.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();
    addEventListener('resize', resize, {passive:true});

    const stars = Array.from({length:160}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: 0.25 + Math.random() * 0.9,
        s: 0.6 + Math.random() * 1.8
    }));

    (function tick(){
        x.clearRect(0,0,W,H);
        for(const st of stars){
            st.x -= st.z * 0.35;
            if (st.x < -2) st.x = W + 2;
            x.globalAlpha = st.z;
            x.fillStyle = '#9ad9ff';
            x.fillRect(st.x, st.y, st.s, st.s);
        }
        requestAnimationFrame(tick);
    })();
}

const locales = {
    en:{nav_services:"SERVICES",nav_work:"WORK",nav_team:"TEAM",nav_partners:"PARTNERS",nav_contact:"CONTACT",
        hero_title:"Your Partner in Digital Growth",hero_sub:"Expert Website Development & SEO Optimization",
        cta_audit:"Get a Free Consultation",cta_work:"See Our Work",
        hero_badge_1:"Fast load",hero_badge_2:"SEO ready",hero_badge_3:"Mobile first",
        services_title:"OUR SERVICES",
        s1_title:"SEO Optimization",s1_text:"Boost your visibility on search engines through technical improvements, keyword strategy, and quality link building.",
        s1_li1:"Core Web Vitals and speed",s1_li2:"On-page structure and content",s1_li3:"Backlinks with quality control",
        s2_title:"Web Development",s2_text:"Modern, responsive, high-performing websites tailored to your goals.",
        s2_li1:"Clean code & reliable stack",s2_li2:"CMS or static by need",s2_li3:"Accessibility built in",
        s3_title:"Digital Branding",s3_text:"Clear identity, intuitive UX, sleek UI that convert.",
        s3_li1:"Brand voice & visuals",s3_li2:"Design system & UI kit",s3_li3:"Landing pages that sell",
        work_title:"OUR WORK – YOUR SUCCESS",
        team_title:"OUR TEAM",
        partners_title:"PARTNERS",
        contact_title_1:"Ready to",contact_title_2:"level up",contact_sub:"Leave your info and we’ll contact you soon.",
        f_name:"Full name",f_phone:"Phone",f_email:"Email",f_msg:"Message",
        ph_name:"Full name",ph_phone:"+972",ph_email:"you@example.com",ph_msg:"Tell us about your project",
        f_send:"Send",f_note:"By sending you agree to our privacy policy.",toast_ok:"Thank you. We’ll get back to you soon.",
        privacy:"Privacy Policy",terms:"Terms"},
    ru:{nav_services:"УСЛУГИ", nav_work:"РАБОТЫ", nav_team:"КОМАНДА", nav_partners:"ПАРТНЁРЫ", nav_contact:"КОНТАКТЫ",
        hero_title:"Ваш партнер в цифровом росте", hero_sub:"Профессиональная разработка сайтов и SEO оптимизация",
        cta_audit:"Получите бесплатную консультацию", cta_work:"Посмотреть работы",
        hero_badge_1:"Быстрая загрузка", hero_badge_2:"Готовность к SEO", hero_badge_3:"Mobile first",
        services_title:"НАШИ УСЛУГИ",
        s1_title:"SEO оптимизация", s1_text:"Рост видимости за счёт технических улучшений, стратегии ключевых слов и качественных ссылок.",
        s1_li1:"Core Web Vitals и скорость", s1_li2:"Структура и контент", s1_li3:"Контроль качества ссылок",
        s2_title:"Разработка сайтов", s2_text:"Современные, быстрые и адаптивные сайты под цели бизнеса.",
        s2_li1:"Чистый код и надёжный стек", s2_li2:"CMS или статический сайт", s2_li3:"Доступность по стандартам",
        s3_title:"Цифровой брендинг", s3_text:"Ясная айдентика, понятный UX и аккуратный UI.",
        s3_li1:"Голос бренда и визуальные элементы",
        s3_li2:"Design system и UI kit",
        s3_li3:"Лендинги с высокой конверсией",
        work_title:"НАШИ РАБОТЫ — ВАШ УСПЕХ",
        team_title:"КОМАНДА",
        partners_title:"ПАРТНЁРЫ",
        contact_title_1:"Готовы", contact_title_2:"расти", contact_sub:"Оставьте контакты, свяжемся скоро.",
        f_name:"Имя и фамилия", f_phone:"Телефон", f_email:"Email", f_msg:"Сообщение",
        ph_name:"Имя и фамилия", ph_phone:"+972", ph_email:"you@example.com", ph_msg:"Опишите задачу",
        f_send:"Отправить", f_note:"Отправляя форму, вы соглашаетесь с политикой конфиденциальности.", toast_ok:"Спасибо. Мы скоро свяжемся.",
        privacy:"Политика конфиденциальности", terms:"Условия"},
    he:{nav_services:"שירותים",nav_work:"פרויקטים",nav_team:"צוות",nav_partners:"שותפים",nav_contact:"צור קשר",
        hero_title:"השותף שלכם לצמיחה דיגיטלית",hero_sub:"פיתוח אתרים ואופטימיזציית SEO ברמה גבוהה",
        cta_audit:"קבלו ייעוץ חינם",cta_work:"צפו בעבודות שלנו",
        hero_badge_1:"טעינה מהירה",hero_badge_2:"מוכן ל-SEO",hero_badge_3:"נייד תחילה",
        services_title:"השירותים שלנו",
        s1_title:"אופטימיזציית SEO",s1_text:"הגדלת הנראות במנועי חיפוש בעזרת שיפורים טכניים, מחקר מילות מפתח ובניית קישורים איכותית.",
        s1_li1:"מהירות ו-Core Web Vitals",
        s1_li2:"מבנה עמוד ותוכן",
        s1_li3:"בניית קישורים מבוקרת",
        s2_title:"פיתוח אתרים",s2_text:"אתרים מודרניים, מהירים ומותאמים מטרה – לפי צרכי העסק.",
        s2_li1:"קוד נקי וסטאק אמין",
        s2_li2:"CMS או אתר סטטי – לפי צורך",
        s2_li3:"נגישות כחלק מהתכנון",
        s3_title:"מיתוג דיגיטלי",s3_text:"זהות ברורה, חוויית משתמש אינטואיטיבית וממשק מוקפד שממיר.",
        s3_li1:"שפת מותג ונכסים חזותיים",
        s3_li2:"Design System ו-UI Kit",
        s3_li3:"דפי נחיתה שמביאים תוצאות",
        work_title:"העבודות שלנו – ההצלחה שלכם",
        team_title:"הצוות שלנו",
        partners_title:"שותפים",
        contact_title_1:"מוכנים",
        contact_title_2:"לעלות שלב",
        contact_sub:"השאירו פרטים ונחזור אליכם בהקדם.",
        f_name:"שם מלא",f_phone:"טלפון",f_email:"אימייל",f_msg:"הודעה",
        ph_name:"שם מלא",ph_phone:"+972",ph_email:"you@example.com",ph_msg:"ספרו בקצרה על הפרויקט",
        f_send:"שליחה",f_note:"שליחה מהווה אישור למדיניות הפרטיות.",
        toast_ok:"תודה! נחזור אליכם בקרוב.",
        privacy:"מדיניות פרטיות",terms:"תנאים"}
};
let currentLang='en';
const t = k => locales[currentLang]?.[k] ?? k;

const tickerPhrases = {
    en:["ACCESSIBILITY","ANALYTICS","PERFORMANCE","SECURITY","SCALABILITY","RELIABILITY","INNOVATION"],
    ru:["ДОСТУПНОСТЬ","АНАЛИТИКА","ПРОИЗВОДИТЕЛЬНОСТЬ","БЕЗОПАСНОСТЬ","МАСШТАБИРУЕМОСТЬ","НАДЕЖНОСТЬ","ИННОВАЦИИ"],
    he:["נגישות","אנליטיקה","ביצועים","אבטחה","מדרגיות","אמינות","חדשנות"]
};

function applyLang(lang){
    if(!locales[lang]) return;
    currentLang = lang;
    localStorage.setItem('db_lang', lang);
    const dir = lang==='he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    buildTicker(lang);
    $$('.lbtn').forEach(b=>{
        const on = b.dataset.lang===lang;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
    });
    $$('[data-i18n]').forEach(el => el.textContent = t(el.getAttribute('data-i18n')));
    $$('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.getAttribute('data-i18n-placeholder')));
}
function i18nInit(){
    const saved = localStorage.getItem('db_lang');
    if(saved && locales[saved]) currentLang = saved;
    applyLang(currentLang);
    $$('.lbtn').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.lang)));
}

let _tickerBuiltFor = null;
let _tickerLastWidth = 0;
let _tickerRaf = null;

function buildTicker(lang = currentLang){
    const wrap = document.getElementById('ticker');
    const inner = document.getElementById('tickerInner');
    if(!wrap || !inner) return;
    const vw = wrap.clientWidth;
    if (inner.dataset.built === '1' && _tickerBuiltFor === lang && Math.abs(vw - _tickerLastWidth) < 40) return;
    inner.removeAttribute('data-built');
    inner.innerHTML = '';
    inner.setAttribute('dir','ltr');
    const words = tickerPhrases[lang] || tickerPhrases.en;
    const unit = words.map(w=>`<span>${w}</span>`).join('');
    inner.insertAdjacentHTML('beforeend', unit);
    while(inner.scrollWidth < vw * 2.5){
        inner.insertAdjacentHTML('beforeend', unit);
    }
    inner.insertAdjacentHTML('beforeend', inner.innerHTML);
    inner.dataset.built = '1';
    _tickerBuiltFor = lang;
    _tickerLastWidth = vw;
    inner.style.animation = 'none';
    _tickerRaf && cancelAnimationFrame(_tickerRaf);
    _tickerRaf = requestAnimationFrame(()=> { inner.style.animation = ''; });
}

let _tickerResizeTO;
function setupTickerResize(){
    window.addEventListener('resize', ()=>{
        clearTimeout(_tickerResizeTO);
        _tickerResizeTO = setTimeout(()=> buildTicker(currentLang), 120);
    }, {passive:true});
}

function slider(root){
    if(!root) return;
    const viewport = root.querySelector('.viewport');
    const track = root.querySelector('.track');
    const prev = root.querySelector('.sbtn.prev');
    const next = root.querySelector('.sbtn.next');
    const dotsWrap = $('#sdots');
    viewport.setAttribute('dir', 'ltr');
    track.setAttribute('dir', 'ltr');

    let step = 0, perView = 1, rto;

    function compute(){
        const slide = track.querySelector('.slide');
        if(!slide) return;
        const rect = slide.getBoundingClientRect();
        const cs = getComputedStyle(track);
        const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0;
        step = rect.width + gap;
        const w = viewport.clientWidth;
        perView = w >= 1200 ? 3 : w >= 900 ? 2 : 1;

        if(dotsWrap){
            const pages = Math.max(1, Math.ceil(track.children.length / perView));
            dotsWrap.innerHTML = '';
            for(let i=0;i<pages;i++){
                const b = document.createElement('button');
                if(i===0) b.classList.add('active');
                b.addEventListener('click', ()=> viewport.scrollTo({left: i*step*perView, behavior:'smooth'}));
                dotsWrap.appendChild(b);
            }
        }
    }

    function updateDots(){
        if(!dotsWrap || step===0) return;
        const idx = Math.round(viewport.scrollLeft / (step*perView));
        const btns = [...dotsWrap.querySelectorAll('button')];
        btns.forEach((b,i)=> b.classList.toggle('active', i===idx));
    }

    next?.addEventListener('click', ()=> viewport.scrollBy({left: step*perView, behavior:'smooth'}));
    prev?.addEventListener('click', ()=> viewport.scrollBy({left: -step*perView, behavior:'smooth'}));
    viewport.addEventListener('scroll', ()=> requestAnimationFrame(updateDots));

    addEventListener('resize', ()=>{
        clearTimeout(rto);
        rto = setTimeout(()=>{ compute(); updateDots(); }, 120);
    }, {passive:true});

    compute();
    updateDots();
}

document.addEventListener('DOMContentLoaded', () => {
    const y = $('#year'); if(y) y.textContent = new Date().getFullYear();

    const burger = $('#burger'), navm = $('#navm');
    if(burger && navm){
        burger.addEventListener('click', () => {
            navm.toggleAttribute('hidden');
            const expanded = !navm.hasAttribute('hidden');
            burger.setAttribute('aria-expanded', String(expanded));
            navm.setAttribute('aria-hidden', String(!expanded));
            document.body.style.overflow = expanded ? 'hidden' : '';
        });
    }

    starfield();
    i18nInit();
    buildTicker(currentLang);
    setupTickerResize();
    slider($('#workSlider'));

    $$('img').forEach(img=>{
        if(!img.hasAttribute('loading')) img.loading = 'lazy';
        if(!img.hasAttribute('decoding')) img.decoding = 'async';
    });

    const form = $('#form'), toast = $('#toast');
    if(form && toast){
        const tel = form.querySelector('input[type="tel"]');
        const email = form.querySelector('input[type="email"]');
        if(tel){ tel.setAttribute('pattern', '^[+0-9\\s()-]{6,}$'); tel.setAttribute('inputmode', 'tel'); }
        if(email) email.setAttribute('inputmode', 'email');

        form.addEventListener('submit', e=>{
            e.preventDefault();
            if(!form.checkValidity()){
                form.reportValidity();
                return;
            }
            const data = Object.fromEntries(new FormData(form).entries());
            toast.textContent = t('toast_ok');
            toast.style.display='block';
            form.reset();
            setTimeout(()=>toast.style.display='none', 3500);
        });
    }
});
