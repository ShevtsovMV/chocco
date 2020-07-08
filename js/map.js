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