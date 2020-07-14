/* Горизонтальный аккордеон */
const horizontalAcco = (selector) => {
  const body = document.querySelector("body");
  const acco = document.querySelector(selector);
  const items = acco.querySelectorAll("[data-item]");
  const links = acco.querySelectorAll("[data-trigger]");
  const textContainers = acco.querySelectorAll("[data-content]");
  const texts = acco.querySelectorAll("[data-text]");

  const calculateWidth = () => {
    let regItemWidth = 0;

    const windowWidth = window.innerWidth;
    const MAX_WIDTH = 530;
    const accoPadding = parseFloat(getComputedStyle(acco).paddingRight);
    const linksWidth = links[0].offsetWidth;
    const reqWidth = windowWidth - accoPadding - (linksWidth * links.length);

    reqWidth > MAX_WIDTH ? regItemWidth = MAX_WIDTH : regItemWidth = reqWidth;

    const textContainerPaddingRight = parseFloat(getComputedStyle(textContainers[0]).paddingRight);
    const textContainerPaddingLeft = parseFloat(getComputedStyle(textContainers[0]).paddingLeft);
    const textMarginRight = parseFloat(getComputedStyle(texts[0]).marginRight);

    const textWidth = regItemWidth - textContainerPaddingRight - textContainerPaddingLeft - textMarginRight;


    return {
      container: regItemWidth,
      text: textWidth
    }
  };

  const closeItem = (activeElement) => {
    const activeContent = activeElement.querySelector("[data-wrap]");
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
        const currentContent = current.querySelector("[data-wrap]");
        const currentText = current.querySelector("[data-text]");

        if (body.offsetWidth > 480) {
          currentText.style.width = calculateWidth().text + "px";
          currentContent.style.width = calculateWidth().container + "px";
        } else {
          currentText.style.width = "100%";
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