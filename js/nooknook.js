document.addEventListener("DOMContentLoaded", () => {

    const panel = document.getElementsByClassName("rightpane")[0];
    const newmail = document.getElementById("newmail");
    const sendmail = document.getElementById("sendmail");

    // Ouvrir le panneau
    newmail.addEventListener("click", () => {
        panel.style.visibility = "visible";
    });

    // Fermer + afficher message
    sendmail.addEventListener("click", () => {
        panel.style.visibility = "hidden";

        const recipe = document.createElement("div");
        recipe.classList.add("messageinfo");
        recipe.textContent = "Message envoyé !";

        // Exemple : ajouter dans le mailcontainer
        document.querySelector(".mailcontainer").appendChild(recipe);
    });
});
