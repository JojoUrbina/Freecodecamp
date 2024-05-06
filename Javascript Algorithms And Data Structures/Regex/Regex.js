//.replace(/[,.\s]/g, '') remplaza todo lo que esta dentro del array por nada 
/*/[ ... ]/: Esto define un conjunto de caracteres entre corchetes que queremos que coincida.
,: Este es el primer carácter dentro del conjunto de caracteres y representa la coma. Queremos eliminar todas las comas de la cadena.
.: Este es el segundo carácter dentro del conjunto de caracteres y representa el punto. Queremos eliminar todos los puntos de la cadena.
\s: Esto representa cualquier carácter de espacio en blanco, como espacios, tabulaciones o saltos de línea. Queremos eliminar todos estos caracteres de la cadena.
/: Esto cierra el conjunto de caracteres.
g: Esta es una bandera que indica que queremos que la búsqueda coincida con todas las instancias de los caracteres especificados en la cadena, no solo la primera.*/