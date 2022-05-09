

class Conteo{

    constructor(){     
        this.conteoNodo = 0;
        this.encabezado = "";
        this.uniones = "";
        this.expresiones = 1;
    }

    sumarExpresion(){
        this.expresiones++;
    }

    sumarConteo(){
        this.conteoNodo++;
    }

    agregarEncabezado(texto){
        this.encabezado = this.encabezado + texto + "\n";
    }

}

module.exports = Conteo;