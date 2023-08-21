import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models';

// init salt
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username
        })
    } catch (error) {
        console.log('>>> check error: ', error);
    }
}

const getUserList = async () => {
    let newUser = await db.User.findOne({
        attributes: ["id", "username", "email"],
        where: {
            id: 1
        },
        include: {
            model: db.Group,
            attributes: ["id", "name", "description"],
        },
        raw: true,
        nest: true
    })
    console.log('>>> check new user: ', newUser);

    let roles = await db.Role.findAll({
        include: {
            model: db.Group,
            where: {
                id: 1
            }
        },
        raw: true,
        nest: true
    })
    console.log('>>> check new role: ', roles);

    let users = [];
    users = await db.User.findAll({
        raw: true,
    });
    return users;
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId
        }
    });
}

const getUserById = async (id) => {
    const user = await db.User.findOne(
        {
            where: {
                id: id
            }
        },
    );
    return user.get({ plain: true });
}

const updateUser = async (email, username, id) => {
    await db.User.update({ email: email, username: username },
        {
            where: {
                id: id
            }
        });
}

module.exports = {
    createNewUser, getUserList,
    deleteUser, getUserById,
    updateUser
}