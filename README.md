# MATHS X — Year 5 (Ratio · Proportion · Area · Volume)

Esports-themed Year 5 maths platform (local/demo). Features:
- Multi-page site (login, home, 4 topic pages)
- Quizzes per topic with instant feedback
- Local leaderboard (stored in browser localStorage)
- Dark esports theme (Blue × Neon Red)
- Responsive, ready for GitHub Pages / Netlify

## How to run
1. Put files in folder `maths-x/` with subfolders:
   - `css/styles.css`
   - `js/main.js`
   - `assets/logo.png` (your logo)
2. Open `login.html` in a browser (or deploy entire folder to GitHub Pages / Netlify).

## Notes
- Login is demo-only: username stored in localStorage.
- Leaderboard stored locally (not server).
- To reset leaderboard: open browser console and run:
  `localStorage.removeItem('mx_lb_all');`
