# Gestión de Evaluaciones Psicolaborales

> **Prototipo académico** · Asignatura DSY1104 Full Stack II  
> Este sistema **no** es un producto oficial ni representa a ninguna empresa real.

---

## Descripción

Aplicación web Full Stack (prototipo académico) para que un equipo de Reclutamiento y Selección
gestione **evaluaciones psicolaborales** en un solo lugar, reemplazando el uso disperso de Excel,
Forms y Planner.

### Flujo principal

```
Registrar candidato → Crear solicitud → Gestionar evaluación → Actualizar estado → Consultar información
```

---

## Equipo

| Integrante | Rol |
|---|---|
| Álvaro Oyarzún | Desarrollador Full Stack |
| Isidora Ayala | Desarrolladora Full Stack |
| Benjamín Almonacid | Desarrollador Full Stack |

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 (Vite 8) + Bootstrap 5 + `react-router-dom` |
| Backend | Node.js + Express (monolito) |
| ORM | Prisma |
| Base de datos | PostgreSQL (Docker local o Neon/Supabase gratuito) |
| Auth | JWT + bcrypt (usuarios ficticios sembrados) |
| Validación backend | zod |
| Validación frontend | HTML5 + lógica propia |
| Pruebas | vitest (front) · jest + supertest (back) |

---

## Estructura del repositorio

```
/
├── README.md
├── docs/
│   ├── DECISIONES.md            # Decisiones y supuestos tomados
│   ├── API.md                   # Endpoints documentados
│   └── MODELO_DATOS.md          # Diagrama/descripción de tablas
├── frontend/                    # (actualmente en la raíz, se reorganizará)
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Una carpeta/archivo por vista
│   │   ├── services/            # Llamadas a la API (api.js, etc.)
│   │   ├── mocks/               # Datos simulados (Fase 1)
│   │   ├── context/             # AuthContext
│   │   └── utils/               # Validadores, formateadores
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/            # Lógica de negocio
│   │   ├── middlewares/         # Auth, roles, errores
│   │   ├── validators/          # Esquemas zod
│   │   └── app.js / server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── package.json
└── .gitignore
```

> **Estado actual:** el proyecto Vite + React + Bootstrap 5 está inicializado en la raíz del repositorio con un componente `FormularioCandidato`. Se reorganizará según la estructura objetivo a medida que avancen las fases.

---

## Usuarios del sistema

| Rol | Descripción |
|---|---|
| **Analista de Reclutamiento** | Registra candidatos, crea solicitudes, consulta y filtra |
| **Profesional Evaluador** | Ve solicitudes asignadas, agenda, registra evaluación y avanza estado |
| **Administrador** | Gestiona usuarios y datos de prueba |
| **Jefatura** (solo lectura) | Ve dashboard y listados sin modificar nada |

---

## Modelo de datos (resumen)

### Enums

| Enum | Valores |
|---|---|
| Rol | `ADMIN`, `ANALISTA`, `EVALUADOR`, `JEFATURA` |
| EstadoSolicitud | `RECIBIDA`, `AGENDADA`, `REALIZADA`, `INFORME_ENVIADO` |
| OrigenCandidato | `INTERNO`, `EXTERNO` |
| CategoriaEvaluado | `RECOMENDADO`, `RECOMENDADO_CON_OBSERVACIONES`, `NO_RECOMENDADO` |

### Equivalencia de estados

| Estado real | Agrupación simplificada |
|---|---|
| RECIBIDA | Pendiente |
| AGENDADA, REALIZADA | En proceso |
| INFORME_ENVIADO | Finalizada |

### Tablas principales

