const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
// const mongodb = require('mongodb').MongoClient;

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);

// const MONGODB_URI = 'mongodb+srv://admin-bspkbh:J4Aur1TP8eQzO1oh@nodejs-ilq7l.mongodb.net/shop2?retryWrites=true&w=majority';

// const uri = "mongodb+srv://admin-bspkbh:<password>@nodejs-ilq7l.mongodb.net/<dbname>?retryWrites=true&w=majority";
// let newProduct = '';
// mongodb.connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(client => {
//     // console.log('You are now connected to the database');
//     // client.close();
//     console.log('You are now connected to the database');
//     client.db().collection('products').insertOne({name: 'product', price: 2.99}).then(result => {
//       console.log(result);
//     }).catch(err => {
//       console.log(err);
//       client.close();
//       res.status(201).json({ message: 'Product added', productId: 'DUMMY' });
//     });

//   })
//   .catch(err => {
//     console.log(err);
//   });

db.initDb((err, db) => {
  if (err) {
    console.log(err)
  } else {
    console.log('You are now connected to the database!')
    app.listen(3100);
  }
});


