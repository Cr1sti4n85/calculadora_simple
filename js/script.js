let displayDiv = document.querySelector("#display");
displayDiv.innerText = 0;
let inputArray = [];
let operationArray = [];
let num = "";
let numbers = 0;
let result = 0;

//Cambia color al clickear boton de numero u operador
document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("color-change")) {
    e.target.style.backgroundColor = "#ccc";
  } else if (e.target.classList.contains("operator")) {
    e.target.style.backgroundColor = "rgb(255, 168, 63)";
  }
});

//vuelve al color normal
document.addEventListener("mouseup", (e) => {
  if (e.target.classList.contains("color-change")) {
    e.target.style.backgroundColor = "#666";
  } else if (e.target.classList.contains("operator")) {
    e.target.style.backgroundColor = "darkorange";
  }
});

function press(value) {
  //Vuelve a inicializar num en caso de querer realizar nueva operacion luego de presionar signo =
  if (operationArray.length === 0 && inputArray == result) {
    num = "";
    inputArray = [];
  }
  num = num + value;
  //guarda valor en arreglo
  inputArray.push(value);
  //visualizar valores en display de la calculadora
  displayDiv.innerText = num;
}

function setOP(operator) {
  //si no se ha ingresado numero previo al operador, el operador no se muestra en pantalla
  if (inputArray.length === 0) {
    return;
  }
  //en caso de querer operar con el resultado anterior, al presionar algun operador
  //realiza el calculo
  if (operationArray.length === 2) {
    calculate();
  }
  num = num + operator;

  //une los numeros ingresados y los guarda en operationArray,
  numbers = Number(inputArray.join(""));
  //se borran los datos anteriores del inputArray
  inputArray = [];
  //Se guarda el numero y el signo de operacion en operationArray
  operationArray.push(numbers);
  operationArray.push(operator);
  displayDiv.innerText = num;
}

function calculate() {
  //se agrega el ultimo numero ingresado al operationArray
  numbers = Number(inputArray.join(""));
  inputArray = [];
  operationArray.push(numbers);
  //Se realiza la operacion segun operador indicado
  if (operationArray[1] == "÷") {
    if (operationArray[2] == 0) {
      displayDiv.innerText = "Error";
      operationArray = [];
      num = "";
      numbers = 0;
      return;
    }
    result = operationArray[0] / operationArray[2];
    updateValues(result);
  } else if (operationArray[1] == "+") {
    result = operationArray[0] + operationArray[2];
    updateValues(result);
  } else if (operationArray[1] == "-") {
    result = operationArray[0] - operationArray[2];
    updateValues(result);
  } else if (operationArray[1] == "x") {
    result = operationArray[0] * operationArray[2];
    updateValues(result);
  }
}

//muestra resultado en pantalla. Actualiza valores en variables
function updateValues(result) {
  displayDiv.innerText = result;
  num = result;
  inputArray = [result];
  operationArray = [];
}

//Inicializa datos de variables
function clr() {
  inputArray = [];
  displayDiv.innerText = 0;
  num = "";
  numbers = 0;
}
