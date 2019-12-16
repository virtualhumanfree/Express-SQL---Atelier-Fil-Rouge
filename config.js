const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'Aletanx93', // le mot de passe
database :  'wild_quest_fil_rouge', // le nom de la base de données
});
module.exports = connection;