require('dotenv').config()
const { initializeApp } = require('firebase/app')
const { getDatabase, connectDatabaseEmulator } = require('firebase/database')

const PORT = process.env.PORT || 3001
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
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