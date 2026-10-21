import { useState, useEffect } from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import EstadoChart from '../components/dashboard/EstadoChart';
import UltimasSolicitudes from '../components/dashboard/UltimasSolicitudes';
import { dashboardService } from '../services/dashboardService';

export default function Dashboard() {
  const [data, setData] = useState({
    resumen: { totalCandidatos: 0, totalSolicitudes: 0, pendientes: 0, finalizadas: 0 },
    porEstado: [],
    ultimasSolicitudes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resumen, porEstado, ultimasSolicitudes] = await Promise.all([
          dashboardService.getResumen(),
          dashboardService.getPorEstado(),
          dashboardService.getUltimasSolicitudes(5)
        ]);
        setData({ resumen, porEstado, ultimasSolicitudes });
      } catch (error) {
        console.error('Error al cargar dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Bienvenido al panel de control</p>
          </div>
        </div>
        <div className="row g-4">
          {[1, 2, 3, 4].map(i => (
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div className="kpi-card loading-skeleton" style={{ height: '120px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Panel de control - Evaluación Psicolaboral</p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <KpiCard
            icon="people"
            value={data.resumen.totalCandidatos}
            label="Total Candidatos"
            color="navy"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <KpiCard
            icon="file-earmark-text"
            value={data.resumen.totalSolicitudes}
            label="Total Solicitudes"
            color="salmon"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <KpiCard
            icon="clock"
            value={data.resumen.pendientes}
            label="Pendientes"
            color="warning"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <KpiCard
            icon="check-circle"
            value={data.resumen.finalizadas}
            label="Finalizadas"
            color="success"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <EstadoChart data={data.porEstado} />
        </div>
        <div className="col-12 col-lg-6">
          <UltimasSolicitudes solicitudes={data.ultimasSolicitudes} />
        </div>
      </div>
    </div>
  );
}
