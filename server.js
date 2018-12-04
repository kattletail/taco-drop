const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var Binary = require('mongodb').Binary;
var f = require('util').format;
var fs = require('fs');

var db

MongoClient.connect('mongodb://admin:password1@ds151943.mlab.com:51943/taco-drop', (err, client) => {
  if (err) return console.log(err)
  db = client.db('taco-drop') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

// All your handlers here...

app.get('/', (req, res) => {
  db.collection('customers').find().toArray((err, result) => {
      db.collection('tacos').find().toArray((err, result2) => {
          db.collection('sides').find().toArray((err, result3) => {
              db.collection('drinks').find().toArray((err, result4) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {customers: result, tacos: result2, sides: result3, drinks: result4})
      })
     })
    })
  })
})

app.get('/order', (req, res) => {
  db.collection('customers').find().toArray((err, result) => {
      db.collection('tacos').find().toArray((err, result2) => {
          db.collection('sides').find().toArray((err, result3) => {
              db.collection('drinks').find().toArray((err, result4) => {
                  db.collection('sales').find().toArray((err, result5) => {
                      db.collection('discounts').find().toArray((err, result6) => {
    if (err) return console.log(err)
    // renders order.ejs
    res.render('order.ejs', {customers: result, tacos: result2, sides: result3, drinks: result4, sales: result5, discounts: result6})
      })
     })
    })
  })
})
})
})

app.get('/admin', (req, res) => {
  db.collection('customers').find().toArray((err, result) => {
      db.collection('tacos').find().toArray((err, result2) => {
          db.collection('sides').find().toArray((err, result3) => {
              db.collection('drinks').find().toArray((err, result4) => {
    if (err) return console.log(err)
    // renders admin.ejs
    res.render('admin.ejs', {customers: result, tacos: result2, sides: result3, drinks: result4})
      })
     })
    })
  })
})

app.get('/profile', (req, res) => {
  db.collection('customers').find().toArray((err, result) => {
      db.collection('tacos').find().toArray((err, result2) => {
          db.collection('sides').find().toArray((err, result3) => {
              db.collection('drinks').find().toArray((err, result4) => {
    if (err) return console.log(err)
    // renders profile.ejs
    res.render('profile.ejs', {customers: result, tacos: result2, sides: result3, drinks: result4})
      })
     })
    })
  })
})

app.get('/bon-appetit', (req, res) => {
  db.collection('customers').find().toArray((err, result) => {
      db.collection('tacos').find().toArray((err, result2) => {
          db.collection('sides').find().toArray((err, result3) => {
              db.collection('drinks').find().toArray((err, result4) => {
    if (err) return console.log(err)
    // renders bon-appetit.ejs
    res.render('bon-appetit.ejs', {customers: result, tacos: result2, sides: result3, drinks: result4})
      })
     })
    })
  })
})

app.get('/stats', (req, res) => {
  db.collection('customers').find().toArray((err, result) => {
      db.collection('tacos').find().toArray((err, result2) => {
          db.collection('sides').find().toArray((err, result3) => {
              db.collection('drinks').find().toArray((err, result4) => {
                  db.collection('sales').find().toArray((err, result5) => {
    if (err) return console.log(err)
    // renders stats.ejs
    res.render('stats.ejs', {customers: result, tacos: result2, sides: result3, drinks: result4, sales: result5})
      })
     })
    })
  })
})
})

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/customers', (req, res) => {
  db.collection('customers').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('customers saved to database')
    res.redirect('/order')
  })
})

app.post('/tacos', (req, res) => {
  db.collection('tacos').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('tacos saved to database')
    res.redirect('/order')
  })
})

app.post('/sides', (req, res) => {
  db.collection('sides').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('sides saved to database')
    res.redirect('/order')
  })
})

app.post('/drinks', (req, res) => {
  db.collection('drinks').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('drinks saved to database')
    res.redirect('/order')
  })
})

