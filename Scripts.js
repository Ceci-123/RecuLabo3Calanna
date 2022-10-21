//Array original
let arrayJson = JSON.parse(
  '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]'
);
let arrayVehiculos = [];

//Variables
let formularioVisible = true;

//Selectores
const body = document.querySelector("body");
const checkBoxList = document.querySelectorAll("input[type=checkbox]");
const comboBox = document.getElementById("select_filtro");
const tablaInformacion = document.getElementById("tabla");
const botonCalculo = document.getElementById("calcular_btn");
const botonAgregar = document.getElementById("agregar_btn");
const comboBoxAlta = document.getElementById("select_tipo");
const botonAlta = document.getElementById("alta_btn");
const botonModificar = document.getElementById("modificar_btn");
const botonEliminar = document.getElementById("eliminar_btn");
const botonCancelar = document.getElementById("cancelar_btn");
const etiquetaError = document.getElementById("mensaje_error");

//Asignacion de listeners
window.addEventListener("load", CargaInformacionJSON);
window.addEventListener("load", CargarTablas);
comboBox.addEventListener("change", CargarTablas);
comboBoxAlta.addEventListener("change", OcultarCampos);
checkBoxList.forEach((element) => {
  element.addEventListener("change", FiltrarColumnas);
});
botonCalculo.addEventListener("click", CalcularVelocidadPromedio);
botonAgregar.addEventListener("click", MostrarOcultarForm);
botonAlta.addEventListener("click", AltaModificacion);
botonModificar.addEventListener("click", AltaModificacion);
botonEliminar.addEventListener("click", EliminarRegistro);

//Métodos automaticos
function CargaInformacionJSON() {
  arrayJson.forEach((element) => {
    if (element.hasOwnProperty("alterego")) {
      let nuevoHeroe = new Heroe(
        element["id"],
        element["nombre"],
        element["apellido"],
        element["edad"],
        element["alterego"],
        element["ciudad"],
        element["publicado"]
      );
      arrayPersonas.push(nuevoHeroe);
    } else {
      let nuevoVillano = new Villano(
        element["id"],
        element["nombre"],
        element["apellido"],
        element["edad"],
        element["enemigo"],
        element["robos"],
        element["asesinatos"]
      );
      arrayPersonas.push(nuevoVillano);
    }
  });
  FiltrarColumnas();
  MostrarOcultarForm();
}

//ABM

function ValidarCampos(
  id,
  nombre,
  apellido,
  edad,
  alterEgo,
  ciudad,
  publicado,
  enemigo,
  robos,
  asesinatos
) {
  if (id == "" || isNaN(id)) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Revisar el ID";
    return false;
  }
  if (nombre == "" || !isNaN(nombre)) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Revisar el ID";
    return false;
  }
  if (apellido == "" || !isNaN(apellido)) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Revisar el apellido";
    return false;
  }
  if (isNaN(edad)) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Revisar la edad";
    return false;
  }
  if (comboBoxAlta.value == "heroes") {
    if (alterEgo == "" || !isNaN(alterEgo)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Revisar el alter ego";
      return false;
    }
    if (ciudad == "" || !isNaN(ciudad)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Revisar la ciudad";
      return false;
    }
    if (publicado < 1940 || isNaN(publicado)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Revisar la publicación";
      return false;
    }
  } else {
    if (enemigo == "" || !isNaN(enemigo)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Revisar el enemigo";
      return false;
    }
    if (robos < 1 || isNaN(robos)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Revisar los robos";
      return false;
    }
    if (asesinatos < 1 || isNaN(asesinatos)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Revisar los asesinatos";
      return false;
    }
  }
  etiquetaError.style.display = "none";
  alert("Cambio guardado con éxito");
  return true;
}

function EncontrarUltimoId() {
  let ultimoId = 0;
  arrayPersonas.forEach((element) => {
    if (element.id > ultimoId) {
      ultimoId = element.id;
    }
  });

  return ultimoId;
}

function EliminarRegistro() {
  let id = document.getElementById("input_id").value;
  let indice;
  for (let index = 0; index < arrayPersonas.length; index++) {
    if (arrayPersonas[index].id == id) {
      indice = index;
      break;
    }
  }
  arrayPersonas.splice(indice, 1);
  alert("Elemento eliminado");
  MostrarOcultarForm();
}

