import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request)
    
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if(countUser == 1){
        throw new ResponseError(400, "Username Already Exists")
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });

}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    //select ke database menggunakan username
    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username,
        },
        select: {
            username: true,
            password: true
        }
    });

    //jika user tidak ketemu
    if(!user){
        throw new ResponseError(401, "Username or password wrong!");
    }

    //jika user ketemu maka cek passwordnya
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
    if(!isPasswordValid){
        throw new ResponseError(401, "Username or password wrong!");
    }

    //jika passwordnya valid maka bikin token
    const token = uuid().toString();

    //update token ke database
    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    //select data berdasarkan username didatabase
    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        },
        select : {
            username: true,
            name: true
        }
    });

    //cek user apakah ada
    if(!user){
        throw new ResponseError(404, "user is not found")
    }

    //jika ada return user
    return user;
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username) 

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if(!user){
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}