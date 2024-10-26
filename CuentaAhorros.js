import Cuenta from './Cuenta.js';
// Subclase para Cuenta de Ahorros
class CuentaAhorros extends Cuenta {
    constructor(id, nombreCliente, saldo = 0) {
        super(id, nombreCliente, saldo);
    }
    calcularInteres(){
        return this.saldo * 0.1;
    }

    //NUEVO 
    transferir(monto, cuentaDestino) {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            cuentaDestino.depositar(monto);
        } else {
            console.log("Fondos insuficientes para transferencia");
        }
    }
}
export default CuentaAhorros;