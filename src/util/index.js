const getBadge = (frame) => {
  switch (frame) {
    case 'vue':
      return 'success';
    case 'react':
      return 'primary';

    case 'none':
      return 'secondary';
    default:
      return 'info';
  }
};

const getVersion = () => '1.0.0';

export { getBadge, getVersion };
