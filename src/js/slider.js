const slider = () => {
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

slider();