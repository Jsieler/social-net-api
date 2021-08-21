const { Thought, User } = require('../models');

const thoughtController = {
    
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThought => {
            res.json(dbThought);
          })
          .catch(err => {
            res.json(err);
          });
      },

      // GET to get single thought by its _id
      getThoughtById({ params }, res) {
          Thought.findOne({ _id: params.id})
          .populate({
            path: 'reactions',
            selet: '-__v'
          })
          .selet('-__v')
          .then((dbThought) => {
            if (!dbThought) {
              res.status(404).json({ message: "No Thought found with this ID" });
              return
            }
            res.json(dbThought);
          })
          .catch((err) => {
            res.json(err);
          });
      },
      
      // POST to create a new thought (dont forget to push created thought's _id to associated user's thoughts array field)
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            )
        })
        .then((dbThought) => {
            if (!dbThought) {
              res.status(404).json({ message: "No Thought found with this ID" });
              return
            }
            res.json(dbThought);
          })
          .catch((err) => {
            res.json(err);
          });
    },

    // PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                selet: '-__v'
            })
            .selet('-__v')
            .then((dbThought) => {
                if (!dbThought) {
                  res.status(404).json({ message: "No Thought found with this ID" });
                  return
                }
                res.json(dbThought);
              })
              .catch((err) => {
                res.json(err);
              });
    },

    // DELETE to remove a thought by its _id
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then((dbThought) => {
            if (!dbThought) {
              res.status(404).json({ message: "No Thought found with this ID" });
              return
            }
            res.json(dbThought);
          })
          .catch((err) => {
            res.json(err);
          });
    },

    // POST to create a reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $push: { reaction: body }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            selet: '-__v'
        })
        .selet('-__v')
        .then((dbThought) => {
            if (!dbThought) {
              res.status(404).json({ message: "No Thought found with this ID" });
              return
            }
            res.json(dbThought);
          })
          .catch((err) => {
            res.json(err);
          });
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true }
            )
            .then((dbThought) => {
                if (!dbThought) {
                  res.status(404).json({ message: "No Thought found with this ID" });
                  return
                }
                res.json(dbThought);
              })
              .catch((err) => {
                res.json(err);
              });
    }





}
module.exports = thoughtController