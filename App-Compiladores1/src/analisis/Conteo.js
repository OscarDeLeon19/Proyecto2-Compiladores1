

class Conteo{

    constructor(){     
        this.conteoNodo = 0;
        this.encabezado = "";
        this.uniones = "";
    }

    sumarConteo(){
        this.conteoNodo++;
    }

    agregarEncabezado(texto){
        this.encabezado = this.encabezado + texto + "\n";
    }

}

module.exports = Conteo;