const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/get-students", adminController.getStudent);

router.post("/add-student", adminController.addStudentInDatabase);

router.get("/studentDetails/:studentId", adminController.getStudentById);

router.get("/get-teachers", adminController.getTeacher);

router.post("/add-teacher", adminController.addTeacher);

router.get("/teachersDetails/:teacherId", adminController.getTeacherById);

router.post("/add-parent", adminController.addParent);

// router.get("/parentsDetails/:studentId", adminController.getParentsDetails);

router.post('/add-studentEducation-details', adminController.addStudentEducationDetails);

router.post('/add-feesDetails', adminController.addFeesDetails);

router.get('/getFeesDetailsById/:studentId', adminController.getFeesDetailsByStudentId);

module.exports = router;
