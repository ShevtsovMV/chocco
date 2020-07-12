(function () {
  /* Перемещает блоки .team__photo в зависимости от ширины окна */
  const blockMovement = () => {
    const teamPhotos = document.querySelectorAll(".team__photo");
    const teamPhoto = document.querySelector(".team__photo");
    const teamItem = document.querySelector(".team__item");

    if (document.documentElement.clientWidth <= 768 && teamPhoto.parentNode === teamItem) {
      teamPhotos.forEach(element => {
        const currentItem = element.closest(".team__item");
        const currentDetails = currentItem.querySelector(".team__details");
        currentDetails.insertBefore(element, currentDetails.firstElementChild);
      });
    } else if (document.documentElement.clientWidth > 768 && teamPhoto.parentNode !== teamItem) {
      teamPhotos.forEach(element => {
        const currentItem = element.closest(".team__item");
        currentItem.insertBefore(element, currentItem.firstElementChild);
      });
    }
  };

  blockMovement();

  window.onresize = () => {
    blockMovement();
  };

  /* Устанавливает min-height блоку .team для исключения "подпрыгиваний" при открытии/закрытии аккордеона*/
  const teamHeight = () => {
    const team = document.querySelector(".team");
    const blocks = team.querySelectorAll(".team__details");

    const blocksHeight = [];
    blocks.forEach(element => {
      blocksHeight.push(element.scrollHeight);
    });

    const getMaxOfArray = (numArray) => Math.max.apply(null, numArray);
    team.style.minHeight = parseFloat(getComputedStyle(team).height) + getMaxOfArray(blocksHeight) + "px";
  };

  teamHeight();

  /* Вертикальный аккордеон */
  const teamAcco = () => {
    const team = document.querySelector(".team");

    team.addEventListener("click", e => {
      const link = e.target;

      if (link.classList.contains("team__name")) {
        const active = team.querySelector(".team__item.active");

        if (active) {
          const activeText = active.querySelector(".team__details");
          activeText.style.height = 0;
          active.classList.remove("active");
        }

        if (!active || active.querySelector(".team__name") !== link) {
          const currentElement = link.closest(".team__item");
          currentElement.classList.add("active");
          const currentText = currentElement.querySelector(".team__details");
          currentText.style.height = currentText.scrollHeight + "px";
        }
      }
    });
  };

  teamAcco();
}())