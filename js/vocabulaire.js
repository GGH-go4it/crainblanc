// Vocabulaire logic
let vocabulaire = [];

function chargerVocabulaire(niveau = 1, langue = 'nl') {
    db.collection("vocabulaire")
      .where("niveau", "==", niveau)
      .where("langue", "==", langue)
      .get()
      .then((querySnapshot) => {
          vocabulaire = [];
          querySnapshot.forEach((doc) => {
              vocabulaire.push(doc.data());
          });

          if (vocabulaire.length < 3) {
              alert("Pas assez de mots dans la base pour ce niveau/langue !");
              document.getElementById("jeu").style.display = "none";
              return;
          }

          demarrerJeu(); // Appelle game-logic.js
      })
      .catch((error) => {
          console.error("Erreur lors du chargement du vocabulaire :", error);
          alert("Erreur de connexion à la base de données.");
      });
}
