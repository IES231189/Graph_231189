// Grafo.js
export class Nodo {
    constructor(clave) {
        this.clave = clave;
        this.vecinos = [];
        this.esObstaculo = false; 
    }
}

export class Grafo {
    constructor() {
        this.nodos = new Map();
    }

    agregarNodo(clave) {
        if (!this.nodos.has(clave)) {
            this.nodos.set(clave, new Nodo(clave));
        }
    }

    agregarArista(origen, destino) {
        if (this.nodos.has(origen) && this.nodos.has(destino)) {
            this.nodos.get(origen).vecinos.push(this.nodos.get(destino));
        }
    }

    dfsCaminoMasCorto(inicio, objetivo) {
        const pila = [{ nodo: this.nodos.get(inicio), camino: [inicio] }];
        const visitados = new Set();

        while (pila.length > 0) {
            const { nodo, camino } = pila.pop();
            visitados.add(nodo.clave);
            if (nodo.clave === objetivo) {
                return camino;
            }

            for (const vecino of nodo.vecinos) {
                if (!visitados.has(vecino.clave) && !vecino.esObstaculo) {
                    pila.push({ nodo: vecino, camino: [...camino, vecino.clave] });
                }
            }
        }
        return null; // No se encontró un camino
    }
}


