const user = [
     {
          name : "Nimka",
          password : "Nimka2004",
     },
     {
          name : "Orgil",
          password : "Orgil2004",
     },
     {
          name : "Ermuun",
          password : "Ermuun2004",
     },
     {
          name:"Ochir B Folo",
          password :"Ochir1993",
     },
     {
          name:"Bayalagmaa",
          password :"Bayalagmaa2001",
     },
     {
          name:"DJ-DORJ",
          password :"Dorj2004",
     }
]
var rem = true;
function remember(x){
     if (rem === true) {
          x.src = "./Photos/check2.png";
          rem = false;
     }
     else{
          x.src = "./Photos/check.png";
          rem = true;
     }




     
     
}
function login(){
     let username = document.getElementById('username').value;
     let password = document.getElementById('password').value;
     let sign = true;
     for (let i = 0; i < user.length; i++) {
          if (user[i].name === username && user[i].password === password) {
               window.location.replace("home.html");
               sign = false;
          }
     }
     if (sign === true) {
          document.getElementById('username').value = "";
          document.getElementById('password').value = "";
          document.getElementById("wrong").innerHTML = "Нэвтрэх нэр эсвэл нууц үг буруу байна.";

     }
   
}
