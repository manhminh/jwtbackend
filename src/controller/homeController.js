import userService from "../service/userService.js";

// MVC

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);
    userService.getUserList();
    return res.send("create new user");
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}