import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

// init salt
const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}


const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    // let checkUserPassword = bcrypt.compareSync(password, hashPassword);

    connection.query(
        'Insert into  users(email, password, username) Value(?, ?, ?)', [email, hashPassword, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // let users = [];
    // return connection.query(
    //     'Select * from  users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         return users
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('Select * from  users');
        return rows;
    } catch (error) {
        console.log('check error', error);
    }

}

module.exports = {
    createNewUser, getUserList
}