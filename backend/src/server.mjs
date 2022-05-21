import express from 'express';
import{ MongoClient} from 'mongodb';

const app = express();
app.use(express.json());

app.get('/hello',(req, res) => {res.send('Hello there')});
app.get('/hello/:name',(req, res) => {res.send(`Hello ${req.params.name}`)});

app.post('/hello',(req, res) => {res.send(`Hello ${req.body.name}`)});

app.listen(8000,() =>console.log("server is runing"));

const client = new MongoClient('mongodb://localhost:27017');
app.get('/api/addmovie', async (req,res) =>{
    try{
        await client.connect();
        const db = client.db("movies");
        
        const moviesInfo  = await db.collection('mymovies').insertOne(req.body);
        res.sendStatus(200);
        client.close();
    }catch(error){
        res.sendStatus(500);
    }
    
})
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