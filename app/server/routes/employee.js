import express from 'express';
const router = express.Router();

import employee_controller from '../controllers/employee';

router.get('/', employee_controller.employee_list);
router.post('/', employee_controller.employee_create);
router.delete('/', employee_controller.employee_bulk_delete);

router.get('/:id', employee_controller.employee_detail);
router.put('/:id', employee_controller.employee_update);
router.delete('/:id', employee_controller.employee_delete);


module.exports = router;
