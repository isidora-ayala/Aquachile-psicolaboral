# AquaChile | Sistema de Gestión de Evaluaciones Psicolaborales (MVP)
**Asignatura:** DSY1104 Desarrollo Full Stack II — Vinculación con el Medio (VcM)  
**Evaluación:** Evaluación Parcial N° 2 — Avance Frontend React y Pruebas Unitarias  
**Institución:** Duoc UC  

---

## 👥 Equipo de Trabajo
| Nombre | GitHub | Rol Asignado |
| :--- | :--- | :--- |
| **Isidora Ayala** | [isidora-ayala](https://github.com/isidora-ayala) | Frontend & Vistas |
| **Álvaro Oyarzun** | [Majelss](https://github.com/Majelss) | Lógica, Servicios & Datos |
| **Benjamín Almonacid** | [benjamin-almonacid](https://github.com/benjamin-almonacid) | Navegación, Seguridad & Testing |

---

## 📌 Problemática VcM (AquaChile)
El área de Reclutamiento y Selección de AquaChile gestiona evaluaciones psicolaborales dependiendo de procesos manuales dispersos entre Microsoft Forms, hojas de cálculo en Excel, carpetas en OneDrive y generación de informes con Copilot. Esto genera retrasos operativos, riesgo de errores humanos y pérdida de trazabilidad.

### 💡 Solución Frontend Implementada
Este MVP centraliza todo el ciclo en una aplicación web interactiva desarrollada con **React 19 + Vite** y maquetada con **Bootstrap 5**:
1. **Portal Público de Postulación:** Formulario validado con selección dinámica de cargo según el área de interés.
2. **Dashboard de Analista/Evaluador:** Tarjetas de métricas clave (KPIs), gráficos de estado y solicitudes recientes.
3. **Gestión de Candidatos:** Tabla reactiva con persistencia local (`localStorage`) desacoplada mediante un patrón de servicios.
4. **Seguimiento de Solicitudes:** Filtros en tiempo real por estado (`Pendiente`, `En Proceso`, `Finalizada`) y transición de estados.
5. **Módulo de Evaluación Psicolaboral:** Detalle de evaluación (`/evaluacion/:id`), observaciones clínicas y categorización final (*Recomendado*, *Recomendado con observaciones*, *No recomendado*).
6. **Navegación Protegida & Sidebar:** Control de acceso basado en roles (`ANALISTA`, `EVALUADOR`, `ADMIN`).

---

## 🚀 Guía de Ejecución Rápida

### Prerrequisitos
- **Node.js** (versión 18 o superior recomendada)
- **npm** (incluido con Node.js)

### 1. Clonar el repositorio
```bash
git clone https://github.com/isidora-ayala/Aquachile-psicolaboral.git
cd Aquachile-psicolaboral
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el entorno de desarrollo
```bash
npm run dev
```
La aplicación quedará disponible en: `http://localhost:5173/` (o el puerto indicado por Vite).

---

## 🔑 Credenciales de Acceso (Usuarios de Prueba)

| Rol | Correo Electrónico | Contraseña | Vistas Disponibles |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@aquachile.cl` | `1234` | Todas (Dashboard, Candidatos, Solicitudes, Evaluaciones) |
| **Analista** | `analista@aquachile.cl` | `1234` | Dashboard, Candidatos, Solicitudes |
| **Evaluador** | `evaluador@aquachile.cl` | `1234` | Dashboard, Solicitudes asignadas, Evaluaciones |

*Nota: La ruta `/formulario` es de acceso público para postulantes.*

---

## 🧪 Pruebas Unitarias Automatizadas (Vitest)

El proyecto incluye una suite de pruebas unitarias automatizadas con **Vitest** y **React Testing Library** que valida la lógica de negocio, servicios y renderizado de componentes.

### Ejecutar pruebas
```bash
npm test -- --run
```

### Casos de prueba cubiertos (`src/App.test.jsx`)
1. **Test 1 (Lógica pura de fechas):** Verifica la conversión de formato `YYYY-MM-DD` a `DD/MM/YYYY`.
2. **Test 2 (Lógica de interfaz):** Valida la transformación de estados técnicos (`En_Proceso`) a etiquetas amigables (`En Proceso`).
3. **Test 3 (Autenticación asíncrona exitosa):** Prueba el inicio de sesión con credenciales correctas y asignación de rol `ANALISTA`.
4. **Test 4 (Seguridad y manejo de errores):** Verifica el rechazo de credenciales inválidas.
5. **Test 5 (Renderizado de componentes React):** Valida que el formulario monte correctamente su botón de postulación en el DOM virtual.

---

## 🛠️ Tecnologías Utilizadas
- **React 19** + **Vite 8**
- **React Router DOM 7** (Rutas y parámetros dinámicos)
- **Bootstrap 5.3** + **Bootstrap Icons**
- **Vitest 5** + **@testing-library/react** + **jsdom**
- **Recharts** (Gráficos interactivos de métricas)
