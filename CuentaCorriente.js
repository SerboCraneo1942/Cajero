import Cuenta from './Cuenta.js';

export default class CuentaCorriente extends Cuenta {
  constructor(id, nombreCliente, saldoInicial = 0, numeroCuenta) {
    super(id, nombreCliente, saldoInicial, numeroCuenta);
    this.sobregiro = 1000; // Límite de sobregiro
  }

  retirar(monto) {
    if (this.saldo + this.sobregiro >= monto) {
      this.saldo -= monto;
      return true;
    }
    return false;
  }
  calcularInteres() {
    if (this.saldo > 0) {
      return this.saldo * this.tasaInteres;
    } else {
      return 0;
    }
  }

  aplicarInteres() {
    const interes = this.calcularInteres();
    this.depositar(interes);
    return interes;
  }
}