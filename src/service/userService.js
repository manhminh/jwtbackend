import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

// init salt
const salt = bcrypt.genSaltSync(10);

/**
 * bump password to encode password
 * @param {*} password 
 * @returns 
 */
const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

/**
 * connect to DB and handle create a user
 * @param {*} email 
 * @param {*} password 
 * @param {*} username 
 */
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

/**
 * read infor all users
 */
const getUserList = () => {
    connection.query(
        'Select * from  users',
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log('check result', results);
        }
    );
}

module.exports = {
    createNewUser, getUserList
}