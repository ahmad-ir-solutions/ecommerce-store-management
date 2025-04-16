# 🛒 React — Boilerplate

A modern boilerplate for building dashboards or any frontend UIs using **React**, **Vite**, **Tailwind CSS**, and a powerful set of tools for dropshippers, wholesalers, and developers.

> Use this as a starter template for building ecommerce or storefront UIs.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/ahmad-gurmani/react-starter-boiler-plate.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev


## Create a .env file in the root:
VITE_API_URL=https://your-api-url.com



## 📦 Tech Stack

- **Framework:** [React 19](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), `clsx`, `tailwind-merge`
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Data Fetching:** [React Query (TanStack)](https://tanstack.com/query)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
- **Linting:** ESLint
- **Types:** TypeScript


## 📁 Suggested Project Structure

src/
├── assets/
├── components/
│   ├── ui/               # Shadcn UI components (auto-generated)
│   └── shared/           # Reusable layout, headers, footers, etc.
│
├── features/             # Feature-based folders
│   ├── dropshipper/      # Feature-specific components + pages
│   ├── wholesaler/
│   ├── admin/
│   └── auth/
│       └── Login.tsx     # Example login page
│
├── hooks/                # Custom React hooks (e.g., useAuth, useDebounce)
│
├── lib/
│   ├── api/              # Axios instances, API services
│   └── utils/            # Helper functions
│
├── routes/               # Route definitions & protected route guards
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── store/                # Zustand stores
│   └── userStore.ts
│
├── layouts/              # Shared layouts (dashboard, auth wrapper)
│   └── DashboardLayout.tsx
│
├── types/                # Global TypeScript types/interfaces
│   └── index.d.ts
│
├── styles/               # Global Tailwind or CSS files
│   └── globals.css
│
├── App.tsx               # Entry React component
└── main.tsx              # Vite root entry


## 🔧 Dev Notes
This project uses the Vite ecosystem for optimal performance and DX (developer experience). TypeScript is fully supported, and the codebase is linted using ESLint with strict TypeScript + React rules.


## 📢 Usage Notice
This boilerplate is intended for personal or team use.
You do not need to fork or create pull requests.
Just clone it and use it as a starting point for your own projects.

Feel free to customize it completely for your own use case!