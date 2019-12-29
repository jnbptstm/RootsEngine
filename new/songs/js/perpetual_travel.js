// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = './albums/perpetualtravel/',
            extension = 'mp3',
            tracks = [{
                "track": 1,
                "name": "Another Reality",
                "length": "05:07",
                "file": "01_AnotherReality"
            },{
                "track": 2,
                "name": "One by One",
                "length": "04:24",
                "file": "02_OneByOne"
            }, {
                "track": 3,
                "name": "Soul Hunter",
                "length": "05:58",
                "file": "03_SoulHunter"
            }, {
                "track": 4,
                "name": "Education is the Key",
                "length": "05:32",
                "file": "04_EducationIsTheKey"
            },{
                "track": 5,
                "name": "Friendly Something",
                "length": "04:38",
                "file": "05_FriendlySomething"
            },{
                "track": 6,
                "name": "Roots Diva",
                "length": "04:56",
                "file": "06_RootsDiva"
            },{
                "track": 7,
                "name": "Unknown Journey",
                "length": "06:09",
                "file": "07_UnknownJourney"
            },{
                "track": 8,
                "name": "Perpetual Travel",
                "length": "05:28",
                "file": "08_PerpetualTravel"
            },{
                "track": 9,
                "name": "Perpetual Dub",
                "length": "05:32",
                "file": "09_PerpetualDub"
            },{
                "track": 10,
                "name": "Dub by One",
                "length": "04:30",
                "file": "10_DubByOne"
            },{
                "track": 11,
                "name": "Maybe (Bonus Track)",
                "length": "04:31",
                "file": "11_Maybe(BonusTrack)"
            },{
                "track": 12,
                "name": "Excessive (Bonus Track)",
                "length": "06:01",
                "file": "12_Excessive(BonusTrack)"
            },],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

