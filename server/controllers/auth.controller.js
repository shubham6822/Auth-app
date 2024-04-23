import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { erorrHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10); // Fix typo here
        const newUser = new User({ username, email, password: hashedPassword }); // Use User instead of user
        await newUser.save();
        res.status(200).json({ message: "User created successfully" }); // Fix typo in message
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUserData = await User.findOne({ email })
        if (!validUserData) return next(erorrHandler(404, "User not Found!"))
        const validpassword = await bcrypt.compareSync(password, validUserData.password)
        if (!validpassword) return next(erorrHandler(401, "Wrong cerdentails.."));
        const token = jwt.sign({ id: validUserData._id }, "shubham")
        //const { password: hashedPassword, ...rest } = userData._doc;
        res.cookie("access_token", token, { httpOnly: true, maxAge: 86400000, secure: true, sameSite: 'none', path: "/" }).json(validUserData);

    } catch (error) {
        next(error)
    }
}


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, "shubham");
            //const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            let username = req.body.email; // Default username to email
            if (req.body.name && typeof req.body.name === 'string') {
                username = req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8);
            }
            const newUser = new User({
                username: username,
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, "shubham");
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json({ username: newUser.username, email: newUser.email }); // Sending only username and email as response
        }
    } catch (error) {
        next(error);
    }
};
