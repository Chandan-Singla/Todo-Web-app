const express = require('express');
const router = express.Router();

const actionsController = require('../controllers/actions_controller');
router.use(express.urlencoded({ extended: true }));
router.post('/create-task', actionsController.create);
router.post('/delete-tasks', actionsController.delete);
module.exports = router;
