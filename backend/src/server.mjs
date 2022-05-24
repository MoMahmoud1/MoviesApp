import express from 'express';
import{ MongoClient} from 'mongodb';
import {fileURLToPath} from 'url';
import path from 'path';
import {dirname} from 'path';
import multer from 'multer';


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: "./src/build/images/",
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
  

app.use(express.static(path.join(__dirname, 'build')));


// app.get('/hello',(req, res) => {res.send('Hello there')});
// app.get('/hello/:name',(req, res) => {res.send(`Hello ${req.params.name}`)});

// app.post('/hello',(req, res) => {res.send(`Hello ${req.body.name}`)});

app.listen(8000,() =>console.log("server is runing"));

const client = new MongoClient('mongodb://localhost:27017');




app.post('/api/add', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('movies');

        await db.collection('mymovies').insertOne( {Title:req.body.Title, Rating:req.body.Rating,
             Released:req.body.Released, Actors:req.body.Actors,Poster:req.body.Poster})

        res.status(200).json({message: "Success"});
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
});
app.get('/api/data', async (req,res) =>{
    try{
        await client.connect();
        const db = client.db("movies");
        
        const moviesInfo  = await db.collection('mymovies').find({}).toArray();

        res.status(200).json(moviesInfo);
        client.close();
        
    }catch(error){
        res.sendStatus(500).json({message:"connecting error",error});
    }
    
})
app.post('/api/removeMovie', async (req, res) => {
    try {
      
        await client.connect();
        const db = client.db("movies");
        let del = await db.collection('mymovies').deleteOne( {Title:req.body.Title})
        
        
        if( del.deletedCount == 1) {
            res.status(200).json({message: `Movie ${req.body.name} deleted`});
        }
        else {
            res.status(200).json({message: "Unable to delete movie"});
        }
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
});

app.post('/api/upload', upload.single('poster'), function (req, res, next) {
    req.file
  })
  app.get('*', (req, res) => (res.sendFile(path.join(__dirname + '/build/index.html'))))
