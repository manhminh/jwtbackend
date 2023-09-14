import db from "../models";
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");


const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) {
        return true;
    }
    return false;
}

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const registerNewUser = async (rawUserData) => {
    // check exist email, phone
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist) {
        return ({
            EM: 'The email is already existed',
            EC: 1
        })
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist) {
        return ({
            EM: 'The phone is already existed',
            EC: 1
        })
    }

    // hash pashword
    let hashPassword = hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({
        email: rawUserData.email,
        phone: rawUserData.phone,
        username: rawUserData.username,
        password: hashPassword
    })

    return ({
        EM: 'A user is created successfully',
        EC: 0
    })
}

const loginUser = async (rawUserData) => {
    console.log(rawUserData);
    let user = await db.User.findOne({
        where: {
            [Op.or]: [
                { email: rawUserData.valueLogin },
                { phone: rawUserData.valueLogin }
            ]
        }
    })
    if (user) {
        let isUserPassword = await bcrypt.compare(rawUserData.password, user.password);
        if (isUserPassword) {
            return ({
                EM: 'Login successfully',
                EC: 0,
                DT: user
            })
        }
    }

    return ({
        EM: 'Your email/phone or password is incorrect',
        EC: 1,
        DT: []
    })
}

module.exports = {
    registerNewUser,
    loginUser,
    hashUserPassword,
    checkEmailExist, checkPhoneExist
}