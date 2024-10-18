const userService = require("../Services/userService");
const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if (!jwt) {
            return res.status(404).send({ error: "token not found" });
        }
        const user = await userService.getUserByToken(jwt);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { fullName, email } = req.body;
    console.log(fullName,email)
    // const profile_pic = req.file ? req.file.filename : undefined;
    try {
      // Fetch the user by email
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .send({ message: `User not found with email: ${email}` });
      }
  
      // Update user details
      user.fullName = fullName || user.fullName;
      
    //   user.profile_pic = profile_pic || user.profile_pic
      // Save the updated user in the database
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