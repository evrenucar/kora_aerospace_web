const navbar = document.getElementById('navbar');
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const currentYear = document.getElementById('current-year');

const updateNavbar = () => {
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('navbar-scrolled');
    navbar.classList.remove('py-8');
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.classList.add('py-8');
  }
};

const toggleChat = (isOpen) => {
  if (!chatPanel) return;
  chatPanel.classList.toggle('hidden', !isOpen);
};

window.addEventListener('scroll', updateNavbar);
window.addEventListener('load', updateNavbar);

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    const isHidden = chatPanel?.classList.contains('hidden');
    toggleChat(isHidden);
  });
}

if (chatClose) {
  chatClose.addEventListener('click', () => toggleChat(false));
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear().toString();
}
