// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaLXK6BwDMMADCODKkuiyMkLs0ZQM6SPM",
    authDomain: "datosxvashli.firebaseapp.com",
    projectId: "datosxvashli",
    storageBucket: "datosxvashli.firebasestorage.app",
    messagingSenderId: "355375469795",
    appId: "1:355375469795:web:9c1c80e4daddec155d61d6",
    measurementId: "G-CZ0N6RWNBL"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para buscar por teléfono
export async function buscarTelefono(telefono) {

    const q = query(
        collection(db, "invitados"),
        where("telefono", "==", telefono)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    return querySnapshot.docs[0].data();

}
