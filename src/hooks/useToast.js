const toast = document.createElement('div');
toast.setAttribute('id', 'toast');
toast.style = `width:400px;text-align:center;padding:10px 0;background:#fff;box-shadow:0 0 3px #777;position:fixed;top:0;left:50%;
margin-left:-200px;z-index:99999;border-radius:5px;color:#00909e;transform:translateY(-110%);transition:transform ease 0.5s`;

const useToast = () => {
  const root = document.querySelector('#root');
  if (!document.querySelector('#toast')) {
    root.appendChild(toast);
  }
  const hideToast = () => {
    toast.style.transform = 'translateY(-110%)';
  };
  const showToast = (text) => {
    toast.innerText = text;
    toast.style.transform = 'translateY(5px)';
    setTimeout(() => {
      hideToast();
    }, 2000);
  };

  return [showToast, hideToast];
};

export default useToast;
