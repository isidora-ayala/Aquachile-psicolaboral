export const formatDateDDMMYYYY = (dateString) => {
  if (!dateString) return '-';
  const [year, month, day] = dateString.split('-');
  return day + '/' + month + '/' + year;
};

export const formatDateISO = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};

export const getEstadoBadgeClass = (estado) => {
  switch (estado) {
    case 'Pendiente': return 'bg-secondary';
    case 'En_Proceso': return 'bg-info text-dark';
    case 'Finalizada': return 'bg-success';
    default: return 'bg-secondary';
  }
};

export const getEstadoLabel = (estado) => {
  switch (estado) {
    case 'En_Proceso': return 'En Proceso';
    case 'Finalizada': return 'Finalizada';
    case 'Pendiente': return 'Pendiente';
    default: return estado;
  }
};
