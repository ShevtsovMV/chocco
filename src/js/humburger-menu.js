const humburgerFn = () => {
  const humburger = document.querySelector('#humburger');
  const humburgerMenu = document.querySelector('#humburgerMenu');

  humburger.addEventListener('click', e => {
    e.preventDefault();
    humburgerMenu.classList.add('open');
  });

  const closeHumburgerMenu = humburgerMenu.querySelector('.menu__close');
  closeHumburgerMenu.addEventListener('click', () => {
    humburgerMenu.classList.remove('open');
  });

  const menuList = document.querySelector(".menu__list");
  menuList.addEventListener('click', e => {
    const target = e.target;

    if (target.closest(".menu__item")) {
      humburgerMenu.classList.remove('open');
    }
  });
};

humburgerFn();