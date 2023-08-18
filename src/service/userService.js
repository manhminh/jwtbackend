import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

// init salt
const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}


const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('Insert into  users(email, password, username) Value(?, ?, ?)', [email, hashPassword, username],);
        return rows;
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
        const [rows, fields] = await connection.execute('Select * from  users');
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
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        return rows;
    } catch (error) {
        console.log('check error', error);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser
}