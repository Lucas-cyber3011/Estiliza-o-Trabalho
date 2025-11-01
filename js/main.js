// Menu mobile toggle
const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu');
if(menuToggle){
  menuToggle.addEventListener('click', ()=>{
    menu.classList.toggle('open');
  });
}

// Dropdown accessible toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dd=>{
  const btn = dd.querySelector('.dropdown-toggle');
  const submenu = dd.querySelector('.submenu');
  if(btn){
    btn.addEventListener('click', (e)=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      dd.classList.toggle('open');
    });
    document.addEventListener('click', (e)=>{
      if(!dd.contains(e.target)){
        dd.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }
    });
  }
});

// Simple toast helper
function showToast(message, timeout=3000){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = message;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), timeout);
}

// Form validation (contact page)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    let valid = true;

    [name,email,message].forEach(input=>{
      input.classList.remove('input-error');
      const existing = input.nextElementSibling;
      if(existing && existing.classList && existing.classList.contains('error-text')) existing.remove();
    });

    if(!name.value || name.value.length < 2){
      valid = false;
      name.classList.add('input-error');
      const err = document.createElement('div'); err.className='error-text'; err.textContent='Insira um nome válido (mínimo 2 caracteres).'; name.after(err);
    }

    if(!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
      valid = false;
      email.classList.add('input-error');
      const err = document.createElement('div'); err.className='error-text'; err.textContent='Email inválido.'; email.after(err);
    }

    if(!message.value || message.value.length < 10){
      valid = false;
      message.classList.add('input-error');
      const err = document.createElement('div'); err.className='error-text'; err.textContent='Mensagem muito curta.'; message.after(err);
    }

    if(valid){
      showToast('Mensagem enviada com sucesso!');
      contactForm.reset();
    } else {
      showToast('Por favor, corrija os erros do formulário.', 4000);
    }
  });
}

// Keyboard accessibility: close menus with Escape
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.dropdown.open').forEach(d=>d.classList.remove('open'));
    document.querySelectorAll('.menu.open').forEach(m=>m.classList.remove('open'));
  }
});
