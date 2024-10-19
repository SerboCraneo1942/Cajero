 import Cuenta from './Cuenta.js';
import CuentaAhorros from './CuentaAhorros.js'
import CuentaCorriente from './CuentaCorriente.js'

let cuentas = [];
let proximoIdCuenta = 1;
// Función para crear una cuenta nueva
function crearCuenta() {
    const nombreCliente = document.getElementById("nombre-cliente").value;
    const tipoCuenta = document.getElementById("tipo-cuenta").value;

    let nuevaCuenta;

    if (tipoCuenta === "corriente") {
        nuevaCuenta = new CuentaCorriente(proximoIdCuenta++, nombreCliente);
    } else {
        nuevaCuenta = new CuentaAhorros(proximoIdCuenta++, nombreCliente);
    }
  if (!nombreClienteElement || !tipoCuentaElement) {
    console.log("Elementos del formulario no encontrados");
    return;
  }

    cuentas.push(nuevaCuenta);
    actualizarListaCuentas();
}

// Función para realizar una operación
function ejecutarOperacion() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tipoOperacion = document.getElementById("tipo-operacion").value;
    const idCuentaDestino = parseInt(document.getElementById("cuenta-destino").value);

    const cuenta = cuentas[0]; // Ejemplo: siempre usamos la primera cuenta

    switch (tipoOperacion) {
        case "deposito":
            cuenta.depositar(monto);
            break;
        case "retiro":
            cuenta.retirar(monto);
            break;
        case "transferencia":
            const cuentaDestino = cuentas.find(c => c.id === idCuentaDestino);
            if (cuentaDestino) {
                cuenta.transferir(monto, cuentaDestino);
            } else {
                console.log("Cuenta destino no encontrada");
            }
            break;
    }

    actualizarListaCuentas();
}

// Función para actualizar la lista de cuentas
function actualizarListaCuentas() {
    const listaCuentas = document.getElementById("cuentas");
    listaCuentas.innerHTML = "";

    cuentas.forEach(cuenta => {
        const li = document.createElement("li");
        li.textContent = Cuenta #${cuenta.id}: ${cuenta.nombreCliente} - Saldo: $${cuenta.saldo};
        listaCuentas.appendChild(li);
});
}

