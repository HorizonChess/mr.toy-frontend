# Mister Toy — Frontend

A toy shop app built with React, Redux and React Router.
Browse toys, filter and sort them, view details, and add, edit or remove toys.

The backend lives in a separate repo: [mr.toy-backend](https://github.com/HorizonChess/mr.toy-backend).

## Features

- **Toy CRUD**: list, details, add, edit and remove (removal is optimistic and rolls back on failure)
- **Filtering**:
  - search by name (debounced)
  - stock status: all / in stock / out of stock
  - labels multiselect
  - sort by name, price or newest
- **Chat popup**: a 💬 button on the toy details page opens `<NicePopup>` with a `<Chat>` that auto-replies (closes on Esc)
- **Custom hooks**:
  - `useOnlineStatus`: online/offline badge in the header
  - `useConfirmTabClose`: warns before closing the tab with unsaved changes in the edit form
  - `useEffectUpdate`: an effect that skips the first render (used by the filter)

## Tech stack

React 19 · Redux · React Router · Axios · Vite

## Getting started

The app needs the backend running on port 3030.

```bash
# in the backend repo
npm install
npm run dev        # Windows  (use npm run dev:mac on macOS/Linux)

# in this repo
npm install
npm run dev        # http://localhost:5173
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build into the backend's `public/` folder (expects both repos side by side as `mr.toy frontend` and `mr.toy backend`) |
| `npm run lint` | Run oxlint |

## Project structure

```
src/
├── cmps/          # ToyList, ToyPreview, ToyFilter, NicePopup, Chat, AppHeader...
├── pages/         # HomePage, AboutUs, ToyIndex, ToyDetails, ToyEdit
├── hooks/         # useOnlineStatus, useConfirmTabClose, useEffectUpdate
├── services/
│   ├── toy.service.js        # talks to the backend (/api/toy)
│   ├── toy.service.local.js  # same API over localStorage (no backend needed)
│   ├── http.service.js       # axios wrapper; uses /api/ in production
│   └── ...                   # util, event-bus, async-storage
├── store/         # Redux store, toy reducer and actions
└── assets/style/  # setup / base / cmps CSS
```

To run without a backend, change the imports of `toy.service.js` to `toy.service.local.js`.
It keeps toys in localStorage and creates demo data on first load.
