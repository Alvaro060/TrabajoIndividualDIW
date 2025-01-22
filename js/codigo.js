"use strict";

var oReservasHotel = new ReservasHotel();

const frmAltaCliente = document.getElementById("frmAltaCliente");
const frmListadoCliente = document.getElementById("frmListadoCliente");
const frmEditarCliente = document.getElementById("frmEditarCliente");
const frmBorrarCliente = document.getElementById("frmBorrarCliente");
const frmAltaReserva = document.getElementById("frmAltaReserva");
const frmListadoReserva = document.getElementById("frmListadoReserva");
const frmEditarReserva = document.getElementById("frmEditarReserva");
const frmBorrarReserva = document.getElementById("frmBorrarReserva");

inicio();

function inicio() {
  document
    .querySelector("#mnuAltaCliente")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoCliente")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuEditarCliente")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuBorrarCliente")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuAltaReserva")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoReserva")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuEditarReserva")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuBorrarReserva")
    .addEventListener("click", mostrarFormulario);

  frmAltaCliente.btnAltaCliente.addEventListener("click", altaCliente);
  frmListadoCliente.btnListadoCliente.addEventListener("click", listadoCliente);
  frmListadoCliente.btnListadoClienteTotal.addEventListener("click", listadoClienteTotal);
  frmEditarCliente.btnEditarCliente.addEventListener("click", editarCliente);
  frmBorrarCliente.btnBorrarCliente.addEventListener("click", borrarCliente);
  frmAltaReserva.btnAltaReserva.addEventListener("click", altaReserva);
  frmListadoReserva.btnListadoReserva.addEventListener("click", listadoReserva);
  frmListadoReserva.btnListadoReservaTotal.addEventListener(
    "click",
    listadoReservaTotal
  );
  frmEditarReserva.btnEditarReserva.addEventListener("click", editarReserva);
  frmBorrarReserva.btnBorrarReserva.addEventListener("click", borrarReserva);
}

function mostrarFormulario(oEvento) {
  ocultarFormularios();

  switch (oEvento.target.id) {
    case "mnuAltaCliente":
      frmAltaCliente.classList.remove("d-none");
      break;
    case "mnuListadoCliente":
      frmListadoCliente.classList.remove("d-none");
      break;
    case "mnuEditarCliente":
      frmEditarCliente.classList.remove("d-none");
      break;
    case "mnuBorrarCliente":
      frmBorrarCliente.classList.remove("d-none");
      break;
    case "mnuAltaReserva":
      frmAltaReserva.classList.remove("d-none");
      cargarDesplegable();
      break;
    case "mnuListadoReserva":
      frmListadoReserva.classList.remove("d-none");
      break;
    case "mnuEditarReserva":
      frmEditarReserva.classList.remove("d-none");
      break;
    case "mnuBorrarReserva":
      frmBorrarReserva.classList.remove("d-none");
      break;
  }
}

function ocultarFormularios() {
  frmAltaCliente.classList.add("d-none");
  frmListadoCliente.classList.add("d-none");
  frmEditarCliente.classList.add("d-none");
  frmBorrarCliente.classList.add("d-none");
  frmAltaReserva.classList.add("d-none");
  frmListadoReserva.classList.add("d-none");
  frmEditarReserva.classList.add("d-none");
  frmBorrarReserva.classList.add("d-none");
}

async function altaCliente() {
  let client_name = frmAltaCliente.client_name.value.trim();
  let address = frmAltaCliente.address.value.trim();
  let phone_number = frmAltaCliente.phone_number.value.trim();
  let email = frmAltaCliente.email.value.trim();

  let cliente = new Cliente(null, client_name, address, phone_number, email);

  let respuesta = await oReservasHotel.altaCliente(cliente);

  alert(respuesta.mensaje);

  if (respuesta.ok) {
    frmAltaCliente.reset();
    ocultarFormularios();
  }
}

async function listadoCliente() {
  let idCliente = frmListadoCliente.txtListadoIdCLiente.value.trim();

  const ventana = open("listado_clientes.html");

  ventana.addEventListener("load", async () => {
    const listado = await oReservasHotel.listadoCliente(idCliente);
    ventana.document.querySelector("#listado").innerHTML = listado;
  });
}

