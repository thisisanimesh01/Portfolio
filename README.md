## My Portfolio

A modern, fast, and responsive portfolio website showcasing my work in **Artificial Intelligence, Machine Learning, Backend Development, Systems Programming, and Open Source Software**.

🔗 **Live Site:** [thisisanimesh01.github.io/Portfolio](https://thisisanimesh01.github.io/Portfolio/)

---


## 📂 Key Projects
- 🤖 **Friday:** Plugin-based memory-enabled AI assistant & orchestrator.
- 🧠 **ResLSTM-BrainNet:** Deep learning MRI brain tumor classifier with Grad-CAM.
- ⚖️ **Legal Doc AI:** RAG-based document summarization and Q&A system.
- ⚙️ **Rust Shell & Dragon Compiler:** Custom Unix-like shell (Rust) and interpreter (C++).


## 📬 Contact & Links
- **Email:** [thisisanimesh01@gmail.com](mailto:thisisanimesh01@gmail.com)
- **LinkedIn:** [/in/animesh-yadav-39460b276](https://linkedin.com/in/animesh-yadav-39460b276)
- **GitHub:** [@thisisanimesh01](https://github.com/thisisanimesh01)

---

## ✉️ EmailJS Setup (Contact Form)

The contact form uses **EmailJS** — a free service that lets you send emails directly from the browser without any backend. Here's how to set it up:

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com) and click **Sign Up** (free tier allows 200 emails/month).
2. Verify your email address.

### 2. Create an Email Service
1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**.
2. Choose **Gmail** (or whichever provider you use).
3. Click **Connect Account** and authorize access to `thisisanimesh01@gmail.com`.
4. Give the service a name (e.g., `portfolio_service`) and click **Create Service**.
5. Copy the **Service ID** — you'll need it below.

### 3. Create an Email Template
1. Go to **Email Templates** → **Create New Template**.
2. Set the **Subject** to:
   ```
   New Portfolio Contact from {{name}}
   ```
3. Set the **Body (To)** to your Gmail address: `thisisanimesh01@gmail.com`
4. Set the **Body content** to:
   ```
   Name: {{name}}
   Email: {{email}}

   Message:
   {{message}}
   ```
5. Optionally set **Reply To** to `{{email}}` so you can reply directly.
6. Save the template and copy the **Template ID**.

### 4. Get Your Public Key
1. In the EmailJS dashboard, go to **Account** → **General**.
2. Copy your **Public Key** (also called API Key).

### 5. Configure Environment Variables
Create a `.env` file in the project root (it's already `.gitignored`):

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **Never commit `.env` to Git.** The `.gitignore` already excludes it.

> ℹ️ When deploying to GitHub Pages, add these as **Repository Secrets** (see below).

### 6. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) and test the contact form.

---

## 🚀 GitHub Pages Deployment

### One-time Setup: Add Secrets for the Build
Since `.env` is not committed, you need to inject the keys during the GitHub Actions build (or set them before running `npm run deploy` locally).

#### Option A — Deploy Locally (simplest)
Set the env vars in your shell before deploying:
```bash
VITE_EMAILJS_SERVICE_ID=service_xxx \
VITE_EMAILJS_TEMPLATE_ID=template_xxx \
VITE_EMAILJS_PUBLIC_KEY=your_public_key \
npm run deploy
```
This bakes the keys into the `dist/` bundle and pushes to the `gh-pages` branch.

#### Option B — GitHub Actions CI/CD
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Add the three secrets:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. In your workflow YAML, expose them as environment variables:
   ```yaml
   env:
     VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
     VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
     VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
   ```

### Deploy Command
```bash
npm run deploy
```
This runs `vite build` (which reads your `.env`) and then pushes the `dist/` folder to the `gh-pages` branch.

---

*Licensed under the [MIT License](LICENSE).*

