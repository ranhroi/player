function data() {
    var vars = {};
    window.location.href.replace(/[?&#]+([^=&#]+)=([^&#]*)/gi,
        function(i, key, value) {
            vars[key] = value;
        });
    return vars;
};

var tracks = [
    { 'file': data()['vi'], 'label': 'Vietnamese', 'kind': 'captions', 'default': 'true' },
    { 'file': data()['en'], 'label': 'English', 'kind': 'captions' },
    { 'file': data()['fr'], 'label': 'French', 'kind': 'captions' },
    { 'file': data()['cn'], 'label': 'Chinese', 'kind': 'captions' },
    { 'file': data()['jp'], 'label': 'Japanese', 'kind': 'captions' },
    { 'file': data()['ru'], 'label': 'Russia', 'kind': 'captions' },
    { 'file': data()['ko'], 'label': 'Korean', 'kind': 'captions' },
    { 'file': data()['th'], 'label': 'ThaiLan', 'kind': 'captions' },
    { 'file': data()['km'], 'label': 'Khmer', 'kind': 'captions' },
    { 'file': data()['pl'], 'label': 'Philippines', 'kind': 'captions' },
    { 'file': data()['id'], 'label': 'Indonesia', 'kind': 'captions' },
    { 'file': data()['hi'], 'label': 'India', 'kind': 'captions' },
    { 'file': data()['de'], 'label': 'German', 'kind': 'captions' },
    { 'file': data()['it'], 'label': 'Italian', 'kind': 'captions' },
    { 'file': data()['ro'], 'label': 'Romanian', 'kind': 'captions' },
    { 'file': data()['es'], 'label': 'Spanish', 'kind': 'captions' },
    { 'file': data()['null'], 'label': 'Undefined', 'kind': 'captions' }
];
var track = ``
if (data()['vi'] !== undefined) { track += `<track src="${data()['vi']}" srclang="vi" label="Vietnam" kind="subtitles" type="text/srt" default>` }
if (data()['en'] !== undefined) { track += `<track src="${data()['en']}" srclang="en" label="English" kind="subtitles" type="text/srt">` }
if (data()['cn'] !== undefined) { track += `<track src="${data()['cn']}" srclang="zh-CN" label="Chinese" kind="subtitles" type="text/srt">` }
if (data()['es'] !== undefined) { track += `<track src="${data()['es']}" srclang="es" label="Spanish" kind="subtitles" type="text/srt">` }
if (data()['null'] !== undefined) { track += `<track src="${data()['null']}" srclang="ro" label="Undefined" kind="subtitles" type="text/srt">` }

var hostname = (data()["url"] === '' || data()["url"] == undefined) ? null : new URL(data()["url"]);
var host = (hostname != null) ? hostname.hostname.replace('www.', '') : null;
switch (host) {
    case 'youtube.com':
        jQuery('#ePlayer').html(tube(data()["url"], track));
        break;
    case 'dailymotion.com':
        jQuery('#ePlayer').html(daily(data()["url"], track));
        break;
    case 'facebook.com':
        jQuery('#ePlayer').html(face(data()["url"], track));
        break;
    case 'vimeo.com':
        jQuery('#ePlayer').html(vimeo(data()["url"], track));
        break;
    case 'ok.ru':
        jQuery('#ePlayer').html(okRu(data()["url"]))
        break;
    case 'photos.google.com':
        jQuery('#ePlayer').html(photoVideo(document.location.href))
        break;
    case 'drive.google.com':
        jQuery('#ePlayer').html(drive(document.location.href))
        break;
    case null:
        jQuery('#ePlayer').html('null');
        break;
    default:
        mp4(data()["url"], tracks);
};

function tube(url, track) {
    if (host === 'youtube.com') {
        return `<div class="player">
        <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline><source src="${url}" type="video/x-youtube" data-quality="Auto">${track}
        </video></div>`
    }
};

function daily(url, track) {
    if (host === 'dailymotion.com') {
        return `<div class="player">
        <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline><source src="${url}" type="video/x-dailymotion" data-quality="Auto">${track}</video></div>`
    }
};

function face(url, track) {
    if (host === 'facebook.com') {
        return `<div class="player">
        <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline><source src="${url}" type="video/x-facebook" data-quality="Auto">${track}</video></div>`
    }
};

function vimeo(url, track) {
    if (host === 'vimeo.com') {
        return `<div class="player">
        <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline><source src="${url}" type="video/x-vimeo" data-quality="Auto">${track}</video></div>`
    }
};

function okRu(url) {
    if (host === 'ok.ru') {
        url = url.includes('videoembed') ? url : url.replace(/\/video/gi, "/videoembed");
        return `<div class="player"><iframe id="player" style="width:100%; height:100%;" src="${url}?autoplay=1" allowfullscreen scrolling="no" allow="encrypted-media"></iframe></div>`
    }
};

function photoVideo(url) {
    url = url.includes('?url') ? url.replace(/https:\/\/ranhroi.github.io\/player\//gi, "https://jahuyphogo.000webhostapp.com/wp-drivephoto/photos.php") : url.split("?url=")[1];
    if (host === 'photos.google.com') {
        return `<div class="player"><iframe id="player" style="width:100%; height:100%;" src="${url}" allowfullscreen scrolling="no" allow="encrypted-media"></iframe></div>`
    }
};

function drive(url) {
    url = url.includes('?url') ? url.replace(/https:\/\/ranhroi.github.io\/player\//gi, "https://jahuyphogo.000webhostapp.com/wp-drivephoto/drive.php") : url.split("?url=")[1];
    if (host === 'drive.google.com') {
        return `<div class="player"><iframe id="player" style="width:100%; height:100%;" src="${url}" allowfullscreen scrolling="no" allow="encrypted-media"></iframe></div>`
    }
};

function mp4(url, tracks) {
    var player = jwplayer("ePlayer");
    jwplayer.key = "ITWMv7t88JGzI0xPwW8I0+LveiXX9SWbfdmt0ArUSyc=";
    player.setup({
        sources: [{
            "label": "undefined",
            "type": "video\/mp4",
            "file": url,
        }],
        aspectratio: "16:9",
        width: "100%",
        height: "100%",
        startparam: "start",
        primary: "html5",
        preload: "auto",
        autostart: true,
        aboutlink: "https://www.fb.com/classic.action.films",
        abouttext: "Viohd",
        captions: {
            color: "#f3f368",
            fontSize: 16,
            backgroundOpacity: 60,
            fontfamily: "Helvetica",
            edgeStyle: "raised"
        },
        tracks: tracks,
    });
    player.on("error", () => {
        $('#ePlayer').html(`<div class="player"><iframe id="player" style="width:100%; height:100%;" src="https://vjs.zencdn.net/v/oceans.mp4" allowfullscreen scrolling = "no"
        allow="encrypted-media"></iframe></div>`)
    });
}
