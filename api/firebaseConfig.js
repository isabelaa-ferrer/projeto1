const firebaseConfig = {
apiKey: process.env.FIREBASE_API_KEY,
authDomain: process.env.FIREBASE_AUTH_DOMAIN,
projectId: process.env.FIREBASE_PROJECT_ID,
storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.FIREBASE_APP_ID,
};

// Função que roda no servidor (serverless function do Vercel)
module.exports = (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

res.status(200).json(firebaseConfig);
};

let firebaseApp;

async function initFirebase() {
  try {
    // Faz a requisição para a rota criada no Vercel
    const response = await fetch('/api/firebaseConfig');
    const firebaseConfig = await response.json();

    // Inicializa o Firebase com as configs recebidas
    firebaseApp = firebase.initializeApp(firebaseConfig);

    console.log("🔥 Firebase inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar Firebase:", error);
  }
}

// Chama a função logo que a página carrega
initFirebase();