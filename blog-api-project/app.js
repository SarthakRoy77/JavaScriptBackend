const express = require('express')
const fs = require('fs')
const path = require('path')
const port = 8000
const filePath = path.join(__dirname, 'database.json')

const app = express()

//Middleware
app.use(express.urlencoded({extended: false}));

//Read Database function
const readDatabase = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

//Write Database function
const saveDatabase = (value) => {
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
};

// Create / C in CRUD method
app.post('/api/blogs', (req, res) => {
    let blogs = readDatabase();
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    if (!title || !author || !content) {
        res.status(400).send({msg : "Important details are missing to create a blog; please enter them"})

    }
    let newBlog = {
        id : blogs.length + 1,
        title : title,
        author : author,
        content: content,
        dateCreatedAt : new Date().toLocaleDateString(),
        dateUpdatedAt : new Date().toLocaleDateString()
    }

    blogs.push(newBlog);
    saveDatabase(blogs);
    res.status(200).send(blogs);
});

// Read / R in CRUD Method
app.get('/api/blogs/:id', (req, res) => {
    const blogs = readDatabase();
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).send({msg : "Please enter a id for the blog"});
    }
    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) {
        res.status(404).send({msg : `A blog with the id of ${id} was not found`});
    }

    res.status(200).send(blogs.filter((blog) => blog.id === id));

});

app.get('/api/blogs', (req, res) => {
    const blogs = readDatabase()
    const title = req.query.title
    const blogTitle = blogs.find((blog) => blog.title === title);

    if (!blogTitle) {
        res.status(404).send({msg : `A blog with the title of ${title} was not found`});
    }

    if (!title) {
        res.status(400).send({msg : `Please enter a title`});
    }

    res.status(200).send(blogs.filter((blog) => blog.title === title));
});


app.listen(port, () => {console.log(`Listening on port ${port}`)});