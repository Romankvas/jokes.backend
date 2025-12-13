const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://romankvas27b_db_user:31CNtTEDtrUO2WWs@cluster0.l2xwaoc.mongodb.net/?appName=Cluster0')
.then(()=>{
    console.log('Connected to DB');
})
.catch((err)=>{
    console.log(err);
})

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const jokeSchema = new mongoose.Schema({
    title: String,
    likes: Array        
});

const Joke = mongoose.model('Joke', jokeSchema);


app.post('/add-joke', (req, res) => {
    const { title } = req.body;
    const newJoke = new Joke({ title, likes: [] });
    newJoke.save();
    res.send('Joke added successfully!');
});


app.get('/all-jokes', async (req, res) => {
    const jokes = await Joke.find();
    res.send(jokes);
});


app.get('/random-joke', async (req, res) => {
    const jokes = await Joke.find();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.send(randomJoke);
});


app.delete('/delete-joke/:id', async (req, res) => {
    await Joke.findByIdAndDelete(req.params.id);
    res.send('Joke deleted!');
});


app.post('/like-joke/:id', async (req, res) => {
    const joke = await Joke.findById(req.params.id);
    joke.likes.push("like"); 
    joke.save();
    res.send('Liked!');
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
