const express = require('express');

const mongoose = require('mongoose');

const app = express();
const port = 4000;
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Muteeah24:20010408@cluster0.q6neq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
{ useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))

  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});
// Define a schema

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },

  content: { type: String, required: true },

  author: {type: String, required: true}
  
});

// Create a model

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

app.post ('/blogPost' , async (req, res ) => { 
const {title, content, author} = req.body;
try {
  const newblogPost = new BlogPost ({ title: 'Teaahs blog', content: 'We are thrilled to see you', author: 'Alabi Seun'});
   
await newblogPost.save();
res.status(201).json(newblogPost);
 } catch (error) {
  console.log(error)
  res.status(400).json({message: 'Error adding blog', error});
}
});

app.get('/blogPost', async (req, res ) => {
try {
  const blogPost = await BlogPost.find();
  res.json(blogPost);
} catch (error) {
  res.status(500).json({message: 'Error fetching blog', error});
}
});

app.get ('/blogPost/:id' , async (req, res ) => {
try {
  const BlogPost = await
  BlogPost.findById(req.params.id);
if ( !BlogPost ) {
return res.status(404).json({ message: 'Post not found '});
}
res.json(BlogPost);
} catch (error) {
res.status(500).json({message: 'Error feching post', error});
}
});
app.put ('/blogPost/:id' , async ( req, res ) => {
const { title, content, author } =  req.body;
try {
  const updatedBlogPost = await 
  BlogPost.findByIdAndUpdate(req.params.id,
    { title, content, author },
   { new: true, runValidators: true }
);
if ( !updatedBlogPost ) {
return res.status(404).json({ message: 'post not found '});
}
res.json(updatedBlogPost);
} catch (error) {
  res.status(400).json({message: 'Error updating blog', error});
}
});

 
app.delete('/blogPost/:id', async (req, res) => {
try {
  const deletedBlogPost = await 
BlogPost.findByIdAndDelete(req.params.id);

  if (!deletedBlogPost) {

    return res.status(404).json({ message: 'Post not found' });

  }

  res.json({ message: 'Blog deleted' });
} catch (error) {
  res.status(500).json({ message: 'Error deleting post', error });
}
});