async function editarCliente() {
  let idCliente = frmEditarCliente.txtEditarIdCliente.value.trim();
  let nombre = frmEditarCliente.txtEditarNombreCliente.value.trim();
  let direccion = frmEditarCliente.txtEditarDireccionCliente.value.trim();
  let telefono = frmEditarCliente.txtEditarTelefonoCliente.value.trim();
  let email = frmEditarCliente.txtEditarEmailCliente.value.trim();

  let cliente = new Cliente(idCliente, nombre, direccion, telefono, email);

  let respuesta = await oReservasHotel.editarCliente(cliente);

  alert(respuesta.mensaje);

  if (respuesta.ok) {
    frmEditarCliente.reset();
    ocultarFormularios();
  }
}

async function borrarCliente() {
  let idCliente = frmBorrarCliente.txtBorrarIdCliente.value.trim();

  let respuesta = await oReservasHotel.borrarCliente(idCliente);

  alert(respuesta.mensaje);

  if (respuesta.ok) {
    frmBorrarCliente.reset();
    ocultarFormularios();
  }
}

async function altaReserva() {
  let client_id = frmAltaReserva.lstClientId.value.trim();
  let check_in_date = frmAltaReserva.check_in_date.value.trim();
  let check_out_date = frmAltaReserva.check_out_date.value.trim();
  let room_number = frmAltaReserva.room_number.value.trim();
  let price = frmAltaReserva.price.value.trim();

  let reserva = new Reserva(
    null,
    client_id,
    check_in_date,
    check_out_date,
    room_number,
    price
  );

  let respuesta = await oReservasHotel.altaReserva(reserva);

  alert(respuesta.mensaje);

  if (respuesta.ok) {
    frmAltaReserva.reset();
    ocultarFormularios();
  }
}

async function cargarDesplegable() {
  const respuesta = await oReservasHotel.getClientes();

  if (respuesta.ok) {
    let optionsNombres = "";
    for (let nombre of respuesta.datos) {
      optionsNombres += `<option value="${nombre.client_id}">${nombre.client_name}</option>`;
    }

    frmAltaReserva.lstClientId.innerHTML = optionsNombres;
  } else {
    alert("Error al recuperar los nombres de clientes");
  }
}

async function listadoReserva() {
  let idReserva = frmListadoReserva.txtListadoIdReserva.value.trim();

  const ventana = open("listado_reservas.html");

  ventana.addEventListener("load", async () => {
    const listado = await oReservasHotel.listadoReserva(idReserva);
    ventana.document.querySelector("#listadoReservas").innerHTML = listado;
  });
}

async function editarReserva() {
  let idReserva = frmEditarReserva.txtEditarIdReserva.value.trim();
  let idCliente = frmEditarReserva.lstClienteId.value.trim();
  let check_in_date = frmEditarReserva.dateEditar_check_in_date.value.trim();
  let check_out_date = frmEditarReserva.dateEditar_check_out_date.value.trim();
  let room_number = frmEditarReserva.txtEditarRoomNumber.value.trim();
  let price = frmEditarReserva.txtEditarPrice.value.trim();

  let reserva = new Reserva(
    idReserva,
    idCliente,
    check_in_date,
    check_out_date,
    room_number,
    price
  );

  let respuesta = await oReservasHotel.editarReserva(reserva);

  alert(respuesta.mensaje);

  if (respuesta.ok) {
    frmEditarReserva.reset();
    ocultarFormularios();
  }
}

async function borrarReserva() {
  let idReserva = frmBorrarReserva.txtBorrarIdReserva.value.trim();

  let respuesta = await oReservasHotel.borrarReserva(idReserva);

  alert(respuesta.mensaje);

  if (respuesta.ok) {
    frmBorrarReserva.reset();
    ocultarFormularios();
  }
}

function listadoReservaTotal() {
  const ventana = open("listado_reservas.html");

  ventana.addEventListener("load", async () => {
    const listado = await oReservasHotel.listadoReservaTotal();
    ventana.document.querySelector("#listadoReservas").innerHTML = listado;
  });
}

function listadoClienteTotal() {
  const ventana = open("listado_clientes.html");

  ventana.addEventListener("load", async () => {
    const listado = await oReservasHotel.listadoClienteTotal();
    ventana.document.querySelector("#listado").innerHTML = listado;
  });
}