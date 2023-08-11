
let montoAcumulado = parseFloat(localStorage.getItem('montoAcumulado')) || 0;
let saldoSos = parseFloat(localStorage.getItem("saldoSos")) || 0;
let selectedImageUrl = "";



function guardarDatosTitular(){

  const inputNumero = document.getElementById("numero");
  const inputNombre = document.getElementById('nombre');
  const inputApellido = document.getElementById('apellido');
  const inputEmail = document.getElementById('email');




  
  const datos = {
    numero: inputNumero.value,
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    email: inputEmail.value
  };
      

  localStorage.setItem('datosFormulario', JSON.stringify(datos));

  Swal.fire(
    {
      title: "Genial",
      text: "Registramos tus Datos. ¡Bienvenido! ",
      icon: "success",
     showConfirmButton: false,
    }
  )

  setTimeout(function() {
    window.location.href = 'page2.html'; 
}, 3000);
    
}







    function showInput(imgOp) {
 
      const optionContainers = document.querySelectorAll('.containers');
      optionContainers.forEach(container => {
        container.classList.add('hidden');
      });

      const inputContainer = document.getElementById('inputContainer');
      inputContainer.classList.remove('hidden');


   
      selectedImageUrl= imgOp;
      document.getElementById('selectedImage').style.display = 'block';
      document.getElementById('selectedImg').src = selectedImageUrl;
    }




    function agregarMonto() {
      const inputMonto = document.getElementById('monto').value;
     
   
      const monto = parseFloat(inputMonto);

      montoAcumulado = montoAcumulado + monto;
 
        localStorage.setItem('montoAcumulado', montoAcumulado.toString());
    

      const recargaExitosaMessage = document.getElementById('recargaExitosa');
      recargaExitosaMessage.classList.remove('hidden');
      document.getElementById('monto').value = '';

      const historialRecargas = JSON.parse(localStorage.getItem('historialRecargas')) || [];
      historialRecargas.push({ fecha: new Date(), monto: monto });
      localStorage.setItem('historialRecargas', JSON.stringify(historialRecargas));



      setTimeout(function() {
        window.location.href = 'page3.html'; 
    }, 3000);


    }







function consultarSaldo(){
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.classList.remove("hidden")

    const montoAcumulado = parseFloat(localStorage.getItem('montoAcumulado'));
    const saldoSos = parseFloat(localStorage.getItem("saldoSos"));
    if(montoAcumulado === 0){
        resultadoDiv.innerHTML =`<p>No tienes saldo: ${montoAcumulado}</p>` ;

    } else {

        resultadoDiv.innerHTML = `<p> Saldo: ${montoAcumulado}</p>
                                 <p> Debe: ${saldoSos*500  }</p>`;
    }
 



}

   function datosTitular(){

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.classList.remove("hidden")

    const datosGuardados = localStorage.getItem('datosFormulario');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      resultadoDiv.innerHTML = `
        <p>Número: ${datos.numero}</p>
        <p>Nombre: ${datos.nombre}</p>
        <p>Apellido: ${datos.apellido}</p>
        <p>Email: ${datos.email}</p>
      `;
    } else {
      resultadoDiv.innerHTML = '<p>No hay datos guardados.</p>';
    }
   }   

   function realizarRecarga() {
    window.location.href = 'page2.html';
  }




function recargaSos(){
    
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.classList.remove("hidden")

   montoAcumulado = montoAcumulado + 500; 
    saldoSos ++ ;

    localStorage.setItem("saldoSos", saldoSos.toString())
    localStorage.setItem('montoAcumulado', montoAcumulado.toString());
    

    resultadoDiv.innerHTML = `<p> Debe: ${saldoSos*500  }</p>`;


    const historialRecargas = JSON.parse(localStorage.getItem('historialRecargas')) || [];
    historialRecargas.push({ fecha: new Date(), monto: 500 });
    localStorage.setItem('historialRecargas', JSON.stringify(historialRecargas));

    

    Toastify({
      text:"Se recargo 500$ con exito!" ,
      duration: 3000
    }).showToast();


  
}



function mostrarHistorial() {
  const historialContainer = document.getElementById("historialContainer");
  const historialLista = document.getElementById("historialLista");
  
  const historialRecargas = JSON.parse(localStorage.getItem("historialRecargas")) || [];

  if (historialRecargas.length > 0) {
    historialContainer.style.display = "block";
    historialLista.innerHTML ="";

    historialRecargas.forEach(recarga => {
      const li = document.createElement("li");
      li.textContent = `Recarga de $${recarga.monto.toFixed(2)} en ${recarga.fecha}`;
      historialLista.appendChild(li);
    });
  } else {
    historialContainer.style.display = "none";
  }
}

function pagarSos(){
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.classList.remove("hidden")

  Swal.fire({
    title: 'Ingrese el monto a pagar',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
    }
  })



}

