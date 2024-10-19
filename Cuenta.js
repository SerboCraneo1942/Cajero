// Clase base para una Cuenta Bancaria
class Cuenta {
    constructor(id, nombreCliente, saldo = 0) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.saldo = saldo;
    }

    depositar(monto) {
        this.saldo += monto;
    }

    retirar(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
        } else {
            console.log("Fondos insuficientes");
        }
    }
    consultarSaldo(){
        return this.saldo;
    }
}
export default Cuenta;