import Cuenta from './Cuenta.js';
import CuentaAhorros from './CuentaAhorros.js';
import CuentaCorriente from './CuentaCorriente.js';

let cuentas = [];
let lastAccountNumber = 1000000; // Starting account number

// Load accounts from local storage
function loadAccounts() {
  const storedAccounts = localStorage.getItem('cuentas');
  if (storedAccounts) {
    const parsedAccounts = JSON.parse(storedAccounts);
    cuentas = parsedAccounts.map(account => {
      if (account.type === 'ahorros') {
        return new CuentaAhorros(account.id, account.nombreCliente, account.saldo, account.numeroCuenta);
      } else if (account.type === 'corriente') {
        return new CuentaCorriente(account.id, account.nombreCliente, account.saldo, account.numeroCuenta);
      }
    });
    lastAccountNumber = Math.max(...cuentas.map(account => parseInt(account.numeroCuenta)), lastAccountNumber);
  }
}


// Save accounts to local storage
function saveAccounts() {
  const accountsToSave = cuentas.map(account => ({
    id: account.id,
    nombreCliente: account.nombreCliente,
    saldo: account.saldo,
    type: account instanceof CuentaAhorros ? 'ahorros' : 'corriente',
    numeroCuenta: account.numeroCuenta
  }));
  localStorage.setItem('cuentas', JSON.stringify(accountsToSave));
}

// Generate a unique account number
function generateAccountNumber() {
  lastAccountNumber++;
  return lastAccountNumber.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  loadAccounts();

  const loginForm = document.getElementById('login-form');
  const registrationForm = document.getElementById('registration-form');
  const consultaSaldoForm = document.getElementById('consultaSaldoForm');
  const depositoForm = document.getElementById('depositoForm');
  const retiroForm = document.getElementById('retiroForm');
  const transaccionForm = document.getElementById('transaccionForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistration);
  }

  if (consultaSaldoForm) {
    consultaSaldoForm.addEventListener('submit', handleConsultaSaldo);
  }

  if (depositoForm) {
    depositoForm.addEventListener('submit', handleDeposito);
  }

  if (retiroForm) {
    retiroForm.addEventListener('submit', handleRetiro);
  }

  if (transaccionForm) {
    transaccionForm.addEventListener('submit', handleTransaccion);
  }
});

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'seleccion_cuenta.html';
  } else {
    localStorage.setItem('loginResultado', 'Usuario o contraseña incorrectos');
    window.location.reload();
  }
}

function handleRegistration(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre-cliente').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cedula = document.getElementById('cedula').value;
  const edad = document.getElementById('edad').value;
  const ciudad = document.getElementById('ciudad').value;
  const pais = document.getElementById('pais').value;
  const codigoPostal = document.getElementById('codigo_postal').value;

  const numeroCuenta = generateAccountNumber();

  const newUser = {
    nombre,
    email,
    password,
    cedula,
    edad,
    ciudad,
    pais,
    codigoPostal,
    numeroCuenta
  };

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  localStorage.setItem('currentUser', JSON.stringify(newUser));
  localStorage.setItem('registroResultado', `Registro exitoso. Su número de cuenta es: ${numeroCuenta}.`);
  
  setTimeout(() => {
    window.location.href = 'seleccion_cuenta.html';
}, 100);
}


function handleConsultaSaldo(event) {
  event.preventDefault();
  const numeroCuenta = document.getElementById('cuenta').value;
  const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);

  if (cuenta) {
    localStorage.setItem('consultaSaldoResultado', `El saldo de la cuenta ${numeroCuenta} es: $${cuenta.consultarSaldo()}`);
  } else {
    localStorage.setItem('consultaSaldoResultado', 'Cuenta no encontrada.');
  }
  window.location.reload();
}

function handleDeposito(event) {
  event.preventDefault();
  const numeroCuenta = document.getElementById('cuenta').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);

  if (cuenta) {
    cuenta.depositar(monto);
    saveAccounts();
    localStorage.setItem('depositoResultado', `Depósito realizado. Nuevo saldo: $${cuenta.consultarSaldo()}`);
  } else {
    localStorage.setItem('depositoResultado', 'Cuenta no encontrada.');
  }
  window.location.reload();
}

function handleRetiro(event) {
  event.preventDefault();
  const numeroCuenta = document.getElementById('cuenta').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);

  if (cuenta) {
    if (cuenta.retirar(monto)) {
      saveAccounts();
      localStorage.setItem('retiroResultado', `Retiro realizado. Nuevo saldo: $${cuenta.consultarSaldo()}`);
    } else {
      localStorage.setItem('retiroResultado', 'Fondos insuficientes para realizar el retiro.');
    }
  } else {
    localStorage.setItem('retiroResultado', 'Cuenta no encontrada.');
  }
  window.location.reload();
}

function handleTransaccion(event) {
  event.preventDefault();
  const cuentaOrigenId = document.getElementById('cuentaOrigen').value;
  const cuentaDestinoId = document.getElementById('cuentaDestino').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const cuentaOrigen = cuentas.find(c => c.numeroCuenta === cuentaOrigenId);
  const cuentaDestino = cuentas.find(c => c.numeroCuenta === cuentaDestinoId);

  if (cuentaOrigen && cuentaDestino) {
    if (cuentaOrigen.saldo >= monto) {
      cuentaOrigen.retirar(monto);
      cuentaDestino.depositar(monto);
      saveAccounts();
      localStorage.setItem('transaccionResultado', `Transacción realizada exitosamente. 
        Nuevo saldo de la cuenta origen: $${cuentaOrigen.consultarSaldo()}
        Nuevo saldo de la cuenta destino: $${cuentaDestino.consultarSaldo()}`);
    } else {
      localStorage.setItem('transaccionResultado', 'Fondos insuficientes para realizar la transacción.');
    }
  } else {
    localStorage.setItem('transaccionResultado', 'Una o ambas cuentas no fueron encontradas.');
  }
  window.location.reload();
}