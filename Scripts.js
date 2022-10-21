//Array original
let arrayJson = JSON.parse(
  '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]'
);
let arrayVehiculos = [];
let formularioVisible = true;

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

function CargaInformacionJSON() {
  arrayJson.forEach((element) => {
    if (element.hasOwnProperty("altMax")) {
      let nuevoAereo = new Aereo(
        element["id"],
        element["modelo"],
        element["anoFab"],
        element["velMax"],
        element["altMax"],
        element["autonomia"]
      );
      arrayVehiculos.push(nuevoAereo);
    } else {
      let nuevoTerrestre = new Terrestre(
        element["id"],
        element["modelo"],
        element["anoFab"],
        element["velMax"],
        element["cantPue"],
        element["cantRue"]
      );
      arrayVehiculos.push(nuevoTerrestre);
    }
  });
  FiltrarColumnas();
  MostrarOcultarForm();
}

function ValidarCampos(
  id,
  modelo,
  anoFab,
  velMax,
  altMax,
  autonomia,
  cantPue,
  cantRue
) {
  if (id == "" || isNaN(id)) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Revisar el ID";
    return false;
  }
  if (modelo == "" || !isNaN(modelo)) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Modelo incorrecto";
    return false;
  }

  if (isNaN(anoFab) || anoFab < 0) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Año de Fabricacion incorrecto";
    return false;
  }

  if (isNaN(velMax) || anoFab < 0) {
    etiquetaError.style.display = "flex";
    etiquetaError.innerText = "Velocidad debe ser mayor a 0";
    return false;
  }

  if (comboBoxAlta.value == "aereo") {
    if (altMax < 0 || isNaN(altMax)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Altura Maxima debe ser mayor a 0";
      return false;
    }
    if (autonomia < 0 || isNaN(autonomia)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Autonomia incorrecta";
      return false;
    }
  } else {
    if (cantPue < 0 || isNaN(cantPue)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Cantidad de Puertas erronea";
      return false;
    }
    if (cantRue < 0 || isNaN(cantRue)) {
      etiquetaError.style.display = "flex";
      etiquetaError.innerText = "Cantidad de Ruedas erronea";
      return false;
    }
  }
  etiquetaError.style.display = "none";
  alert("Cambio guardado con éxito");
  return true;
}

function EncontrarUltimoId() {
  let ultimoId = 0;
  arrayVehiculos.forEach((element) => {
    if (element.id > ultimoId) {
      ultimoId = element.id;
    }
  });

  return ultimoId;
}

function EliminarRegistro() {
  let id = document.getElementById("input_id").value;
  let indice;
  for (let index = 0; index < arrayVehiculos.length; index++) {
    if (arrayVehiculos[index].id == id) {
      indice = index;
      break;
    }
  }
  arrayVehiculos.splice(indice, 1);
  alert("Elemento eliminado");
  MostrarOcultarForm();
}

