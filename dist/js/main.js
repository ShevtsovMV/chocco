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
}());/* Горизонтальный аккордеон */
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

horizontalAcco("#accordeonList");;const humburgerFn = () => {
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

humburgerFn();;(function () {
  let myMap;
  const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.751421, 37.606557],
      zoom: 14,
      controls: []
    });

    const coords = [
      [55.758957, 37.623319],
      [55.757844, 37.582766],
      [55.751253, 37.607422],
      [55.743106, 37.583490]
    ];
    const myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: "images/icons/marker.svg",
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });

    coords.forEach(coord => {
      myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
  };
  ymaps.ready(init);
}());const validateFields = (form, fieldArray) => {
  fieldArray.forEach(field => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
};

$(".form").submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const btnReset = form.find("[type='reset']");

  const modal = $("#modal");
  const content = modal.find(".modal__content")

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to])

  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },
    });

    request.done(data => {
      content.text(data.message);
      btnReset.click();
    });

    request.fail(data => {
      const message = data.responseJSON.message;
        content.text(message);
        modal.addClass("error-modal");
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline",
        opts: {
          smallBtn: false
        }
      });
    })
  }
});

$(".app-submit-btn").on("click", e => {
  e.preventDefault();

  $.fancybox.close();
});;(function () {
  const section = $("section");
  const display = $(".maincontent");
  const sideMenu = $(".fixed-menu");
  const menuItems = sideMenu.find(".fixed-menu__item");

  //http://hgoebl.github.io/mobile-detect.js/
  const mobeleDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobeleDetect.mobile();

  let inScroll = false;

  section.first().addClass("active");

  const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
      console.error("передано неверное значение в countSectionPosition");
      return 0;
    }

    return position;
  };

  const changeMenuThemeForSection = sectionEq => {
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu_shadowed";

    if (menuTheme === "black") {
      sideMenu.addClass(activeClass);
    } else {
      sideMenu.removeClass(activeClass);
    }
  };

  const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
  };

  const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(section, sectionEq, "active");

    setTimeout(() => {
      inScroll = false;
      resetActiveClassForItem(menuItems, sectionEq, "active");
    }, transitionOver + mouseInertiaOver);
  };

  const viewportScroller = () => {
    const activeSection = section.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
      next() {
        if (nextSection.length) {
          perfomTransition(nextSection.index());
        }
      },
      prev() {
        if (prevSection.length) {
          perfomTransition(prevSection.index());
        }
      }
    }
  };

  $(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
      scroller.next();
    }

    if (deltaY < 0) {
      scroller.prev();
    }
  });

  $(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";
    const scroller = viewportScroller();

    if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 38:
        scroller.prev();
        break;

      case 40:
        scroller.next();
        break;
    };
  });

  $(".wrapper").on("touchmove", e => e.preventDefault);

  $("[data-scroll-to]").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    perfomTransition(reqSection.index());
  });

  if (isMobile) {
    //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe({
      swipe: function (event, direction) {
        const scroller = viewportScroller();
        let scrollDirection = "";

        if (direction === "up") scrollDirection = "next";
        if (direction === "down") scrollDirection = "prev";

        scroller[scrollDirection]();
      }
    });
  }
}());(function () {
  const media = document.querySelector(".player__video");
  const controls = $(".player__controls");
  const playBtn = $(".player__play");

  /* Play & Pause */
  const playPauseMedia = () => {
    if (media.paused) {
      media.play();
    } else {
      media.pause();
    }
  }

  playBtn.on("click", playPauseMedia);
  media.addEventListener("click", playPauseMedia);
  media.onended = function () {
    playBtn.attr("data-icon", "play");
  };
  media.onpause = function () {
    playBtn.attr("data-icon", "play");
  };
  media.onplay = function () {
    playBtn.attr("data-icon", "pause");
  };

  /* Управление и отображение прогресса проигрывания */
  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newPlaybackPositionSec = media.duration * clickedPosition / bar.width();

    media.currentTime = newPlaybackPositionSec;
  });

  media.ontimeupdate = function () {
    const durationSec = media.duration;
    const completedSec = media.currentTime;
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });
  };

  /* Управление звуком */
  $(".player__volume").on("click", e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;

    media.volume = clickedPosition / bar.width();
  });

  media.onvolumechange = () => {
    const currentVolume = media.volume;
    const newButtonPositionPercent = currentVolume * 100;

    $(".player__volume-button").css({
      left: `${newButtonPositionPercent}%`
    });
  };
}());const slider = () => {
  const sliderBtnNext = document.querySelector("#sliderBtnNext");
  const sliderBtnPrev = document.querySelector("#sliderBtnPrev");
  const sliderList = document.querySelector(".slider__container");

  sliderBtnNext.addEventListener("click", () => {
    sliderList.appendChild(sliderList.firstElementChild);
  });

  sliderBtnPrev.addEventListener("click", () => {
    sliderList.insertBefore(sliderList.lastElementChild, sliderList.firstElementChild);
  });
};

