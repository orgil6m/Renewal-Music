document.addEventListener("DOMContentLoaded", (event) => {
     displayData();
   });

function displayData(){
     let divCard = "";
     for (let i = 0; i < data.length; i++) {
          divCard += '<div class="index-top-card"><a href="../Artists/' + data[i].link + '">' 
          + '<div class = "index-top-img-con">'
          + '<img src = "./Photos/artists/' + data[i].photo + '">'
          + '</div>'
          + '<div class="index-top-p-con">'
          + '<p id="index-top-p-artist">' + data[i].name + '</p>'
          + '<p id="index-top-p-cat" style="color: rgba(255, 255, 255, 0.7); font-size: 12px">' + data[i].cat +'</p>'
          + '</div></a>'
          + '</div>'
     }
    document.getElementById('index-top-row').innerHTML = divCard;
}