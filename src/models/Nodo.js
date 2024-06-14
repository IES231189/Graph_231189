export class Nodo {
    constructor(clave) {
        this.clave = clave;
        this.vecinos = [];
        this.esObstaculo = false; 
    }
}

export default Nodo;
