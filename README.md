# AquaChile | DSY1104 Desarrollo FullStack II

## Descripción de AquaChile
El área de reclutamiento y selección de AquaChile realiza evaluaciones psicolaborales de candidatos, pero el proceso depende en gran parte de tareas manuales y repetitivas que consumen tiempo y aumentan el riesgo de errores.

---

## Situación actual
Un analista solicita la evaluación por Microsoft Forms (nombre del candidato, email, teléfono, familia de cargo, cargo y CV), luego el psicólogo debe hacer a mano:
* Descargar el CV, crear una carpeta en OneDrive y subir las plantillas según el cargo de familia.
* Entrevistar al candidato, tomar apuntes y generar la transcripción.
* Subir los archivos a Copilot, copiar y pegar el resultado en el Excel del informe, revisarlo y enviarlo por correo.

---

## Problemas principales
1. **Gestión manual inicial:** Crear carpetas y copiar plantillas para cada candidato.
2. **Traspaso manual de información:** Copiar el análisis de Copilot al Excel.
3. **Entrevistas poco estandarizadas:** No hay apoyo para profundizar durante la conversación.

---

## Consecuencias
Más tiempo operativo, riesgo de errores, psicólogos dedicados a tareas administrativas y resultados poco consistentes entre entrevistas.

---

## Solución propuesta
Automatizar el proceso completo con Forms, Power Automate, OneDrive/SharePoint y Copilot en tres etapas: Creación automática de carpeta y documentos, traspaso automático del análisis al informe y un asistente de Copilot para las entrevistas.

---

## Equipo
| Nombre | Github | Rol |
| :--- | :--- | :--- |
| **Isidora Ayala** (Desarrolladora FullStack) | [isidora-ayala](https://github.com/isidora-ayala) | Frontend |
| **Álvaro Oyarzun** (Desarrollador FullStack) | [Majelss](https://github.com/Majelss) | Base de datos |
| **Benjamin Almonacid** (Desarrollador FullStack) | [benjamin-almonacid](https://github.com/benjamin-almonacid) | Backend |

---

## Tecnologías Trabajadas
| Nombre tecnología | Versión |
| :--- | :--- |
| **HTML** | 5 |
| **CSS (Bootstrap)** | 5.3.8 |
| **JavaScript (React)** | 19.2.8 |
| **Oracle SQL Developer** | 24.3.1 |
| **React Router DOM** | 7.18.4 |
| **Vitest** | 5.0.5 |
| **Vite** | 8.2.2 |
| **React Testing Library** | 16.3.3 |
| **Bootstrap Icons** | 1.13.1 |
| **JSDOM** | 30.1.3 |
| **Recharts** | 3.10.1 |

---

# 🚀 Guía de Ejecución del Proyecto (README de Ejecución)

Esta sección contiene las instrucciones paso a paso para clonar, instalar, verificar herramientas y ejecutar la aplicación web en un entorno local.

### 1. Verificación de Herramientas Previas
Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema operativo:
* **Node.js**: Versión `v18.0.0` o superior (se verifica con `node -v`).
* **npm**: Gestor de paquetes incluido con Node.js (se verifica con `npm -v`).
* **Git**: Control de versiones (se verifica con `git --version`).
* **Navegador Web**: Google Chrome, Mozilla Firefox, Microsoft Edge o compatible.

---

### 2. Instalación del Proyecto

1. Clonar el repositorio oficial desde GitHub:
   ```bash
   git clone https://github.com/isidora-ayala/Aquachile-psicolaboral.git
   ```

2. Entrar al directorio del proyecto:
   ```bash
   cd Aquachile-psicolaboral
   ```

3. Cambiar a la rama de desarrollo:
   ```bash
   git checkout login-dashboard
   ```

4. Instalar todos los paquetes y dependencias requeridas:
   ```bash
   npm install
   ```

---

### 3. Puesta en Marcha (Entorno de Desarrollo)

Para levantar el servidor de desarrollo con Vite:
```bash
npm run dev
```

El terminal mostrará una URL local, por lo general:
```text
  VITE v8.2.2  ready in 400 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Abre esa dirección en tu navegador web para interactuar con la plataforma.

---

### 4. Credenciales de Prueba por Rol (Autenticación)

El sistema cuenta con control de acceso por roles (`AuthContext` y `ProtectedRoute`). Puedes iniciar sesión con las siguientes cuentas de prueba:

| Rol | Correo Electrónico | Contraseña | Vistas y Permisos Habilitados |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@aquachile.cl` | `1234` | Acceso total: Dashboard, Candidatos, Solicitudes y Evaluaciones. |
| **Analista** | `analista@aquachile.cl` | `1234` | Gestión de postulación: Dashboard, Lista de Candidatos y Solicitudes. |
| **Evaluador** | `evaluador@aquachile.cl` | `1234` | Gestión clínica: Dashboard, Solicitudes asignadas y Registro de Evaluaciones. |

> **Nota sobre el Formulario Público:** La ruta `/formulario` es accesible de forma directa sin iniciar sesión para permitir la postulación de nuevos candidatos.

---

### 5. Verificación de Calidad y Pruebas Unitarias (Vitest)

Para verificar que todos los componentes, lógica de negocio y servicios operen correctamente según la pauta de evaluación de la **Clase 9**:

Ejecutar la suite de pruebas unitarias:
```bash
npm test -- --run
```

#### Cobertura de los 5 Escenarios Verificados (`src/App.test.jsx`):
1. **TEST 1 (Funciones Puras / Helpers):** Valida la conversión de fechas de formato ISO base de datos (`YYYY-MM-DD`) a formato chileno estándar (`DD/MM/YYYY`).
2. **TEST 2 (Lógica Condicional de UI):** Valida que los códigos internos de estado (`En_Proceso`) se transformen a etiquetas amigables (`En Proceso`).
3. **TEST 3 (Autenticación Asíncrona Exitosa):** Simula el login con credenciales válidas y verifica la respuesta afirmativa con asignación del rol `ANALISTA`.
4. **TEST 4 (Seguridad y Rechazo):** Simula el ingreso con contraseña errónea y comprueba la denegación con el mensaje `'Credenciales inválidas'`.
5. **TEST 5 (Renderizado React con Testing Library):** Renderiza en el DOM virtual el `<FormularioCandidato />` y valida que el botón de envío exista y esté visible.

Resultado esperado:
```text
 Test Files  1 passed (1)
      Tests  5 passed (5)
```

---

### 6. Compilación para Producción (Build)

Para comprobar que el proyecto compila de manera óptima sin errores de empaquetado:
```bash
npm run build
```
Los archivos optimizados para despliegue se generarán en la carpeta `dist/`.
