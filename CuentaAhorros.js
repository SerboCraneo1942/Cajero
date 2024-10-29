import Cuenta from './Cuenta.js';

export default class CuentaAhorros extends Cuenta {
  constructor(id, nombreCliente, saldoInicial = 0, numeroCuenta) {
    super(id, nombreCliente, saldoInicial, numeroCuenta);
    this.tasaInteres = 0.05; // 5% de interés anual
  }

  calcularInteres() {
    return this.saldo * this.tasaInteres;
  }

  aplicarInteres() {
    const interes = this.calcularInteres();
    this.depositar(interes);
    return interes;
  }
}