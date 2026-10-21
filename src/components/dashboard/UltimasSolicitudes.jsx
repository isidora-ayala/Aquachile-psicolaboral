import { Link } from 'react-router-dom';
import { getEstadoBadgeClass, getEstadoLabel, formatDateDDMMYYYY } from '../../utils/helpers';

export default function UltimasSolicitudes({ solicitudes }) {
  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-600">Últimas Solicitudes</h5>
        <Link to="/solicitudes" className="btn btn-sm btn-secondary">Ver todas</Link>
      </div>
      <div className="card-body p-0">
        {solicitudes && solicitudes.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Cargo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td>
                      <div className="fw-600">{solicitud.candidatoNombre}</div>
                    </td>
                    <td>
                      <small className="text-muted">{solicitud.cargoNombre}</small>
                    </td>
                    <td>
                      <small>{formatDateDDMMYYYY(solicitud.fechaSolicitud)}</small>
                    </td>
                    <td>
                      <span className={`badge ${getEstadoBadgeClass(solicitud.estado)}`}>
                        {getEstadoLabel(solicitud.estado)}
                      </span>
                    </td>
                    <td>
                      <Link to={`/evaluacion/${solicitud.id}`} className="btn btn-sm btn-primary">
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state py-4">
            <p className="text-muted mb-0">No hay solicitudes registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}
