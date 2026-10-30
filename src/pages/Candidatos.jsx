import { useState, useEffect } from 'react';
import { candidatoService } from '../services/candidatoService';
import Formulario from '../components/Formulario/formulario';

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const cargarCandidatos = async () => {
    try {
      setLoading(true);
      const data = await candidatoService.getAll();
      setCandidatos(data);
    } catch (error) {
      console.error('Error al cargar candidatos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCandidatos();

    // Escuchar cuando se agregue un nuevo candidato desde cualquier parte de la app
    const handleActualizacion = () => {
      cargarCandidatos();
    };

    window.addEventListener('candidatos_actualizados', handleActualizacion);
    window.addEventListener('storage', handleActualizacion);

    return () => {
      window.removeEventListener('candidatos_actualizados', handleActualizacion);
      window.removeEventListener('storage', handleActualizacion);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Candidatos</h1>
          <p className="page-subtitle">Gestión de candidatos registrados en el sistema ({candidatos.length})</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1"></i> Nuevo Candidato
        </button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-4 text-center">
              <p className="text-muted">Cargando candidatos...</p>
            </div>
          ) : candidatos.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Cargo Postula</th>
                    <th>Familia</th>
                    <th>Fecha Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatos.map(c => (
                    <tr key={c.id}>
                      <td className="fw-600">{c.nombre}</td>
                      <td>{c.correo}</td>
                      <td>{c.telefono}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {c.cargoPostula}
                        </span>
                      </td>
                      <td>{c.familiaCargo}</td>
                      <td>{c.fechaRegistro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No hay candidatos registrados</p>
              <p className="empty-state-text">Comience agregando un nuevo candidato</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Candidato</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <Formulario onSuccess={() => {
                  cargarCandidatos();
                  setShowModal(false);
                }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
