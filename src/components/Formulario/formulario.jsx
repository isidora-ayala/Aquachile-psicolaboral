import { useState } from 'react';
import logo from '../../assets/logoAquaChile.webp';

function FormularioCandidato() {
  // Estado con los campos requeridos en la Sección 7.1 del anexo
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    familiaCargo: '',
    cargoPostula: '',
    cvFile: null // Opcional / Extra
  });

  // Manejador genérico para inputs de texto/email/teléfono
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador específico para el archivo PDF/Word (si decides mantenerlo)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      cvFile: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del Candidato a registrar:', formData);
    alert('Candidato registrado con éxito');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div className="encabezado-form">
            <img src={logo} alt="Logo AquaChile" className="logo-form" />
            <h2>Registro de Candidato</h2>
        </div>

      {/* 1. Nombre del candidato */}
      <div>
        <label htmlFor="nombre">Nombre Completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      {/* 2. Correo electrónico (Agregado segun requerimiento 7.1) */}
      <div>
        <label htmlFor="correo">Correo Electrónico:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>

      {/* 3. Teléfono (Agregado segun requerimiento 7.1) */}
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>

      {/* 4. Familia de cargo */}
      <div>
        <label htmlFor="familiaCargo">Familia de Cargo:</label>
        <input
          type="text"
          id="familiaCargo"
          name="familiaCargo"
          value={formData.familiaCargo}
          onChange={handleChange}
          required
        />
      </div>

      {/* 5. Cargo al que postula */}
      <div>
        <label htmlFor="cargoPostula">Cargo al que Postula:</label>
        <input
          type="text"
          id="cargoPostula"
          name="cargoPostula"
          value={formData.cargoPostula}
          onChange={handleChange}
          required
        />
      </div>

      {/* 6. Adjunto de CV (Opcional según requerimiento) */}
      <div>
        <label htmlFor="cvFile">Curriculum Vitae (PDF/Word):</label>
        <input
          type="file"
          id="cvFile"
          name="cvFile"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Guardar Candidato</button>
    </form>
  );
}

export default FormularioCandidato;