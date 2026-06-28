const express = require('express');
const port = 8000
const path = require('path');
const logger = require('./middleware/logger.js')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {id:1, message:'Hello World 1!'},
    {id:2, message:'Hello World 2!'},
    {id:3, message:'Hello World 3!'},
];

//Create a middleware function - Middleware knows the request and response of an Http Method and acts upon it according to
//the logger function

app.use(logger)

/*const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}//:${req.get('host')} ${req.originalUrl}`)
    next();
}*/

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Query String (req.query)
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit)
    res.send(posts.filter(
        (post) => post.id <= limit)
    );
});

app.get('/api/posts/all', (req, res) => {
    res.send(posts);
    res.send('All posts have been responded');
});

//Get the post according to id ( using parameters)
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        res.status(404).json(`The id: ${id} is not valid and cannot be found`);
    } else {
        res.status(200).send(posts.filter((post) => post.id === id))
    }
});

//Posting data with request body data
app.post('/api/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        message: req.body.title};

    if (!newPost.message) {
        res.status(400).send({msg : "Please include a message"});
    }

    posts.push(newPost);
    res.send(posts);

})

app.put('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        res.status(404).json(`The id: ${id} is not valid and cannot be found`);
    }
    else {
        post.message= req.body.title;
    }

    res.status(200).send(posts)
});

app.delete('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        res.status(404).send({msg : `The id : ${id} is not valid and cannot be found`});
    }
    else {
        res.status(200).send(posts.filter((post) => post.id !== id));
    }

    res.send(posts.filter)
})

app.listen(port, () => {console.log("Listening on port 8000")});

// The entire code is an example of Create , Read, Update, Delete API. The post method works as C, get method as R, put method as U and
//the delete method as D.


