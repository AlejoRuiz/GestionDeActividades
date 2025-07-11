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
npm i --force
npm start         # puerto 4200

## Escalabilidad & Operaciones

| Tema | Idea en una frase |
|------|------------------|
| **10 k usuarios** | Corre el API en clúster/containers + mueve la “DB” de JSON a Postgres/Mongo + Redis cache + front en CDN. |
| **Microservicios** | 1️⃣ `gateway` (HTTPS + rate-limit)  2️⃣ `auth`  3️⃣ `activity`  4️⃣ `report` (CSV/PDF) — lo justo, nada más. |
| **Seguridad** | JWT corto + refresh, `helmet`, rate-limit, validación de entrada, HTTPS y secretos en vars de entorno. |
| **CI/CD** | GitHub Actions → test + build (Angular & Docker API) → deploy a *staging* → smoke test → aprobación manual → producción. |
| **Monitoreo** | Latencia p95, 5xx, CPU/Memoria, conexiones BD, intentos de login fallidos, tamaño de tabla, errores front. |
