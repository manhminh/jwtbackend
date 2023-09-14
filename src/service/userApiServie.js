import db from "../models/index";
import { checkEmailExist, checkPhoneExist, hashUserPassword } from "./loginRegisterService";

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
        })
        console.log("check users: ", users);

        if (users) {
            return ({
                EM: "Get data success",
                EC: 0,
                DT: users
            })
        } else {
            return ({
                EM: "Get data success",
                EC: 0,
                DT: []
            })
        }

    } catch (error) {
        console.log(error);
        return ({
            EM: "Something is wrong with service",
            EC: 1,
            DT: []
        })
    }
}

const getUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "address", "sex"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            order: [["id", "DESC"]]
        })

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            users: rows
        }

        return ({
            EM: "Get data success",
            EC: 0,
            DT: data
        })
    } catch (error) {
        console.log(error);
        return ({
            EM: "Something is wrong with service",
            EC: 1,
            DT: []
        })
    }
}

const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist) {
            return ({
                EM: "The email is already existed",
                EC: 1,
                DT: "email"
            })
        }


        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist) {
            return ({
                EM: 'The phone is already existed',
                EC: 1,
                DT: "phone"
            })
        }

        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return ({
            EM: "Create success",
            EC: 0,
            DT: []
        })
    } catch (error) {
        console.log(error);
        return ({
            EM: "Something is wrong with service",
            EC: 1,
            DT: []
        })
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return ({
                EM: "Error with empty GroupId",
                EC: 1,
                DT: 'group'
            })
        }

        let user = await db.User.findOne({
            where: {
                id: data.id
            },
        })

        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return ({
                EM: "Update user success",
                EC: 0,
                DT: ''
            })
        } else {
            return ({
                EM: "User not found",
                EC: 2,
                DT: ''
            })
        }
    } catch (error) {
        console.log(error);
        return ({
            EM: "Something is wrong with service",
            EC: 1,
            DT: []
        })
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: id
            }
        })

        if (user) {
            await user.destroy();
            return ({
                EM: "Delete user success",
                EC: 0,
                DT: []
            })
        } else {
            return ({
                EM: "User is not exist",
                EC: 1,
                DT: []
            })
        }
    } catch (error) {
        console.log(error);
        return ({
            EM: "Something is wrong with service",
            EC: 1,
            DT: []
        })
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUsersWithPagination
}