- **Usuario** — `id`, `nombre`, `email`, `passwordHash`, `rol`, `activo`, `createdAt`
- **Candidato** — `id`, `nombre`, `email`, `telefono`, `origen`, `cargoPostula`, `familiaCargo`, `createdAt`, `updatedAt`
- **Solicitud** — `id`, `candidatoId`, `analistaId`, `evaluadorId`, `cargo`, `familiaCargo`, `ubicacion`, `unidad`, `centroCosto`, `requiereReferencias`, `esReferido`, `aspectosAIndagar`, `fechaSolicitud`, `estado`, `observaciones`, `createdAt`, `updatedAt`
- **Evaluacion** (1:1 con Solicitud) — `id`, `solicitudId`, `fechaEntrevista`, `fechaInforme`, `categoria`, `resultado`, `observaciones`, `createdAt`, `updatedAt`
- **HistorialEstado** — `id`, `solicitudId`, `estadoAnterior`, `estadoNuevo`, `usuarioId`, `fecha`

> Detalle completo en [`docs/MODELO_DATOS.md`](docs/MODELO_DATOS.md) (se creará en Fase 2).

---

## Requerimientos funcionales

| Código | Requerimiento | Prioridad |
|---|---|---|
| RF01 | Login con usuarios ficticios y roles | Alta |
| RF02 | Registrar candidatos con datos mínimos obligatorios | Alta |
| RF03 | Editar y consultar candidatos | Alta |
| RF04 | Crear solicitudes asociadas a un candidato | Alta |
| RF05 | Registrar cargo, familia, fecha y responsable | Alta |
| RF06 | Listar solicitudes y ver detalle | Alta |
| RF07 | Buscar/filtrar solicitudes por estado, fecha, cargo, familia, candidato, responsable | Media |
| RF08 | Cambiar estado de solicitud (con historial) | Alta |
| RF09 | Registrar fecha de evaluación, observaciones, resultado y categoría | Alta |
| RF10 | Dashboard con indicadores | Media |
| RF11 | Editar una solicitud (ej. corregir cargo) | Alta |

---

## Pantallas del frontend

1. **Login**
2. **Dashboard** (inicio con indicadores)
3. **Listado de candidatos** (tabla con búsqueda, botón nuevo/editar)
4. **Formulario de candidato** (crear/editar)
5. **Listado de solicitudes** (tabla con filtros combinables y chips de estado)
6. **Formulario de nueva solicitud** (selecciona candidato; cargo/familia desde catálogo)
7. **Detalle de solicitud** (datos, línea de tiempo de estados, editar)
8. **Formulario/sección de evaluación** (fecha entrevista, fecha informe, categoría, resultado, observaciones)

### Indicadores del dashboard

- Total de candidatos
- Solicitudes por estado (4 reales) y agrupadas (Pendiente / En proceso / Finalizada)
- Evaluaciones realizadas por mes
- Solicitudes por familia de cargo
- Tiempo promedio (días) entre `fechaSolicitud` y `fechaInforme`
- Distribución por categoría del evaluado

---

## Roles y permisos

| Acción | ADMIN | ANALISTA | EVALUADOR | JEFATURA |
|---|:-:|:-:|:-:|:-:|
| Ver dashboard | ✔ | ✔ | ✔ | ✔ |
| Ver candidatos/solicitudes | ✔ | ✔ | ✔ (asignadas) | ✔ (lectura) |
| Crear/editar candidato | ✔ | ✔ | ✖ | ✖ |
| Crear solicitud | ✔ | ✔ | ✖ | ✖ |
| Editar datos de solicitud | ✔ | ✔ | ✖ | ✖ |
| Asignar evaluador | ✔ | ✔ | ✖ | ✖ |
| Cambiar estado | ✔ | ✖ | ✔ | ✖ |
| Registrar evaluación | ✔ | ✖ | ✔ | ✖ |
| Gestionar usuarios | ✔ | ✖ | ✖ | ✖ |

---

## API REST

Prefijo: `/api` · Respuestas JSON · Autenticación requerida (salvo login).

### Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/login` | Iniciar sesión → `{ token, usuario }` |
| `GET` | `/api/auth/me` | Usuario actual |
| `GET` | `/api/candidatos` | Listar candidatos (`?search=`) |
| `GET` | `/api/candidatos/:id` | Detalle de candidato |
| `POST` | `/api/candidatos` | Crear candidato |
| `PUT` | `/api/candidatos/:id` | Editar candidato |
| `GET` | `/api/solicitudes` | Listar solicitudes (con filtros) |
| `GET` | `/api/solicitudes/:id` | Detalle (incluye candidato, evaluación e historial) |
| `POST` | `/api/solicitudes` | Crear solicitud |
| `PUT` | `/api/solicitudes/:id` | Editar datos de solicitud |
| `PATCH` | `/api/solicitudes/:id/estado` | Cambiar estado (con historial) |
| `PATCH` | `/api/solicitudes/:id/evaluador` | Asignar evaluador |
| `GET` | `/api/solicitudes/:id/evaluacion` | Obtener evaluación |
| `PUT` | `/api/solicitudes/:id/evaluacion` | Crear o actualizar evaluación |
| `GET` | `/api/dashboard` | Indicadores del dashboard |
| `GET` | `/api/catalogos` | Familias de cargo, cargos, estados, categorías |
| `GET` | `/api/usuarios` | Listar usuarios (solo ADMIN) |
| `POST` | `/api/usuarios` | Crear usuario (solo ADMIN) |
| `PATCH` | `/api/usuarios/:id` | Editar usuario (solo ADMIN) |

> Documentación completa en [`docs/API.md`](docs/API.md) (se creará en Fase 2).

### Reglas de negocio

- Un candidato puede tener **varias** solicitudes.
- Transición de estados solo hacia adelante: `RECIBIDA → AGENDADA → REALIZADA → INFORME_ENVIADO`. Retroceder solo ADMIN.
- Pasar a `AGENDADA` exige evaluador asignado y `fechaEntrevista`.
- Pasar a `INFORME_ENVIADO` exige `categoria` y `fechaInforme` en la evaluación.
- No se puede crear solicitud para un candidato inexistente.
- Email de candidato único (409 si se repite).

### Validaciones de campos

- **Nombre:** obligatorio, 3–100 caracteres.
- **Email:** formato válido.
- **Teléfono:** opcional; si viene, solo dígitos, `+`, espacios y guiones (8–15 dígitos).
- **Cargo y familia de cargo:** obligatorios en la solicitud.
- **Fechas:** válidas; `fechaInforme` ≥ `fechaSolicitud`.

---

## Datos semilla

Todos los datos son **ficticios**. Contraseña de demo para todos los usuarios: `Demo1234!`

| Email | Rol |
|---|---|
| `admin@demo.cl` | ADMIN |
| `analista@demo.cl` | ANALISTA |
| `evaluador@demo.cl` | EVALUADOR |
| `jefatura@demo.cl` | JEFATURA |

Además se siembran:
- 15–20 candidatos con nombres inventados y emails `@example.com`
- 20–30 solicitudes repartidas en los 4 estados
- Evaluaciones completas para solicitudes en `INFORME_ENVIADO`

---

## Cómo ejecutar en local

### Requisitos previos

- Node.js ≥ 18
- PostgreSQL (local con Docker, o servicio gratuito como Neon/Supabase)
- npm

### Backend

```bash
cd backend
cp .env.example .env        # Completar DATABASE_URL y JWT_SECRET
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev                 # http://localhost:3000
```

### Frontend

```bash
cd frontend
cp .env.example .env        # VITE_API_URL=http://localhost:3000/api
npm install
npm run dev                 # http://localhost:5173
```

> **Nota:** actualmente el frontend está en la raíz del repositorio. Para ejecutarlo en su estado actual:
> ```bash
> npm install
> npm run dev
> ```

---

## Plan de trabajo por fases

### Fase 1 — Frontend con datos simulados *(Hito 1: 12–17 octubre)*

