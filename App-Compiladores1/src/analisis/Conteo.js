

class Conteo{

    constructor(){       
        this.conteoSuma = 1;
        this.conteoResta = 1;
        this.conteoMultiplicacion = 1;
        this.conteoDivision = 1;
        this.conteoModulo = 1;
        this.conteoPotencia = 1;
    }

    retornarSuma(){
        return this.conteoSuma;
    }

    aumentarSuma(){
        this.conteoSuma++;
    }
   
    aumentarResta(){
        this.conteoResta++;
    }
  
    aumentarMultiplicacion(){
        this.conteoMultiplicacion++;
    }
   
    aumentarDivision(){
        this.conteoDivision++;
    }
 
    aumentarModulo(){
        this.conteoModulo++;
    }

    aumentarPotencia(){
        this.conteoPotencia++;
    }
}

module.exports = Conteo;