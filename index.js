console.log("Hello World");
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => console.log(`Server rodando on http://localhost:${port}`));

const Filmes = require('./Model/Movies.json')
const FilmesScheme = require('./Model/Movies')

// Username: a3apiUsername
// Password: oeJEbfgJDY460LFG

const DB_User = 'a3apiUsername'
const DB_PASSWORD = encodeURIComponent('oeJEbfgJDY460LFG')

mongoose.connect(`mongodb+srv://${DB_User}:${DB_PASSWORD}@databasea3.nhk7kwf.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },)
    .then(() => console.log("Connected to MongoDb"))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

    
app.get("/Filmes", async (req, res) => {
 //     res.json({Filmes: Filmes})
      const data = await FilmesScheme.find({})
      res.send({filmes: data})
    })

// Pagination 

app.get("/movies", async (req, res) => {
    try {
      let { page, size } = req.query;
      if (!page) {
        page = 1;
      }
  
      if (!size) {
        size = 10;
      }
  
      const skip = size * (page-1);
      const limit = size

      const TotalPage = FilmesScheme.length
  
      const data = await FilmesScheme.find({}).skip(skip).limit(limit);
  
      res.send({ page: page, size: size, totalPage: TotalPage, Filmes: data });
    } catch (error) {
      res.sendStatus(500).send(error.message)
    }
  });
  

  app.patch("/LikeMovie/:id", async (req, res) => {
      const id = req.params.id

/*       const {rate} = req.body

      const movie = {
        rate
      } */

      try {
        const updatedPerson = await FilmesScheme.updateOne(
          { _id: id },
          { $inc: { rate: +1 } }
        );

        res.status(200).json({ message: 'Like foi enviando com sucesso' });
      } catch {
        res.sendStatus(500)
      }

  });
  

  app.patch("/DeslikeMovie/:id", async (req, res) => {
    const id = req.params.id

    try {
      const updatedPerson = await FilmesScheme.updateOne(
        { _id: id },
        { $inc: { rate: -1} }
      );

      res.status(200).json({ message: 'Deslike foi enviando com sucesso' });
    } catch {
      res.sendStatus(500)
    }

});

  app.get("/AddTheJSONToTheDatabase", (req, res) => {
    try {
   // Adicionar o JSON dentro da Database.
    FilmesScheme.create(Filmes)
    res.send("<h1> O conteúdo do JSON foi adicionando no Banco de dados </h1>")
    res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500).send(error.message)
    }
  });

  app.get("/DeleteAllItemsInsideTheDatabase", (req, res) => {
    // Apagar a Database Inteira.

  FilmesScheme.deleteMany({})
    .then(() => {
     console.log('All items deleted successfully.');
     res.send("<h1> Database apagada com sucesso </h1>")
  })
    .catch((error) => {
     console.error('Error deleting items:', error);
    }); 
  });