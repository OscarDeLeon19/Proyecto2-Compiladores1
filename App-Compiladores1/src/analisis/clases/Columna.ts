
export class Columna{

    id:string;
    valor:any;
    tipo:any;
    fila:number;
    columna:number;

    /**
     * Clase que obtiene las columnas de una tabla para graficar.
     * @param id 
     * @param valor 
     * @param tipo 
     * @param fila 
     * @param columna 
     */
    constructor(id:string, valor:any, tipo:any, fila:number, columna:number){
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}