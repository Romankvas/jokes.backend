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


mongoose.connect('mongodb+srv://admin:0RbiDtVoQ6RwlJZe@cluster0.o2r8tpv.mongodb.net/?appName=Cluster0')
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
});

const Joke = mongoose.model('Joke', jokeSchema);

app.post('/add-joke', (req, res) => {
    const { title } = req.body;
    const newJoke = new Joke({ title });
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
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});