import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EstadoChart({ data }) {
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value,
    color: item.name === 'Pendiente' ? 'var(--warning)' : item.name === 'En Proceso' ? '#4a90d9' : 'var(--success)'
  }));

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0 fw-600">Solicitudes por Estado</h5>
      </div>
      <div className="card-body p-3">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
              <XAxis type="number" domain={[0, 'dataMax']} tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [value, 'Solicitudes']}
                contentStyle={{
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius)',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="value" fill="var(--salmon-500)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-state py-4">
            <p className="text-muted mb-0">No hay datos para mostrar</p>
          </div>
        )}
      </div>
    </div>
  );
}