//place order through order page
app.post('/placeorder', (req, res) => {
  db.collection('sales').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log(req.body)
    res.redirect('/bon-appetit')
  })
    db.collection('tacos',function(err, collection){
    collection.remove({},function(err, removed){
        });        
    });
    db.collection('sides',function(err, collection){
    collection.remove({},function(err, removed){
        });        
    });
    db.collection('drinks',function(err, collection){
    collection.remove({},function(err, removed){
        });        
    });
    db.collection('discounts').findOneAndUpdate({'applied': "True"},
            {$set: {'applied': "False"}}, (err, result2) => {
            if (err) return res.send(500, err);
    });    
})


app.get('/', (req, res) => {
  var cursor = db.collection('customers').find()
  db.collection('customers').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
  res.render(view, locals)
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('tacos').find()
  db.collection('tacos').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
  res.render(view, locals)
  })
})

//delete taco through order page
app.get('/tacos/delete/:id', (req, res) => {
   var uid = req.params.id;
   db.collection('tacos').findOneAndDelete({'_id': ObjectId(uid)}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('taco removed from database')
      res.redirect('/order')
   }); 
});

//delete side through order page
app.get('/sides/delete/:id', (req, res) => {
   var uid = req.params.id;
   db.collection('sides').findOneAndDelete({'_id': ObjectId(uid)}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('sides removed from database')
      res.redirect('/order')
   }); 
});

//delete drink through order page
app.get('/drinks/delete/:id', (req, res) => {
   var uid = req.params.id;
   db.collection('drinks').findOneAndDelete({'_id': ObjectId(uid)}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('drink removed from database')
      res.redirect('/order')
   }); 
});

//delete customer through admin page
app.get('/customers/delete/:id', (req, res) => {
   var uid = req.params.id;
   db.collection('customers').findOneAndDelete({'_id': ObjectId(uid)}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('customer removed from database')
      res.redirect('/admin')
   }); 
});

//apply discount through order page
app.post('/discount', (req, res) => {
   var discount = req.body.discount;
   db.collection('discounts').findOne({'code': discount}, (err, result) => {
      if(result != null){
          db.collection('discounts').findOneAndUpdate({'applied': "True"},
            {$set: {'applied': "False"}}, (err, result2) => {
            if (err) return res.send(500, err);
          });
          db.collection('discounts').findOneAndUpdate({'code': discount},
            {$set: {'applied': "True"}}, (err, result2) => {
            if (err) return res.send(500, err);
          });
          console.log('discount applied');
      }else{
          console.log('discount not found');
      }
      if (err) return res.send(500, err);
      res.redirect('/order');
   }); 
});

//update customer info through admin page
app.post('/customers/update', (req, res) => {
   var uid = req.body._id;
   var password = req.body.password;
   var email = req.body.email;
   var fname = req.body.fname;
   var lname = req.body.lname;
   var street = req.body.street;
   var city = req.body.city;
   var state = req.body.state;
   var zip = req.body.zip;
   var phone_number = req.body.phone_number;
   var admin;
   if (req.body.admin == "on"){
       var admin = "True";
   } else {
       var admin = "False";
   }
   db.collection('customers').findOneAndUpdate({'_id': ObjectId(uid)},
      {$set: {'password': password, 'email': email, 'fname': fname, 'lname':lname,
             'street': street, 'city': city, 'state': state, 'zip': zip,
             'phone_number': phone_number, 'admin': admin}}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('customer updated ' + uid)
      res.redirect('/admin')
   }); 
});

//create new profile from admin page
app.post('/customers/create', (req, res) => {
   var password = req.body.password;
   var email = req.body.email;
   var fname = req.body.fname;
   var lname = req.body.lname;
   var street = req.body.street;
   var city = req.body.city;
   var state = req.body.state;
   var zip = req.body.zip;
   var phone_number = req.body.phone_number;
   var admin;
   if (req.body.admin == "on"){
       var admin = "True";
   } else {
       var admin = "False";
   }
   db.collection('customers').save({'password': password, 'email': email, 'fname': fname, 'lname':lname,
             'street': street, 'city': city, 'state': state, 'zip': zip,
             'phone_number': phone_number, 'admin': admin}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('customer created')
      res.redirect('/admin')
   }); 
});

