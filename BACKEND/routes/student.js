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
        console.error(err.message);
        res.status(500).json('Error adding student');
    })
});

router.route('/').get((req,res) => {
    Students.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        console.error(err.message);
        res.status(500).json('Error fetching students');
    });
});

router.route('/update/:id').put(async (req,res) => {
    const id = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(id, updateStudent).then(() => {
        res.status(200).json('Student updated');
    }).catch((err) => {
        console.error(err.message);
        res.status(500).json('Error updating student');
    });
});

router.route('/delete/:id').delete(async (req,res) => {
    const id = req.params.id;

    await Student.findByIdAndDelete(id).then(() => {
        res.status(200).json('Student deleted');
    }).catch((err) => {
        console.error(err.message);
        res.status(500).json('Error deleting student');
    });
});

router.route('/get/:id').get(async (req,res) => {
    const id = req.params.id;

    const filterStudent = await Student.findById(id).then((student) => {
        res.status(200).json(student).send({ student : filterStudent });
    }).catch((err) => {
        console.error(err.message);
        res.status(500).json('Error fetching student');
    });
});    


module.exports = router;