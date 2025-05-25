// admin_lister_vocabulaire.js
// Ce script permet d'afficher tous les mots enregistrés dans Firestore depuis la collection "vocabulaire"

// Prérequis : firebase-config.js doit être chargé avant ce script

function afficherTousLesMots() {
    const liste = document.getElementById("listeVocabulaire");
    liste.innerHTML = "<li>Chargement...</li>";

    db.collection("vocabulaire")
      .orderBy("niveau")
      .get()
      .then((querySnapshot) => {
          liste.innerHTML = "";
          if (querySnapshot.empty) {
              liste.innerHTML = "<li>Aucun mot enregistré.</li>";
              return;
          }

          querySnapshot.forEach((doc) => {
              const data = doc.data();
              const item = document.createElement("li");
              item.textContent = `FR: ${data.fr} → ${data.trad} (${data.langue}, niv.${data.niveau}, thèmes: ${data.themes.join(", ")})`;
              liste.appendChild(item);
          });
      })
      .catch((error) => {
          liste.innerHTML = "<li>Erreur de chargement : " + error.message + "</li>";
      });
}
