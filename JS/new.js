document.addEventListener("DOMContentLoaded", (event) => {
     displayData2();
});

function displayData2(){
     for (let i = 0; i < newSongs.songs.length; i++) {
          findFromData(newSongs.songs[i], newSongs.singer[i]);
     }
}

let indSongsDis= "";
function findFromData(x, y){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if(x === data[i].songs[j] && y === data[i].singer){
                    indSongsDis += '<div id = "ind-songs-bar-' + data[i].name + '" class="songs-bar"  onclick = "indOpenModal(' + "'" + data[i].name + "', '" +  data[i].duu[j]+ "'"+')">'
                    + '<div class = "ind-songs-img">'
                    + '<img src="./Photos/artists/' + data[i].photo +'" id="ind-player-img-'+ data[i].name +'" >'
                    + '</div>'
                    + '<div class="ind-songs-info">' 
                    + '<div class="ind-songs-info-name">'+'<p id="ind-player-name-' + data[i].name+'">'+ data[i].duu[j]+'</p>'+'</div>'
                    + '<div class="ind-songs-info-artist">'+'<p id ="ind-player-artist-' + data[i].name + '">'+ data[i].name+'</p>'+'</div>'
                    + '</div>'
                    + '<div class = "ind-songs-time"><p>'
                    +  data[i].songdur[j]      
                    + '</p></div>'
                    + '<div class = "ind-songs-play"><i class="fa fa-play-circle" aria-hidden="true"></i></div>'
                    +'</div>';
               }               
          }
     }
     document.getElementById('index-songs-con').innerHTML = indSongsDis;
}
let modal = document.getElementById("indMyModal");
function indOpenModal(x, y){
     console.log(x);
     console.log(y);
     nameArtist = x;
     playerName = "ind-player-name-" + x;
     songsCon = "ind-songs-bar-" + x;
     modal.style.display = "block";
     let divModalImg = "";
     let divModalInfo = "";
     let divModalSong = "";
     let playerImg;
     findFromData();
     indSongHighlight();
     for (let i = 0; i < data.length; i++) {
          if (x === data[i].name ) {
               playerImg = data[i].photo;
               break;
          }
     }     
     divModalInfo += '<div id = "ind-modal-info-name"><p>' + y + '</p></div>'
     + '<div id = "ind-modal-info-artist"><p>' + x + '</p></div>'
     divModalImg += '<img src="./Photos/artists/'+ playerImg + '">';
     document.getElementById('ind-modal-img').innerHTML = divModalImg;
     document.getElementById('ind-modal-inf').innerHTML = divModalInfo;
     document.getElementById('ind-song-beg').innerHTML = 0+":"+0+0;
     let songEnd = "";
     let breakloop = false;
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (y === data[i].duu[j]) {
                    songEnd = data[i].songdur[j];
                    MaxPosition = data[i].songdur[j];
                    divModalSong +=  '<audio id= "ind-song-audio"><source src="./songs/' + data[i].mp3[j]+ '"></audio>';
                    nameSong = data[i].songs[j];
                    breakloop = true;
                    break;
               }
               if (breakloop){
                    break;
               }
          }
     }
     MaxPosition1();
     document.getElementById('ind-song-audio-con').innerHTML = divModalSong;
     document.getElementById('ind-song-end').innerHTML = songEnd;
     document.getElementById('ind-song-audio').play();
     myInterval = setInterval(progressValue, 100);
     pause = false;
     document.getElementById('ind-song-audio').volume = document.getElementById('volume').value/100;
     document.getElementById('pause').className = "fas fa-play-circle";
}
function close() {
     modal.style.display = "none";
}
let max;
function MaxPosition1() {
     let minut;
     let second;
     if (MaxPosition[0] == 0) {
          minut = 60*parseInt(MaxPosition[1], 10);
     }
     else{
          minut = 60*parseInt(MaxPosition[0]+MaxPosition[1], 10);
     }
     second = parseInt(MaxPosition[3]+MaxPosition[4], 10);
     max = minut + second;
} 
function progressValue() {
     document.getElementById('range').max = document.getElementById('ind-song-audio').duration;
     document.getElementById('range').value = document.getElementById('ind-song-audio').currentTime;
     var curr = document.getElementById('ind-song-audio').currentTime;
     document.getElementById('ind-song-beg').innerHTML = formatTime(curr);
     if (document.getElementById('ind-song-audio').currentTime === document.getElementById('ind-song-audio').duration) {
          clearInterval(myInterval);
          indNextTrack();
     }
}     
function formatTime(sec) {
     let minutes = Math.floor(sec / 60);
     let seconds = Math.floor(sec - minutes * 60);
     if (seconds < 10) {
         seconds = `0${seconds}`;
     }
     return `${minutes}:${seconds}`;
     }
     
function changeProgressBar() {
     document.getElementById('ind-song-audio').currentTime = document.getElementById('range').value;
}
function changeVolume(){
     document.getElementById('ind-song-audio').volume = document.getElementById('volume').value/100;
}     
document.getElementById('range').addEventListener("click", changeProgressBar);
document.getElementById('volume').addEventListener('click', changeVolume);
     
var pause = false;
function pauseSong(){
     if (pause === false) {
          document.getElementById('pause').className = "fas fa-pause-circle";
          pause = true;
          clearInterval(myInterval);
          document.getElementById('ind-song-audio').pause();
     }
     else{
          document.getElementById('pause').className = "fas fa-play-circle";
          pause = false;
          myInterval = setInterval(progressValue, 100);
          document.getElementById('ind-song-audio').play();
     }
}
function indSongHighlight(){
     document.getElementById(playerName).style.color = "#4feb4d";
     document.getElementById(songsCon).className += " songs-con-active";
     next = false;
}
function indNextTrack(){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (nameSong === data[i].songs[j] && nameArtist === data[i].name) {
                    console.log(nameSong);
                    if (j+1 === data[i].songs.length) {
                         j = -1;
                    }
                    next = true;
                    indOpenModal(data[i].name, data[i].duu[j+1]);
                    break;    
               }
          }
     }
}
function indPrevTrack(){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (nameSong === data[i].songs[j]) {
                    if (j === 0) {
                         j = data[i].songs.length;
                    }
                    next = true;
                    indOpenModal(data[i].name, data[i].duu[j-1]);
                    break;
               }
          }
     }
}
function indReplayTrack(){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (nameSong === data[i].songs[j]) {
                    next = true;
                    indOpenModal(data[i].name,data[i].duu[j]);
                    break;
               }
          }
     }
}