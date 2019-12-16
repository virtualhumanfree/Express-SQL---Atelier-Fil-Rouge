const express = require('express');
const app = express();
const port = 8000;

const connection = require('./config')
const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
extended: true
}));

app.get('/', (request, response) => {
    response.send('Bienvenue sur Express');
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});

/* GET index page. */
app.get('/', (req, res) => {
  res.json({
    title: 'Express'
  });
});

/* 1 - Récupéré tous les pokemon */

// écoute de l'url "/api/pokemon"
app.get('/api/pokemon', (req, res) => {
  // TODO récupération des données (étape 2)
  // connection à la base de données, et sélection des pokemon
  connection.query('SELECT * from pokemon', (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des pokemon');
        } else {
    
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
    });
    
});

/* 2 - Récupération de données ordonnées (ascendant, descendant)L'ordre sera passé en tant que paramètre de la route */

// écoute de l'url "/api/pokemon"
app.get('/api/pokemon/order/:orderPokemon', (req, res) => {
  // TODO récupération des données (étape 2)
  // connection à la base de données, et sélection des pokemon
  const orderPokemon = `${req.params.orderPokemon}`;

  connection.query(`SELECT * from pokemon ORDER BY name ${orderPokemon}`, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des pokemon');
        } else {
    
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
    });
    
});

/* 3 - Récupéré un pokemon avec un filtre (nom contenant la chaîne de caractère 'rap') */

app.get('/api/pokemon/filtreIn', (req, res) => {
  // TODO récupération des données (étape 2)
  // connection à la base de données, et sélection des pokemon
  const filtreInPokemon = `%rap%`;  
  connection.query(`SELECT * from pokemon WHERE name LIKE "${filtreInPokemon}"`, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des pokemon');
        } else {

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
    });
    
});

/* 4 - Récupéré un pokemon avec un filtre (nom commençant par 'Sal') */

app.get('/api/pokemon/filtreStart/:filtreIn', (req, res) => {
  // TODO récupération des données (étape 2)
  // connection à la base de données, et sélection des pokemon
  const filtreInPokemon = `${req.params.filtreIn}%`;  
  connection.query(`SELECT * from pokemon WHERE name LIKE "${filtreInPokemon}"`, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des pokemon');
        } else {

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
    });
    
});


/* 5 - Récupéré un pokemon avec un filtre (nom commençant par 'Sal') */


app.get('/api/pokemon/filtreSup/:level', (req, res) => {
  // TODO récupération des données (étape 2)
  // connection à la base de données, et sélection des pokemon
  const filtreInPokemon = `${req.params.level}`;  
  connection.query(`SELECT * from pokemon WHERE level > ${filtreInPokemon}`, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des pokemon');
        } else {

          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
    });
    
});



/* 6 - Récupéré un pokemon grace a son id */

app.get('/api/pokemon/:id', (req, res) => {
  // TODO récupération des données (étape 2)
  // connection à la base de données, et sélection des pokemon
  const idPokemon = req.params.id;
  connection.query('SELECT * from pokemon WHERE id = ?',  [idPokemon], (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {

          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des pokemon');
        } else {
    
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
    });
    
});

/* 7 - Sauvegarde d'une nouvelle entité */

app.post('/api/pokemon', (req, res) => {

  // Get the data sent
  const formData = req.body;

  // connection to the database, and insertion of the pokemon
  connection.query('INSERT INTO pokemon SET ?', formData, (err, results) => {

    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send("Error saving an pokemon");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});


/* 8 - Modification d'une entité */

// listen to the url "/api/pokemon" with the verb PUT
app.put('/api/pokemon/:id', (req, res) => {

  // Get the data sent
  const idPokemon = req.params.id;
  const formData = req.body;

  // connection to the database, and insertion of the pokemon
   connection.query('UPDATE pokemon SET ? WHERE id = ?', [formData, idPokemon], err => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
       console.log(err);
      res.status(500).send("Error editing an pokemon");
    } else {
      // If everything was successful, we send an "ok" status. 
      res.sendStatus(200);
    }
  });
});


/* 9 - Modification Toggle du booléen d'une entité */

// listen to the url "/api/pokemon" with the verb PUT
app.put('/api/pokemon/toggleBolean/:id', (req, res) => {

  // Get the data sent
  const idPokemon = req.params.id;

  // connection to the database, and insertion of the pokemon
   connection.query('UPDATE pokemon SET ko = !ko WHERE id = ?', [idPokemon], err => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
       console.log(err);
      res.status(500).send("Error editing an pokemon");
    } else {
      // If everything was successful, we send an "ok" status. 
      res.sendStatus(200);
    }
  });
});


/* 10 - Suppression d'une entité */

// listen to the url "/api/pokemon" with the verb DELETE
app.delete('/api/pokemon/:id', (req, res) => {

  // Get the data sent
  const idPokemon = req.params.id;

  // connection to the database, and insert the pokemon
  connection.query('DELETE FROM pokemon WHERE id = ?', [idPokemon], err => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
       console.log(err);
      res.status(500).send("Error deleting an pokemon");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});



/* 11 - Suppression de toutes les entités dont le booléen est false */


// listen to the url "/api/pokemon" with the verb DELETE
app.delete('/api/pokemon', (req, res) => {

  // Get the data sent
  const idPokemon = req.params.id;

  // connection to the database, and insert the pokemon
  connection.query('DELETE FROM pokemon WHERE ko = false', [idPokemon], err => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
       console.log(err);
      res.status(500).send("Error deleting an pokemon");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});