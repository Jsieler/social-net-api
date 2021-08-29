const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
    
} = require('../../controllers/user-controller')

router
//  /api/users
.route('/')
.get(getAllUsers)
.post(createUser)

router
//  /api/users/:id
.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById)

router
//  /api/users/:userId/friends/:friendId
.route('/:id/friends/friendId')
.post(addFriend)
.delete(deleteFriend)





module.exports = router;