//update profile info through profile page
app.post('/profile/update', (req, res) => {
   var uid = req.body._id;
   var password = req.body.password;
   var email = req.body.email;
   var fname = req.body.fname;
   var lname = req.body.lname;
   var street = req.body.street;
   var city = req.body.city;
   var state = req.body.state;
   var zip = req.body.zip;
   var phone_number = req.body.phone_number;
   var admin = req.body.admin;
   db.collection('customers').findOneAndUpdate({'_id': ObjectId(uid)},
      {$set: {'password': password, 'email': email, 'fname': fname, 'lname':lname,
             'street': street, 'city': city, 'state': state, 'zip': zip,
             'phone_number': phone_number, 'admin': admin}}, (err, result) => {
      if (err) return res.send(500, err);
      console.log('customer updated ' + fname + " " + lname + " " + uid)
      res.redirect('/profile')
   }); 
});

//update password through profile page
app.post('/password/update', (req, res) => {
   var uid = req.body._id;
   var password = req.body.password;
   var newpassword = req.body.newpassword;
      db.collection('customers').findOne({'_id': ObjectId(uid), 'password': password}, function(err, result) {
      if (err) return res.send(500, err);
      if(result == null){
          console.log('Password change failed - no profile matched information');
          res.redirect('/profile')
      }else{
              db.collection('customers').findOneAndUpdate({'_id': ObjectId(uid)},
                {$set: {'password': newpassword}}, (err, result2) => {
                if (err) return res.send(500, err);
              })
             console.log('Password change success');
             res.redirect('/profile'); 
          }
   }); 
});

//logout and return to main page
app.get('/logout', (req, res) => {
    db.collection('customers').findOneAndUpdate({'current_user': "True"},
            {$set: {'current_user': "False"}}, (err, result) => {
            if (err) return res.send(500, err);
            })
    db.collection('tacos',function(err, collection){
    collection.remove({},function(err, removed){
        });        
    });
    db.collection('sides',function(err, collection){
    collection.remove({},function(err, removed){
        });        
    });
    db.collection('drinks',function(err, collection){
    collection.remove({},function(err, removed){
        });        
    });
    db.collection('discounts').findOneAndUpdate({'applied': "True"},
            {$set: {'applied': "False"}}, (err, result2) => {
            if (err) return res.send(500, err);
    });
    console.log('User logged out');
    res.redirect('/'); 
});

app.post('/login', (req, res) => {
   var email = req.body.email;
   var password = req.body.password;
   db.collection('customers').findOne({'email': email, 'password': password}, function(err, result) {
      if (err) return res.send(500, err);
      if(result == null){
          console.log('Login failed - no profile matched information');
          res.redirect('/')
      }else{
          if(result.admin == "True"){
              db.collection('customers').findOneAndUpdate({'current_user': "True"},
                {$set: {'current_user': "False"}}, (err, result2) => {
                if (err) return res.send(500, err);
              })
              db.collection('customers').findOneAndUpdate({'_id': result._id},
                {$set: {'current_user': "True"}}, (err, result) => {
                if (err) return res.send(500, err);
              })
             fs.writeFile('cookie', result._id, function(err){
             if (err) throw err;
           });
             console.log('Admin login success');
             res.redirect('/');
          }
          if(result.admin == "False"){
              db.collection('customers').findOneAndUpdate({'current_user': "True"},
                {$set: {'current_user': "False"}}, (err, result2) => {
                if (err) return res.send(500, err);
              })
              db.collection('customers').findOneAndUpdate({'_id': result._id},
                {$set: {'current_user': "True"}}, (err, result) => {
                if (err) return res.send(500, err);
              })
             console.log('User Login success');
             res.redirect('/'); 
          }
      }
   }); 
});
