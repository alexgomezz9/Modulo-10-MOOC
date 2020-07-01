<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="150" style="float: right;" src="https://miriadax.net/miriadax-theme/images/custom/logo_miriadax_new.svg">

<br/><br/><br/>


# Módulo 5: Tipos y clases en JS - Entrega P2P: Juego de disparos

Versión: 24 de Mayo de 2020

## Objetivo

Practicar con clases, Booleans, Strings y con el manejo de eventos.

## Descripción de la práctica

En esta entrega vamos a desarrollar un juego completo usando HTML, CSS y JavaScript. El juego consiste en un juego clásico de disparos, en el que manejaremos a nuestro personaje (cuadrado) utilizando las flechas del teclado o la pantalla táctil. El objetivo del juego es disparar a una serie de formas que aparecerán en la pantalla para convertirlas en estrellas, a la vez que esquivamos sus disparos. Para comenzar el desarrollo partimos de la versión básica del juego cuyo código proporcionamos.

<p align="center">
  <img width="187" height="264" style="border: 1px solid grey;" src="https://raw.githubusercontent.com/ging-moocs/MOOC_html_mod5-juego_entrega/master/assets/screenshot.png">
</p>


## Descargar el código del proyecto

El proyecto debe clonarse en el ordenador desde el que se está trabajando:

```
$ git clone https://github.com/ging-moocs/MOOC_html_mod5-juego_entrega
```
A continuación se debe acceder al directorio de trabajo.

```
$ cd MOOC_html_mod5-juego_entrega
```
## Elementos del juego

En este código, para modelar cada uno de los elementos del juego empleamos una clase JavaScript con sus métodos y atributos, los cuales se describen a continuación:

-  **Entity:** Cada uno de los elementos que se pintan en el juego
-  **Character**: Cada uno de los personajes del juego, es decir, aquellos elementos que tienen "vida". Hereda de la clase _Entity_
-  **Player**: Personaje principal del juego. Hereda de la clase _Character_
-  **Opponent**: Forma a la que tenemos que convertir en estrella. Hereda de la clase _Character_
-  **Shot**: Disparo de un _Character_. Hereda de la clase _Entity_
-  **Game**: El propio juego

En el propio código están documentados todos los atributos y métodos de estas clases con detalle. 
El siguiente diagrama muestra la jerarquía de herencia de clases:

<p align="center">
  <img width="495" height="591" src="https://raw.githubusercontent.com/ging-moocs/MOOC_html_mod5-juego_entrega/master/assets/clases.png">
</p>

## Comienzo y actualización del juego

En el fichero ``index.html`` se importan todos los scripts necesarios para el funcionamiento del juego, entre los que figuran todas las clases necesarias y el fichero ``main.js``. En este fichero se definen una serie de constantes necesarias para el juego, se crea una instancia de la clase _Game_ y se llama a su método _start_ para comenzar la partida.

El método _start_ crea los personajes, pinta el juego según el tamaño de la pantalla e inicializa los escuchadores de eventos (los cuales veremos en el siguiente apartado). Adicionalmente, en este método se da comienzo a un temporizador que llama a la función _update_ cada 50 ms para actualizar y pintar el estado del juego actualizado según las acciones del usuario, de los movimientos del oponente y de la posición de los disparos. Este intervalo de tiempo es equivalente a 20 marcos por segundo, es decir, estamos cambiando lo que muestra el juego 20 veces cada segundo, más que suficiente para crear la ilusión de movimiento.

## Manejo de eventos

Para poder manejar el personaje principal del juego con las flechas del teclado o con la pantalla táctil debemos hacer uso de los eventos que nos proporciona el navegador para este propósito. En el método _start_ de la clase _Game_, inicializamos los escuchadores de eventos necesarios:

- **keydown** : Se llama cuando el usuario pulsa una tecla. Guarda la tecla pulsada en el atributo _keyPressed_ de _Game_.
- **keyup** : Se llama cuando el usuario deja de pulsar una tecla. Elimina el contenido del atributo _keyPressed_ de _Game._
- **touchstart** : Se llama cuando el usuario toca la pantalla. Guarda la posición horizontal (x) donde el usuario ha tocado en el atributo _xDown_ de _Game_.
- **touchmove** : Se llama cuando el usuario arrastra el dedo por la pantalla. Elimina el contenido del atributo _xDown_ de _Game_.

Como hemos visto antes, cada 50ms se llama al método _update_ de _Game_. Este método comprueba el valor de _xDown_ y _keyPressed_ para actualizar la posición del personaje principal en función de las acciones del usuario.

## Tareas

Se pide modificar el código proporcionado para lograr tres funcionalidades nuevas:

- Registro de los **puntos conseguidos** por el usuario. Cada vez que convierta a un oponente en estrella debe incrementar el número de puntos en una unidad.
- El personaje principal debe contar con **tres vidas**. Si es alcanzado por un disparo, en vez de perder, el número de vidas disminuirá en una unidad, otorgándole una nueva oportunidad para ganar. Si el número de vidas llega a cero, se termina el juego.
- Si el jugador consigue disparar al oponente (triángulo) y convertirlo en estrella, se le presentará una **oponente final** más poderoso (pentágono). Éste se moverá al **doble de velocidad** que el triángulo.

