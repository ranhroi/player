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

var player_post = document.querySelector('#player_post')
var hostname = (data()["url"] === '' || data()["url"] == undefined) ? null : new URL(data()["url"]);
var host = (hostname != null) ? hostname.host.replace('www.', '') : null;
switch (host) {
    case 'youtube.com':
        player_post.innerHTML = youtu(data()["url"], track);
        break;
    case 'dailymotion.com':
        player_post.innerHTML = daily(data()["url"], track);
        break;
    case 'facebook.com':
        player_post.innerHTML = face(data()["url"], track);
        break;
    case 'vimeo.com':
        player_post.innerHTML = vimeo(data()["url"], track);
        break;
    case 'ok.ru':
        player_post.innerHTML = okRu(data()["url"])
        break;
    case 'photos.google.com':
        player_post.innerHTML = photoGoogle(data()["url"])
        break;
    case null:
        player_post.innerHTML = 'null';
        break;
    default:
        mp4(data()["url"], tracks);
};

function youtu(url, track) {
    if (host === 'youtube.com') {
        return `
    <div class="player" style="margin:0;width:100%;height:100%;">
    <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline>
    <source src="${url}" type="video/x-youtube" data-quality="Auto">${track}
    </video>
    </div>`
    }
};

function daily(url, track) {
    if (host === 'dailymotion.com') {
        return `
    <div class="player" style="margin:0;width:100%;height:100%;">
    <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline>
    <source src="${url}" type="video/x-dailymotion" data-quality="Auto">${track}
    </video>
    </div>`
    }
};

function face(url, track) {
    if (host === 'facebook.com') {
        return `
    <div class="player" style="margin:0;width:100%;height:100%;">
    <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline>
    <source src="${url}" type="video/x-facebook" data-quality="Auto">${track}
    </video>
    </div>`
    }
};

function vimeo(url, track) {
    if (host === 'vimeo.com') {
        return `<div class="player" style="margin:0;width:100%;height:100%;">
    <video id="player" style="width:100%; height:100%;" preload="none" controls poster="" playsinline webkit-playsinline>
    <source src="${url}" type="video/x-vimeo" data-quality="Auto">${track}
    </video>
    </div>`
    }
};

function okRu(url) {
    if (host === 'ok.ru') {
        var link = url.includes('videoembed') ? url : url.replace(/\/video/gi, "/videoembed");
        return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${link}?autoplay=1" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media">
    </iframe>
    </div>`
    }
};

function photoGoogle(url) {
    if (host === 'photos.google.com') {
        return location.assign(url)
    }
};

function mp4(url, tracks) {
    var player = jwplayer("player_post");
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
        $('#player_post').html(`<div style="left: 0; width: 100%; height: 100%; position: relative; padding-bottom: 56.25%;">
        <iframe src="http://www.ckplayer.vip/jiexi/?url=${url}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media"></iframe></div>`)
    });
}
