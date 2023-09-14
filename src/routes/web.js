import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    //path, handle
    router.get("/", homeController.handleHelloWorld);
    router.get("/users", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/users/delete-user/:id", homeController.handleDeleteUser);
    router.get("/users/update-user/:id", homeController.getUpdateUserPage);
    router.post("/users/update-user/:id", homeController.handleUpdateUser);

    return app.use("/", router);
}

export default initWebRoutes;

