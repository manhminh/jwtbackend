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
            where: { id: id }
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