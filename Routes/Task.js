const express = require("express");
const router = express.Router();
const Task = require('../schema/Task');
// post request
router.post("/create", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ message: "Task created", task });
    } catch (error) {
        console.error("Error creating task", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// get task by userid
router.get("/user/:userId", async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.status(200).send({message:"Tasks retrieved", tasks});
    } catch (error) {
        console.error("Error retrieving tasks", error);
        res.status(500).json({ message: "error fetching tasks",error:error.message });
    }   
});
module.exports = router;