function AltaModificacion() {
  let id = document.getElementById("input_id").value;
  let nombre = document.getElementById("input_nombre").value;
  let apellido = document.getElementById("input_apellido").value;
  let edad = parseInt(document.getElementById("input_edad").value);
  let alterEgo = document.getElementById("input_alterEgo").value;
  let ciudad = document.getElementById("input_ciudad").value;
  let publicado = parseInt(document.getElementById("input_publicacion").value);
  let enemigo = document.getElementById("input_enemigo").value;
  let robos = document.getElementById("input_robos").value;
  let asesinatos = parseInt(document.getElementById("input_asesinatos").value);

  if (
    ValidarCampos(
      EncontrarUltimoId() + 1,
      nombre,
      apellido,
      edad,
      alterEgo,
      ciudad,
      publicado,
      enemigo,
      robos,
      asesinatos
    )
  ) {
    if (comboBoxAlta.value == "heroes") {
      if (id == "") {
        let HeroeAux = new Heroe(
          EncontrarUltimoId() + 1,
          nombre,
          apellido,
          edad,
          alterEgo,
          ciudad,
          publicado
        );
        arrayPersonas.push(HeroeAux);
      } else {
        let HeroeModificar = arrayPersonas.filter(
          (element) => element.id == id
        );
        HeroeModificar[0].ActualizarDatos(
          nombre,
          apellido,
          edad,
          alterEgo,
          ciudad,
          publicado
        );
      }
    } else {
      if (id == "") {
        let VillanoAux = new Villano(
          EncontrarUltimoId() + 1,
          nombre,
          apellido,
          edad,
          enemigo,
          robos,
          asesinatos
        );
        arrayPersonas.push(VillanoAux);
      } else {
        let VillanoModificar = arrayPersonas.filter((element) => {
          if (element.id == id) return element;
        });
        VillanoModificar[0].ActualizarDatos(
          nombre,
          apellido,
          edad,
          enemigo,
          robos,
          asesinatos
        );
      }
    }
    MostrarOcultarForm();
  }
}

function CargarTablas() {
  tablaInformacion.innerHTML = "";
  etiquetaError.style.display = "none";
  FiltrarColumnas();
  CargarTitulos();
  arrayFiltrado = arrayPersonas.filter((element) =>
    FiltrarPorComboBox(element)
  );
  arrayFiltrado.map((element) => CrearRegistros(element));
}

function AbrirFormModificacion(e) {
  let fila = e.currentTarget;
  if (fila.cells[4].innerText == "-------") {
    comboBoxAlta.value = "villanos";
  } else {
    comboBoxAlta.value = "heroes";
  }
  comboBoxAlta.disabled = true;
  MostrarOcultarForm();
  document.getElementById("input_id").value = fila.cells[0].innerText;
  document.getElementById("input_nombre").value = fila.cells[1].innerText;
  document.getElementById("input_apellido").value = fila.cells[2].innerText;
  document.getElementById("input_edad").value = fila.cells[3].innerText;
  document.getElementById("input_alterEgo").value = fila.cells[4].innerText;
  document.getElementById("input_ciudad").value = fila.cells[5].innerText;
  document.getElementById("input_publicacion").value = fila.cells[6].innerText;
  document.getElementById("input_enemigo").value = fila.cells[7].innerText;
  document.getElementById("input_robos").value = fila.cells[8].innerText;
  document.getElementById("input_asesinatos").value = fila.cells[9].innerText;
  botonAlta.style.display = "none";
  botonCancelar.style.display = "none";
  botonModificar.style.display = "inherit";
  botonEliminar.style.display = "inherit";
}

function CrearRegistros(element) {
  let filaTabla = document.createElement("tr");
  let celdaId = document.createElement("td");
  let celdaNombre = document.createElement("td");
  let celdaApellido = document.createElement("td");
  let celdaEdad = document.createElement("td");
  let celdaAlterEgo = document.createElement("td");
  let celdaCiudad = document.createElement("td");
  let celdaPublicado = document.createElement("td");
  let celdaEnemigo = document.createElement("td");
  let celdaRobos = document.createElement("td");
  let celdaAsesinatos = document.createElement("td");
  filaTabla.appendChild(celdaId);
  filaTabla.appendChild(celdaNombre);
  filaTabla.appendChild(celdaApellido);
  filaTabla.appendChild(celdaEdad);
  filaTabla.appendChild(celdaAlterEgo);
  filaTabla.appendChild(celdaCiudad);
  filaTabla.appendChild(celdaPublicado);
  filaTabla.appendChild(celdaEnemigo);
  filaTabla.appendChild(celdaRobos);
  filaTabla.appendChild(celdaAsesinatos);
  filaTabla.addEventListener("dblclick", AbrirFormModificacion);

  celdaId.innerText = element.id;
  celdaNombre.innerText = element.nombre;
  celdaApellido.innerText = element.apellido;
  celdaEdad.innerText = element.edad;
  celdaAlterEgo.innerText =
    element instanceof Heroe ? element.alterEgo : "-------";
  celdaCiudad.innerText = element instanceof Heroe ? element.ciudad : "-------";
  celdaPublicado.innerText =
    element instanceof Heroe ? element.publicado : "-------";
  celdaEnemigo.innerText =
    element instanceof Villano ? element.enemigo : "-------";
  celdaRobos.innerText = element instanceof Villano ? element.robos : "-------";
  celdaAsesinatos.innerText =
    element instanceof Villano ? element.asesinatos : "-------";

  celdaId.classList.add("id");
  celdaNombre.classList.add("nombre");
  celdaApellido.classList.add("apellido");
  celdaEdad.classList.add("edad");
  celdaAlterEgo.classList.add("alterEgo");
  celdaCiudad.classList.add("ciudad");
  celdaPublicado.classList.add("publicado");
  celdaEnemigo.classList.add("enemigo");
  celdaRobos.classList.add("robos");
  celdaAsesinatos.classList.add("asesinatos");

  tablaInformacion.appendChild(filaTabla);
}

