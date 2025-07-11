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

## 🌐 Operación y crecimiento

### Escalabilidad
- **Ejecución** Node en *cluster* / contenedores + balanceador (NGINX o cloud LB).  
- **Persistencia** Migrar del JSON local a PostgreSQL / MongoDB con pool de conexiones.  
- **Caché & CDN** Redis para lecturas frecuentes y bundle Angular servido desde CDN.  

### Diseño por dominios
| Servicio | Responsabilidad |
|----------|-----------------|
| **gateway** | HTTPS, rate-limit, OpenAPI, logging |
| **auth-svc** | Login, refresh, roles |
| **activity-svc** | CRUD + filtros de actividades |
| **report-svc** | Generar CSV/PDF y envío mail |

### Seguridad
- JWT con expiración corta + refresh token.  
- `helmet`, CORS restringido, rate-limit en `/auth`.  
- Validación exhaustiva de payloads (`express-validator`), secretos en variables de entorno.

### CI / CD (GitHub Actions)
1. **Test & Lint** – backend y frontend.  
2. **Build** – Angular `ng build` + imagen Docker del API.  
3. **Deploy Staging** – Docker Compose / K8s; smoke-tests.  
4. **Promoción manual** – despliegue rolling a producción.

### Métricas esenciales
- Latencia p95 y ratio 5xx por endpoint.  
- CPU / memoria por réplica.  
- Conexiones y consultas lentas en BD.  
- Logs de login fallido.  
- Crecimiento de la tabla `activities`.  

> Observabilidad sugerida: Prometheus + Grafana (o Datadog/New Relic) con alertas a Slack.



