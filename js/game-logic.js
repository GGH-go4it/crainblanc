//Game logic

let questions = [];
let index = 0;
let score = 0;
let joueur = ""; // défini depuis le formulaire
let langueActuelle = "nl"; // par défaut
let niveauActuel = 1;
let themeActuel = "corps"; // valeur par défaut


function melanger(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function demarrerJeu() {
    questions = melanger([...vocabulaire]).slice(0, 10);
    index = 0;
    score = 0;
    nouvelleQuestion();
}

function nouvelleQuestion() {
    if (index >= 10) {
        document.getElementById("jeu").style.display = "none";
        document.getElementById("scoreFinal").style.display = "block";
        document.getElementById("scoreFinal").innerText = `Bravo ${joueur} ! Ton score final est : ${score} points.`;
        document.getElementById("actionsFinales").style.display = "block";

        db.collection("scores_vocabulaire").add({
            nom: joueur,
            score: score,
            langue: langueActuelle,
            niveau: niveauActuel,
            date: new Date()
        })
        .then(() => afficherHallOfFame())
        .catch((error) => console.error("Erreur Firebase :", error));

        return;
    }

    document.getElementById("nomJoueur").innerText = `Joueur : ${joueur} — Thème : ${themeActuel}`;

    const current = questions[index];
    document.getElementById("question").innerText = `Quel est le mot en ${current.langue.toUpperCase()} pour : "${current.fr}" ?`;

    let propositions = [current.trad];
    while (propositions.length < 3) {
        let random = vocabulaire[Math.floor(Math.random() * vocabulaire.length)].trad;
        if (!propositions.includes(random)) {
            propositions.push(random);
        }
    }

    propositions = melanger(propositions);

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    propositions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => verifier(option, current.trad);
        optionsDiv.appendChild(btn);
    });
}

function verifier(choix, reponse) {
    const resultatDiv = document.getElementById("resultat");
    if (choix === reponse) {
        score += 10;
        resultatDiv.innerHTML = "🎉 Bonne réponse !";
    } else {
        score -= 5;
        resultatDiv.innerHTML = "😔 Mauvaise réponse, essaye encore !";
    }
    index++;
    setTimeout(nouvelleQuestion, 1000);
}

function rejouer() {
    index = 0;
    score = 0;
    document.getElementById("jeu").style.display = "block";
    document.getElementById("scoreFinal").style.display = "none";
    document.getElementById("actionsFinales").style.display = "none";
    document.getElementById("resultat").innerHTML = "";
    demarrerJeu();
}

function afficherHallOfFame() {
    db.collection("scores_vocabulaire")
      .orderBy("score", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
          const ul = document.getElementById("hallOfFame");
          ul.innerHTML = "";
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              const li = document.createElement("li");
              li.textContent = `${data.nom} (${data.langue} niv.${data.niveau}) : ${data.score} pts`;
              ul.appendChild(li);
          });
      });
}
