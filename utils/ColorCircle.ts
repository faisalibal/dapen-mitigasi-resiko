export const colorCircle = (id: string) => {
  if (id === 'LC') {
    return '#fa8383';
  }
  if (id === 'RE') {
    return '#84ff53';
  }
  if (id === 'KP') {
    return '#176cb3';
  }
  if (id === 'SU') {
    return '#c5d300';
  }
  if (id === 'PI') {
    return '#ff18e0';
  }
  if (id === 'IA') {
    return '#ff8800';
  }
  if (id === 'MR') {
    return '#157c00';
  }
  if (id === 'KE') {
    return '#8d0000';
  }
  if (id === 'UM') {
    return '#957dff';
  }
  if (id === 'LAY') {
    return '#857100';
  }
  if (id === 'INV') {
    return '#52004b';
  }
  return '';
};

export const colorBox = (legend: string) => {
  let backgroundColor;
  let backgroundImage;

  if (legend === '1') {
    backgroundColor = 'green-500';
    backgroundImage = 'linear-gradient(to top right, #10B981, #34D399)';
  } else if (legend === '2') {
    backgroundColor = 'green-700';
    backgroundImage = 'linear-gradient(to top right, #047857, #10B981)';
  } else if (legend === '3') {
    backgroundColor = 'yellow-500';
    backgroundImage = 'linear-gradient(to top right, #FBBF24, #F59E0B)';
  } else if (legend === '4') {
    backgroundColor = 'orange-600';
    backgroundImage = 'linear-gradient(to top right, #F97316, #FB923C)';
  } else if (legend === '5') {
    backgroundColor = 'red-600';
    backgroundImage = 'linear-gradient(to top right, #DC2626, #EF4444)';
  } else {
    // Jika legend tidak sesuai, gunakan warna default
    backgroundColor = 'gray-500';
    backgroundImage = '';
  }

  const divStyle = {
    background: `var(--tw-gradient-${backgroundColor})`,
    backgroundImage: backgroundImage,
    // ... tambahkan properti style lain sesuai kebutuhan
  };

  return divStyle;
};
