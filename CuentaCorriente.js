import Cuenta from './Cuenta.js';
// Subclase para Cuenta Corriente
class CuentaCorriente extends Cuenta {
    constructor(id, nombreCliente, saldo = 0) {
        super(id, nombreCliente, saldo);
    }
    transferir(monto, cuentaDestino) {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            cuentaDestino.depositar(monto);
        } else {
            console.log("Fondos insuficientes para transferencia");
        }
    }
    // NUEVO
    calcularInteres(){
        return this.saldo * 0.1;
    }

}
export default CuentaCorriente;