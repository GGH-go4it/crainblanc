// Vocabulaire logic
let vocabulaire = [];

function chargerVocabulaire(niveau = 1, langue = 'nl') {
    db.collection("vocabulaire")
      .where("niveau", "==", niveau)
      .where("langue", "==", langue)
	  .where("themes", "array-contains", themeActuel)
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

function chargerThemesDisponibles() {
    const selectTheme = document.getElementById("theme");
    const themesTrouvés = new Set();

    db.collection("vocabulaire").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (Array.isArray(data.themes)) {
                data.themes.forEach(theme => themesTrouvés.add(theme));
            }
        });

        // Vider les options existantes
        selectTheme.innerHTML = "";

        // Ajouter chaque thème unique
        Array.from(themesTrouvés).sort().forEach(theme => {
            const option = document.createElement("option");
            option.value = theme;
            option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            selectTheme.appendChild(option);
        });
    }).catch((error) => {
        console.error("Erreur lors du chargement des thèmes :", error);
    });
}
