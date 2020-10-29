import { useState } from 'react';

const useList = (params) => {
  const [state, setState] = useState({
    list: params,
    loading: false,
    selectedItem: null
	});
	
	
};

export default useList;
