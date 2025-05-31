# EMTU AI Portfolio

Welcome to **EmtuXBrain Portfolio** – an interactive, AI-powered portfolio built with React, Vite, and a custom Gemini AI backend!

## 🚀 Live Demo

[🌐 Visit the Portfolio](http://codebyemtu.me/)  
_Backend API: [emtu-gemini-api.onrender.com](https://emtu-gemini-api.onrender.com/)_

---

## ✨ Features

- **AI Assistant:**  
  Chat with EmtuXBrain, an AI assistant powered by Google Gemini, for portfolio guidance and Q&A.

- **AI Tools Section:**  
  - **Text Generator:** Generate creative text using Gemini AI.
  - **Image Classifier:** Try out image recognition on sample images.
  - **Neural Playground:** Experiment with neural network parameters.

- **Modern UI:**  
  Responsive, animated, and dark-mode ready.

- **Contact Form:**  
  Powered by Formspree for easy communication.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Zustand
- **Backend:** Node.js, Express, Gemini API (via secure proxy)
- **Deployment:** GitHub Pages (frontend), Render.com (backend)

---

## 📦 Getting Started

### 1. Clone the repo

```sh
git clone https://github.com/TM-EMTU/react_emtu_portfolio.git
cd react_emtu_portfolio
```

### 2. Install dependencies

```sh
npm install
```

### 3. Environment Variables

Create a `.env` file in the root with your Gemini API key (for backend only):

```
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:**  
`.env` is already in `.gitignore` and will not be committed.

### 4. Run locally

- **Frontend:**  
  ```sh
  npm run dev
  ```
- **Backend:**  
  ```sh
  node gemini-proxy.js
  ```

### 5. Build for production

```sh
npm run build
```

---

## 🌐 Deployment

- **Frontend:**  
  Deployed to GitHub Pages.  
  Update `vite.config.ts` and `package.json` `homepage` if you fork or change repo name.

- **Backend:**  
  Deployed to [Render.com](https://emtu-gemini-api.onrender.com/).  
  Update API URLs in frontend if you deploy your own backend.

---

## 🔒 Security

- **API keys are never exposed in the frontend.**
- `.env` is gitignored.
- All AI requests are proxied through a secure backend.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## 🙋‍♂️ Author

**Tanjil (EMTU)**  
[codebyemtu.me](http://codebyemtu.me/)  
[GitHub](https://github.com/TM-EMTU)

---

> _Built with ❤️ and AI!_
