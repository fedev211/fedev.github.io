//* ACÁ DECLARO VARIABLES
let fotoPerfil;
let botonVolverArriba;
let temaOscuro;
let botonTema;
let botonSubirForm;
let entradasForm;
let fechaActual;
let proyectos;


document.addEventListener("DOMContentLoaded", function () 
{
  //*ASIGNO VALORES A LAS VARIABLES
  temaOscuro = true;
  botonVolverArriba = document.getElementById("botonVolverArriba");
  botonTema = document.getElementById("botonTema");
  botonSubirForm = document.getElementById("botonSubirForm");
  entradasForm = document.getElementsByClassName("entradaForm");
  fechaActual = document.getElementById("fechaActual");
  proyectos = document.getElementsByClassName("proyecto");
  fotoPerfil = document.getElementById("fotoPerfil");

  CargarDatosFormulario(); //* CARGO LOS DATOS DEL FORMULARIO DESDE LOCALSTORAGE SI EXISTEN

  //*OCULTO LOS TEXTOS PRINCIPALES DE LOS PROYECTOS Y LE AGREGO A CADA UNO UN EVENTO DE CLICK PARA MOSTRARLOS Y OCULTARLOS
  for (let i = 0; i < proyectos.length; i++) 
  {
    let proyecto = proyectos[i];
    let textos = proyecto.getElementsByClassName("textoProyecto");

    textos[0].style.display = "none";
    textos[1].style.display = "none";

    proyecto.addEventListener("click", function () 
    {
      if(textos[0].style.display === "none" && textos[1].style.display === "none")
      {
        textos[0].style.display = "block";
        textos[1].style.display = "block";
      }
      else
      {
        textos[0].style.display = "none";
        textos[1].style.display = "none";

      }
      
    });
  }

  //*LE ASIGNO LA FECHA ACTUAL AL FOOTER
  fechaActual.innerHTML = new Date().toLocaleDateString("es-AR");

  //*AGREGO LA LÓGICA DE CAMBIO DE TEMA
  botonTema.addEventListener("click", function () 
  {
    document.body.classList.toggle("light-theme");
    temaOscuro = !temaOscuro;
    botonTema.textContent = temaOscuro ? '💡' : '🌙';
  });

  //*AGREGO UN EVENTO DE CLICK AL BOTON DE VOLVER ARRIBA
  botonVolverArriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  //*SI AL INICIAR EL SITIO WEB, LA POSICIÓN DE SCROLL ES MAYOR A 300, MUESTRO EL BOTÓN DE VOLVER ARRIBA
  if (window.scrollY > 300) 
  {
    botonVolverArriba.style.display = "inline-block";
  }
  //*AGREGO EL EVENTO DE CLICK AL BOTON DE SUBIR FORMULARIO, CHEQUEANDO QUE NINGUN ESPACIO ESTE VACIO Y QUE EL EMAIL SEA VÁLIDO
  botonSubirForm.addEventListener("click", function (event) 
  {

    let i = 0;
    let encontrado = false;
    const emailInput = document.getElementById("email");
    event.preventDefault();
    while (i < entradasForm.length && encontrado == false) 
    {
      if (entradasForm[i].value == "") 
      {
        alert("Debe llenar todos los campos");
        encontrado = true;
      }
      i++;
    }
    
    if (encontrado == false && emailInput.checkValidity() == false) 
    {
      alert("Por favor ingrese un email válido");
    } 
    else if (encontrado == false) 
    {
        GuardarDatosFormulario();
        alert("Formulario enviado con éxito. Tus datos han sido guardados localmente.");
        for(i = 0; i < entradasForm.length; i++)
        {
          entradasForm[i].value = "";
        }
        
    }
  });

  //* GUARDA LOS DATOS DEL FORMULARIO EN LOCALSTORAGE
  function GuardarDatosFormulario() 
  {
    let datosForm = {nombre: document.getElementById("nombre").value, email: document.getElementById("email").value, mensaje: document.getElementById("mensaje").value};

    localStorage.setItem("datosForm", JSON.stringify(datosForm));
  }

  //* CARGA LOS DATOS DEL FORMULARIO DESDE LOCALSTORAGE
  function CargarDatosFormulario() 
  {
    let datosForm = localStorage.getItem("datosForm");

    if (datosForm) 
    {
        let datosConvertidos = JSON.parse(datosForm);
        document.getElementById("nombre").value = datosConvertidos.nombre;
        document.getElementById("email").value = datosConvertidos.email;
        document.getElementById("mensaje").value = datosConvertidos.mensaje;
    }
  }
});

//*ACÁ AGREGO EL EVENTO DE SCROLL PARA MOSTRAR U OCULTAR EL BOTÓN DE VOLVER ARRIBA
window.addEventListener("scroll", function () 
{
  if (window.scrollY > 300) 
  {
    botonVolverArriba.style.display = "inline-block";
  } else 
  {
    botonVolverArriba.style.display = "none";
  }
});
