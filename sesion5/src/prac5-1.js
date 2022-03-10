
const url = "../videos/sintel_trailer-custom-480p-720p-1080p.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);

