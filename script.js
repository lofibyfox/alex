(function () {
  const date = document.getElementById('current-date');
  if (date) {
    date.textContent = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  }
  const menu = document.getElementById('menu-button');
  const nav = document.getElementById('main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
    });
  }
  const toast = document.getElementById('toast');
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2300);
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(location.href);
      showToast('Ссылка скопирована');
    } catch (error) {
      const input = document.createElement('textarea');
      input.value = location.href;
      input.style.cssText = 'position:fixed;opacity:0';
      document.body.append(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      showToast(copied ? 'Ссылка скопирована' : 'Не удалось скопировать ссылку');
    }
  }
  document.getElementById('share')?.addEventListener('click', share);
  document.getElementById('share-bottom')?.addEventListener('click', share);
  document.getElementById('print')?.addEventListener('click', () => window.print());
})();
