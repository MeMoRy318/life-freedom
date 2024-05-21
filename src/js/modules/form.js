import {emailService} from '../services/emailService';

const form = (formSelector) =>{
  const form = document.querySelector(formSelector);

  const messages = {
    loading: 'Загрузка...',
    success: 'Дякую! Скоро ми з вами зв\'яжемося',
    failure: 'Щось пішло не так...'
  };

  const createStatusElement = () => {
    const status = document.createElement('div');
    status.classList.add('status');
    return status;
  };
  
  const handleSubmit = async (event) =>{
    event.preventDefault();
    const status = createStatusElement();
    form.appendChild(status);
    status.innerText = messages.loading;
    const data = {...Object.fromEntries(new FormData(form).entries())};
    form.reset();
    try {
      await emailService(data);
      status.innerText = messages.success;
    } catch {
      status.innerText = messages.failure;
    }finally{
      setTimeout(()=>{
        status.remove();
      },2000);
    }
  };

  form.addEventListener('submit',handleSubmit);
  
};

export {form};