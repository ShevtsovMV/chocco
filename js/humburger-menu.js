const humburger = document.querySelector('#humburger');
const humburgerMenu = document.querySelector('#humburgerMenu');

humburger.addEventListener('click', e => {
  e.preventDefault();
  humburgerMenu.classList.add('open');
})

const closeHumburgerMenu = humburgerMenu.querySelector('.menu__close');
closeHumburgerMenu.addEventListener('click', () => {
  humburgerMenu.classList.remove('open');
})