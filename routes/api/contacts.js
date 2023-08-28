const express = require('express');

const ctrl = require('../../controllers/contacts');
const router = express.Router();

const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.listAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addNew);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updById);

router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
