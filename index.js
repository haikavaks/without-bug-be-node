require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 80;

const db = require('./app/models');
const Role = db.role;
const Gadget = db.gadget;

// todo Avoid force later
db.sequelize.sync({force: false}).then(() => {
  initial();
}).catch(()=>{

});


function initial() {
  Role.create({
    id: 1,
    name: 'superAdmin'
  });

  Role.create({
    id: 2,
    name: 'admin'
  });

  Role.create({
    id: 3,
    name: 'qa'
  });
  Role.create({
    id: 4,
    name: 'company'
  });
  Gadget.create({
    brand: "One plus",
    model: "5t",
    osVersion: "Android 10",
    type: "phone",
    pending: false
  })
  // User.create({
  //   firstName: "Hayk",
  //   lastName: "avagyan",
  //   email:"haikavaks@gmail.com",
  //   password: ""
  // })

}


app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/gadgets.routes')(app);

app.listen(PORT, ()=>{
  console.log('here');
})
