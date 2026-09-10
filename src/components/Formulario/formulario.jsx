import { useState } from 'react';

function Formulario() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombreCandidato: '',
    familiaCargo: '',
    nombreCargo: '',
    cvFile: null
  });

  // Manejador para los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador específico para el archivo PDF / Word
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      cvFile: file
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Formulario listo para enviarse');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      {/* a. Nombre del candidato */}
      <div>
        <label htmlFor="nombreCandidato">Nombre del candidato:</label>
        <input
          type="text"
          id="nombreCandidato"
          name="nombreCandidato"
          value={formData.nombreCandidato}
          onChange={handleChange}
          required
        />
      </div>

      {/* b. Familia de cargo */}
      <div>
        <label htmlFor="familiaCargo">Familia de cargo:</label>
        <input
          type="text"
          id="familiaCargo"
          name="familiaCargo"
          value={formData.familiaCargo}
          onChange={handleChange}
          required
        />
      </div>

      {/* c. Nombre del cargo */}
      <div>
        <label htmlFor="nombreCargo">Nombre del cargo:</label>
        <input
          type="text"
          id="nombreCargo"
          name="nombreCargo"
          value={formData.nombreCargo}
          onChange={handleChange}
          required
        />
      </div>

      {/* d. Curriculum Vitae (CV) */}
      <div>
        <label htmlFor="cvFile">Curriculum Vitae (CV):</label>
        <input
          type="file"
          id="cvFile"
          name="cvFile"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit">Guardar Candidato</button>
    </form>
  );
}

export default Formulario;