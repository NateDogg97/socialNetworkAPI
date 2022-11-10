const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/users/:userId/friends')
  .post(addFriend);

router.route('/users/:userId/friends/:friendId')
  .delete(removeFriend);

module.exports = router;
