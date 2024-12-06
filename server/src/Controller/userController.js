const userService = require("../Services/userService");

//USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    const user = await userService.getUserByToken(jwt);
    await user.populate("favorites");
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//UPDATE USER DATA
const updateUser = async (req, res) => {
  const { fullName, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: `User not found with email: ${email}` });
    }
    user.fullName = fullName || user.fullName;
    const updatedUser = await user.save();
    return res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


module.exports = {
  getUserProfile,
  updateUser
}