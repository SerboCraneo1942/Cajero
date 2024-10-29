export default class Cuenta {
    constructor(id, nombreCliente, saldoInicial = 0, numeroCuenta) {
      this.id = id;
      this.nombreCliente = nombreCliente;
      this.saldo = saldoInicial;
      this.numeroCuenta = numeroCuenta;
    }
  
    depositar(monto) {
      this.saldo += monto;
    }
  
    retirar(monto) {
      if (this.saldo >= monto) {
        this.saldo -= monto;
        return true;
      }
      return false;
    }
  
    consultarSaldo() {
      return this.saldo;
    }
  }