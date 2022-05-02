require('dotenv').config()
const { initializeApp } = require('firebase/app')
const { getDatabase, connectDatabaseEmulator } = require('firebase/database')

const PORT = process.env.PORT || 3001
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}
const fireApp = initializeApp(firebaseConfig)
const fireDb = getDatabase(fireApp)
if (process.env.NODE_ENV === 'development') {
    connectDatabaseEmulator(fireDb, 'localhost', 9000)
}

module.exports = {
    PORT,
    fireApp,
    fireDb
}