<p align="center">
  <img src="https://raw.githubusercontent.com/Adib23704/MetaPeek/refs/heads/master/public/images/cover-image.jpg" alt="MetaPeek Logo">
</p>

<h3 align="center">A simple and elegant tool to fetch and preview website metadata.</h3>

<p align="center">
  <a href="https://github.com/adib23704/MetaPeek/actions/workflows/build.yml">
    <img src="https://github.com/adib23704/MetaPeek/actions/workflows/build.yml/badge.svg" alt="Build Status">
  </a>
  <img src="https://img.shields.io/badge/Next.js-16.x-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Biome-2.x-60A5FA?logo=biome" alt="Biome">
  <img src="https://img.shields.io/badge/React-19.x-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/github/license/Adib23704/MetaPeek" alt="License">
</p>

---

MetaPeek is a web application that allows you to enter a URL and instantly see its metadata—including the title, description, and preview image. It's a handy tool for developers, content creators, and social media managers to check how a link will appear when shared across different platforms.

### Live: https://metapeek.adibdev.me

## ✨ Features

- **Instant Metadata Fetching:** Get a website's metadata in real-time.
- **Social Media Preview:** See how a link will look on platforms like Twitter and Facebook by previewing Open Graph and Twitter Card data.
- **Clean & Responsive UI:** A modern, simple, and mobile-friendly interface built with Tailwind CSS.
- **API Endpoint:** A dedicated API route to fetch metadata, which can be integrated into other projects.
- **Error Handling:** Clear error messages for invalid URLs or fetching issues.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend API:** Next.js API Routes
- **HTTP Requests:** [Axios](https://axios-http.com/)
- **HTML Parsing:** [Cheerio](https://cheerio.js.org/)
- **Linting & Formatting:** [Biome](https://biomejs.dev/) (formatter, linter, import organizer)

## 📸 Screenshots

| Desktop                                                | Mobile                                               |
| ------------------------------------------------------ | ---------------------------------------------------- |
| ![Desktop Screenshot](./public/screenshot/desktop.png) | ![Mobile Screenshot](./public/screenshot/mobile.png) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or later recommended)
- [pnpm](https://pnpm.io/) (v10.x or later)

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/adib23704/MetaPeek.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd MetaPeek
    ```

3.  **Install dependencies:**

    ```sh
    pnpm install
    ```

4.  **Run the development server:**
    ```sh
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Build for production:**

```sh
pnpm build
```

## 🔌 API Endpoint

- **URL:** `/api/fetchMeta`
- **Method:** `GET`
- **Query parameter:** `?url=https://example.com` (URL-encode the value)
- **Success Response (200):**
  A JSON object describing the fetched page. The full shape is defined in [`src/app/types.ts`](./src/app/types.ts) as the `Metadata` interface. Representative slice:

  ```json
  {
    "url": "https://example.com",
    "title": "Example Domain",
    "description": "An example description...",
    "favicon": "https://example.com/favicon.ico",
    "ogImage": "https://example.com/og-image.png",
    "httpStatus": 200,
    "ogTags": { "og:title": "Example", "og:description": "..." },
    "twitterTags": { "twitter:card": "summary_large_image" },
    "performanceMetrics": {
      "htmlSize": 12345,
      "totalImages": 4,
      "totalLinks": 17,
      "hasOpenGraph": true,
      "hasTwitterCards": true,
      "hasStructuredData": false
    },
    "seoAnalysis": {
      "hasTitle": true,
      "titleLength": 14,
      "hasDescription": true,
      "h1Count": 1
    },
    "fetchedAt": "2026-04-10T12:00:00.000Z",
    "processingTime": 432
  }
  ```

- **Error Response (4xx - 5xx):**

  ```json
  {
    "error": "A descriptive error message.",
    "details": "Optional underlying error details"
  }
  ```

## 📂 Project Structure

```
MetaPeek/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── fetchMeta/
│   │   │       └── route.ts          # Metadata extraction API (GET)
│   │   ├── components/
│   │   │   ├── ErrorMessage.tsx      # Error display component
│   │   │   ├── MetadataPreview.tsx   # Tabbed preview viewer
│   │   │   └── URLInput.tsx          # URL input form
│   │   ├── globals.css               # Global styles (Tailwind 4)
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Main page
│   │   └── types.ts                  # Metadata interface + sub-types
├── public/                           # Logo, favicons, screenshots
├── .github/workflows/build.yml       # CI: lint + typecheck + build
├── .vscode/                          # Workspace settings (Biome)
├── biome.jsonc                       # Biome formatter + linter config
├── tsconfig.json                     # TypeScript (strict)
├── next.config.ts                    # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
└── package.json
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by adib23704
</p>
