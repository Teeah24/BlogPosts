const express = require('express');

const app = express();  // Initialize an Express app

const port = 4000;      // Define the port



// Define a route for the root URL

app.get('/', (req, res) => {

  res.send('Welcome to my First Express server!');

});
app.post(`/about`, (req, res) => {
  res.send('This is the About page.');
});

// Middleware to parse JSON bodies

app.use(express.json());
let blogPosts = [ 
{ id: 1, title: 'Teeahs blog',
   content: 'Welcome to Teeahs blog',
    author: 'Mutiah Folashade'},

{id: 2, title: 'Folas blog', 
  content: 'We are excited to see you',
   author: 'Yusuf Motunrayo'},
];
app.post ('/blogPosts' , (req, res ) => { 
const { title, content, author} = req.body;
const newblogPost = { id: blogPosts. length +1, title: title, content: content, author: author};
blogPosts.push(newblogPost);
res.status(201).json(newblogPost);
});

app.get('/blogPosts' , (req, res ) => {
res.json(blogPosts)
});

app.get ('/blogPost/:id' , (req, res ) => {
const blogPost = blogPosts.find(bp => bp.id === parseInt(req.params.id));
if ( !blogPost ) {
return res.status(404).json({ message: 'Post not found '});
}
res.json(blogPosts)
});
app.put ('/blogPosts/:id' , ( req, res ) => {
const blogPost= blogPosts.find(bp => bp.id === parseInt (req.params.id));
if ( ! blogPost ) {
return res.status(404).json({ message: 'post not found '});
}
const { title, content, author } = req.body;
blogPost.title = title || blogPost.title;
blogPost.content = content || blogPost.content;
blogPost.author = author || blogPost.author;

res.json(blogPost);
});
app.delete('/blogPosts/:id', (req, res) => {

  const blogPostsIndex = blogPosts.findIndex(bp => bp.id === parseInt(req.params.id));

  if (blogPostsIndex === -1) {

    return res.status(404).json({ message: 'Post not found' });

  }

  blogPosts.splice(blogPostsIndex, 1);

  res.json({ message: 'Blog deleted' });

});

app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);

});