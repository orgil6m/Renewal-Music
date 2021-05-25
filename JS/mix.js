document.addEventListener("DOMContentLoaded", (event) => {
     displayData3();
});
function displayData3(){
     var path = window.location.pathname;
     var page = path.split("/").pop();
     for (let i = 0; i < playList.length; i++) {
          if (playList[i].link === page) {
               console.log("USER:" + playList[i].user);
               document.getElementById('header').style.backgroundImage = "url(../Photos/" + playList[i].cover + ")"
               displaySongsArtists(i);
               break;
          }
     }
}
var newDivSongs = "";
var newDivImg = ""
var index;
function displaySongsArtists(x){
     for (let i = 0; i < playList[x].songs.length; i++) {
          for (let j = 0; j < data.length; j++) {
               for (let z = 0; z < data[j].songs.length; z++) {
                    if (playList[x].songs[i] === data[j].songs[z]) {
                         newDivSongs += '<div class ="songs-con-bar" id = "songs-con-bar-' +  data[j].name + z + '"onclick = "openmodal('+ "'" + data[j].name + "', '" + data[j].duu[z]+"', '" + z + "'"+')">'
                         + '<div class = "songs-img">'
                         + '<p>' + parseInt(i+1) + '</p>'
                         + '</div>'
                         + '<div class="songs-info">' 
                         + '<div class="songs-info-name">'+'<p id="player-name-' + data[j].name + z +'">'+ data[j].duu[z]+'</p>'+'</div>'
                         + '<div class="songs-info-artist">'+'<p id ="player-artist-' + data[j].name + '">'+ data[j].name+'</p>'+'</div>'
                         + '</div>'
                         + '<div class = "songs-time"><p>'
                         +  data[j].songdur[z]      
                         + '</p></div>'
                         + '<div class = "songs-play"><i class="fa fa-play-circle" aria-hidden="true"></i></div>'
                         +'</div>';
                    }
               }
          }
          
     }
     newDivImg += '<div class="img-img">'
     + '<img src="../Photos/' + playList[x].photo+'" alt="" id = "cd">'
     + '</div>'
     + '<div class="img-item-icons">'
     + '<div class="round-icon icon-fb">'
     + '<a href =" '+ playList[x].fb +'" target="_blank"><i class="fab fa-facebook-f"></i></a>'
     + '</div>'
     + '<div class="round-icon icon-ig">'
     + '<a href =" '+ playList[x].ig +'" target="_blank"<i class="fab fa-instagram"</i></a>'
     + '</div>'
     + '<div class="round-icon icon-yt">'
     + '<a href = " ' + playList[x].mail + '" target="_blank"<i class="far fa-envelope"></i></a>'
     + '</div>'
     + '</div>'
     + '<div class="img-item">'
     + '<p><span style="font-weight: 600;">'  + playList[x].name  +  ' </span></p>'
     + '</div>'
     + '<div class="img-item">'
     + '<p><span style="font-weight :600;">'  +  playList[x].songs.length  +  ' </span>дуу</p>'
     + '</div>'
     +' </div>'
     document.getElementById('songs-con').innerHTML = newDivSongs;
     document.getElementById('img-con').innerHTML = newDivImg;
     index = x;
}

let modal = document.getElementById("myModal");
var playerName = "";
var songsCon = "";
var next =  true;
var nexthi = true;
function openmodal(x, y, z){
     if (nexthi === false) {
          document.getElementById(playerName).style.color = "white";
          document.getElementById(songsCon).className = "songs-con-bar";
     }
     nameArtist = x;
     nameSong = y;
     playerName = "player-name-" + x+z;
     songsCon = "songs-con-bar-" + x+z;
     songHighlight();
     modal.style.display = "block";
     let divModalImg = "";
     let divModalInfo = "";
     let divModalSong = "";
     let playerImg = "";
     for (let i = 0; i < data.length; i++) {
          if (x === data[i].name ) {
               playerImg = data[i].photo;
               break;
          }
     } 
     divModalImg += '<img src="../Photos/artists/'+ playerImg + '">';
     divModalInfo += '<div id = "modal-info-name"><p>' + y + '</p></div>'
     + '<div id = "modal-info-artist"><p>' + x + '</p></div>';
     document.getElementById('modal-img').innerHTML = divModalImg;
     document.getElementById('modal-inf').innerHTML = divModalInfo;
     document.getElementById('song-beg').innerHTML = 0+":"+0+0;
     let breakloop = false;
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (y === data[i].duu[j]) {
                    songEnd = data[i].songdur[j];
                    MaxPosition = data[i].songdur[j];
                    divModalSong +=  '<audio id= "song-audio"><source src="../songs/' + data[i].mp3[j]+ '"></audio>';
                    nameSong = data[i].songs[j];
                    breakloop = true;
                    break;
               }
               if (breakloop){
                    break;
               }
          }
     }
     document.getElementById('song-audio-con').innerHTML = divModalSong;
     document.getElementById('song-end').innerHTML = songEnd;
     document.getElementById('song-audio').play();
     myInterval = setInterval(progressValue, 100);
     pause = false;
     document.getElementById('song-audio').volume = document.getElementById('volume').value/100;
     document.getElementById('pause').className = "fas fa-play-circle";
}
function close() {
     modal.style.display = "none";
}

