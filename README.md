# Arun Wakekar — 3D Portfolio (AI Cube)

Horizontally-scrolling portfolio with a real-time 3D AI cube background.
Built with React + TypeScript + Three.js (React Three Fiber) + Framer Motion + GSAP + Vite.

---

## 1. Requirements (one-time installation)

| Tool | Why | Download |
|---|---|---|
| **Node.js LTS (v18 or v20+)** | Runs the dev server & build | https://nodejs.org (LTS button) |
| VS Code (you already have it) | Editing | — |

> npm comes bundled with Node.js — nothing else to install.

Check it worked (in any terminal):

```bash
node -v    # should print v18.x or v20.x
npm -v
```

## 2. First-time setup

Open the project folder in VS Code, then in its terminal (`Ctrl + ~`):

```bash
npm install
```

This downloads the dependencies into `node_modules/` (~1–2 min, one time only).

## 3. Run locally

```bash
npm run dev
```

Vite prints two URLs:

```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

- **Local** → open on this laptop
- **Network** → open this exact URL in the browser of your **mobile / tablet
  on the same Wi-Fi** to test on real devices. Live-reload works there too —
  edit code and every device refreshes automatically.

> If the Network URL doesn't load on your phone, allow Node.js through
> Windows Firewall (a prompt usually appears on first run — click **Allow**).

## 4. Production build

```bash
npm run build
```

Creates `dist/index.html` — a single self-contained file (everything inlined).
You can double-click it, host it anywhere (Netlify / Vercel / GitHub Pages),
or WhatsApp it to someone — it just works.

To preview the production build on all devices:

```bash
npm run preview
```

(again gives a Network URL for phone/tablet testing).

## 5. Where to edit content

| What | File |
|---|---|
| All text/data: profile, experience, skills, projects, AI-dev cards | `src/data.ts` |
| Embedded resume PDF | regenerate via `make_resume.py` → re-embed (see below) |
| 3D cube scene | `src/components/CubeScene.tsx` |
| Tech cards / ellipse animation | `src/components/TechOrbit.tsx` |
| Sections / layout | `src/components/Sections.tsx`, `src/App.tsx` |
| Styles / breakpoints | `src/styles.css` |

### Updating the resume PDF
```bash
pip install reportlab pypdf     # one time
python make_resume.py           # regenerates public/Arun_Wakekar_Resume.pdf
```
Then re-embed it into `src/resumePdf.ts`:
```bash
python -c "import base64;d=base64.b64encode(open('public/Arun_Wakekar_Resume.pdf','rb').read()).decode();open('src/resumePdf.ts','w').write('export const RESUME_FILENAME = \"Arun_Wakekar_Resume.pdf\";\nexport const RESUME_DATA_URI = \"data:application/pdf;base64,'+d+'\";\n')"
```
(Python is only needed for the resume — the website itself needs only Node.)
