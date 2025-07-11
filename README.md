# Activity-Tracker (Full-Stack)

Monorepo con **Express** (API) y **Angular 19** (SPA).

## Prerequisitos
- Node ≥ 18
- npm ≥ 10

## Cómo correr todo en local

```bash
# clona repo
git clone https://github.com/AlejoRuiz/GestionDeActividades.git
cd activity-tracker

# 1) API
cd backend
npm i
npm run dev       # puerto 3000
# en otra terminal
cd ../frontend
npm i
npm start         # puerto 4200
