
const url = "../videos/sintel_trailer_custom_480_720_1080.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);

