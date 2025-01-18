"use strict";

class Reserva {
  #reservation_id;
  #client_id;
  #check_in_date;
  #check_out_date;
  #room_number;
  #price;

  constructor(
    reservation_id,
    client_id,
    check_in_date,
    check_out_date,
    room_number,
    price
  ) {
    this.#reservation_id = reservation_id;
    this.#client_id = client_id;
    this.#check_in_date = check_in_date;
    this.#check_out_date = check_out_date;
    this.#room_number = room_number;
    this.#price = price;
  }

  // Getters

  get reservation_id() {
    return this.#reservation_id;
  }

  get client_id() {
    return this.#client_id;
  }

  get check_in_date() {
    return this.#check_in_date;
  }

  get check_out_date() {
    return this.#check_out_date;
  }

  get room_number() {
    return this.#room_number;
  }

  get price() {
    return this.#price;
  }

  // Setters

  set reservation_id(value) {
    this.#reservation_id = value;
  }

  set client_id(value) {
    this.#client_id = value;
  }

  set check_in_date(value) {
    this.#check_in_date = value;
  }

  set check_out_date(value) {
    this.#check_out_date = value;
  }

  set room_number(value) {
    this.#room_number = value;
  }

  set price(value) {
    this.#price = value;
  }

  toJSON() {
    return {
      reservation_id: this.#reservation_id,
      client_id: this.#client_id,
      check_in_date: this.#check_in_date,
      check_out_date: this.#check_out_date,
      room_number: this.#room_number,
      price: this.#price,
    };
  }
}

class Cliente {
  #client_id;
  #client_name;
  #address;
  #phone_number;
  #email;

  constructor(client_id, client_name, address, phone_number, email) {
    this.#client_id = client_id;
    this.#client_name = client_name;
    this.#address = address;
    this.#phone_number = phone_number;
    this.#email = email;
  }

  // Getters

  get client_id() {
    return this.#client_id;
  }

  get client_name() {
    return this.#client_name;
  }

  get address() {
    return this.#address;
  }

  get phone_number() {
    return this.#phone_number;
  }

  get email() {
    return this.#email;
  }

  // Setters

  set client_id(value) {
    this.#client_id = value;
  }

  set client_name(value) {
    this.#client_name = value;
  }

  set address(value) {
    this.#address = value;
  }

  set phone_number(value) {
    this.#phone_number = value;
  }

  set email(value) {
    this.#email = value;
  }

  toJSON() {
    return {
      client_id: this.#client_id,
      client_name: this.#client_name,
      address: this.#address,
      phone_number: this.#phone_number,
      email: this.#email,
    };
  }
}

class ReservasHotel {
  async altaCliente(oCliente) {
    let datos = new FormData();

    datos.append("cliente", JSON.stringify(oCliente));

    console.log("Datos:", datos);

    let respuesta = await peticionPOST("altaCliente.php", datos);

    return respuesta;
  }

  async listadoCliente(idCliente) {
    let datos = new FormData();

    datos.append("client_id", idCliente);

    const respuesta = await peticionGET("getClientesId.php", datos);

    if (respuesta.ok) {
      let listado = `<h1>Listado de cliente por id: ${idCliente}</h1>`;

      listado += "<table class='table'>";
      listado +=
        "<thead><tr><th>NOMBRE</th><th>DIRECCIÓN</th><th>NUMERO DE TELEFONO</th><th>EMAIL</th></thead><tbody>";

      for (let cliente of respuesta.datos) {
        listado += `<tr><td>${cliente.client_name}</td>`;
        listado += `<td>${cliente.address}</td>`;
        listado += `<td>${cliente.phone_number}</td>`;
        listado += `<td>${cliente.email}</td></tr>`;
      }
      listado += "</tbody></table>";

      return listado;
    } else {
      return "<h1>Error al recuperar los datos</h1>";
    }
  }

  async editarCliente(oCliente) {
    let datos = new FormData();

    datos.append("cliente",JSON.stringify(oCliente));
   
    let respuesta = await peticionPOST("editarCliente.php", datos);

    return respuesta;
  }

  async borrarCliente(idCliente) {
  let datos = new FormData();

  datos.append("client_id", idCliente);

  let respuesta = await peticionPOST("borrarCliente.php", datos);

  return respuesta;
  }

  async altaReserva(oReserva) {
  let datos = new FormData();

  datos.append("reserva", JSON.stringify(oReserva));

  console.log("Datos:", datos);

  let respuesta = await peticionPOST("altaReserva.php", datos);

  return respuesta;
  }

  async getClientes() {
  let datos = new FormData();

  let respuesta = await peticionGET("getClientes.php", datos);

  return respuesta;
  }

  async listadoReserva(idReserva) {
    let datos = new FormData();

    datos.append("reservation_id", idReserva);

    const respuesta = await peticionGET("getReservasId.php", datos);

    if (respuesta.ok) {
      let listado = `<h1>Listado de reserva por id: ${idReserva}</h1>`;

      listado += "<table class='table'>";
      listado +=
        "<thead><tr><th>CLIENTE ID</th><th>FECHA DE ENTRADA</th><th>FECHA DE SALIDA</th><th>NÚMERO DE HABITACIÓN</th><th>PRECIO DE LA HABITACIÓN</th></thead><tbody>";

      for (let reserva of respuesta.datos) {
        listado += `<tr><td>${reserva.client_id}</td>`;
        listado += `<td>${reserva.check_in_date}</td>`;
        listado += `<td>${reserva.check_out_date}</td>`;
        listado += `<td>${reserva.room_number}</td>`;
        listado += `<td>${reserva.price}</td></tr>`;
      }
      listado += "</tbody></table>";

      return listado;
    } else {
      return "<h1>Error al recuperar los datos</h1>";
    }
  }

  async editarReserva(oReserva) {
    let datos = new FormData();

    datos.append("reserva",JSON.stringify(oReserva));
   
    let respuesta = await peticionPOST("editarReserva.php", datos);

    return respuesta;
  }

  async borrarReserva(idReserva) {
    let datos = new FormData();
  
    datos.append("reservation_id", idReserva);
  
    let respuesta = await peticionPOST("borrarReserva.php", datos);
  
    return respuesta;
    }

}