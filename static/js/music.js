
var queue_head =0;
var queue=[]
function shuffleArray(arr) {
    // console.log(arr)
    const clonedArray = [...arr];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[i]];
    }
    return clonedArray;
}
function createPlayList(arr,now) {
    var filteredObjects = arr.filter(obj => obj.hasOwnProperty('metadata'));
    // filteredObjects = filteredObjects.filter(obj=>obj._id==now);
    // const result = {};
    return shuffleArray(filteredObjects)
}


$(document).ready(function () {
    // Fetch the entire dataset of songs
    function fetchAllSongData() {
        fetch('/music/songs')  // Replace with your actual API URL
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("songs",JSON.stringify(data));
                data=shuffleArray(data)
                createMusicCards(data);  // Create all music cards at once
            })
            .catch(error => console.error('Error fetching song data:', error));
    }

    function createMusicCards(songs) {
        const musicCardsContainer = $('#music-cards');
        musicCardsContainer.empty();

        songs.forEach(song => {
            if (!song.metadata) {
                return;
            }
            const songCard = `
                <div class="music-card" data-song="${song.metadata.id || 'None'}" data-title="${song.metadata.title || 'None'}" data-artist="${song.metadata.channel_id || 'None'}" data-description="${song.metadata.description || 'None'}" data-img="${song.metadata.thumbnail || 'None'}" onclick='selectTrack("${song._id}")' >
                    <img src="${song.metadata.thumbnail || 'default-image.jpg'}" alt="${song.metadata.title || 'No Title'}">
                    <div class="card-info">
                        <h3>${song.metadata.title || 'No Title'}</h3>
                        <p>By: ${song.metadata.channel_id || 'Unknown Artist'}</p>
                        <!-- <p class="description">${(song.metadata.description ? song.metadata.description.substring(0, 100) : 'No Description Available')}...</p> -->
                    </div>
                </div>
            `;
            musicCardsContainer.append(songCard);
        });
    }
    if(!localStorage.hasOwnProperty("songs")){
        fetchAllSongData();
    }else{
        createMusicCards(shuffleArray(JSON.parse(localStorage.getItem("songs"))))}
});
    const playerTrack = $("#player-track");
    const bgArtwork = $("#player-bg-artwork");
    const albumName = $("#album-name");
    const trackName = $("#track-name");

    const albumArt = $("#album-art");
    const sArea = $("#seek-bar-container");
    const seekBar = $("#seek-bar");
    const trackTime = $("#track-time");
    const seekTime = $("#seek-time");
    const sHover = $("#s-hover");
    const playPauseButton = $("#play-pause-button");
    const tProgress = $("#current-time");
    const tTime = $("#track-length");
    const playPreviousTrackButton = $("#play-previous");
    const playNextTrackButton = $("#play-next");

    const trackUrl = JSON.parse(localStorage.getItem("songs"))

    let
    i = playPauseButton.find("i"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    currIndex = -1;

    function getMetadataById(id) {
        var trackUrl = JSON.parse(localStorage.getItem("songs"));
        if (!trackUrl || trackUrl.length === 0) {
            console.error("No songs available or data not loaded properly.");
            return null;
        }
        const item = trackUrl.find(song => song._id === id);
        if (!item) {
            console.error("Song not found.");
            return null;
        }
        return item;
    }



function playPause() {
    setTimeout(function () {
    if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        i.attr("class", "fas fa-pause");
        clearInterval(buffInterval)
        audio.play();
    } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
    }
    }, 300);
}

function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) seekTime.text("--:--");
    else seekTime.text(ctMinutes + ":" + ctSeconds);

    seekTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
}

function hideHover() {
    sHover.width(0);
    seekTime
    .text("00:00")
    .css({ left: "0px", "margin-left": "0px" })
    .fadeOut(0);
}

function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
}

function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
    tFlag = true;
    trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
    isNaN(curMinutes) ||
    isNaN(curSeconds) ||
    isNaN(durMinutes) ||
    isNaN(durSeconds)
    )
    trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
    i.attr("class", "fa fa-play");
    seekBar.width(0);
    tProgress.text("00:00");
    albumArt.removeClass("buffering").removeClass("active");
    clearInterval(buffInterval);
    }
}

function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
    if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
    else albumArt.removeClass("buffering");

    bTime = new Date();
    bTime = bTime.getTime();
    }, 100);
}

function selectTrack(id,flag) {
    seekBar.width(0);
    trackTime.removeClass("active");
    tProgress.text("00:00");
    tTime.text("00:00");
    
    let track=getMetadataById(id)
    
    document.getElementById("player_thumb").src=track.metadata.thumbnail;
    var title = track.metadata.title.length > 19 ? track.metadata.title.substring(0, 17) + "..." : track.metadata.title;
    currAlbum = title;
    currTrackName = title;
    currArtwork = track.metadata.thumbnail;
    audio.src = `/music/song/${id}.m4a`;

    nTime = 0;
    bTime = new Date();
    bTime = bTime.getTime();
    albumName.text(currAlbum);
    trackName.text(currTrackName);
    
    // $("#" + currArtwork).addClass("active");
    // bgArtworkUrl = $("#" + currArtwork).attr("src");

    // if (flag != 0) {
    // if( playerTrack.classList.find(o=>{o== "active"})){
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");
        i.attr("class", "fas fa-pause");

        clearInterval(buffInterval);
        checkBuffering();
    // }
    // }

    // } else {
    // if (flag == 0 || flag == 1) --currIndex;
    // else ++currIndex;
    // }
}
function move(i){
    queue_head+=i
    if(queue[queue_head%queue.length].metadata)
    selectTrack(queue[queue_head%queue.length]._id)
    else
    move(i)
}

function initPlayer() {
    audio = new Audio();

    // selectTrack(trackUrl[0]._id);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
    showHover(event);
    });
    audio.onended = () => {
        move(1)
    };
    sArea.mouseout(hideHover);
    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);
    queue=createPlayList(JSON.parse(localStorage.getItem('songs')))
    playPreviousTrackButton.on("click", function () {
    move(-1)
    });
    playNextTrackButton.on("click", function () {
    move(1)
    });
}
initPlayer();