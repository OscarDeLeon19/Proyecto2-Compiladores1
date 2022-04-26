/**
 * Gramatica Proyecto 2 | Compiladores 1
 */

%{
	const Tipo = require('./clases/Tipo');
	const Tabla = require('./clases/Tabla');
	const Salida = require("./clases/Salida");
	const Valor = require('./clases/Valor');
	var tabla = new Tabla(null);
	var salida = new Salida();
%}

// Parte Lexica
%lex

%%

/* Espacios en blanco */
[ ]+				{}
[	]            	return 'TAB';
\n                 	return 'SALTO';
[\r]+				{}

"!!".*										// Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"Importar"			return 'IMPORTAR';
"Incerteza"			return 'INCERTEZA';
"Double"			return 'DOUBLE';
"Boolean"			return 'BOOLEAN';
"String"			return 'STRING';
"Int"				return 'INT';
"Char"				return 'CHAR';
"Void"			    return 'VOID';
"true"				return 'TRUE';
"false"				return 'FALSE';
"Retorno"			return 'RETORNO';
"Principal"			return 'PRINCIPAL';
"Si"				return 'SI';
"Sino"				return 'SINO';
"Para"				return 'PARA';
"Mientras"			return 'MIENTRAS';
"Detener"			return 'DETENER';
"Continuar"			return 'CONTINUAR';
"Mostrar"			return 'MOSTRAR';
"DibujarAST"		return 'DIBUJARAST';
"DibujarEXP"		return 'DIBUJAREXP';
"DibujarTS"			return 'DIBUJARTS';

","					return 'COMA';
":"					return 'DOSPTS';
";"					return 'PTCOMA';
"{"					return 'LLAVIZQ';
"}"					return 'LLAVDER';
"("					return 'PARIZQ';
")"					return 'PARDER';




"++"				return 'INCREMENTO';
"--"                return 'DECREMENTO';
"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';
"%"					return 'MODULO';
"^"					return 'POTENCIA';

"<="				return 'MENOR_IGUAL';
">="				return 'MAYOR_IGUAL';
"=="				return 'DOBLE_IGUAL';
"!="				return 'DIFERENTE';
"<"					return 'MENOR';
">"					return 'MAYOR';
"="					return 'IGUAL';
"~"					return 'INCERT';

"&&"				return 'AND'
"||"				return 'OR';
"!&"				return 'XOR';
"!"					return 'NOT';

