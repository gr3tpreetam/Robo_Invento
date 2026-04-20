# 🤖 Inventory Robo

> **Smart Electronics Component Inventory** — powered by Mouser API + Firebase

A production-level React application that solves a real problem for electronics hobbyists and students: **never re-buy a component you already own.**

---

## 🧠 Problem Statement

Electronics hobbyists and small hardware labs constantly buy duplicate components because they can't remember what they already have. Spreadsheets are clunky and don't know what an "L298N" is.

**Inventory Robo** fixes this by:
1. **Searching** Mouser Electronics' catalog (10M+ parts) for real images, specs, and datasheets
2. **Storing** your component collection in Firebase with quantity and storage location
3. **Alerting** you to low-stock components before you run out

**Who is the user?** Arduino/robotics students, PCB designers, small labs, electronics hobbyists.

---

## Features

- Authentication — Email/password + Google Sign-In (Firebase Auth)
- Inventory Dashboard — Real-time CRUD with Firestore, stats, category charts
- Component Search — Mouser API integration with debounced search + demo mode
- Smart Stats — Total components, units, low-stock alerts, category breakdown
- Demo Mode — Works without any API keys (uses localStorage + mock data)
- Responsive — Mobile and desktop layouts

---

## React Concepts Used

| Concept | Where |
|---|---|
| useState | Search input, forms, modal state |
| useEffect | Mouser API calls, Firestore subscription, auth listener |
| useReducer | Inventory global state in InventoryContext |
| useContext | AuthContext, InventoryContext |
| useMemo | Dashboard stats computation, category breakdown, filter/sort |
| useCallback | Table handlers to prevent unnecessary re-renders |
| useRef | Search input focus, modal auto-focus |
| React.lazy + Suspense | Lazy-loaded pages (code splitting) |
| Context API | Auth + Inventory global state |
| React Router v6 | All routing, protected routes, nested routes, Outlet |
| Controlled Components | All forms (login, signup, add/edit modal) |
| Lifting State Up | Modal state in Dashboard, passed to InventoryTable |

---

## Tech Stack

- Vite + React 18
- Tailwind CSS — Custom design system with glassmorphism
- React Router v6 — Client-side routing
- Firebase — Auth + Firestore real-time database
- Mouser Search API — Electronics component data
- Heroicons — Icon library

---

## Setup

### 1. Clone and Install
```bash
git clone <your-repo>
cd Inventory_Robo
npm install
```

### 2. Configure Firebase
1. Go to Firebase Console
2. Create a new project, enable Authentication (Email + Google) + Firestore
3. Copy your config to .env:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Configure Mouser API (Optional)
Sign up at mouser.com/api-hub (free), then add to .env:
```
VITE_MOUSER_API_KEY=your_key_here
```

No API keys? The app runs in demo mode automatically with local data and mock search results.

### 4. Run
```bash
npm run dev
```

### 5. Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inventory/{doc} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

---

## Folder Structure

```
src/
  components/       Reusable UI components
  pages/            Route-level components
  context/          Global state (Auth + Inventory)
  hooks/            Custom hooks
  services/         Firebase + Mouser API
```

---

## License

MIT — Built for educational purposes.
