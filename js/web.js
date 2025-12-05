let largeur = window.innerWidth;
let mouseX = 0
let mouseY = 0
let eyeFollow = 1;
let lastTime = performance.now();
let deltaTime = 0;
let Time = 0;
let lastEventId = 0;
let eventObserver = 0;

function angleProche(angle) {
    const angles = [0, Math.PI/4, Math.PI/3, Math.PI/2, 2*Math.PI/3, 3*Math.PI/4, Math.PI];
    
    let plusProche = angles[0];
    let minDiff = Math.abs(angle - angles[0]);

    for (let i = 1; i < angles.length; i++) {
        const diff = Math.abs(angle - angles[i]);
        if (diff < minDiff) {
            minDiff = diff;
            plusProche = angles[i];
        }
    }

    return plusProche;
}

function playBlink()
{
    eyeFollow = 0
    showSprite('eyeCenter');
    setTimeout(() => {
    eyeFollow = 1;
    }, Math.random() * 3000 + 2000);
    
}

function scheduleNextBlinkAnimation() {

    const delay = Math.random() * 12000 + 2000;

    setTimeout(() => {
        playBlink();
        scheduleNextBlinkAnimation();
    }, delay);
}


function getEyeAngles() {
    let x = mouseX-(largeur/2)
    let d = Math.sqrt(x*x+mouseY*mouseY)
    let tetha = Math.acos(x/d)
    return tetha
}

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX
    mouseY = event.clientY
    if(eyeFollow == 1)
    {
        updateEye();
    }
});

window.addEventListener('resize', () => {
    largeur = window.innerWidth;
});

function showSprite(id) {
    const sprites = document.querySelectorAll('.eye');
    sprites.forEach(s => s.style.display = 'none');  // cacher toutes
    const sprite = document.getElementById(id);
    if (sprite) sprite.style.display = 'block';     // afficher la cible
}

function updateEye() {
    if (eyeFollow == 0) return;
    let tetha = getEyeAngles();            // angle actuel
    let angle = angleProche(tetha);        // angle le plus proche parmi 0, PI/4, PI/3, etc.

    switch(angle) {
        case 0:
            showSprite('eye0');
            break;
        case Math.PI/4:
            showSprite('eyePi4');
            break;
        case Math.PI/3:
            showSprite('eyePi3');
            break;
        case Math.PI/2:
            showSprite('eyePi2');
            break;
        case 2*Math.PI/3:
            showSprite('eye2Pi3');
            break;
        case 3*Math.PI/4:
            showSprite('eye3Pi4');
            break;
        case Math.PI:
            showSprite('eyePi');
            break;
        default:
            showSprite('eye0');
    }
}


function tick() {
    const now = performance.now();
    deltaTime = (now - lastTime) / 1000;
    lastTime = now;
    Time += deltaTime;
    requestAnimationFrame(tick);
    playEvent();
}

function playEvent()
{
    
    switch (Math.trunc(Time))
    {
        
        case 15:
            if (lastEventId != 6)
            {
                const popover = document.getElementById('notification');
                const notificationPage = document.getElementById('notificationHTML');
                notificationPage.src = "funFact.html"
                popover.showPopover(); 
                eventObserver = 1;

            }
            break;
        case 50:
            if (lastEventId != 50)
            {   const popover = document.getElementById('notification');
                const notificationPage = document.getElementById('notificationHTML');
                notificationPage.src = "funFact1.html"
                popover.showPopover(); 
            }
            break;
        case 130:
            if (lastEventId != 130)
            {   const popover = document.getElementById('notification');
                const notificationPage = document.getElementById('notificationHTML');
                notificationPage.src = "funFact2.html"
                popover.showPopover(); 
            }
            break;
        case 200:
            if (lastEventId != 200)
            {   const popover = document.getElementById('notification');
                const notificationPage = document.getElementById('notificationHTML');
                notificationPage.src = "funFact3.html"
                popover.showPopover(); 
            }
            break;
        case 250:
            if (lastEventId != 200)
            {   const popover = document.getElementById('notification');
                const notificationPage = document.getElementById('notificationHTML');
                notificationPage.src = "funFact4.html"
                popover.showPopover(); 
            }
            lastEventId= 0
            break;
    }
    lastEventId = Math.trunc(Time)
}

tick();
scheduleNextBlinkAnimation()

function button(id)
{
    console.log(id)
    if(id == "terminaId")
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "snake.html"
        popover.showPopover(); 
    }

    if(id == "mailstrikeID")
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "mailStrike.html"
        popover.showPopover(); 
    }
    else if(id == 'waterfoxId')
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "firefoxe onglet.html"
        popover.showPopover(); 
    }
    else if(id == 'cornerId')
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "edgeMachine.html"
        popover.showPopover(); 
    }
    else if(id == 'nooknookId')
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "outlook onglet.html"
        popover.showPopover(); 
    }
    else if(id == 'sentenceId')
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "sentence.html"
        popover.showPopover(); 
    }
    else if(id == 'journalId')
    {
        const popover = document.getElementById('windowPopup');
        const notificationPage = document.getElementById('windowHTML');
        notificationPage.src = "siteFin1.html"
        popover.showPopover(); 
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Tableau de toutes les images et leurs callbacks
    const images = [
        { id: "nooknookId", name: "NookNook"},
        { id: "sentenceId", name: "Sentence"},
        { id: "cornerId", name: "Corner"},
        { id: "terminaId", name: "Terminal"},
        { id: "waterfoxId", name: "Waterfox"},
        { id: "mailstrikeID", name: "Mailstrike"},
        { id: "freedeskId", name: "Freedesk"},
        { id: "journalId", name: "Journal"}
    ];

    // Fonction générique pour rendre une image cliquable
    function makeImageClickable(img, callback) {
        if (!img) {
            console.error(`L'image ${img} est introuvable !`);
            return;
        }

        window.addEventListener("click", (event) => {
            const rect = img.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                callback();
            }
        });
    }

    // Boucle sur toutes les images
    images.forEach(item => {
        const img = document.getElementById(item.id);
        makeImageClickable(img, () => {
                    button(item.id)
                        
        });
    });
});
