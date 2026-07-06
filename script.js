// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar shadow on scroll
const nav = document.getElementById('mainNav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
document.addEventListener('scroll', onScroll);
onScroll();

// Offcanvas: close first, then scroll to section
const mobileMenuEl = document.getElementById('mobileMenu');
const offcanvasNav = bootstrap.Offcanvas.getOrCreateInstance(mobileMenuEl);
let scrollTarget = null;

mobileMenuEl.querySelectorAll('.offcanvas-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    scrollTarget = link.getAttribute('href');
    offcanvasNav.hide();
  });
});

mobileMenuEl.addEventListener('hidden.bs.offcanvas', () => {
  if (scrollTarget) {
    const el = document.querySelector(scrollTarget);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    scrollTarget = null;
  }
});

// Contact form: input filters + validate + submit
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

// Name: letters and spaces only
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('input', () => {
  nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
});

// Phone: digits, +, -, spaces, parentheses only
const phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^\d\s+\-()]/g, '');
});

// Message character counter
const msgInput  = document.getElementById('msgInput');
const msgCount  = document.getElementById('msgCount');
msgInput.addEventListener('input', () => {
  msgCount.textContent = msgInput.value.length + ' / 2000';
});

function showAlert(type, msg){
  alertBox.className = 'alert alert-' + type;
  alertBox.textContent = msg;
  alertBox.classList.remove('d-none');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  alertBox.classList.add('d-none');

  const data    = new FormData(form);
  const name    = (data.get('name')   ||'').toString().trim();
  const email   = (data.get('email')  ||'').toString().trim();
  const phone   = (data.get('phone')  ||'').toString().trim();
  const subject = (data.get('subject')||'').toString().trim();
  const message = (data.get('message')||'').toString().trim();

  if(!name){
    showAlert('danger','Please enter your name.'); return;
  }
  if(!/^[A-Za-z\s]+$/.test(name)){
    showAlert('danger','Name should contain letters only.'); return;
  }
  if(!email){
    showAlert('danger','Please enter your email address.'); return;
  }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
    showAlert('danger','Please enter a valid email address.'); return;
  }
  if(!phone){
    showAlert('danger','Please enter your phone number.'); return;
  }
  if(!/^[\d\s+\-()]+$/.test(phone)){
    showAlert('danger','Phone number should contain digits only.'); return;
  }
  if(!subject){
    showAlert('danger','Please enter a subject.'); return;
  }
  if(!message){
    showAlert('danger','Please enter your message.'); return;
  }

  const btn = form.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Sending...';

  try{
    const res = await fetch('contact.php', {
      method:'POST',
      body:data,
      headers:{ 'Accept':'application/json' }
    });
    // Try JSON; fall back to text
    let json = null;
    try { json = await res.json(); } catch(_) {}
    if(res.ok && (!json || json.success !== false)){
      showAlert('success','Thanks! Your message has been sent. We\'ll be in touch soon.');
      form.reset();
    } else {
      showAlert('danger', (json && json.message) || 'Something went wrong. Please try again.');
    }
  }catch(err){
    showAlert('danger','Network error. Please try again later.');
  }finally{
    btn.disabled = false;
    btn.innerHTML = original;
  }
});
