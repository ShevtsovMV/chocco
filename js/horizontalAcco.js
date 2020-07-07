/* Горизонтальный аккордеон */
const horizontalAcco = (selector) => {
  const body = document.querySelector("body");
  const acco = document.querySelector(selector);
  const items = acco.querySelectorAll("[data-item]");
  const links = acco.querySelectorAll("[data-trigger]");

  const calculateWidth = () => {
    const windowWidth = window.innerWidth;
    const MAX_WIDTH = 530;

    const linksWidth = links[0].offsetWidth;

    const reqWidth = windowWidth - (linksWidth * links.length);

    return reqWidth > MAX_WIDTH ? MAX_WIDTH : reqWidth;
  };

  const closeItem = (activeElement) => {
    const activeContent = activeElement.querySelector("[data-content]");
    activeContent.style.width = "0px";
    activeElement.classList.remove("active");

    if (body.offsetWidth <= 480) {
      items.forEach(function (item) {
        item.style.width = "100%";
      });
    }
  }

  acco.addEventListener("click", e => {
    e.preventDefault();
    const target = e.target;
    const active = acco.querySelector("[data-item].active");

    if (target.closest("[data-trigger]")) {
      if (active) {
        closeItem(active);
      }

      if (!active || active.querySelector("[data-trigger]") !== target.closest("[data-trigger]")) {
        const current = target.closest("[data-item]");
        current.classList.add("active");
        const currentContent = current.querySelector("[data-content]");

        if (body.offsetWidth > 480) {
          currentContent.style.width = calculateWidth() + "px";
        } else {
          items.forEach(function (item) {
            if (item !== current) {
              item.style.width = 0;
            }
          });
          currentContent.style.width = "100%";
        }
      }
    }

    if(target.closest("[data-close]")) {
      closeItem(active);
    }
  });
};

horizontalAcco("#accordeonList");