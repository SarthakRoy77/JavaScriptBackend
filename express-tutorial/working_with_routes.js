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
})

app.listen(port, () => {console.log("Listening on port 8000")})


