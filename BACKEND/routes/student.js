const router = require('express').Router();
let Student = require('../models/student');

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStuden = new Student({
        name,
        age,
        gender
    });

    newStuden.save().then(() => {
        res.json('Student added');
    }).catch((err) => {
        console.log(err);
        res.status(500).json('Error adding student');
    })
});

module.exports = router;