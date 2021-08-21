const { User } = require('../models');

const UserController = {

  // GET all user
  getAllUsers(req, res) {
    User.find({})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // GET a single user by its _id and pupulated thought and friend data 
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'thoughts',
        selet: '-__v'
      })
      .populate({
        path: 'friends',
        selet: '-__v'
      })
      .selet('-__v')
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User found with this Id" });
          return
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // POST a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // PUT to update a user by its _id
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId},
      body,
      { new: true, runValidator: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User found with this Id" });
          return
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // DELETE to remove user by its _id
  deleteUserById({ params }, res) {
    User.findByIdAndDelete({_id: params.userId})
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No User found with this Id" });
        return
      }
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  // POST to add a new friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .populate({
      path: 'friends',
      select: ('-__v')
    })
    .selet('-__v')
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No User found with this Id" });
        return
      }
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  // DELETE to remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .populate({
      path: 'friends',
      select: ('-__v')
    })
    .selet('-__v')
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No User found with this Id" });
        return
      }
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
  },



}




  


  

module.exports = UserController;