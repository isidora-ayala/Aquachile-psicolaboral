# AquaChile | DSY1104 Desarrollo FullStack II

# Descripción de AquaChile
El área de reclutamiento y selección de AquaChile realiza evaluaciones psicolaborales de candidatos, pero el proceso depende en gran parte de tareas manuales y repetitivas que consumen tiempo y aumentan el riesgo de errores.

# Situación actual
Un analista solicita la evolución por Microsoft Forms (nombre del candidato, email, teléfono, familia de cargo, carsgo y CV), uego el psicólogo debe hacer a mano:
* Descargar el CV, crear una carpeta en OneDrive y subir las plantillas según el cargo de familia.
* Entrevistar al candidato, tomar apuntes y generar la transcripción.
* Subir los aarchivos a Copilot, copiar y pegar el resultado en el Excel del informe, revisarlo y enviarlo por correo.

# Problemas principales
*1.-* Gstión manual inicial: crear carpetas y copiar plantillas para cada candidato.

*2.-* Traspaso manual de información: copiar el análisis de Copilot al Excel.

*3.-* Entrevista poco estandarizadas: no hay apoyo para profundizar durante la conversación.

# Consecuencias

Más tiempo operativo, riesgo de errores, psicólogos dedicados a tareas administrativas y resultados poco consistentes entre entrevistas.

# Solución propuesta
Automatizar el proceso completo con Forms, Power Automate, OneDrive/SharePoint y Copilot en tres etapas: Creacióon automática de carpeta y documetos, traspaso automático del análisis al informe y un asistente de Copilot para las entrevistas.

# Equipo
| Nombre                                       | Github             | Rol            |
|----------------------------------------------|--------------------|----------------|
| Isidora Ayala (Desarrolladora FullStack)     | isidora-ayala      | Frontend       |
| Álvaro Oyarzun (Desarrollador FullStack)     | Majelss            | Base de datos  |
| Benjamin Almonacid (Desarrollador FullStack) | benjamin-almonacid | Backend        |

# Tecnologías Trabajadas
| Nombre tecnología    | Versión       |
|----------------------|---------------|
| HTML                 | 5             |
| CSS (bootstrap)      | 5.3.8         |
| JavaScript (react)   | 19.2.8        |
| Oracle sql Developer | 24.3.1.       |
