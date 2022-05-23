import express from 'express';
import{ MongoClient} from 'mongodb';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import multer from 'multer';


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({ filename: (req, file) => {file.originalname;}, dest: "./src/build/images/"});
const uploadFiles = async (req, res) => {
    try {
        const client = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('mymovies');

        const posterName = await 
        await db.collection('movies').insertOne( {
            name:req.body.name, 
            date:req.body.date, 
            actors:req.body.actors.split(", "), 
            poster:"/images/" + req.file.filename, 
            rating:req.body.rating
        })
        
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json({message: "Success", movies: movieInfo});
        client.close();
    } catch (error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
}

  


app.get('/hello',(req, res) => {res.send('Hello there')});
app.get('/hello/:name',(req, res) => {res.send(`Hello ${req.params.name}`)});

app.post('/hello',(req, res) => {res.send(`Hello ${req.body.name}`)});

app.listen(8000,() =>console.log("server is runing"));

const client = new MongoClient('mongodb://localhost:27017');


app.get('/api/data', async (req,res) =>{
    try{
        await client.connect();
        const db = client.db("movies");
        
        const moviesInfo  = await db.collection('mymovies').find({}).toArray();

        res.status(200).json(moviesInfo);
        client.close();
        
    }catch(error){
        res.sendStatus(500);
    }
    
})

app.post('/api/addMovie', upload.single("poster"), uploadFiles);

app.post('/api/upload', upload.single('poster'), function (req, res, next) {
    req.file
  })

