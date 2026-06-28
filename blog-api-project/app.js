const express = require('express')
const fs = require('fs')
const path = require('path')
const port = 8000
const filePath = path.join(__dirname, 'database.json')

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
}
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
    const tag = req.body.tag;

    if (!title) {
        return res.status(400).send({msg : "Please enter a title for the blog"});
    }

    if (!author) {
        return res.status(400).send({msg : "Please enter the name of the author of the blog"});
    }

    if (!content) {
        return res.status(400).send({msg : "Please enter a content for the blog"});
    }

    if (!tag) {
        return res.status(400).send({msg : "Please enter a tag for the blog"});
    }

    let newBlog = {
        id : blogs.length + 1,
        title : title,
        author : author,
        content: content,
        dateCreatedAt : new Date().toLocaleDateString(),
        dateUpdatedAt : new Date().toLocaleDateString(),
        tag: tag
    }

    blogs.push(newBlog);
    saveDatabase(blogs);
    res.status(201).send(blogs);
});

// Read / R in CRUD Method
app.get('/api/blogs/:id', (req, res) => {
    const blogs = readDatabase();
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).send({msg : "Please enter a id for the blog"});
    }

    if (isNaN(id) || id < 0) {
        return res.status(400).send({msg : "Please enter a valid postive id"});
    }

    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) {
         return res.status(404).send({msg : `A blog with the id of ${id} was not found`});
    }

    res.status(200).send(blogs.filter((blog) => blog.id === id));

});

app.get('/api/blogs', (req, res) => {
    const blogs = readDatabase()
    const tag = req.query.tag

    if (!blogs) {
        return res.status(500).send({msg : "Sorry, the database has no data. Use POST to create a new blog"});
    }

    if (!tag) {
        return res.status(400).send({msg : "Please enter a tag to find the blog"});
    }
    const blog = blogs.filter((blog) => blog.tag === tag);

    if (!blog) {
        return res.status(404).send({msg : `A blog with the tag :${tag} was not found` });
    }
    res.status(200).send(blog);
})

//Update/U in CRUD
app.put('/api/blogs/:id', (req, res) => {
    let blogs = readDatabase();
    const id = parseInt(req.params.id);
    const content = req.body.content;

    if (!content) {
         return res.status(400).send({msg : "Please enter a content for the blog"});
    }
    if (!id ) {
         return res.status(400).send({msg : "Please enter a id for the blog"});
    }

    if (isNaN(id) || id < 0) {
        return res.status(400).send({msg : "Please enter a valid positive id"});
    }

    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) {
         return res.status(404).send({msg : `A blog with the id of ${id} was not found`});
    }

    blog.content = content
    blog.dateUpdatedAt = new Date().toLocaleDateString();
    saveDatabase(blogs);
    res.status(200).send(blogs);
});

app.delete('/api/blogs/:id', (req, res) => {
    let blogs = readDatabase();
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).send({msg : "Please enter a id for the blog"});
    }

    if (isNaN(id) || id < 0) {
        return res.status(400).send({msg : "Please enter a valid positive id"})
    }

    const blog = blogs.find((blog) => blog.id === id);

    if (blog.length === 0) {
        return res.status(404).send({msg : `A blog with the id of :${id} was not found`});
    }

    blogs = blogs.filter((blog) => blog.id !== id);
    saveDatabase(blogs);
    res.status(200).send(blogs);

})


app.listen(port, () => {console.log(`Listening on port ${port}`)});