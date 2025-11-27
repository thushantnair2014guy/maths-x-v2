/* main.js — MATHS X shared scripts */

/* ---------- THEME HANDLING ---------- */
(function(){
  const saved = localStorage.getItem('mx_theme') || 'dark';
  applyTheme(saved);
})();
function applyTheme(t){
  if(t === 'light'){
    document.documentElement.style.setProperty('--bg', '#f6f9fb');
    document.documentElement.style.setProperty('--panel', '#ffffff');
    document.documentElement.style.setProperty('--muted', '#5b6d79');
    document.body.classList.remove('mx-dark');
    localStorage.setItem('mx_theme','light');
  } else {
    document.documentElement.style.setProperty('--bg', '#070507');
    document.documentElement.style.setProperty('--panel', '#0b0c10');
    document.documentElement.style.setProperty('--muted', '#9aa7b2');
    document.body.classList.add('mx-dark');
    localStorage.setItem('mx_theme','dark');
  }
}
function toggleTheme(){ applyTheme(localStorage.getItem('mx_theme') === 'dark' ? 'light' : 'dark'); }

/* ---------- HELPERS ---------- */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

/* ---------- QUESTION BANK (Year 5 topics) ---------- */
const MX_QUESTIONS = {
  "Ratio":[
    {q:"What is the ratio of 6 apples to 2 apples?", opts:["3:1","1:3","6:2"], a:"3:1"},
    {q:"Simplify 8:4", opts:["4:8","2:1","1:2"], a:"2:1"},
    {q:"If blue:green = 3:2 and blue = 9, green = ?", opts:["6","3","12"], a:"6"}
  ],
  "Proportion":[
    {q:"If 2 pencils cost RM4, how much do 5 pencils cost?", opts:["RM4","RM6","RM10"], a:"RM10"},
    {q:"If 3 : 6 = x : 12, x = ?", opts:["6","3","9"], a:"6"}
  ],
  "Area":[
    {q:"Area of a rectangle 4cm × 6cm?", opts:["10 cm²","24 cm²","16 cm²"], a:"24 cm²"},
    {q:"Area of triangle with base 6cm and height 4cm?", opts:["12 cm²","24 cm²","8 cm²"], a:"12 cm²"}
  ],
  "Volume":[
    {q:"Volume of a cube with side 3cm?", opts:["9 cm³","27 cm³","18 cm³"], a:"27 cm³"},
    {q:"Volume of cuboid 2×3×4 cm?", opts:["24 cm³","9 cm³","20 cm³"], a:"24 cm³"}
  ]
};

/* ---------- TOPIC PAGE INITIALISER ---------- */
function initTopic(topic){
  // ensure DOM elements exist
  const qbox = document.getElementById('qbox');
  const opts = document.getElementById('opts');
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextBtn');
  const finishBtn = document.getElementById('finishBtn');

  if(!qbox || !opts) return; // not on a topic page

  const bank = MX_QUESTIONS[topic] ? MX_QUESTIONS[topic].slice() : [];
  let idx = 0, score = 0;

  function render(){
    feedback.textContent = '';
    opts.innerHTML = '';
    if(!bank[idx]) {
      qbox.innerHTML = `<strong>Quiz complete!</strong> Score: ${score}/${bank.length}`;
      saveToGlobalLeaderboard(localStorage.getItem('mx_user') || 'Guest', score);
      return;
    }
    const cur = bank[idx];
    qbox.textContent = cur.q;
    cur.opts.forEach(o => {
      const d = document.createElement('div');
      d.className = 'option';
      d.textContent = o;
      d.addEventListener('click', () => {
        if(d.dataset.answered) return;
        d.dataset.answered = '1';
        if(o === cur.a){
          d.classList.add('correct');
          feedback.textContent = 'Correct! 🔥';
          score++;
        } else {
          d.classList.add('wrong');
          feedback.textContent = `Wrong — answer: ${cur.a}`;
        }
        // reveal correct and disable options
        Array.from(opts.children).forEach(c => {
          c.style.pointerEvents = 'none';
          if(c.textContent === cur.a) c.classList.add('correct');
        });
      });
      opts.appendChild(d);
    });
  }

  nextBtn && nextBtn.addEventListener('click', () => { idx++; render(); });
  finishBtn && finishBtn.addEventListener('click', () => { idx = bank.length; render(); });

  render();
}

/* ---------- LEADERBOARD (local) ---------- */
function saveToGlobalLeaderboard(name, score){
  // save per-topic and aggregated
  const allKey = 'mx_lb_all';
  const rawAll = JSON.parse(localStorage.getItem(allKey) || '[]');
  rawAll.push({name:name, score: score, ts: Date.now()});
  rawAll.sort((a,b)=>b.score - a.score || a.ts - b.ts);
  localStorage.setItem(allKey, JSON.stringify(rawAll.slice(0,100))); // keep top 100
}

/* ---------- Expose helpers globally ---------- */
if(typeof window !== 'undefined'){
  window.toggleTheme = toggleTheme;
  window.escapeHtml = escapeHtml;
  window.initTopic = initTopic;
}