slider();;$(".interactive-avatar__link").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const currentItem = $this.closest(".interactive-avatar");
  const currentItemNdx = currentItem.index();
  const itemToShow = $('.reviews__item').eq(currentItemNdx);

  currentItem.addClass("active").siblings().removeClass("active");
  itemToShow.addClass("active").siblings().removeClass("active");
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImhvcml6b250YWxBY2NvLmpzIiwiaHVtYnVyZ2VyLW1lbnUuanMiLCJtYXAuanMiLCJtb2RhbC5qcyIsIm9wcy5qcyIsInBsYXllci5qcyIsInNsaWRlci5qcyIsInRhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0NoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0M3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gIC8qINCf0LXRgNC10LzQtdGJ0LDQtdGCINCx0LvQvtC60LggLnRlYW1fX3Bob3RvINCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRiNC40YDQuNC90Ysg0L7QutC90LAgKi9cclxuICBjb25zdCBibG9ja01vdmVtZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGVhbVBob3RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbV9fcGhvdG9cIik7XHJcbiAgICBjb25zdCB0ZWFtUGhvdG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlYW1fX3Bob3RvXCIpO1xyXG4gICAgY29uc3QgdGVhbUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlYW1fX2l0ZW1cIik7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8PSA3NjggJiYgdGVhbVBob3RvLnBhcmVudE5vZGUgPT09IHRlYW1JdGVtKSB7XHJcbiAgICAgIHRlYW1QaG90b3MuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50SXRlbSA9IGVsZW1lbnQuY2xvc2VzdChcIi50ZWFtX19pdGVtXCIpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnREZXRhaWxzID0gY3VycmVudEl0ZW0ucXVlcnlTZWxlY3RvcihcIi50ZWFtX19kZXRhaWxzXCIpO1xyXG4gICAgICAgIGN1cnJlbnREZXRhaWxzLmluc2VydEJlZm9yZShlbGVtZW50LCBjdXJyZW50RGV0YWlscy5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPiA3NjggJiYgdGVhbVBob3RvLnBhcmVudE5vZGUgIT09IHRlYW1JdGVtKSB7XHJcbiAgICAgIHRlYW1QaG90b3MuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50SXRlbSA9IGVsZW1lbnQuY2xvc2VzdChcIi50ZWFtX19pdGVtXCIpO1xyXG4gICAgICAgIGN1cnJlbnRJdGVtLmluc2VydEJlZm9yZShlbGVtZW50LCBjdXJyZW50SXRlbS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGJsb2NrTW92ZW1lbnQoKTtcclxuXHJcbiAgd2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xyXG4gICAgYmxvY2tNb3ZlbWVudCgpO1xyXG4gIH07XHJcblxyXG4gIC8qINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCIG1pbi1oZWlnaHQg0LHQu9C+0LrRgyAudGVhbSDQtNC70Y8g0LjRgdC60LvRjtGH0LXQvdC40Y8gXCLQv9C+0LTQv9GA0YvQs9C40LLQsNC90LjQuVwiINC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4L9C30LDQutGA0YvRgtC40Lgg0LDQutC60L7RgNC00LXQvtC90LAqL1xyXG4gIGNvbnN0IHRlYW1IZWlnaHQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZWFtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZWFtXCIpO1xyXG4gICAgY29uc3QgYmxvY2tzID0gdGVhbS5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW1fX2RldGFpbHNcIik7XHJcblxyXG4gICAgY29uc3QgYmxvY2tzSGVpZ2h0ID0gW107XHJcbiAgICBibG9ja3MuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgYmxvY2tzSGVpZ2h0LnB1c2goZWxlbWVudC5zY3JvbGxIZWlnaHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZ2V0TWF4T2ZBcnJheSA9IChudW1BcnJheSkgPT4gTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xyXG4gICAgdGVhbS5zdHlsZS5taW5IZWlnaHQgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUodGVhbSkuaGVpZ2h0KSArIGdldE1heE9mQXJyYXkoYmxvY2tzSGVpZ2h0KSArIFwicHhcIjtcclxuICB9O1xyXG5cclxuICB0ZWFtSGVpZ2h0KCk7XHJcblxyXG4gIC8qINCS0LXRgNGC0LjQutCw0LvRjNC90YvQuSDQsNC60LrQvtGA0LTQtdC+0L0gKi9cclxuICBjb25zdCB0ZWFtQWNjbyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRlYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlYW1cIik7XHJcblxyXG4gICAgdGVhbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpbmsgPSBlLnRhcmdldDtcclxuXHJcbiAgICAgIGlmIChsaW5rLmNsYXNzTGlzdC5jb250YWlucyhcInRlYW1fX25hbWVcIikpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmUgPSB0ZWFtLnF1ZXJ5U2VsZWN0b3IoXCIudGVhbV9faXRlbS5hY3RpdmVcIik7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgIGNvbnN0IGFjdGl2ZVRleHQgPSBhY3RpdmUucXVlcnlTZWxlY3RvcihcIi50ZWFtX19kZXRhaWxzXCIpO1xyXG4gICAgICAgICAgYWN0aXZlVGV4dC5zdHlsZS5oZWlnaHQgPSAwO1xyXG4gICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWFjdGl2ZSB8fCBhY3RpdmUucXVlcnlTZWxlY3RvcihcIi50ZWFtX19uYW1lXCIpICE9PSBsaW5rKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IGxpbmsuY2xvc2VzdChcIi50ZWFtX19pdGVtXCIpO1xyXG4gICAgICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gY3VycmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZWFtX19kZXRhaWxzXCIpO1xyXG4gICAgICAgICAgY3VycmVudFRleHQuc3R5bGUuaGVpZ2h0ID0gY3VycmVudFRleHQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdGVhbUFjY28oKTtcclxufSgpKSIsIi8qINCT0L7RgNC40LfQvtC90YLQsNC70YzQvdGL0Lkg0LDQutC60L7RgNC00LXQvtC9ICovXHJcbmNvbnN0IGhvcml6b250YWxBY2NvID0gKHNlbGVjdG9yKSA9PiB7XHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gIGNvbnN0IGFjY28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICBjb25zdCBpdGVtcyA9IGFjY28ucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWl0ZW1dXCIpO1xyXG4gIGNvbnN0IGxpbmtzID0gYWNjby5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdHJpZ2dlcl1cIik7XHJcbiAgY29uc3QgdGV4dENvbnRhaW5lcnMgPSBhY2NvLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1jb250ZW50XVwiKTtcclxuICBjb25zdCB0ZXh0cyA9IGFjY28ucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXRleHRdXCIpO1xyXG5cclxuICBjb25zdCBjYWxjdWxhdGVXaWR0aCA9ICgpID0+IHtcclxuICAgIGxldCByZWdJdGVtV2lkdGggPSAwO1xyXG5cclxuICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBjb25zdCBNQVhfV0lEVEggPSA1MzA7XHJcbiAgICBjb25zdCBhY2NvUGFkZGluZyA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShhY2NvKS5wYWRkaW5nUmlnaHQpO1xyXG4gICAgY29uc3QgbGlua3NXaWR0aCA9IGxpbmtzWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3QgcmVxV2lkdGggPSB3aW5kb3dXaWR0aCAtIGFjY29QYWRkaW5nIC0gKGxpbmtzV2lkdGggKiBsaW5rcy5sZW5ndGgpO1xyXG5cclxuICAgIHJlcVdpZHRoID4gTUFYX1dJRFRIID8gcmVnSXRlbVdpZHRoID0gTUFYX1dJRFRIIDogcmVnSXRlbVdpZHRoID0gcmVxV2lkdGg7XHJcblxyXG4gICAgY29uc3QgdGV4dENvbnRhaW5lclBhZGRpbmdSaWdodCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0Q29udGFpbmVyc1swXSkucGFkZGluZ1JpZ2h0KTtcclxuICAgIGNvbnN0IHRleHRDb250YWluZXJQYWRkaW5nTGVmdCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0Q29udGFpbmVyc1swXSkucGFkZGluZ0xlZnQpO1xyXG4gICAgY29uc3QgdGV4dE1hcmdpblJpZ2h0ID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHRleHRzWzBdKS5tYXJnaW5SaWdodCk7XHJcblxyXG4gICAgY29uc3QgdGV4dFdpZHRoID0gcmVnSXRlbVdpZHRoIC0gdGV4dENvbnRhaW5lclBhZGRpbmdSaWdodCAtIHRleHRDb250YWluZXJQYWRkaW5nTGVmdCAtIHRleHRNYXJnaW5SaWdodDtcclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29udGFpbmVyOiByZWdJdGVtV2lkdGgsXHJcbiAgICAgIHRleHQ6IHRleHRXaWR0aFxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNsb3NlSXRlbSA9IChhY3RpdmVFbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVDb250ZW50ID0gYWN0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd3JhcF1cIik7XHJcbiAgICBhY3RpdmVDb250ZW50LnN0eWxlLndpZHRoID0gXCIwcHhcIjtcclxuICAgIGFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHJcbiAgICBpZiAoYm9keS5vZmZzZXRXaWR0aCA8PSA0ODApIHtcclxuICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGl0ZW0uc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhY2NvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgY29uc3QgYWN0aXZlID0gYWNjby5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaXRlbV0uYWN0aXZlXCIpO1xyXG5cclxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChcIltkYXRhLXRyaWdnZXJdXCIpKSB7XHJcbiAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICBjbG9zZUl0ZW0oYWN0aXZlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhY3RpdmUgfHwgYWN0aXZlLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10cmlnZ2VyXVwiKSAhPT0gdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS10cmlnZ2VyXVwiKSkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0YXJnZXQuY2xvc2VzdChcIltkYXRhLWl0ZW1dXCIpO1xyXG4gICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50Q29udGVudCA9IGN1cnJlbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdyYXBdXCIpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdGV4dF1cIik7XHJcblxyXG4gICAgICAgIGlmIChib2R5Lm9mZnNldFdpZHRoID4gNDgwKSB7XHJcbiAgICAgICAgICBjdXJyZW50VGV4dC5zdHlsZS53aWR0aCA9IGNhbGN1bGF0ZVdpZHRoKCkudGV4dCArIFwicHhcIjtcclxuICAgICAgICAgIGN1cnJlbnRDb250ZW50LnN0eWxlLndpZHRoID0gY2FsY3VsYXRlV2lkdGgoKS5jb250YWluZXIgKyBcInB4XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGN1cnJlbnRUZXh0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcbiAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5zdHlsZS53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY3VycmVudENvbnRlbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZih0YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsb3NlXVwiKSkge1xyXG4gICAgICBjbG9zZUl0ZW0oYWN0aXZlKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmhvcml6b250YWxBY2NvKFwiI2FjY29yZGVvbkxpc3RcIik7IiwiY29uc3QgaHVtYnVyZ2VyRm4gPSAoKSA9PiB7XHJcbiAgY29uc3QgaHVtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2h1bWJ1cmdlcicpO1xyXG4gIGNvbnN0IGh1bWJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHVtYnVyZ2VyTWVudScpO1xyXG5cclxuICBodW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGh1bWJ1cmdlck1lbnUuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjbG9zZUh1bWJ1cmdlck1lbnUgPSBodW1idXJnZXJNZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19jbG9zZScpO1xyXG4gIGNsb3NlSHVtYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGh1bWJ1cmdlck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBtZW51TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudV9fbGlzdFwiKTtcclxuICBtZW51TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgaWYgKHRhcmdldC5jbG9zZXN0KFwiLm1lbnVfX2l0ZW1cIikpIHtcclxuICAgICAgaHVtYnVyZ2VyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5odW1idXJnZXJGbigpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IG15TWFwO1xyXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XHJcbiAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xyXG4gICAgICBjZW50ZXI6IFs1NS43NTE0MjEsIDM3LjYwNjU1N10sXHJcbiAgICAgIHpvb206IDE0LFxyXG4gICAgICBjb250cm9sczogW11cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNvb3JkcyA9IFtcclxuICAgICAgWzU1Ljc1ODk1NywgMzcuNjIzMzE5XSxcclxuICAgICAgWzU1Ljc1Nzg0NCwgMzcuNTgyNzY2XSxcclxuICAgICAgWzU1Ljc1MTI1MywgMzcuNjA3NDIyXSxcclxuICAgICAgWzU1Ljc0MzEwNiwgMzcuNTgzNDkwXVxyXG4gICAgXTtcclxuICAgIGNvbnN0IG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKHt9LCB7XHJcbiAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgaWNvbkltYWdlSHJlZjogXCJpbWFnZXMvaWNvbnMvbWFya2VyLnN2Z1wiLFxyXG4gICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTM1LCAtNTJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgIG15Q29sbGVjdGlvbi5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhjb29yZCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuXHJcbiAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZSgnc2Nyb2xsWm9vbScpO1xyXG4gIH07XHJcbiAgeW1hcHMucmVhZHkoaW5pdCk7XHJcbn0oKSkiLCJjb25zdCB2YWxpZGF0ZUZpZWxkcyA9IChmb3JtLCBmaWVsZEFycmF5KSA9PiB7XHJcbiAgZmllbGRBcnJheS5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgIGZpZWxkLnJlbW92ZUNsYXNzKFwiaW5wdXQtZXJyb3JcIik7XHJcbiAgICBpZiAoZmllbGQudmFsKCkudHJpbSgpID09PSBcIlwiKSB7XHJcbiAgICAgIGZpZWxkLmFkZENsYXNzKFwiaW5wdXQtZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGVycm9yRmllbGRzID0gZm9ybS5maW5kKFwiLmlucHV0LWVycm9yXCIpO1xyXG5cclxuICByZXR1cm4gZXJyb3JGaWVsZHMubGVuZ3RoID09PSAwO1xyXG59O1xyXG5cclxuJChcIi5mb3JtXCIpLnN1Ym1pdChlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNvbnN0IGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgY29uc3QgbmFtZSA9IGZvcm0uZmluZChcIltuYW1lPSduYW1lJ11cIik7XHJcbiAgY29uc3QgcGhvbmUgPSBmb3JtLmZpbmQoXCJbbmFtZT0ncGhvbmUnXVwiKTtcclxuICBjb25zdCBjb21tZW50ID0gZm9ybS5maW5kKFwiW25hbWU9J2NvbW1lbnQnXVwiKTtcclxuICBjb25zdCB0byA9IGZvcm0uZmluZChcIltuYW1lPSd0byddXCIpO1xyXG4gIGNvbnN0IGJ0blJlc2V0ID0gZm9ybS5maW5kKFwiW3R5cGU9J3Jlc2V0J11cIik7XHJcblxyXG4gIGNvbnN0IG1vZGFsID0gJChcIiNtb2RhbFwiKTtcclxuICBjb25zdCBjb250ZW50ID0gbW9kYWwuZmluZChcIi5tb2RhbF9fY29udGVudFwiKVxyXG5cclxuICBtb2RhbC5yZW1vdmVDbGFzcyhcImVycm9yLW1vZGFsXCIpO1xyXG5cclxuICBjb25zdCBpc1ZhbGlkID0gdmFsaWRhdGVGaWVsZHMoZm9ybSwgW25hbWUsIHBob25lLCBjb21tZW50LCB0b10pXHJcblxyXG4gIGlmIChpc1ZhbGlkKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcclxuICAgICAgdXJsOiBcImh0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbFwiLFxyXG4gICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbmFtZTogbmFtZS52YWwoKSxcclxuICAgICAgICBwaG9uZTogcGhvbmUudmFsKCksXHJcbiAgICAgICAgY29tbWVudDogY29tbWVudC52YWwoKSxcclxuICAgICAgICB0bzogdG8udmFsKClcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcXVlc3QuZG9uZShkYXRhID0+IHtcclxuICAgICAgY29udGVudC50ZXh0KGRhdGEubWVzc2FnZSk7XHJcbiAgICAgIGJ0blJlc2V0LmNsaWNrKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXF1ZXN0LmZhaWwoZGF0YSA9PiB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnJlc3BvbnNlSlNPTi5tZXNzYWdlO1xyXG4gICAgICAgIGNvbnRlbnQudGV4dChtZXNzYWdlKTtcclxuICAgICAgICBtb2RhbC5hZGRDbGFzcyhcImVycm9yLW1vZGFsXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVxdWVzdC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAkLmZhbmN5Ym94Lm9wZW4oe1xyXG4gICAgICAgIHNyYzogXCIjbW9kYWxcIixcclxuICAgICAgICB0eXBlOiBcImlubGluZVwiLFxyXG4gICAgICAgIG9wdHM6IHtcclxuICAgICAgICAgIHNtYWxsQnRuOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxufSk7XHJcblxyXG4kKFwiLmFwcC1zdWJtaXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAkLmZhbmN5Ym94LmNsb3NlKCk7XHJcbn0pOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgc2VjdGlvbiA9ICQoXCJzZWN0aW9uXCIpO1xyXG4gIGNvbnN0IGRpc3BsYXkgPSAkKFwiLm1haW5jb250ZW50XCIpO1xyXG4gIGNvbnN0IHNpZGVNZW51ID0gJChcIi5maXhlZC1tZW51XCIpO1xyXG4gIGNvbnN0IG1lbnVJdGVtcyA9IHNpZGVNZW51LmZpbmQoXCIuZml4ZWQtbWVudV9faXRlbVwiKTtcclxuXHJcbiAgLy9odHRwOi8vaGdvZWJsLmdpdGh1Yi5pby9tb2JpbGUtZGV0ZWN0LmpzL1xyXG4gIGNvbnN0IG1vYmVsZURldGVjdCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gIGNvbnN0IGlzTW9iaWxlID0gbW9iZWxlRGV0ZWN0Lm1vYmlsZSgpO1xyXG5cclxuICBsZXQgaW5TY3JvbGwgPSBmYWxzZTtcclxuXHJcbiAgc2VjdGlvbi5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICBjb25zdCBjb3VudFNlY3Rpb25Qb3NpdGlvbiA9IHNlY3Rpb25FcSA9PiB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNlY3Rpb25FcSAqIC0xMDA7XHJcblxyXG4gICAgaWYgKGlzTmFOKHBvc2l0aW9uKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwi0L/QtdGA0LXQtNCw0L3QviDQvdC10LLQtdGA0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LIgY291bnRTZWN0aW9uUG9zaXRpb25cIik7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb3NpdGlvbjtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGFuZ2VNZW51VGhlbWVGb3JTZWN0aW9uID0gc2VjdGlvbkVxID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRTZWN0aW9uID0gc2VjdGlvbi5lcShzZWN0aW9uRXEpO1xyXG4gICAgY29uc3QgbWVudVRoZW1lID0gY3VycmVudFNlY3Rpb24uYXR0cihcImRhdGEtc2lkZW1lbnUtdGhlbWVcIik7XHJcbiAgICBjb25zdCBhY3RpdmVDbGFzcyA9IFwiZml4ZWQtbWVudV9zaGFkb3dlZFwiO1xyXG5cclxuICAgIGlmIChtZW51VGhlbWUgPT09IFwiYmxhY2tcIikge1xyXG4gICAgICBzaWRlTWVudS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaWRlTWVudS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0gPSAoaXRlbXMsIGl0ZW1FcSwgYWN0aXZlQ2xhc3MpID0+IHtcclxuICAgIGl0ZW1zLmVxKGl0ZW1FcSkuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBlcmZvbVRyYW5zaXRpb24gPSBzZWN0aW9uRXEgPT4ge1xyXG4gICAgaWYgKGluU2Nyb2xsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdHJhbnNpdGlvbk92ZXIgPSAxMDAwO1xyXG4gICAgY29uc3QgbW91c2VJbmVydGlhT3ZlciA9IDMwMDtcclxuXHJcbiAgICBpblNjcm9sbCA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgcG9zaXRpb24gPSBjb3VudFNlY3Rpb25Qb3NpdGlvbihzZWN0aW9uRXEpO1xyXG5cclxuICAgIGNoYW5nZU1lbnVUaGVtZUZvclNlY3Rpb24oc2VjdGlvbkVxKTtcclxuXHJcbiAgICBkaXNwbGF5LmNzcyh7XHJcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtwb3NpdGlvbn0lKWBcclxuICAgIH0pO1xyXG5cclxuICAgIHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtKHNlY3Rpb24sIHNlY3Rpb25FcSwgXCJhY3RpdmVcIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGluU2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgIHJlc2V0QWN0aXZlQ2xhc3NGb3JJdGVtKG1lbnVJdGVtcywgc2VjdGlvbkVxLCBcImFjdGl2ZVwiKTtcclxuICAgIH0sIHRyYW5zaXRpb25PdmVyICsgbW91c2VJbmVydGlhT3Zlcik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgdmlld3BvcnRTY3JvbGxlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBzZWN0aW9uLmZpbHRlcihcIi5hY3RpdmVcIik7XHJcbiAgICBjb25zdCBuZXh0U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ubmV4dCgpO1xyXG4gICAgY29uc3QgcHJldlNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLnByZXYoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZXh0KCkge1xyXG4gICAgICAgIGlmIChuZXh0U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgIHBlcmZvbVRyYW5zaXRpb24obmV4dFNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBwcmV2KCkge1xyXG4gICAgICAgIGlmIChwcmV2U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgIHBlcmZvbVRyYW5zaXRpb24ocHJldlNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJCh3aW5kb3cpLm9uKFwid2hlZWxcIiwgZSA9PiB7XHJcbiAgICBjb25zdCBkZWx0YVkgPSBlLm9yaWdpbmFsRXZlbnQuZGVsdGFZO1xyXG4gICAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcblxyXG4gICAgaWYgKGRlbHRhWSA+IDApIHtcclxuICAgICAgc2Nyb2xsZXIubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWx0YVkgPCAwKSB7XHJcbiAgICAgIHNjcm9sbGVyLnByZXYoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJCh3aW5kb3cpLm9uKFwia2V5ZG93blwiLCBlID0+IHtcclxuICAgIGNvbnN0IHRhZ05hbWUgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCB1c2VyVHlwaW5nSW5JbnB1dHMgPSB0YWdOYW1lID09PSBcImlucHV0XCIgfHwgdGFnTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiO1xyXG4gICAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcblxyXG4gICAgaWYgKHVzZXJUeXBpbmdJbklucHV0cykgcmV0dXJuO1xyXG5cclxuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgc2Nyb2xsZXIucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSA0MDpcclxuICAgICAgICBzY3JvbGxlci5uZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLndyYXBwZXJcIikub24oXCJ0b3VjaG1vdmVcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KTtcclxuXHJcbiAgJChcIltkYXRhLXNjcm9sbC10b11cIikub24oXCJjbGlja1wiLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IHRhcmdldCA9ICR0aGlzLmF0dHIoXCJkYXRhLXNjcm9sbC10b1wiKTtcclxuICAgIGNvbnN0IHJlcVNlY3Rpb24gPSAkKGBbZGF0YS1zZWN0aW9uLWlkPSR7dGFyZ2V0fV1gKTtcclxuXHJcbiAgICBwZXJmb21UcmFuc2l0aW9uKHJlcVNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChpc01vYmlsZSkge1xyXG4gICAgLy9odHRwczovL2dpdGh1Yi5jb20vbWF0dGJyeXNvbi9Ub3VjaFN3aXBlLUpxdWVyeS1QbHVnaW5cclxuICAgICQoXCJib2R5XCIpLnN3aXBlKHtcclxuICAgICAgc3dpcGU6IGZ1bmN0aW9uIChldmVudCwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsZXIgPSB2aWV3cG9ydFNjcm9sbGVyKCk7XHJcbiAgICAgICAgbGV0IHNjcm9sbERpcmVjdGlvbiA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidXBcIikgc2Nyb2xsRGlyZWN0aW9uID0gXCJuZXh0XCI7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJkb3duXCIpIHNjcm9sbERpcmVjdGlvbiA9IFwicHJldlwiO1xyXG5cclxuICAgICAgICBzY3JvbGxlcltzY3JvbGxEaXJlY3Rpb25dKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSgpKSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcl9fdmlkZW9cIik7XHJcbiAgY29uc3QgY29udHJvbHMgPSAkKFwiLnBsYXllcl9fY29udHJvbHNcIik7XHJcbiAgY29uc3QgcGxheUJ0biA9ICQoXCIucGxheWVyX19wbGF5XCIpO1xyXG5cclxuICAvKiBQbGF5ICYgUGF1c2UgKi9cclxuICBjb25zdCBwbGF5UGF1c2VNZWRpYSA9ICgpID0+IHtcclxuICAgIGlmIChtZWRpYS5wYXVzZWQpIHtcclxuICAgICAgbWVkaWEucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVkaWEucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlCdG4ub24oXCJjbGlja1wiLCBwbGF5UGF1c2VNZWRpYSk7XHJcbiAgbWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlQYXVzZU1lZGlhKTtcclxuICBtZWRpYS5vbmVuZGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcGxheUJ0bi5hdHRyKFwiZGF0YS1pY29uXCIsIFwicGxheVwiKTtcclxuICB9O1xyXG4gIG1lZGlhLm9ucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBwbGF5QnRuLmF0dHIoXCJkYXRhLWljb25cIiwgXCJwbGF5XCIpO1xyXG4gIH07XHJcbiAgbWVkaWEub25wbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcGxheUJ0bi5hdHRyKFwiZGF0YS1pY29uXCIsIFwicGF1c2VcIik7XHJcbiAgfTtcclxuXHJcbiAgLyog0KPQv9GA0LDQstC70LXQvdC40LUg0Lgg0L7RgtC+0LHRgNCw0LbQtdC90LjQtSDQv9GA0L7Qs9GA0LXRgdGB0LAg0L/RgNC+0LjQs9GA0YvQstCw0L3QuNGPICovXHJcbiAgJChcIi5wbGF5ZXJfX3BsYXliYWNrXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICBjb25zdCBiYXIgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBjbGlja2VkUG9zaXRpb24gPSBlLm9yaWdpbmFsRXZlbnQubGF5ZXJYO1xyXG4gICAgY29uc3QgbmV3UGxheWJhY2tQb3NpdGlvblNlYyA9IG1lZGlhLmR1cmF0aW9uICogY2xpY2tlZFBvc2l0aW9uIC8gYmFyLndpZHRoKCk7XHJcblxyXG4gICAgbWVkaWEuY3VycmVudFRpbWUgPSBuZXdQbGF5YmFja1Bvc2l0aW9uU2VjO1xyXG4gIH0pO1xyXG5cclxuICBtZWRpYS5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBkdXJhdGlvblNlYyA9IG1lZGlhLmR1cmF0aW9uO1xyXG4gICAgY29uc3QgY29tcGxldGVkU2VjID0gbWVkaWEuY3VycmVudFRpbWU7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRQZXJjZW50ID0gKGNvbXBsZXRlZFNlYyAvIGR1cmF0aW9uU2VjKSAqIDEwMDtcclxuXHJcbiAgICAkKFwiLnBsYXllcl9fcGxheWJhY2stYnV0dG9uXCIpLmNzcyh7XHJcbiAgICAgIGxlZnQ6IGAke2NvbXBsZXRlZFBlcmNlbnR9JWBcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qINCj0L/RgNCw0LLQu9C10L3QuNC1INC30LLRg9C60L7QvCAqL1xyXG4gICQoXCIucGxheWVyX192b2x1bWVcIikub24oXCJjbGlja1wiLCBlID0+IHtcclxuICAgIGNvbnN0IGJhciA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IGNsaWNrZWRQb3NpdGlvbiA9IGUub3JpZ2luYWxFdmVudC5sYXllclg7XHJcblxyXG4gICAgbWVkaWEudm9sdW1lID0gY2xpY2tlZFBvc2l0aW9uIC8gYmFyLndpZHRoKCk7XHJcbiAgfSk7XHJcblxyXG4gIG1lZGlhLm9udm9sdW1lY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudFZvbHVtZSA9IG1lZGlhLnZvbHVtZTtcclxuICAgIGNvbnN0IG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudCA9IGN1cnJlbnRWb2x1bWUgKiAxMDA7XHJcblxyXG4gICAgJChcIi5wbGF5ZXJfX3ZvbHVtZS1idXR0b25cIikuY3NzKHtcclxuICAgICAgbGVmdDogYCR7bmV3QnV0dG9uUG9zaXRpb25QZXJjZW50fSVgXHJcbiAgICB9KTtcclxuICB9O1xyXG59KCkpIiwiY29uc3Qgc2xpZGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHNsaWRlckJ0bk5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NsaWRlckJ0bk5leHRcIik7XHJcbiAgY29uc3Qgc2xpZGVyQnRuUHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2xpZGVyQnRuUHJldlwiKTtcclxuICBjb25zdCBzbGlkZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJfX2NvbnRhaW5lclwiKTtcclxuXHJcbiAgc2xpZGVyQnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgc2xpZGVyTGlzdC5hcHBlbmRDaGlsZChzbGlkZXJMaXN0LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICB9KTtcclxuXHJcbiAgc2xpZGVyQnRuUHJldi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgc2xpZGVyTGlzdC5pbnNlcnRCZWZvcmUoc2xpZGVyTGlzdC5sYXN0RWxlbWVudENoaWxkLCBzbGlkZXJMaXN0LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICB9KTtcclxufTtcclxuXHJcbnNsaWRlcigpOyIsIiQoXCIuaW50ZXJhY3RpdmUtYXZhdGFyX19saW5rXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICBjb25zdCBjdXJyZW50SXRlbSA9ICR0aGlzLmNsb3Nlc3QoXCIuaW50ZXJhY3RpdmUtYXZhdGFyXCIpO1xyXG4gIGNvbnN0IGN1cnJlbnRJdGVtTmR4ID0gY3VycmVudEl0ZW0uaW5kZXgoKTtcclxuICBjb25zdCBpdGVtVG9TaG93ID0gJCgnLnJldmlld3NfX2l0ZW0nKS5lcShjdXJyZW50SXRlbU5keCk7XHJcblxyXG4gIGN1cnJlbnRJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgaXRlbVRvU2hvdy5hZGRDbGFzcyhcImFjdGl2ZVwiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG59KTsiXX0=
