import express from 'express';
const router = express.Router();

import department_controller from '../controllers/department';

router.get('/', department_controller.department_list);
router.post('/', department_controller.department_create);

router.put('/:id', department_controller.department_update);


module.exports = router;
