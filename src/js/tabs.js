$(".interactive-avatar__link").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const currentItem = $this.closest(".interactive-avatar");
  const currentItemNdx = currentItem.index();
  const itemToShow = $('.reviews__item').eq(currentItemNdx);

  currentItem.addClass("active").siblings().removeClass("active");
  itemToShow.addClass("active").siblings().removeClass("active");
});