const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const uplode = multer({dest:'uplode/'});
const  fs = require('fs');
const post = require('./models/Post');

const uri = "mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/?retryWrites=true&w=majority";
const salt = bycrypt.genSaltSync(10);
const salt2 = 'asdfe45we45w345wegw345werjktjwertkj';


const app = express(); 

app.use(cors({credentials: true,origin:'http://localhost:3000'}));
app.use(express.json());
mongoose.connect(uri);
app.use(cookieParser());
app.use('/uplode', express.static(__dirname + '/uplode'));


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
     const userDoc = await User.create({ username, password:bycrypt.hashSync(password,salt) });
      
   }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
 
  
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;


    const userDoc = await User.findOne({username});
    
    const passOk = bycrypt.compareSync(password, userDoc.password)
    console.log(passOk);
    if(passOk === true) {
        console.log("Ho gayas");
        jwt.sign({ username,id:userDoc._id},salt2, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json({id:userDoc._id,username,
            });
        });
    }
    else
    {
        
    }
})

app.get('/profile', async (req, res) => { 

  const {token} = req.cookies;
  console.log(token);
  jwt.verify(token,salt2,{}, (err,info) =>{
      if(err) throw err;
      res.json(info);
  }) 
})  

app.post('/logout', async (req, res) => {
  res.cookie('token','').json('OK');
})

app.post('/post', uplode.single('file'), async (req, res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  

  const {token} = req.cookies;
  console.log(token);
  jwt.verify(token,salt2,{}, async (err,info) =>{
      if(err) throw err;
      const {title,content,summary} = req.body;
      const postdoc = await post.create({
        title,
        content,
        summary,
        file:newPath,
        author:info.id,
      })
      res.json(info);
  }) 

})

app.get('/post', async (req, res) => {
  res.json(await post.find().populate('author'))
}) 

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  res.json(await post.findById(id).populate('author'))
}) 

app.put('/post',uplode.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, salt2, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postdoc = await post.findById(id);
    const isAuthor = JSON.stringify(postdoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postdoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postdoc.cover,
    });

    res.json(postdoc);
  });

}) 




app.get('/test', async (req, res) => {
    res.json("Hello");
})   

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
