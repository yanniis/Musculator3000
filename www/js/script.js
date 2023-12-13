document.addEventListener('DOMContentLoaded', function() {

  // Config de la base de données
  const firebaseConfig = {
    apiKey: "AIzaSyA7blCplf-Fjvm0d9kDxlGRlaC4sdBDSEM",
    authDomain: "musculator3000-f8a09.firebaseapp.com",
    databaseURL: "https://musculator3000-f8a09-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "musculator3000-f8a09",
    storageBucket: "musculator3000-f8a09.appspot.com",
    messagingSenderId: "254213612746",
    appId: "1:254213612746:web:4da34525031b198be84033",
    measurementId: "G-N2E1KRT9P6"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

      // Fin base de données

      // Prendre l'adresse mail de l'utilisateur pour le mettre sur son profil
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Utilisateur connecté
      const userEmail = user.email;
      // Affichez l'adresse e-mail où vous en avez besoin sur la page de profil
      document.getElementById("userEmail").innerText = userEmail;
    } else {
      // L'utilisateur n'est pas connecté
      // Gérez le cas où l'utilisateur n'est pas connecté
    }
  });

      //Bouton burger

    const menu = document.getElementById('menu_burger');
    const menu_deroulant = document.getElementById('menu_deroulant');
    
    menu.addEventListener('click', () => {
        menu.classList.toggle('ouvert');
        menu_deroulant.classList.toggle('menu_deroulant');
  
        document.body.style.overflow = (document.body.style.overflow === 'hidden') ? '' : 'hidden';
      });
  
      // Fin bouton burger 

      //Materialize
      
      var tabs = document.querySelectorAll('.tabs');
      M.Tabs.init(tabs);

      // Initialisation Chatbot
      initChatbot();

});

// Script Chatbot

function initChatbot() {

  const projectId = 'musculator3000-f8a09';
  const dfEls = document.createElement('script');
  dfEls.src = `https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1`;
  dfEls.onload = () => {
      // Initialisez le chatbot Dialogflow Messenger
      dfMessenger.init({ projectId });
  };
  document.head.appendChild(dfEls);
}

function createUserWithEmailAndPassword() {
  const mail = document.getElementById("mailInscription").value;
  const passwordInscription = document.getElementById("passwordInscription").value;

  // Créer un nouvel utilisateur 
  firebase.auth().createUserWithEmailAndPassword(mail, passwordInscription).catch(function(error) { 
    var errorCode = error.code;
    var errorMessage = error.message;
    // une erreur est survenue
    console.log('erreur: ' + errorMessage);
    }).then(function(){
    // le compte a bien été créé
    console.log("Le compte a bien été créé");
    });
  };


  function signInWithEmailAndPassword() {
    const login = document.getElementById("mailConnexion").value;
    const passwordConnexion = document.getElementById("passwordConnexion").value;
  
    // Se connecter à un compte déjà existant
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        return firebase.auth().signInWithEmailAndPassword(login, passwordConnexion);
      })
      .then(function (userCredential) {
        // Connexion réussie, vous pouvez accéder à l'utilisateur via userCredential.user
        console.log("Connexion réussie", userCredential.user);
        document.getElementById("formLog").style.display = "none";
        document.getElementById("formMuscu").style.display = "block";

      })
      .catch(function (error) {
        // Une erreur est survenue dans l’authentification ou la persistence
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Erreur lors de la connexion:", errorCode, errorMessage);
        document.getElementById("alert").style.display = "block";
      });
  };

  // Fonction pour plug-in Filesystem

  async function program() {
    const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/musculator3000-f8a09.appspot.com/o/DOC-20230902-WA0023..pdf?alt=media&token=14ff31a0-e608-49b2-94b7-473b085ef2b6';
  
    try {
      // Permet d'ouvrir le fichier dans un autre onglet
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }
  }



// Fonction pour planifier une notification quotidienne
const scheduleDailyNotification = async () => {
  const userSelectedTime = document.getElementById("time").value;

  // Récupérer la date actuelle
  const currentDate = new Date();

  // Récupérer l'heure et les minutes sélectionnées par l'utilisateur
  const [hours, minutes] = userSelectedTime.split(":");
  
  // Définir la date pour aujourd'hui à l'heure sélectionnée par l'utilisateur
  const todayAtSelectedTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);

  // Si l'heure sélectionnée est antérieure à l'heure actuelle, passer à demain
  if (todayAtSelectedTime <= currentDate) {
    todayAtSelectedTime.setDate(todayAtSelectedTime.getDate() + 1);
  }

  // Convertir la date au format accepté par le plugin (AAA-MM-JJ HH:mm:ss)
  const formattedDateTime = todayAtSelectedTime.toISOString();

  // Planifier la notification quotidienne à l'heure sélectionnée par l'utilisateur
    await LocalNotifications.schedule({
    notifications: [{
      title: 'Rappel d\'entraînement',
      body: 'N\'oubliez pas de faire de l\'exercice!',
      id: 1,
      schedule: { at: formattedDateTime, repeats: true, every: 'day' } // Répéter tous les jours à l'heure sélectionnée
    }]
  });
};
