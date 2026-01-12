//* ACÁ DECLARO VARIABLES
let fotoPerfil;
let botonVolverArriba;
let temaOscuro;
let idiomaIngles;
let botonTema;
let botonSubirForm;
let entradasForm;
let fechaActual;
let proyectos;


document.addEventListener("DOMContentLoaded", function () 
{
  //*ASIGNO VALORES A LAS VARIABLES
  temaOscuro = true;
  idiomaIngles = true;
  botonVolverArriba = document.getElementById("botonVolverArriba");
  botonTema = document.getElementById("botonTema");
  botonSubirForm = document.getElementById("botonSubirForm");
  entradasForm = document.getElementsByClassName("entradaForm");
  fechaActual = document.getElementById("fechaActual");
  proyectos = document.getElementsByClassName("proyecto");
  fotoPerfil = document.getElementById("fotoPerfil");
  botonIdioma = document.getElementById("botonIdioma");

  //CargarDatosFormulario(); //* CARGO LOS DATOS DEL FORMULARIO DESDE LOCALSTORAGE SI EXISTEN
  OcultarTextoProyectos() //* OCULTO LOS TEXTOS DE LOS PROYECTOS HASTA QUE SE HAGA CLICK EN ELLOS
  MostrarBotonScroll(); //* AL RECARGAR LA PÁGINA, CHEQUEO SI HAY QUE MOSTRAR EL BOTÓN DE SCROLL

  //*LE ASIGNO LA FECHA ACTUAL AL FOOTER
  fechaActual.innerHTML = new Date().toLocaleDateString("es-AR");

  //*AGREGO LA LÓGICA DE CAMBIO DE TEMA
  botonTema.addEventListener("click", function () 
  {
    document.body.classList.toggle("light-theme");
    temaOscuro = !temaOscuro;
    botonTema.textContent = temaOscuro ? '💡' : '🌙';
  });

  //*AGREGO LA LÓGICA DE CAMBIO DE IDIOMA
  botonIdioma.addEventListener("click", function ()
  {
    idiomaIngles = !idiomaIngles;
    botonIdioma.textContent = idiomaIngles ? 'ESP' : 'ENG';
    cambiarIdioma(idiomaIngles);
  });

  //*AGREGO UN EVENTO DE CLICK AL BOTON DE VOLVER ARRIBA
  botonVolverArriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  
  /*//*AGREGO EL EVENTO DE CLICK AL BOTON DE SUBIR FORMULARIO, CHEQUEANDO QUE NINGUN ESPACIO ESTE VACIO Y QUE EL EMAIL SEA VÁLIDO
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
        let mensaje = idiomaIngles ? "All fields must be filled out" : "Debe llenar todos los campos";
        alert(mensaje);
        encontrado = true;
      }
      i++;
    }
    
    if (encontrado == false && emailInput.checkValidity() == false) 
    {
      let mensaje = idiomaIngles ? "Please enter a valid email address" : "Por favor ingrese un email válido";
      alert(mensaje);
    } 
    else if (encontrado == false) 
    {
        GuardarDatosFormulario();
        let mensaje = idiomaIngles ? "Form submitted successfully." : "Formulario enviado con éxito.";
        alert(mensaje);
        for(i = 0; i < entradasForm.length; i++)
        {
          entradasForm[i].value = "";
        }
        
    }
  });*/
});


/*function GuardarDatosFormulario() 
{
  let datosForm = {nombre: document.getElementById("nombre").value, email: document.getElementById("email").value, mensaje: document.getElementById("mensaje").value};

  localStorage.setItem("datosForm", JSON.stringify(datosForm));
}


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
}*/

function OcultarTextoProyectos()
{
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
}

function MostrarBotonScroll()
{
  if (window.scrollY > 300) 
  {
    botonVolverArriba.style.display = "inline-block";
  }
}