\'([^']|"\\n"|"\\r"|"\\t")\'             return 'CARACTER';
[0-9]+"."[0-9]+\b          			     return 'DECIMAL';
[0-9]+\b                   			     return 'ENTERO';
([\"]("\\\""|[^"])*[^\\][\"])|[\"][\"]   return 'CADENA';
([a-zA-Z"_"])[a-z0-9A-Z"_""ñ""Ñ"]*       return 'ID';


<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


%{

%}


/* Asociación de operadores y precedencia */

%right IGUAL
%left XOR
%left OR
%left AND
%left DOBLE_IGUAL, DIFERENTE
%left MAYOR, MENOR, MAYOR_IGUAL, MENOR_IGUAL, INCERT
%left MAS, MENOS
%left POR, DIVIDIDO, MODULO
%right POTENCIA 
%right NOT

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF 
    | EOF
;

instrucciones
	: instrucciones instruccion SALTO
	| instruccion SALTO
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (this._$.first_line) + ', en la columna: ' + this._$.first_column)}
;

instruccion
	: declaracion
	| funcion
	| 
;

dibujar_EXP
	: DIBUJAREXP PARIZQ expresion PARDER
;

dibujar_TS
	: DIBUJARTS PARIZQ PARDER
;

dibujar_AST
	: DIBUJARAST PARIZQ ID PARDER
;

mostrar
	: MOSTRAR PARIZQ expresion PARDER
;

mientras 
	: MIENTRAS PARIZQ expresion PARDER DOSPTS SALTO instrucciones_para
;

para
	: PARA PARIZQ declaracion PTCOMA expresion PTCOMA aumentar PARDER DOSPTS SALTO instrucciones_para
;

aumentar
	: INCREMENTO
	| DECREMENTO
;

instrucciones_para
	: instrucciones_para TAB TAB instruccion_para SALTO
	| TAB TAB instruccion_para SALTO
	;

instruccion_para
	:  declaracion
	|  asignacion
	|  llamada
	|  DETENER
	|  CONTINUAR
	|  mostrar
	|  dibujar_AST	
	| dibujar_EXP
	| dibujar_TS
	|
;


si
	: SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if TAB SINO DOSPTS SALTO instrucciones_if
	| SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if
;

instrucciones_if
	: instrucciones_if TAB TAB instruccion_if SALTO
	| TAB TAB instruccion_if SALTO
	;

instruccion_if
	:  declaracion
	|  asignacion
	|  llamada
	|  mostrar	
	|  dibujar_AST
	|  dibujar_EXP
	|  dibujar_TS
	|
;

instrucciones_funcion
	: instrucciones_funcion TAB instruccion_funcion SALTO
	| TAB instruccion_funcion SALTO
;

instruccion_funcion
	:  declaracion
	|  asignacion
	|  llamada
	|  mostrar
	|  dibujar_AST
	| dibujar_EXP
	| dibujar_TS
	| si	
	| para	
	| mientras	
	|
;

funcion
	: tipo ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion TAB retorno_metodo SALTO
	| VOID ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion retorno SALTO
	| tipo ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion TAB retorno_metodo SALTO
	| VOID ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion retorno SALTO
	| VOID PRINCIPAL PARIZQ PARDER DOSPTS SALTO instruccion_funcion
;

retorno_metodo
	: RETORNO expresion
	| RETORNO
;

retorno
	:TAB RETORNO
	| 
;

llamada
	: ID PARIZQ lista_valores PARDER
	| ID PARIZQ PARDER
;

lista_valores
	: lista_valores COMA expresion
	| expresion
;

parametros
	: parametros COMA tipo ID
	| tipo ID
;

asignacion 
	: ID IGUAL expresion
;

declaracion
	:	tipo ID IGUAL expresion
	| 	tipo ID 
;

tipo
     : INT {$$ = Tipo.ENTERO;}
     | DOUBLE {$$ = Tipo.DECIMAL;}
     | BOOLEAN {$$ = Tipo.BOOLEAN;}
     | CHAR {$$ = Tipo.CARACTER;}
     | STRING {$$ = Tipo.CADENA;}
;

// Expresiones logicas

expresion
    : expresion OR expresion 
	| expresion_1
;

expresion_1
    : expresion_1 AND expresion_1 
    | expresion_relacional
;

// Expresiones Relacionales
expresion_relacional
	: expresion_relacional DOBLE_IGUAL  expresion_relacional
    | expresion_relacional DIFERENTE expresion_relacional
    | expresion_relacional_1 {$$ = $1;}
;

expresion_relacional_1
     : expresion_relacional_1 MAYOR expresion_relacional_1
     | expresion_relacional_1 MENOR expresion_relacional_1 
     | expresion_relacional_1 MAYOR_IGUAL expresion_relacional_1 
     | expresion_relacional_1 MENOR_IGUAL expresion_relacional_1 
	 | expresion_relacional_1 INCERT expresion_relacional_1 	
     | expresion_aritmetica {$$ = $1;}
;
//-----------------------------------------------------------------------------------------------------------
//producciones para operaciones aritmeticas
expresion_aritmetica 
	: expresion_aritmetica MAS expresion_aritmetica 
    | expresion_aritmetica MENOS expresion_aritmetica 
    | expresion_aritmetica_1 {$$ = $1;}
;

expresion_aritmetica_1 
	 : expresion_aritmetica_1 POR expresion_aritmetica_1
     | expresion_aritmetica_1 DIVIDIDO expresion_aritmetica_1 
     | expresion_aritmetica_1 MODULO expresion_aritmetica_1 
     | expresion_aritmetica_1 POTENCIA expresion_aritmetica_1
     | expresion_not {$$ = $1;}
;

expresion_not
	: NOT expresion_not
    | valores {$$ = $1;}
;

valores
     : DECIMAL {$$ = new Valor(Number($1),Tipo.DECIMAL,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | ENTERO {$$ = new Valor(Number($1),Tipo.ENTERO,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | MENOS DECIMAL {$$ = new Valor(-1*Number($2),Tipo.DECIMAL,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | MENOS ENTERO {$$ = new Valor(-1*Number($2),Tipo.ENTERO,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | PARIZQ expresion PARDER {$$ = $2;}
     | CADENA {$$ = new Valor($1,Tipo.CADENA,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | CARACTER {$$ = new Valor($1,Tipo.CARACTER,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | TRUE {$$ = new Valor(true,Tipo.BOOLEAN,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | FALSE {$$ = new Valor(false,Tipo.BOOLEAN,Tipo.VALOR,this._$.first_line,this._$.first_column);}
     | ID {$$ = new Valor($1,Tipo.ID,Tipo.VALOR,this._$.first_line,this._$.first_column);}
	 | llamada
;  
