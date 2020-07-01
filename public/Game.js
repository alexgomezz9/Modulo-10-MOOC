/**
 * El propio juego
 */
class Game {
    /**
     * Inicializa un juego
     */
    constructor () {
        this.started = false; // Indica si el juego ha comenzado o no
        this.ended = false; // Indica si el juego ha terminado o no
        this.keyPressed = undefined; // Indica la tecla que está pulsando el usuario
        this.width = 0; // Ancho de la pantalla del juego
        this.height = 0; // Alto de la pantalla del juego
        this.player = undefined; // Instancia del personaje principal del juego
        this.playerShots = []; // Disparos del personaje principal
        this.opponent = undefined; // Instancia del oponente del juego
        this.opponentShots = []; // Disparos del oponente
        this.xDown = null; //  Posición en la que el usuario ha tocado la pantalla
        this.paused = false; // Indica si el juego está pausado
    }

    /**
     * Da comienzo a la partida
     */
    start () {
        if (!this.started) {
            // RequestAnimationFrame(this.update());
            window.addEventListener("keydown", (e) => this.checkKey(e, true));
            window.addEventListener("keyup", (e) => this.checkKey(e, false));
            window.addEventListener("touchstart", (e) => this.handleTouchStart(e, true));
            window.addEventListener("touchmove", (e) => this.handleTouchMove(e, false));
            document.getElementById("pause").addEventListener("click", () => {
                this.pauseOrResume();
            });
            document.getElementById("reset").addEventListener("click", () => {
                this.resetGame();
            });
            this.started = true;
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.player = new Player(this);
            this.timer = setInterval(() => this.update(), 50);
        }
    }

    /**
     * Pausa o continúa el juego
     */
    pauseOrResume() {
        if (this.paused) {
            this.timer = setInterval(() => this.update(), 50);
            document.body.classList.remove('paused');
            this.paused = false;
        } else {
            clearInterval(this.timer);
            document.body.classList.add('paused');
            this.paused = true;
        }
    }
    /**
     * Añade un nuevo disparo al juego, ya sea del oponente o del personaje principal
     * @param character {Character} Personaje que dispara
     */
    shoot (character) {
        const arrayShots = character instanceof Player ? this.playerShots : this.opponentShots;

        arrayShots.push(new Shot(this, character));
        this.keyPressed = undefined;
    }

    /**
     * Elimina un disparo del juego cuando se sale de la pantalla o el juego se acaba
     * @param shot {Shot} Disparo que se quiere eliminar
     */
    removeShot (shot) {
        const shotsArray = shot.type === "PLAYER" ? this.playerShots : this.opponentShots,
            index = shotsArray.indexOf(shot);

        if (index > -1) {
            shotsArray.splice(index, 1);
        }
    }

    /**
     * Elimina al oponente del juego
     */
    removeOpponent () {
        if (this.opponent) {
            document.body.removeChild(this.opponent.image);
        }
        this.opponent = new Opponent(this);
    }

    /**
     * Comprueba la tecla que está pulsando el usuario
     * @param event {Event} Evento de tecla levantada/pulsada
     * @param isKeyDown {Boolean} Indica si la tecla está pulsada (true) o no (false)
     */
    checkKey (event, isKeyDown) {
        if (!isKeyDown) {
            this.keyPressed = undefined;
        } else {
            switch (event.keyCode) {
            case 37: // Flecha izquierda
                this.keyPressed = KEY_LEFT;
                break;
            case 32: // Barra espaciadora
                this.keyPressed = KEY_SHOOT;
                break;
            case 39: // Flecha derecha
                this.keyPressed = KEY_RIGHT;
                break;
            case 27: case 81: // Tecla ESC o Q
                this.pauseOrResume();
            }
        }
    }

    /**
     * Comprueba la posición de la pantalla que está tocando el usuario
     * @param evt {Event} Evento de tocar la pantalla
     * @returns {*} Posición de la pantalla que está tocando el usuario
     */
    getTouches (evt) {
        return evt.touches || evt.originalEvent.touches;
    }

    /**
     * Maneja el evento de tocar sobre la pantalla
     * @param evt {Event} Evento de tocar la pantalla
     */
    handleTouchStart (evt) {
        const firstTouch = this.getTouches(evt)[0];

        this.xDown = firstTouch.clientX;
        this.keyPressed = KEY_SHOOT;
    }

    /**
     * Maneja el evento de arrastrar el dedo sobre la pantalla
     * @param evt {Event} Evento de arrastrar el dedo sobre la pantalla
     */
    handleTouchMove (evt) {
        if (!this.xDown) {
            return;
        }
        const xUp = evt.touches[0].clientX,
            xDiff = this.xDown - xUp;

        if (xDiff > MIN_TOUCHMOVE) { /* Left swipe */
            this.keyPressed = KEY_LEFT;
        } else if (xDiff < -MIN_TOUCHMOVE) { /* Right swipe */
            this.keyPressed = KEY_RIGHT;
        } else {
            this.keyPressed = KEY_SHOOT;
        }
        this.xDown = null; /* Reset values */
    }

    /**
     * Comrpueba si el personaje principal y el oponente se han chocado entre sí o con los disparos haciendo uso del método hasCollision
     */
    checkCollisions () {
        let impact = false;

        for (let i = 0; i < this.opponentShots.length; i++) {
            impact = impact || this.hasCollision(this.player, this.opponentShots[i]);
        }
        if (impact || this.hasCollision(this.player, this.opponent)) {
            this.player.collide();
        }
        let killed = false;

        for (let i = 0; i < this.playerShots.length; i++) {
            killed = killed || this.hasCollision(this.opponent, this.playerShots[i]);
        }
        if (killed) {
            this.opponent.collide();
        }
    }

    /**
     * Comprueba si dos elementos del juego se están chocando
     * @param item1 {Entity} Elemento del juego 1
     * @param item2 {Entity} Elemento del juego 2
     * @returns {boolean} Devuelve true si se están chocando y false si no.
     */
    hasCollision (item1, item2) {
        if (item2 === undefined) {
            return false; // When opponent is undefined, there is no collision
        }
        const b1 = item1.y + item1.height,
            r1 = item1.x + item1.width,
            b2 = item2.y + item2.height,
            r2 = item2.x + item2.width;

        if (b1 < item2.y || item1.y > b2 || r1 < item2.x || item1.x > r2) {
            return false;
        }

        return true;
    }

    /**
     * Termina el juego
     */
    endGame () {
        this.ended = true;
        let gameOver = new Entity(this, this.width / 2, "auto", this.width / 4, this.height / 4, 0, GAME_OVER_PICTURE)
        gameOver.render();
    }

    /**
     * resetea el juego
     */
     resetGame () {
       document.location.reload();
     }

    /**
     * Actualiza los elementos del juego
     */
    update () {
        if (!this.ended) {
            this.player.update();
            if (this.opponent === undefined) {
                this.opponent = new Opponent(this);
            }
            this.opponent.update();
            this.playerShots.forEach((shot) => {
                shot.update();
            });
            this.opponentShots.forEach((shot) => {
                shot.update();
            });
            this.checkCollisions();
            this.render();
        }
    }

    /**
     * Muestra todos los elementos del juego en la pantalla
     */
    render () {
        this.player.render();
        if (this.opponent !== undefined) {
            this.opponent.render();
        }
        this.playerShots.forEach((shot) => {
            shot.render();
        });
        this.opponentShots.forEach((shot) => {
            shot.render();
        });
    }
}
