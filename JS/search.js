var plyerimg = "";
var searching;
var next;
function find(){
     searching = document.getElementById('word').value;
     document.getElementById("pre-dis-con").style.display= "none";
     console.log("Searching: " + searching);
     let newDivArtists = "";
     let newDivSongs = '<div class="title"><p>Дуунууд</p></div>'; 
     let countsearch = 0;
     let songsearch = true;
     searching = searching.toLowerCase();
     for (let i = 0; i < data.length; i++) {
          if (data[i].singer == searching) {
               newDivArtists+= '<div class="title"><p>Уран Бүтээлчид</p></div>';
               newDivArtists+= '<div class ="artist-card" onclick = moveArtist("' + data[i].link + '")>'
               + '<div class= "artist-inf"><img src="./Photos/artists/' + data[i].photo +'"><div class = "artist-name"><p>'
               + data[i].name + '</p>'
               + '</div>'
               + '<div class = "artist-cat"><p style="font-size:15px;"> (' + data[i].cat + ')</p>'
               + '</div></div>'
               + '<div class="artist-sub">'
               + '<div class="sub-like"><i class="fa fa-heart" aria-hidden="true" onclick="like()" id="like" style= "transform:scale(1);"></i></div>'
               + '<div class = "sub-count" id = "sub-count"><p class="num" id="num">' + data[i].sub + '</p><p class="text">Subscribers<p></div>'
               + '<div class="sub-play"><i class="fa fa-play-circle" aria-hidden="true"></i></div>'
               + '</div>';
               countsearch++;
          }
          for (let j = 0; j < data[i].songs.length; j++) {
               if (data[i].songs[j] === searching) {
                    newDivSongs += '<div id = "songs-con-' + data[i].name+ '" class ="songs-con" onclick = "openmodal('+ "'" + data[i].name + "', '" + data[i].duu[j]+"'"+')">'
                    + '<div class = "songs-img">'
                    + '<img src="./Photos/artists/' + data[i].photo +'" id="player-img-'+ data[i].name +'" >'
                    + '</div>'
                    + '<div class="songs-info">' 
                    + '<div class="songs-info-name">'+'<p id="player-name-' + data[i].name+'">'+ data[i].duu[j]+'</p>'+'</div>'
                    + '<div class="songs-info-artist">'+'<p id ="player-artist-' + data[i].name + '">'+ data[i].name+'</p>'+'</div>'
                    + '</div>'
                    + '<div class = "songs-time"><p>'
                    +  data[i].songdur[j]      
                    + '</p></div>'
                    + '<div class = "songs-play"><i class="fa fa-play-circle" aria-hidden="true"></i></div>'
                    +'</div>';
                    countsearch++;
                    songsearch = false;
               }   
          }
     
     }
     next = false;
     if (songsearch === true) {
          newDivSongs = "";
     }
     if (countsearch !== 0) {
          console.log(newDivSongs);
          document.getElementById("artist").innerHTML = newDivArtists;
          document.getElementById("songs").innerHTML = newDivSongs;
     }
     else{
          document.getElementById("artist").innerHTML = '<p style="font-size :25px; font-weight :600">Хайлт илэрцгүй</p>'
          document.getElementById("songs").innerHTML = "";
     }
     
}
var col = 1;
function like(){
     let count = document.getElementById('num').innerHTML;
     if (col === 1) {
          document.getElementById('like').style.color = "red";
          count++;
          document.getElementById('num').innerHTML = count;
          col = 0;
          console.log(count);
     }
     else if (col === 0){
          document.getElementById('like').style.color = "white";
          count--;
          document.getElementById('num').innerHTML = count;
          col = 1; 
     }
}


var modal = document.getElementById("myModal");
var MaxPosition;
var myInterval;
var nameArtist, nameSong;
var playerName;
var songsCon;
function openmodal(x, y) {
     console.log(x);
     console.log(y);
     nameArtist = x;
     playerName = "player-name-" + x;
     songsCon = "songs-con-" + x;
     modal.style.display = "block";
     let divModalImg = "";
     let divModalInfo = "";
     let divModalSong = "";
     let playerImg;
     find();
     songHighlight();
     for (let i = 0; i < data.length; i++) {
          if (x === data[i].name ) {
               playerImg = data[i].photo;
               break;
          }
     }     
     divModalInfo += '<div id = "modal-info-name"><p>' + y + '</p></div>'
     + '<div id = "modal-info-artist"><p>' + x + '</p></div>'
     divModalImg += '<img src="./Photos/artists/'+ playerImg + '">';
     document.getElementById('modal-img').innerHTML = divModalImg;
     document.getElementById('modal-inf').innerHTML = divModalInfo;
     document.getElementById('song-beg').innerHTML = 0+":"+0+0;
     let songEnd = "";
     let breakloop = false;
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (y === data[i].duu[j]) {
                    songEnd = data[i].songdur[j];
                    MaxPosition = data[i].songdur[j];
                    divModalSong +=  '<audio id= "song-audio"><source src="./songs/' + data[i].mp3[j]+ '"></audio>';
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
function songHighlight(){
     console.log(playerName);
     console.log(songsCon);
     document.getElementById(playerName).style.color = "#4feb4d";
     document.getElementById(songsCon).className += " songs-con-active";
     next = false;
}
function nextTrack(){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (nameSong === data[i].songs[j] && nameArtist === data[i].name) {
                    if (j+1 === data[i].songs.length) {
                         j = -1;
                    }
                    next = true;
                    openmodal(data[i].name, data[i].duu[j+1]);
                    break;    
               }
          }
     }
}
function prevTrack(){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (nameSong === data[i].songs[j]) {
                    console.log(j);
                    console.log(data[i].songs.length);
                    if (j === 0) {
                         j = data[i].songs.length;
                    }
                    next = true;
                    openmodal(data[i].name, data[i].duu[j-1]);
                    break;
               }
          }
     }
}
function replayTrack(){
     for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].songs.length; j++) {
               if (nameSong === data[i].songs[j]) {
                    console.log(data[i].songs[j]);
                    console.log(data[i].singer);
                    console.log(data[i].duu[j]);
                    next = true;
                    openmodal(data[i].name, data[i].duu[j]);
                    break;
               }
          }
     }
}
function moveArtist(x){
     x = "./Artists/" + x;
     window.location.replace(x);
}