import userService from "../service/userService.js";

// MVC

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);
    return res.redirect("/user");
}

const handleDeleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPaage = async (req, res) => {
    let user = await userService.getUserById(req.params.id);
    let userData = {};
    if (user && user.length > 0) {
        userData = user[0];
    }
    console.log(">>> check user data: ", userData);
    return res.render("user-update.ejs", { userData });
}

const handleUpdateUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    console.log(email);
    userService.updateUser(email, username, id);
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPaage,
    handleUpdateUser
}