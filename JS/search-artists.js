document.addEventListener("DOMContentLoaded", (event) => {
     displayData();
   });

function displayData(){
     let divCard = "";
     for (let i = 0; i < 5; i++) {
          divCard += '<div class="pre-dis-card"><a href="./Artists/' + data[i].link + '">' 
          + '<div class = "pre-dis-img-con">'
          + '<img src = "./Photos/artists/' + data[i].photo + '">'
          + '</div>'
          + '<div class="pre-dis-p-con">'
          + '<p id="pre-dis-p-artist">' + data[i].name + '</p>'
          + '<p id="pre-dis-p-cat" style="color: rgba(255, 255, 255, 0.7); font-size: 12px">' + data[i].cat +'</p>'
          + '</div></a>'
          + '</div>'
     }
     document.getElementById('pre-dis-row-1').innerHTML = divCard;
     let divCard2 = "";
     for (let i = 5; i < 10; i++) {
          divCard2 += '<div class="pre-dis-card"><a href="./Artists/' + data[i].link + '">'
          + '<div class = "pre-dis-img-con">'
          + '<img src = "./Photos/artists/' + data[i].photo + '">'
          + '</div>'
          + '<div class="pre-dis-p-con">'
          + '<p id="pre-dis-p-artist">' + data[i].name + '</p>'
          + '<p id="pre-dis-p-cat" style="color: rgba(255, 255, 255, 0.7); font-size: 12px">' + data[i].cat +'</p>'
          + '</div></a>'
          + '</div>'
    }     
    document.getElementById('pre-dis-row-2').innerHTML = divCard2;
}