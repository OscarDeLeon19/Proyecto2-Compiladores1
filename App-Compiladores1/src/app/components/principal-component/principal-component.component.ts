

import { Component, OnInit } from '@angular/core';

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
    this.resultado = outPUT.getSalida();
    this.resultado += outPUT.getTablaErrores();
  }

  limpiarConsola(){
    this.resultado = "";
  }

}