function CargarTitulos() {
  let filaTitulos = document.createElement("tr");
  let celdaId = document.createElement("th");
  let celdaNombre = document.createElement("th");
  let celdaApellido = document.createElement("th");
  let celdaEdad = document.createElement("th");
  let celdaAlterEgo = document.createElement("th");
  let celdaCiudad = document.createElement("th");
  let celdaPublicado = document.createElement("th");
  let celdaEnemigo = document.createElement("th");
  let celdaRobos = document.createElement("th");
  let celdaAsesinatos = document.createElement("th");

  filaTitulos.appendChild(celdaId);
  filaTitulos.appendChild(celdaNombre);
  filaTitulos.appendChild(celdaApellido);
  filaTitulos.appendChild(celdaEdad);
  filaTitulos.appendChild(celdaAlterEgo);
  filaTitulos.appendChild(celdaCiudad);
  filaTitulos.appendChild(celdaPublicado);
  filaTitulos.appendChild(celdaEnemigo);
  filaTitulos.appendChild(celdaRobos);
  filaTitulos.appendChild(celdaAsesinatos);

  celdaId.classList.add("id");
  celdaNombre.classList.add("nombre");
  celdaApellido.classList.add("apellido");
  celdaEdad.classList.add("edad");
  celdaAlterEgo.classList.add("alterEgo");
  celdaCiudad.classList.add("ciudad");
  celdaPublicado.classList.add("publicado");
  celdaEnemigo.classList.add("enemigo");
  celdaRobos.classList.add("robos");
  celdaAsesinatos.classList.add("asesinatos");

  celdaId.innerText = "ID";
  celdaNombre.innerText = "Nombre";
  celdaApellido.innerText = "Apellido";
  celdaEdad.innerText = "Edad";
  celdaAlterEgo.innerText = "AlterEgo";
  celdaCiudad.innerText = "Ciudad";
  celdaPublicado.innerText = "Publicado";
  celdaEnemigo.innerText = "Enemigo";
  celdaRobos.innerText = "Robos";
  celdaAsesinatos.innerText = "Asesinatos";

  tablaInformacion.appendChild(filaTitulos);
  let titulosColumnas = document.querySelectorAll("th");
  titulosColumnas.forEach((element) => {
    element.addEventListener("click", OrdenarColumnas);
  });
}

//Calculos
function CalcularVelocidadPromedio() {
  let acumulador = 0;
  let arrayFiltrado = arrayVehiculos.filter((element) =>
    FiltrarPorComboBox(element)
  );
  acumulador = arrayFiltrado.reduce(
    (sumaParcial, a) => sumaParcial + a.velMax,
    0
  );
  document.getElementById("textbox_calculo").value = (
    acumulador / arrayFiltrado.length
  ).toFixed(2);
}

//Ordenamiento
function OrdenarColumnas(e) {
  let criterio = e.currentTarget.innerText;
  criterio = criterio.toLowerCase();

  switch (criterio) {
    case "id":
      arrayPersonas = arrayPersonas.sort((a, b) => a.id - b.id);
      break;
    case "nombre":
      arrayPersonas = arrayPersonas.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      );
      break;
    case "apellido":
      arrayPersonas = arrayPersonas.sort((a, b) =>
        a.apellido > b.apellido ? 1 : b.apellido > a.apellido ? -1 : 0
      );
      break;
    case "edad":
      arrayPersonas = arrayPersonas.sort((a, b) => a.edad - b.edad);
      break;
    case "alterego":
      arrayPersonas = arrayPersonas.sort((a, b) =>
        a.alterEgo > b.alterEgo ? 1 : b.alterEgo > a.alterEgo ? -1 : 0
      );
      break;
    case "ciudad":
      arrayPersonas = arrayPersonas.sort((a, b) =>
        a.ciudad > b.ciudad ? 1 : b.ciudad > a.ciudad ? -1 : 0
      );
      break;
    case "publicado":
      arrayPersonas = arrayPersonas.sort((a, b) => a.publicado - b.publicado);
      break;
    case "enemigo":
      arrayPersonas = arrayPersonas.sort((a, b) =>
        a.enemigo > b.enemigo ? 1 : b.enemigo > a.enemigo ? -1 : 0
      );
      break;
    case "robos":
      arrayPersonas = arrayPersonas.sort((a, b) => a.robos - b.robos);
      break;
    case "asesinatos":
      arrayPersonas = arrayPersonas.sort((a, b) => a.asesinatos - b.asesinatos);
      break;
  }
  CargarTablas();
}

