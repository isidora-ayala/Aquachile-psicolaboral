import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { evaluacionService } from '../services/evaluacionService';
import { solicitudService } from '../services/solicitudService';

export default function Evaluacion() {
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState(null);
  const [evaluacion, setEvaluacion] = useState(null);
  const [formData, setFormData] = useState({
    fechaEvaluacion: '',
    resultado: '',
    observaciones: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sol, ev] = await Promise.all([
          solicitudService.getById(id),
          evaluacionService.getBySolicitudId(id)
        ]);
        setSolicitud(sol);
        if (ev) {
          setEvaluacion(ev);
          setFormData({
            fechaEvaluacion: ev.fechaEvaluacion || '',
            resultado: ev.resultado || '',
            observaciones: ev.observaciones || '',
            categoria: ev.categoria || ''
          });
        }
      } catch (error) {
        console.error('Error al cargar evaluación:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (evaluacion) {
        await evaluacionService.update(evaluacion.id, { ...formData, solicitudId: parseInt(id) });
      } else {
        await evaluacionService.create({ ...formData, solicitudId: parseInt(id), estado: 'En_Proceso' });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error al guardar evaluación:', error);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="p-4 text-center">
          <p className="text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!solicitud) {
    return (
      <div className="container-fluid">
        <div className="empty-state">
          <p className="empty-state-title">Solicitud no encontrada</p>
          <Link to="/solicitudes" className="btn btn-primary mt-3">Volver a Solicitudes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Evaluación</h1>
          <p className="page-subtitle">Registro de evaluación psicolaboral</p>
        </div>
        <Link to="/solicitudes" className="btn btn-secondary">Volver</Link>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0 fw-600">Datos de la Solicitud</h5>
            </div>
            <div className="card-body">
              <p><strong>ID:</strong> {solicitud.id}</p>
              <p><strong>Fecha Solicitud:</strong> {solicitud.fechaSolicitud}</p>
              <p><strong>Estado:</strong> {solicitud.estado}</p>
              <p><strong>Candidato ID:</strong> {solicitud.candidatoId}</p>
              <p><strong>Cargo ID:</strong> {solicitud.cargoId}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0 fw-600">Registro de Evaluación</h5>
            </div>
            <div className="card-body">
              {saved && (
                <div className="alert alert-success">
                  Evaluación guardada correctamente
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Fecha de Evaluación</label>
                    <input
                      type="date"
                      className="form-control"
                      name="fechaEvaluacion"
                      value={formData.fechaEvaluacion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-select"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar</option>
                      <option value="RECOMENDADO">Recomendado</option>
                      <option value="RECOMENDADO_CON_OBSERVACIONES">Recomendado con observaciones</option>
                      <option value="NO_RECOMENDADO">No recomendado</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Resultado</label>
                    <textarea
                      className="form-control"
                      name="resultado"
                      rows="3"
                      value={formData.resultado}
                      onChange={handleChange}
                      placeholder="Detalle del resultado de la evaluación"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Observaciones</label>
                    <textarea
                      className="form-control"
                      name="observaciones"
                      rows="3"
                      value={formData.observaciones}
                      onChange={handleChange}
                      placeholder="Observaciones adicionales"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary">
                    Guardar Evaluación
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
