import { Columna } from "./Columna";

export class DBTabla{

        nombre:string;
        fila:number;
        columna:number;
        columnasTabla:Columna[];
        /**
         * Clase que guarda los datos de la tabla que se va a graficar
         * @param fila 
         * @param columna 
         */
        constructor(fila:number, columna:number) {
            this.nombre = "";
            this.fila = fila;
            this.columna = columna;
            this.columnasTabla = [];
        }
        /**
         * Agrega los valores a una nueva columna y la guarda en la lista de columnas.
         * @param id 
         * @param valor 
         * @param tipo 
         * @param fila 
         * @param columna 
         */
        agregarColumna(id:string, valor:any, tipo:any, fila:number, columna:number){
            var nuevaColumna = new Columna(id, valor, tipo, fila, columna);
            this.columnasTabla.push(nuevaColumna);
        }
        
}