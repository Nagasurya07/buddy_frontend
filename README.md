# Buddy — User Directory 

[![Vite](https://img.shields.io/badge/Vite-5.x-brightgreen)](https://vitejs.dev/) [![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-teal)](https://tailwindcss.com/) [![License: Unspecified](https://img.shields.io/badge/license-Unspecified-lightgrey)](#)

Professional, responsive frontend for a user directory built with Vite, React and Tailwind CSS. Buddy provides a clean UI to browse users, view profiles, and manage basic user interactions.

Why this repo?
- Fast developer experience with Vite.
- Modern UI using Tailwind CSS and accessible components.
- Lightweight, easy to extend for real apps or prototypes.

---

## Highlights

- Fast hot-reload development (Vite)
- Clean, mobile-first UI (Tailwind)
- Client-side routing (React Router)
- Iconography with lucide-react
- Ready for deployment (Vercel, Netlify, or any static host)

## Demo (local)

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

Open http://localhost:5173 (or the URL printed by Vite).

Build for production

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` — start dev server (Vite)
- `npm run build` — build production bundle
- `npm run preview` — locally preview the production build

These reflect the scripts in `package.json` and work out-of-the-box.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router
- lucide-react icons

## Project structure

Top-level layout (important files/folders):

```
src/
	├─ App.jsx               # App routes & layout
	├─ main.jsx              # Vite entry
	├─ index.css             # Tailwind entry + global styles
	├─ assets/               # Static assets
	├─ components/           # Reusable UI components (Header, drawers, etc.)
	├─ context/              # React Context providers (Users, Notifications)
	└─ pages/                # Page-level components (Users, Profile, MyProfile)
```

## How to contribute

1. Fork or branch off `main`.
2. Create a clear PR with a short description and screenshots when applicable.
3. Keep changes focused (one feature or bugfix per PR).

Suggested small improvements:
- Add unit / integration tests (Jest + React Testing Library).
- Add preview/demo deployment (Vercel or Netlify) and link it here.
- Add screenshots or a short video of the UI.

## Design & Implementation notes

- The app uses Context to manage users and notifications. That keeps the state local to this client-only UI and makes it straightforward to swap in a real backend later.
- Tailwind utilities are used for rapid layout and responsive styling.

## Next steps (recommended)

- Add a `LICENSE` file (MIT recommended) if you want to open-source this project.
- Add CI (GitHub Actions) for linting & tests.
- Provide a live demo URL and a short walkthrough GIF in this README.

## Contact

If you want help integrating APIs, adding tests, or deploying a demo, open an issue or PR and I’ll take a look.

---

Made with care ⚡
