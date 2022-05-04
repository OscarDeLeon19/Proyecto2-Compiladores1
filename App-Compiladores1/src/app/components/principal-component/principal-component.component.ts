import { Component, OnInit } from '@angular/core';
import {Error} from "../../../analisis/clases/Error";


declare var require:any;
const gramatica = require("../../../analisis/gramatica.js");
const Salida = require("../../../analisis/clases/Salida.js")

//import { Salida } from 'src/analisis/clases/Salida';
//import { Error } from 'src/analisis/clases/Error';
@Component({
  selector: 'app-principal-component',
  templateUrl: './principal-component.component.html',
  styleUrls: ['./principal-component.component.css']
})
export class PrincipalComponentComponent implements OnInit {

  texto:string = "";
  resultado:string = "";
  constructor() { }

  ngOnInit(): void {
    
  }

  compilarProyecto(){
    
    var outPUT = new Salida();
    outPUT = gramatica.parse(this.texto);
    var errores:Error[] = outPUT.getTablaErrores();
    
    this.resultado = outPUT.getSalida();
    
    if(errores.length > 0){
      for(var i = 0; i < errores.length; i++){
        this.resultado += "TIPO: " + errores[i].tipo + " MENSAJE: " + errores[i].mensaje + " Fila: " +errores[i].fila + "\n";
      }
    }

  }

  limpiarConsola(){
    this.resultado = "";
  }

}
