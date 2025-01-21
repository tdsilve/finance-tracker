import express from "express";

import { getUsers } from "../../db/model/users";

export const getAllUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        if (!users || users.length === 0) return res.status(404).json({message: "Could not find users"});
        return res.status(200).json(users);
    } catch (error) {
        console.log("getAllUsers error: ", error)
        return res.status(400).json(`getAllUsers error: ${error}`)
    }
}