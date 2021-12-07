<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="150" style="float: right;" src="https://miriadax.net/miriadax-theme/images/custom/logo_miriadax_new.svg">

<br/><br/><br/>


# Módulo 10: PWAs: Progressive Web Applications - Entrega P2P: Creando nuestra PWA

Versión: 4 de Noviembre de 2021

## Objetivo

Crear una Progressive Web Application.

## Descripción de la práctica

En esta entrega vamos a crear una Progressive Web Application (PWA) a partir de una aplicación web.
La aplicación web elegida es un juego de disparos, en el que manejaremos a nuestro personaje (cuadrado) utilizando las flechas del teclado o la pantalla táctil. Este juego corresponde al esqueleto de la entrega del módulo 5 del MOOC cuyo código proporcionamos en este repositorio. El alumno es libre de utilizar su solución a dicho módulo para tener así un juego más completo o incluso su solución al módulo 9 teniendo así un juego con una interacción mucho más rica. La creación de la PWA será similar en todos los casos.

<p align="center">
  <img width="187" height="264" style="border: 1px solid grey;" src="https://raw.githubusercontent.com/ging-moocs/MOOC_html_mod5-juego_entrega/master/assets/screenshot.png">
</p>


## Descargar el código del proyecto

El proyecto debe descargarse o clonarse en el ordenador desde el que se está trabajando. Para ello podemos descargar el paquete zip con el código desde el desplegable verde que está en la parte superior de la página de GitHub y que indica "Code" y ahí seleccionar la opción "Download ZIP". Alternativamente se puede usar GIT si se conoce para clonar el proyecto, el comando sería el siguiente: 
```
$ git clone https://github.com/ging-moocs/MOOC_html_mod10-PWA_entrega
```
A continuación se debe acceder al directorio de trabajo.

```
$ cd MOOC_html_mod10-PWA_entrega
```

## Tareas

Se pide modificar el código proporcionado para transformarlo en una PWA:

Para ello debes seguir los siguientes pasos:

1. Añadir un manifest.
2. Añadir un Service Worker.
3. Manejar las caches.
4. Añadir la opción de instalar con un botón adicional.
5. Desplegar en glitch.


## Prueba de la práctica

Para ayudar al desarrollo es muy recomendable instalar la extensión de Chrome LightHouse (https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en).

Con ella podremos ir desarrollando nuestra PWA paso a paso y podremos ir viendo las características que nos faltan.
Se recomienda utilizar Glitch (https://glitch.com/) para el despliegue final de la PWA, de este modo tendremos una URL para nuestra PWA y la podremos visualizar en diferentes dispositivos sin problema (las URLs de glitch son similares a https://amplified-dour-freighter.glitch.me/, recordar que Glitch "duerme" las aplicaciones para gastar menos y pueden tardar un poco en arrancar).

Cosas que debe cumplir nuestro ejercicio para estar completo. Lista de comprobación:

* **25%:** Tiene un manifest que describe la PWA
* **50%:** Registra un Service Worker y utiliza las caches
* **25%:** Muestra el botón instalar la PWA que permite su instalación como aplicación en el dispositivo

Se puede utilizar LightHouse como ayuda para revisar la práctica (alternativamente también se puede utilizar PWABuilder https://www.pwabuilder.com/).


## Entrega de la práctica

El alumno debe entregar su URL de Glitch o GitHub en la plataforma.