function songHighlight(){
     document.getElementById(playerName).style.color = "#4feb4d";
     document.getElementById(songsCon).className += " songs-con-active";
     nexthi = false;
     next = false;
}
function progressValue() {
     document.getElementById('range').max = document.getElementById('song-audio').duration;
     document.getElementById('range').value = document.getElementById('song-audio').currentTime;
     var curr = document.getElementById('song-audio').currentTime;
     document.getElementById('song-beg').innerHTML = formatTime(curr);
     if (document.getElementById('song-audio').currentTime === document.getElementById('song-audio').duration) {
          clearInterval(myInterval);
          nextTrack();
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
     document.getElementById('song-audio').currentTime = document.getElementById('range').value;
}
function changeVolume(){
     document.getElementById('song-audio').volume = document.getElementById('volume').value/100;
}     
document.getElementById('range').addEventListener("click", changeProgressBar);
document.getElementById('volume').addEventListener('click', changeVolume);
     
var pause = false;
function pauseSong(){
     if (pause === false) {
          document.getElementById('pause').className = "fas fa-pause-circle";
          pause = true;
          clearInterval(myInterval);
          document.getElementById('song-audio').pause();
     }
     else{
          document.getElementById('pause').className = "fas fa-play-circle";
          pause = false;
          myInterval = setInterval(progressValue, 100);
          document.getElementById('song-audio').play();
     }
}
function nextTrack(){
     let breakloop1 = false;
     let breakloop2 = false;
     for (let z = 0; z < playList[index].songs.length; z++) {
          let currSong = playList[index].songs[z];
          if (z+1 === playList[index].songs.length) {
               z = -1;
          }
          let nextSong = playList[index].songs[z+1];
          if (nameSong === currSong) {
               for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].songs.length; j++) {
                         if (nextSong === data[i].songs[j]) {
                              next = true;
                              openmodal(data[i].name, data[i].duu[j], j);
                              breakloop1 = true;
                              break;    
                         }
                    }
                    if (breakloop1 === true) {
                         breakloop2 = true;
                         break;
                    }
               }
          }
          if (breakloop2 === true) {
               break;
          }  
     }
}
function prevTrack(){
     let breakloop1 = false;
     let breakloop2 = false;
     for (let z = 0; z < playList[index].songs.length; z++) {
          let currSong = playList[index].songs[z];
         
          if (nameSong === currSong) {
               if (z === 0) {
                    z = playList[index].songs.length;
               }
               let PrevSong = playList[index].songs[z-1];
               for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].songs.length; j++) {
                         if (PrevSong === data[i].songs[j]) {
                              next = true;
                              openmodal(data[i].name, data[i].duu[j], j);
                              breakloop1 = true;
                              break;    
                         }
                    }
                    if (breakloop1 === true) {
                         breakloop2 = true;
                         break;
                    }
               }
          }
          if (breakloop2 === true) {
               break;
          }  
     }
}
function replayTrack(){
     let breakloop1 = false;
     let breakloop2 = false;
     for (let z = 0; z < playList[index].songs.length; z++) {
          let currSong = playList[index].songs[z];
          if (nameSong === currSong) {
               for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].songs.length; j++) {
                         if (currSong === data[i].songs[j]) {
                              next = true;
                              openmodal(data[i].name, data[i].duu[j], j);
                              breakloop1 = true;
                              break;    
                         }
                    }
                    if (breakloop1 === true) {
                         breakloop2 = true;
                         break;
                    }
               }
          }
          if (breakloop2 === true) {
               break;
          }  
     }
}
