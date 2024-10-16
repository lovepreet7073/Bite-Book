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
module.exports = {
    getUserProfile
}