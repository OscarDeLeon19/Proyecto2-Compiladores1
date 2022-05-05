import { Columna } from "./Columna";

export class DBTabla{

        nombre:string;
        fila:number;
        columna:number;
        columnasTabla:Columna[];

        constructor(fila:number, columna:number) {
            this.nombre = "";
            this.fila = fila;
            this.columna = columna;
            this.columnasTabla = [];
        }

        agregarColumna(id:string, valor:any, tipo:any, fila:number, columna:number){
            var nuevaColumna = new Columna(id, valor, tipo, fila, columna);
            this.columnasTabla.push(nuevaColumna);
        }
        
}