function cambiarIdioma(esIngles)
{
  console.log("Cambiando idioma. Inglés: " + esIngles);
  let textos;
  fetch("languages.json").then(response => response.json()).
  then(data => {
    textos = esIngles ? data.eng : data.esp;
    let textosProyectos = document.getElementsByClassName("proyectosTitulo");
    let textosContacto = document.getElementsByClassName("contactoTitulo");
    let textosHechoUnity = document.getElementsByClassName("hechoUnity");
    let textosHechoGodot = document.getElementsByClassName("hechoGodot");
    let textosDisponiblePCMovil = document.getElementsByClassName("disponiblePCMovil");
    let textosDisponiblePC = document.getElementsByClassName("disponiblePC");
    
    for(let i = 0; i < 8; i++)
    {
      if(i < textosProyectos.length) //2
      {
        textosProyectos[i].innerHTML = textos.proyectosTitulo;
        textosContacto[i].innerHTML = textos.contactoTitulo;
      }
      if(i < textosHechoUnity.length) //8
      {
        textosHechoUnity[i].innerHTML = textos.hechoUnity;
      }
      if(i < textosHechoGodot.length) //4
      {
        textosHechoGodot[i].innerHTML = textos.hechoGodot;
      }
      if(i < textosDisponiblePCMovil.length) //5
      {
        textosDisponiblePCMovil[i].innerHTML = textos.disponiblePCMovil;
      }
      if(i < textosDisponiblePC.length) //7
      {
        textosDisponiblePC[i].innerHTML = textos.disponiblePC;
      }
      

    }
    
    document.getElementById("sobreMiTitulo").innerHTML = textos.sobreMiTitulo;
    document.getElementById("bienvenida").innerHTML = textos.bienvenida;
    document.getElementById("rol").innerHTML = textos.rol;
    document.getElementById("pres1").innerHTML = textos.pres1;
    document.getElementById("pres2").innerHTML = textos.pres2;

    document.getElementById("TSDFecha").innerHTML = textos.TSDFecha;
    document.getElementById("TSDDesc").innerHTML = textos.TSDDesc;

    document.getElementById("MILOFecha").innerHTML = textos.MILOFecha;
    document.getElementById("MILODesc").innerHTML = textos.MILODesc;
    
    document.getElementById("TVPFecha").innerHTML = textos.TVPFecha;
    document.getElementById("TVPDesc").innerHTML = textos.TVPDesc;

    document.getElementById("TMFecha").innerHTML = textos.TMFecha;
    document.getElementById("TMDesc").innerHTML = textos.TMDesc;

    document.getElementById("voidFecha").innerHTML = textos.voidFecha;
    document.getElementById("voidDesc").innerHTML = textos.voidDesc;

    document.getElementById("ExpLFecha").innerHTML = textos.ExpLFecha;
    document.getElementById("ExpLDesc").innerHTML = textos.ExpLDesc;

    document.getElementById("MoeAtrFecha").innerHTML = textos.MoeAtrFecha;
    document.getElementById("MoeAtrDesc").innerHTML = textos.MoeAtrDesc;

    document.getElementById("FCFecha").innerHTML = textos.FCFecha;
    document.getElementById("FCDesc").innerHTML = textos.FCDesc;

    document.getElementById("ShDieFecha").innerHTML = textos.ShDieFecha;
    document.getElementById("SHDieDesc").innerHTML = textos.SHDieDesc;

    document.getElementById("DFFecha").innerHTML = textos.DFFecha;
    document.getElementById("DFDesc").innerHTML = textos.DFDesc;

    document.getElementById("10SFecha").innerHTML = textos["10SFecha"];
    document.getElementById("10SDesc").innerHTML = textos["10SDesc"];

    document.getElementById("SRFecha").innerHTML = textos.SRFecha;
    document.getElementById("SRDesc").innerHTML = textos.SRDesc;

    
    document.getElementById("redesSocTitulo").innerHTML = textos.redesSocTitulo;
    document.getElementById("formTitulo").innerHTML = textos.formTitulo;
    document.getElementById("nombreForm").innerHTML = textos.nombreForm;
    document.getElementById("emailForm").innerHTML = textos.emailForm;
    document.getElementById("mensajeForm").innerHTML = textos.mensajeForm;

    
    document.getElementById("botonSubirForm").value = textos.enviarForm;
  });
  
  
}

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
