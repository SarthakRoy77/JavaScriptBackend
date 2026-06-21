const express = require('express');
const port = 8000
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {id:1, message:'Hello World 1!'},
    {id:2, message:'Hello World 2!'},
    {id:3, message:'Hello World 3!'},
];
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
})

app.listen(port, () => {console.log("Listening on port 8000")})