function AltaModificacion() {
  let id = document.getElementById("input_id").value;
  let modelo = document.getElementById("input_modelo").value;
  let anoFab = parseInt(document.getElementById("input_anoFab").value);
  let velMax = parseInt(document.getElementById("input_velMax").value);
  let altMax = parseInt(document.getElementById("input_altMax").value);
  let autonomia = parseInt(document.getElementById("input_autonomia").value);
  let cantPue = parseInt(document.getElementById("input_cantPue").value);
  let cantRue = parseInt(document.getElementById("input_cantRue").value);

  if (
    ValidarCampos(
      EncontrarUltimoId() + 1,
      modelo,
      anoFab,
      velMax,
      altMax,
      autonomia,
      cantPue,
      cantRue
    )
  ) {
    if (comboBoxAlta.value == "aereo") {
      if (id == "") {
        let AereoAux = new Aereo(
          EncontrarUltimoId() + 1,
          modelo,
          anoFab,
          velMax,
          altMax,
          autonomia
        );
        arrayVehiculos.push(AereoAux);
      } else {
        let AereoModificar = arrayVehiculos.filter(
          (element) => element.id == id
        );
        AereoModificar[0].ActualizarDatos(
          modelo,
          anoFab,
          velMax,
          altMax,
          autonomia
        );
      }
    } else {
      if (id == "") {
        let TerrestreAux = new Terrestre(
          EncontrarUltimoId() + 1,
          modelo,
          anoFab,
          velMax,
          cantPue,
          cantRue
        );
        arrayVehiculos.push(TerrestreAux);
      } else {
        let TerrestreModificar = arrayVehiculos.filter((element) => {
          if (element.id == id) return element;
        });
        TerrestreModificar[0].ActualizarDatos(
          modelo,
          anoFab,
          velMax,
          cantPue,
          cantRue
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
  arrayFiltrado = arrayVehiculos.filter((element) =>
    FiltrarPorComboBox(element)
  );
  arrayFiltrado.map((element) => CrearRegistros(element));
}

function AbrirFormModificacion(e) {
  let fila = e.currentTarget;
  if (fila.cells[3].innerText == "-------") {
    comboBoxAlta.value = "aereo";
  } else {
    comboBoxAlta.value = "terrestre";
  }
  comboBoxAlta.disabled = true;
  MostrarOcultarForm();
  document.getElementById("input_id").value = fila.cells[0].innerText;
  document.getElementById("input_modelo").value = fila.cells[1].innerText;
  document.getElementById("input_anoFab").value = fila.cells[2].innerText;
  document.getElementById("input_velMax").value = fila.cells[3].innerText;
  document.getElementById("input_altMax").value = fila.cells[4].innerText;
  document.getElementById("input_autonomia").value = fila.cells[5].innerText;
  document.getElementById("input_cantPue").value = fila.cells[7].innerText;
  document.getElementById("input_cantRue").value = fila.cells[8].innerText;
  botonAlta.style.display = "none";
  botonCancelar.style.display = "none";
  botonModificar.style.display = "inherit";
  botonEliminar.style.display = "inherit";
}

function CrearRegistros(element) {
  let filaTabla = document.createElement("tr");
  let celdaId = document.createElement("td");
  let celdaModelo = document.createElement("td");
  let celdaAnoFab = document.createElement("td");
  let celdaVelMax = document.createElement("td");
  let celdaAltMax = document.createElement("td");
  let celdaAutonomia = document.createElement("td");
  let celdaCantPue = document.createElement("td");
  let celdaCantRue = document.createElement("td");

  filaTabla.appendChild(celdaId);
  filaTabla.appendChild(celdaModelo);
  filaTabla.appendChild(celdaAnoFab);
  filaTabla.appendChild(celdaVelMax);
  filaTabla.appendChild(celdaAltMax);
  filaTabla.appendChild(celdaAutonomia);
  filaTabla.appendChild(celdaCantPue);
  filaTabla.appendChild(celdaCantRue);
  filaTabla.addEventListener("dblclick", AbrirFormModificacion);

  celdaId.innerText = element.id;
  celdaModelo.innerText = element.modelo;
  celdaAnoFab.innerText = element.anoFab;
  celdaVelMax.innerText = element.velMax;
  celdaAltMax.innerText = element instanceof Aereo ? element.altMax : "-------";
  celdaAutonomia.innerText =
    element instanceof Aereo ? element.autonomia : "-------";
  celdaCantPue.innerText =
    element instanceof Terrestre ? element.cantPue : "-------";
  celdaCantRue.innerText =
    element instanceof Terrestre ? element.cantPue : "-------";

  celdaId.classList.add("id");
  celdaModelo.classList.add("modelo");
  celdaAnoFab.classList.add("anoFab");
  celdaVelMax.classList.add("velMax");
  celdaAltMax.classList.add("altMax");
  celdaAutonomia.classList.add("autonomia");
  celdaCantPue.classList.add("cantPue");
  celdaCantRue.classList.add("cantRue");

  tablaInformacion.appendChild(filaTabla);
}

function CargarTitulos() {
  let filaTitulos = document.createElement("tr");
  let celdaId = document.createElement("th");
  let celdaModelo = document.createElement("th");
  let celdaAnoFab = document.createElement("th");
  let celdaVelMax = document.createElement("th");
  let celdaAltMax = document.createElement("th");
  let celdaAutonomia = document.createElement("th");
  let celdaCantPue = document.createElement("th");
  let celdaCantRue = document.createElement("th");

  filaTitulos.appendChild(celdaId);
  filaTitulos.appendChild(celdaModelo);
  filaTitulos.appendChild(celdaAnoFab);
  filaTitulos.appendChild(celdaVelMax);
  filaTitulos.appendChild(celdaAltMax);
  filaTitulos.appendChild(celdaAutonomia);
  filaTitulos.appendChild(celdaCantPue);
  filaTitulos.appendChild(celdaCantRue);

  celdaId.classList.add("id");
  celdaModelo.classList.add("modelo");
  celdaAnoFab.classList.add("anoFab");
  celdaVelMax.classList.add("velMax");
  celdaAltMax.classList.add("altMax");
  celdaAutonomia.classList.add("autonomia");
  celdaCantPue.classList.add("cantPue");
  celdaCantRue.classList.add("cantRue");

  celdaId.innerText = "ID";
  celdaModelo.innerText = "modelo";
  celdaAnoFab.innerText = "AnoFab";
  celdaVelMax.innerText = "velMax";
  celdaAltMax.innerText = "altMax";
  celdaAutonomia.innerText = "autonomia";
  celdaCantPue.innerText = "cantPue";
  celdaCantRue.innerText = "cantRue";

  tablaInformacion.appendChild(filaTitulos);
  let titulosColumnas = document.querySelectorAll("th");
  titulosColumnas.forEach((element) => {
    element.addEventListener("click", OrdenarColumnas);
  });
}

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

function OrdenarColumnas(e) {
  let criterio = e.currentTarget.innerText;
  criterio = criterio.toLowerCase();

  switch (criterio) {
    case "id":
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.id - b.id);
      break;
    case "modelo":
      arrayVehiculos = arrayVehiculos.sort((a, b) =>
        a.modelo > b.modelo ? 1 : b.modelo > a.modelo ? -1 : 0
      );
      break;
    case "anofab":
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.anoFab - b.anoFab);
      break;
    case "velmax":
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.velMax - b.velMax);
      break;
    case "altmax":
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.altMax - b.altMax);
      break;
    case "autonomia":
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.autonomia - b.autonomia);
      break;
    case "cantpue":
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.cantPue - b.cantPue);
      break;
    case "cantrue":
      console.log("entra");
      arrayVehiculos = arrayVehiculos.sort((a, b) => a.cantRue - b.cantRue);
      break;
  }
  CargarTablas();
}

