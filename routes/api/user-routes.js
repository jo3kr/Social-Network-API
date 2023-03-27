const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Set up GET all and POST at /api/users
router.route("/").get(getAllUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Route to add a friend
router.route("/:userId/friends/:friendId").post(addFriend);

// Route to remove a friend
router.route("/:userId/friends/:friendId").delete(removeFriend);
module.exports = router;
