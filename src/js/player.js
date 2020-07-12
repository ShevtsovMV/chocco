(function () {
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
}())