1. Proyecto Vite + React + Bootstrap 5 + React Router ✅ *(inicializado)*
2. Datos simulados en `src/mocks/`
3. Layout (navbar, rutas protegidas, login simulado con roles)
4. 8 pantallas de la sección "Pantallas del frontend"
5. Validaciones de formularios y mensajes de error
6. Responsive (360px y 1280px)
7. Capa `services/` que lee desde mocks

**Criterio de término:** el flujo completo se recorre en el navegador con datos locales.

### Fase 2 — Backend y base de datos

1. Proyecto Express + Prisma + PostgreSQL
2. `schema.prisma`, migraciones y seed
3. Auth JWT + middleware de roles
4. CRUD y endpoints con validación zod
5. Manejo centralizado de errores
6. Documentación en `docs/API.md`
7. Pruebas con supertest

**Criterio de término:** todos los endpoints responden correctamente.

### Fase 3 — Integración Full Stack *(Hito 2: 23–28 noviembre)*

1. Reemplazar mocks por llamadas reales a la API
2. Manejo de token y errores 401/403
3. Dashboard conectado a `/api/dashboard`
4. Pruebas de escenarios completos

**Criterio de término:** flujo principal funciona de punta a punta con datos persistidos.

### Fase 4 — Despliegue y cierre *(Hito 3: 30 nov. – 5 dic.)*

1. Desplegar BD, backend y frontend (servicios gratuitos)
2. Variables de entorno y CORS
3. Prueba completa en producción
4. Documentación final

---

## Despliegue

| Componente | Servicio | URL |
|---|---|---|
| Frontend | Vercel / Netlify | *pendiente* |
| Backend | Render / Railway | *pendiente* |
| Base de datos | Neon / Supabase | *pendiente* |

> Se actualizarán las URLs una vez desplegado.

---

## Catálogos de referencia

### Familias de cargo

- Profesional A
- Profesional B/C
- Técnico A
- Técnico B/C
- Supervisor B
- Jefatura
- Operario Calificado

### Cargos de ejemplo

Analista de Sistemas · Operador de Sala Control · Técnico de Mantención · Jefe de Planta · Asistente de Bodega · Monitor de Producción

---

## Reglas del proyecto

1. **Solo datos ficticios.** Nunca usar nombres, RUT, correos, teléfonos ni CV reales.
2. **No usar información interna** de ninguna empresa ni credenciales corporativas.
3. **Todo gratuito.** Sin servicios de pago ni licencias.
4. **Arquitectura monolítica.** Un solo backend. Sin microservicios ni colas.
5. **Sin integraciones** con Copilot, Power Automate, Planner, OneDrive/SharePoint ni IA.
6. **Confidencialidad:** toda ruta de la API (salvo login) exige autenticación.
7. **Prototipo académico:** no presentar como sistema oficial.
8. **Código en Git** con commits pequeños y descriptivos (`feat:`, `fix:`, `docs:`, `chore:`).

---

## Criterios de aceptación (checklist final)

- [ ] Se pueden registrar y consultar candidatos
- [ ] Se pueden crear y consultar solicitudes de evaluación
- [ ] Se puede editar una solicitud
- [ ] Se puede actualizar el estado con historial
- [ ] Se puede registrar la información de una evaluación
- [ ] Los datos se guardan y recuperan desde la base de datos
- [ ] Frontend integrado con backend (sin mocks en producción)
- [ ] Filtros y búsqueda de solicitudes funcionan
- [ ] Dashboard muestra los indicadores definidos
- [ ] Permisos por rol funcionan en backend y frontend
- [ ] Interfaz responsive con validaciones y errores claros
- [ ] Versión desplegada con servicios gratuitos
- [ ] Código versionado en Git, sin datos reales ni secretos
- [ ] El flujo principal se puede demostrar de principio a fin

---

## Fuera del alcance (evolución futura)

- Integración con Microsoft Copilot / Power Automate / Planner
- OneDrive / SharePoint
- Generación automática de informes con IA
- Carga de CV y gestión de carpetas por candidato
- Microservicios
- Agentes de IA para entrevistas

---

## Licencia

Proyecto académico sin licencia de distribución.
