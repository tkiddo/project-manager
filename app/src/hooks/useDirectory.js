import { ipcRenderer } from 'electron';
import { useState, useEffect } from 'react';

const useDirectory = () => {
  const [local, setLocal] = useState('');
  useEffect(() => {
    const dir = ipcRenderer.sendSync('get-local-dir');
    setLocal(dir.replace(/\\/gs, '/'));
  }, []);

  const handleChange = () => {
    ipcRenderer.send('change-dir', 'openDirectory');
    ipcRenderer.once('selected-dir', (event, arg) => {
      setLocal(arg.replace(/\\/gs, '/'));
    });
  };

  return [local, handleChange];
};

export default useDirectory;
