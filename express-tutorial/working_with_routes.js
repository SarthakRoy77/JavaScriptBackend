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

//Get the post according to id ( using parameters)
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(posts.filter((post) => post.id === id))
})

app.listen(port, () => {console.log("Listening on port 8000")})


