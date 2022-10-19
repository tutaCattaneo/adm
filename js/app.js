//CAMPOS DEL FORMULARUI

const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

//INTERFAZ DEL USUARIO
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;

class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
    console.log(this.citas);
  }
  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
  editarCita(citaActualizada){
    this.citas= this.citas.map(cita=>cita.id === citaActualizada.id ? citaActualizada : cita);
    
}
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    //Mensaje de error
    divMensaje.textContent = mensaje;

    //Agregar al doom
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    //Quitar la alerta dsp de 5 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 4000);
  }
  imprimirCitas({ citas }) {
    this.limpiarHTML();
    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      //SCRIPTING DE LOS ELEMENTOS DE LA CITA
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
               <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;
      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
               <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;
      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
               <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;
      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
               <span class="font-weight-bolder">Hora: </span> ${hora}
            `;
      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `
               <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;
      //BOTON PARA ELIMINAR ESTA CITA
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
   </svg>
   `;
      btnEliminar.onclick = () => eliminarCita(id);

      //Añade un boton de editar
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
     </svg>`;
      btnEditar.onclick = () => cargarEdicion(cita);

      //Agregar los parrafos al div cita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //Agregar las citas al html
      contenedorCitas.appendChild(divCita);
    });
  }
  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();

//REGISTRAR EVENTOS
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}
//OBJETO QUE CONTIENE LAS CITAS
//PARA QUE FUNCIONE ESTE METODO TENEMOS QUE TENER LA
//PROPIEDAD NAME en el html

//OBJETO CON LA INFORMACION DE LA CITA
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//Agrega datos al objeto de cita
function datosCita(e) {
  //para escribir en el objeto de citas
  citaObj[e.target.name] = e.target.value;
  //   console.log(citaObj);
}

//valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault();

  //extraer informacion del objeto de citas
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  //validar
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }
  if (editando) {
    ui.imprimirAlerta("Editado correctamente");
    //Pasar el objeto de la cita a edicion
    administrarCitas.editarCita({...citaObj})
    //Regresar el texto del boton a su estado original


    formulario.querySelector('button[type="submit"]').textContent ="Crear cita";
    //quitar modo edicion
    editando = false;
  } else {
    //Generar un id unico
    citaObj.id = Date.now();
    //CREANDO UNA NUEVA CITA.

    administrarCitas.agregarCita({ ...citaObj });
    //MENSAJE DEE AGREGADO CORRECTAMENTE
    ui.imprimirAlerta("Se agrego correctamente");
  }

  //reiniciar el objeto para la validacion
  reiniciarObejto();
  //Reiniciar el formulario
  formulario.reset();
  //MOSTRAR EL HTML
  ui.imprimirCitas(administrarCitas);
}

function reiniciarObejto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}
function eliminarCita(id) {
  //Eliminar la cita
  administrarCitas.eliminarCita(id);
  //Mostrar mensaje
  ui.imprimirAlerta("La cita se elimino correctamente");
  //Refrescar la cita
  ui.imprimirCitas(administrarCitas);
  //    console.log(id);
}
//Carga los datos y el modo edicion
function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
  //llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //llebar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //CAMBIAR EL TEXTO DEL BOTON
  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar Cambios";
  editando = true;
}