//Filtros
function FiltrarPorComboBox(element) {
  switch (comboBox.value) {
    case "todos":
      return true;
    case "aereo":
      return element instanceof Aereo;
    case "terrestre":
      return element instanceof Terrestre;
  }
}

function FiltrarColumnas() {
  document.querySelectorAll(".id").forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".modelo")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".anoFab")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".velMax")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".altMax")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".autonomia")
    .forEach((a) => (a.style.display = "none"));

  document
    .querySelectorAll(".cantPue")
    .forEach((a) => (a.style.display = "none"));
  document
    .querySelectorAll(".cantRue")
    .forEach((a) => (a.style.display = "none"));

  let checkBoxChecked = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  checkBoxChecked.forEach((element) => {
    if (element.value == "id")
      document
        .querySelectorAll(".id")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "modelo")
      document
        .querySelectorAll(".modelo")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "anoFab")
      document
        .querySelectorAll(".anoFab")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "velMax")
      document
        .querySelectorAll(".velMax")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "altMax")
      document
        .querySelectorAll(".altMax")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "autonomia")
      document
        .querySelectorAll(".autonomia")
        .forEach((a) => (a.style.display = "inline-block"));

    if (element.value == "cantPue")
      document
        .querySelectorAll(".cantPue")
        .forEach((a) => (a.style.display = "inline-block"));
    if (element.value == "cantRue")
      document
        .querySelectorAll(".cantRue")
        .forEach((a) => (a.style.display = "inline-block"));
  });
}

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
    case "aereo":
      document.querySelector(".input_alta_aereo").style.visibility = "visible";
      document.querySelector(".input_alta_terrestre").style.visibility =
        "hidden";
      break;
    case "terrestre":
      document.querySelector(".input_alta_aereo").style.visibility = "hidden";
      document.querySelector(".input_alta_terrestre").style.visibility =
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
