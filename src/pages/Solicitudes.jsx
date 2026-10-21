import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { solicitudService } from '../services/solicitudService';
import { getEstadoBadgeClass, getEstadoLabel, formatDateDDMMYYYY } from '../utils/helpers';

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await solicitudService.getAll();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await solicitudService.cambiarEstado(id, nuevoEstado);
      setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s));
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const filtered = filtro ? solicitudes.filter(s => s.estado === filtro) : solicitudes;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Solicitudes</h1>
          <p className="page-subtitle">Gestión de solicitudes de evaluación</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-600">Listado de Solicitudes</h5>
            <select className="form-select" style={{ width: '200px' }} value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En_Proceso">En Proceso</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="p-4 text-center">
              <p className="text-muted">Cargando...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Candidato</th>
                    <th>Cargo</th>
                    <th>Fecha Solicitud</th>
                    <th>Estado</th>
                    <th>Cambiar Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id}>
                      <td className="fw-600">{s.candidatoNombre}</td>
                      <td>{s.cargoNombre}</td>
                      <td>{formatDateDDMMYYYY(s.fechaSolicitud)}</td>
                      <td>
                        <span className={`badge ${getEstadoBadgeClass(s.estado)}`}>
                          {getEstadoLabel(s.estado)}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={s.estado}
                          onChange={(e) => cambiarEstado(s.id, e.target.value)}
                          style={{ width: '140px' }}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En_Proceso">En Proceso</option>
                          <option value="Finalizada">Finalizada</option>
                        </select>
                      </td>
                      <td>
                        <Link to={`/evaluacion/${s.id}`} className="btn btn-sm btn-primary">
                          Evaluar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No hay solicitudes</p>
              <p className="empty-state-text">No se encontraron solicitudes con el filtro aplicado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
