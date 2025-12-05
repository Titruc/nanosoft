const game = document.getElementById("game");
        const messageBox = document.getElementById("message");
        const size = 5; 
        const sound = new Audio('../media/songSnake.mp3');
        let snake = [{ x: 50, y: 50 }]; 
        let dx = size; // Départ vers la droite
        let dy = 0;
        const speed = 150; 
        let lastTime = 0;
        let directionLock = false; 
        let score = 0;
        let isGameOver = false; // Variable pour savoir si le jeu est fini
        let pomme = createPomme();

        // --- FONCTIONS ---

        function createPomme() {
            let x, y, collision;
            const maxCases = 100 / size; 

            do {
                collision = false;
                x = Math.floor(Math.random() * maxCases) * size;
                y = Math.floor(Math.random() * maxCases) * size;

                for (let part of snake) {
                    if (part.x === x && part.y === y) {
                        collision = true;
                        break;
                    }
                }
            } while (collision);

            const div = document.createElement("div");
            div.className = "pomme";
            div.style.left = x + "%";
            div.style.top = y + "%";
            game.appendChild(div);

            return { x, y, el: div };
        }

        // Gestion du Game Over
        function triggerGameOver() {
            isGameOver = true;
            messageBox.innerText = "Delete systeme 32"; // Le message demandé
            messageBox.style.color = "red";
        }

        document.addEventListener("keydown", (e) => {
            if (isGameOver) {
                // Si le jeu est fini, n'importe quelle touche relance la page
                location.reload(); 
                return;
            }

            if (directionLock) return;
            
            const goingUp = dy === -size;
            const goingDown = dy === size;
            const goingLeft = dx === -size;
            const goingRight = dx === size;

            if (e.key === "ArrowUp" && !goingDown)    { dx = 0; dy = -size; directionLock = true; }
            if (e.key === "ArrowDown" && !goingUp)    { dx = 0; dy = size;  directionLock = true; }
            if (e.key === "ArrowLeft" && !goingRight) { dx = -size; dy = 0; directionLock = true; }
            if (e.key === "ArrowRight" && !goingLeft) { dx = size; dy = 0;  directionLock = true; }
        });

        function AfficheSerpent() {
            document.querySelectorAll('.snake').forEach(e => e.remove());
            const frag = document.createDocumentFragment();

            for (let i = 0; i < snake.length; i++) {
                const part = snake[i];
                const div = document.createElement('div');
                div.className = 'snake';
                div.style.left = part.x + '%';
                div.style.top = part.y + '%';
                frag.appendChild(div);
            }
            game.appendChild(frag);
        }
        sound.play();
        function update(timestamp) {
            // Si le jeu est fini, on arrête la boucle d'animation
            if (isGameOver) return; 

            if (!lastTime) lastTime = timestamp;
            const dt = timestamp - lastTime;

            if (dt > speed) {
                lastTime = timestamp;
                
                let tete = { x: snake[0].x + dx, y: snake[0].y + dy };

                // Collision Murs
                if (tete.x < 0 || tete.x >= 100 || tete.y < 0 || tete.y >= 100) {
                    triggerGameOver();
                    return;
                }

                // Collision Soi-même
                for (let part of snake) {
                    if (tete.x === part.x && tete.y === part.y) {
                        triggerGameOver();
                        return;
                    }
                }

                snake.unshift(tete);

                // Manger pomme
                if (tete.x === pomme.x && tete.y === pomme.y) {
                    score++;
                    document.getElementById("score").textContent = "Score : " + score;
                    pomme.el.remove();
                    pomme = createPomme();
                } else {
                    snake.pop();
                }

                AfficheSerpent();
                directionLock = false;
            }
            requestAnimationFrame(update);
        }

        AfficheSerpent();
        requestAnimationFrame(update);
