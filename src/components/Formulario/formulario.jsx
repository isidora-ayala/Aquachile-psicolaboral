import { useState } from 'react';
import { candidatoService } from '../../services/candidatoService';
import { cargos, familiasCargo } from '../../data/mock';

function FormularioCandidato({ onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    familiaCargoId: '',
    cargoId: '',
    cvFile: null
  });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Familias disponibles
  const familias = familiasCargo;

  // Cargos filtrados según la familia seleccionada
  const cargosFiltrados = formData.familiaCargoId
    ? cargos.filter(c => c.familiaCargoId === Number(formData.familiaCargoId))
    : cargos;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia la familia, reiniciar el cargo
    if (name === 'familiaCargoId') {
      setFormData(prev => ({ ...prev, familiaCargoId: value, cargoId: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cvFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await candidatoService.create({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        cargoId: Number(formData.cargoId),
      });
      setEnviado(true);
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        familiaCargoId: '',
        cargoId: '',
        cvFile: null
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error al registrar candidato:', err);
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--success-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          fontSize: '2rem'
        }}>
          ✓
        </div>
        <h3 style={{ color: 'var(--navy-900)', fontWeight: 700 }}>¡Postulación enviada!</h3>
        <p style={{ color: 'var(--gray-600)', margin: '0.5rem 0 1.5rem' }}>
          Tu información fue registrada. Nos pondremos en contacto contigo pronto.
        </p>
        <button
          className="btn-primary"
          onClick={() => setEnviado(false)}
          style={{ padding: '0.75rem 2rem' }}
        >
          Nueva postulación
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Nombre */}
      <div>
        <label className="form-label" htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>

      {/* Correo */}
      <div>
        <label className="form-label" htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          className="form-control"
          value={formData.correo}
          onChange={handleChange}
          placeholder="correo@ejemplo.cl"
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="form-label" htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className="form-control"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="+56 9 XXXX XXXX"
          required
        />
      </div>

      {/* Familia de cargo */}
      <div>
        <label className="form-label" htmlFor="familiaCargoId">Área de Interés</label>
        <select
          id="familiaCargoId"
          name="familiaCargoId"
          className="form-select"
          value={formData.familiaCargoId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar área</option>
          {familias.map(f => (
            <option key={f.id} value={f.id}>{f.nombre}</option>
          ))}
        </select>
      </div>

      {/* Cargo */}
      <div>
        <label className="form-label" htmlFor="cargoId">Cargo al que Postula</label>
        <select
          id="cargoId"
          name="cargoId"
          className="form-select"
          value={formData.cargoId}
          onChange={handleChange}
          required
          disabled={!formData.familiaCargoId}
        >
          <option value="">
            {formData.familiaCargoId ? 'Seleccionar cargo' : 'Primero seleccione un área'}
          </option>
          {cargosFiltrados.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* CV */}
      <div>
        <label className="form-label" htmlFor="cvFile">Curriculum Vitae (PDF/Word, opcional)</label>
        <input
          type="file"
          id="cvFile"
          name="cvFile"
          className="form-control"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ marginTop: '0.5rem', padding: '0.875rem', width: '100%' }}
      >
        {loading ? 'Enviando...' : 'Enviar Postulación'}
      </button>
    </form>
  );
}

export default FormularioCandidato;