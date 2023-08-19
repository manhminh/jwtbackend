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
        console.log('check error', error);
    }
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('Select * from  user');
        return rows;
    } catch (error) {
        console.log('check error', error);
    }
}

const deleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows;
    } catch (error) {
        console.log('check error', error);
    }
}

const getUserById = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('Select * from user WHERE id=?', [id]);
        return rows;
    } catch (error) {
        console.log('check error', error);
    }
}

const updateUser = async (email, username, id) => {
    // create the connection, specify bluebird as Promise

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username= ? WHERE id = ?', [email, username, id]);
        console.log(rows);
        return rows;
    } catch (error) {
        console.log('check error', error);
    }
}

module.exports = {
    createNewUser, getUserList,
    deleteUser, getUserById,
    updateUser
}