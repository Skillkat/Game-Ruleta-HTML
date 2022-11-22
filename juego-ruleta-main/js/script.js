const ruleta = document.querySelector('#ruleta');

ruleta.addEventListener('click', girar);
giros = 0;
function girar(){
  if (giros < 1) {
    let rand = Math.random() * 7200;
    calcular(rand);
    giros++;
    var sonido = document.querySelector('#audio');
    sonido.setAttribute('src', 'sonido/ruleta.mp3');
    document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros;
  }else{
    Swal.fire({
      icon: 'success',
      title: 'Felicitaciones, has ganado el Cupon: ',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if (result.value == true) {
        giros = 0;
         document.querySelector('.elije').innerHTML = 'TU CUPON ES: ';
         document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros;
      }
    })
  }



function premio(premios){

  document.querySelector('.elije').innerHTML = 'TU CUPON ES: ' + premios;

}


 function calcular(rand) {

  valor = rand / 620;
  valor = (valor - parseInt(valor.toString().split(".")[0]))* 360;
  ruleta.style.transform = "rotate("+rand+"deg)";

  setTimeout(() => {
  switch (true) {
    case valor > 0 && valor <= 45:
     premio1("Premio 1");
     break;
     case valor > 45 && valor <= 90:
     premio2("Premio 2");
     break;
     case valor > 90 && valor <= 135:
     premio3("Premio 3"); 
     break; 
     case valor > 135 && valor <= 180:
     premio4("Premio 4");
     break;
     case valor > 180 && valor <= 225:
     premio5("Premio 5");
     break; 
     case valor > 225 && valor <= 270:
     premio6("Premio 6");
     break;
     case valor > 270 && valor <= 315:
     premio7("Premio 7");
     break;
     case valor > 315 && valor <= 360:
     premio8("Premio 8"); 
     break;
  }

 }, 5000);

}
}