//Filtros
function FiltrarPorComboBox(element) {
  switch (comboBox.value) {
    case "todos":
      return true;
    case "heroes":
      return element instanceof Heroe;
    case "villanos":
      return element instanceof Villano;
  }
}

function FiltrarColumnas() {
  document.querySelectorAll(".id").forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".nombre")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".apellido")
    .forEach((a) => (a.style.display = "none"));
  document.querySelectorAll(".edad").forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".alterEgo")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".ciudad")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".publicado")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".enemigo")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".robos")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".asesinatos")
    .forEach((a) => (a.style.display = "none"));
  let checkBoxChecked = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  checkBoxChecked.forEach((element) => {
    if (element.value == "id")
      document
        .querySelectorAll(".id")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "nombre")
      document
        .querySelectorAll(".nombre")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "apellido")
      document
        .querySelectorAll(".apellido")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "edad")
      document
        .querySelectorAll(".edad")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "alterEgo")
      document
        .querySelectorAll(".alterEgo")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "ciudad")
      document
        .querySelectorAll(".ciudad")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "publicado")
      document
        .querySelectorAll(".publicado")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "enemigo")
      document
        .querySelectorAll(".enemigo")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "robos")
      document
        .querySelectorAll(".robos")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "asesinatos")
      document
        .querySelectorAll(".asesinatos")
        .forEach((a) => (a.style.display = "inline-block"));
  });
}

//Mostrar Ocultar

function MostrarOcultarForm() {
  if (formularioVisible) {
    document.querySelector(".container_formulario").style.display = "none";
    document.querySelector(".container_tabla").style.display = "block";
    botonAgregar.innerText = "Agregar";
    document.getElementById("formularioAlta").reset();
    CargarTablas();
    formularioVisible = false;
  } else {
    OcultarCampos();
    document.querySelector(".container_formulario").style.display = "block";
    document.querySelector(".container_tabla").style.display = "none";
    botonAgregar.innerText = "Ocultar";
    formularioVisible = true;
    botonAlta.style.display = "inherit";
    botonCancelar.style.display = "none";
    botonEliminar.style.display = "none";
    botonModificar.style.display = "none";
  }
}

function OcultarCampos() {
  switch (comboBoxAlta.value) {
    case "heroes":
      document.querySelector(".input_alta_heroe").style.visibility = "visible";
      document.querySelector(".input_alta_villano").style.visibility = "hidden";
      break;
    case "villanos":
      document.querySelector(".input_alta_heroe").style.visibility = "hidden";
      document.querySelector(".input_alta_villano").style.visibility =
        "visible";
      break;
  }
}

//Clases

class Vehiculo {
  id;
  modelo;
  anoFab;
  velMax;

  constructor(id, modelo, anoFab, velMax) {
    this.id = id;
    this.modelo = modelo;
    this.anoFab = anoFab;
    this.velMax = velMax;
  }

  toString() {
    return `ID: ${this.id} - Nombre: ${this.modelo} - Apellido: ${this.anoFab} - Edad ${this.velMax}\n `;
  }
}

class Aereo extends Vehiculo {
  altMax;
  autonomia;

  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);
    this.altMax = altMax;
    this.autonomia = autonomia;
  }

  toString() {
    return `${super.toString()}altura: ${this.altMax} - autonomia ${
      this.autonomia
    }`;
  }

  ActualizarDatos(modelo, anoFab, velMax, altMax, autonomia) {
    this.modelo = modelo;
    this.anoFab = anoFab;
    this.velMax = velMax;
    this.altMax = altMax;
    this.autonomia = autonomia;
  }
}

class Terrestre extends Vehiculo {
  cantPue;
  cantRue;

  constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
    super(id, modelo, anoFab, velMax);
    this.cantPue = cantPue;
    this.cantRue = cantRue;
  }

  toString() {
    return `${super.toString()}Cantidad de Puertas: ${
      this.cantPue
    } - cantidad de ruedas ${this.cantRue}`;
  }

  ActualizarDatos(modelo, anoFab, velMax, cantPue, cantRue) {
    this.modelo = modelo;
    this.anoFab = anoFab;
    this.velMax = velMax;
    this.cantPue = cantPue;
    this.cantRue = cantRue;
  }
}
