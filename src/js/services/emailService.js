import emailjs from '@emailjs/browser';

const emailService = (data) =>{
  emailjs.send('service_92eknot','template_j4nn66c',data,{publicKey:'J9n3Ol__JQGa_cYze'});
};

export {emailService};