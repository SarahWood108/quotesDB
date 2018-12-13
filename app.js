const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))



MongoClient.connect('mongodb://sandbox:sandbox1@ds013564.mlab.com:13564/quotesdb', (err, database) => {
    if(err) return console.log(err)
    db = database.db('quotesdb')
    app.listen(3000, function() {
    console.log("listening on port 3000")
    })
})

app.get('/', ( req, res) =>{
    let cursor = db.collection("quotes").find().toArray(function(err, results){
        if (err) return console.log(err)
        console.log(results)
        res.render('index.pug',{quotes:results})
    })
   
    
})
app.post('/quotes',(req, res) =>{
  db.collection('quotes').save(req.body, (err, result) => {
      if(err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
  })

})





// app.listen(3000, function(){
    
// })