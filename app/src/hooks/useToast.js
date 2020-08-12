const toast = document.createElement('div');
toast.setAttribute('id', 'toast');
toast.style =
  'width:400px;text-align:center;padding:10px 0;background:#fff;box-shadow:0 0 3px #777;position:fixed;top:5px;left:50%;margin-left:-200px;z-index:1000;border-radius:5px;color:#00909e';

const useToast = () => {
  const root = document.querySelector('#root');
  const hideToast = () => {
    const ele = document.querySelector('#toast');
    root.removeChild(ele);
  };
  const showToast = (text) => {
    toast.innerText = text;
    root.appendChild(toast);
    setTimeout(() => {
      hideToast();
    }, 1000);
  };

  return [showToast, hideToast];
};

export default useToast;