Para implementar las tres funcionalidades debes seguir los siguientes pasos:

1. Añadir un atributo nuevo _score_ a la clase _Game_ que refleje la puntuación (inicialmente 0).
2. Modificar el código del método _collide_ de la clase _Opponent_ para que sume un punto a _score_ cada vez que se dispara a un triángulo.
3. Añadir un atributo nuevo _lives_ a la clase _Player_ que valga 3 inicialmente. Puedes definir el nº de vidas inicial en una constante en main.js.
4. Modificar el código del método _collide_ de la clase _Player_ para que reste una vida cada vez que al jugador le alcance un disparo mientras esté vivo.
	- Si al jugador le quedan vidas, debe morirse durante dos segundos (llamando al método `collide` de su superclase _Character_) y renacer al cabo de ese tiempo. Para ello, el atributo `src` de `this.image` debe recuperar su valor original (el de `this.myImage` y poner a `false` el atributo `this.dead`.
	- Si al jugador no le quedan vidas, debe morirse definitivamente (llamando al método `collide` de su superclase _Character_) y terminar el juego llamando al método `endGame` del juego.
5. Añadir el código necesario para pintar la puntuación y las vidas en la pantalla del juego en todo momento. Para ello crea una lista (etiqueta ul de HTML) con dos elementos (etiqueta li). El primero, con id &quot;scoreli&quot;, mostrará la puntuación con el siguiente formato:  ``Score: x``, siendo ``x`` el valor del atributo _score_ del juego. El segundo, con id ``livesli``, mostrará el nº de vidas con el siguiente formato: ``Lives: y``, siendo ``y`` el valor del atributo _lives_ del jugador. Para actualizar el HTML con los valores de puntuación y vidas utiliza el método `innerHTML` del elemento HTML correspondiente (es importante no utilizar el método `innerText` puesto que es incompatible con la herramienta de autocorreccióngi).
6. Crear una clase nueva llamada _Boss_ en un nuevo fichero llamado ``Boss.js`` (no te olvides de importarlo en `index.html`). Esta clase debe heredar los métodos y atributos necesarios de la clase _Opponent_ sobreescribiendo aquellos que sean necesarios para lograr la funcionalidad requerida. Para representar al jefe final puedes usar las imágenes ``jefe.png`` y ``jefe_muerto.png`` de la carpeta assets.
7. Modificar el código necesario en el método `removeOpponent` de _Game_ para que cuando el jugador consiga matar al triángulo, le aparezca el desafío final. Es decir, el atributo opponent de la instancia de _Game_ debe contener un objeto `_Boss_`cuando el jugador derrote al oponente inicial. 
8. Modificar el código de la función ``endGame`` (no modificar la cabecera) para que, si el jugador consigue derrotar al jefe final, es decir, gane la partida con mas de 0 vidas, aparezca la imagen ``you_win.png`` de la carpeta assets, en vez de ``game_over.png``.


## Prueba de la práctica 

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado. Para utilizar esta herramienta debes tener node.js (y npm) ([https://nodejs.org/es/](https://nodejs.org/es/)) y Git instalados. 

Para instalar y hacer uso de la [herramienta de autocorrección](https://www.npmjs.com/package/moocauto) en el ordenador local, ejecuta los siguientes comandos en el directorio del proyecto:

```
$ npm install -g moocauto     ## Instala el programa de test
$ moocauto                    ## Pasa los tests al fichero a entregar
............................  ## en el directorio de trabajo
... (resultado de los tests)
```
También se puede instalar como paquete local, en el caso de que no se dispongas de permisos en el ordenador desde el que estás trabajando:
```
$ npm install moocauto         ## Instala el programa de test
$ npx moocauto                 ## Pasa los tests al fichero a entregar
............................   ## en el directorio de trabajo
... (resultado de los tests)
```


Se puede pasar la herramienta de autocorrección tantas veces como se desee.

## Entrega de la práctica

El alumno debe subir un fichero comprimido ZIP incluyendo todos los ficheros de la práctica.

## Evaluación de la práctica

La evaluación de la práctica se realizará mediante revisión por pares (P2P). Cada alumno tendrá que revisar la práctica de 3 de sus compañeros y otros 3 revisarán la suya. Se puede utilizar la herramienta de autocorrección (moocauto) como ayuda para revisar la práctica de los compañeros. 

El objetivo de este curso es sacar el máximo provecho al trabajo que están dedicando, por lo que les recomendamos que utilicen la evaluación para ayudar a sus compañeros enviando comentarios sobre la corrección del código, su claridad, legibilidad, estructuración y documentación. 

Dado que es un curso para principiantes, ante la duda les pedimos que sean benevolentes con sus compañeros, porque muchos participantes están empezando y los primeros pasos siempre son difíciles.

**OJO! Una vez enviada la evaluación, está no se puede cambiar.** Piensen bien su evaluación antes de enviarla.

**RÚBRICA**: Se puntuará el ejercicio a corregir sumando el % indicado a la nota total si la parte indicada es correcta:

* **25%:** Muestra correctamente las vidas del usuario
* **25%:** Muestra correctamente la puntuación del usuario
* **50%:** La funcionalidad del oponente final está implementada correctamente
