const { User } = require('../models');

const userController = {
  // Retrieve all users
  getAllUsers(req, res) {
    User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  }
}
  


  

module.exports = userController;