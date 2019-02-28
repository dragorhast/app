export const mapConfigOptions = maps => ({
  zoom: 13,
  mapTypeId: maps.MapTypeId.ROADMAP,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: maps.ControlPosition.LEFT_CENTER,
  },
  keyboardShortcuts: true,
  panControl: true,
  panControlOptions: {
    position: maps.ControlPosition.BOTTOM_RIGHT,
  },
  // mapTypeId: maps.MapTypeId.HYBRID,
  mapTypeControl: true,
  mapTypeControlOptions: {
    position: maps.ControlPosition.LEFT_BOTTOM,
  },
  fullscreenControl: false,
});

export const mapCenter = { lat: 55.9460083, lng: -3.1967179 };
