const express = require('express');

const ctrl = require('../../controllers/contacts');
const router = express.Router();

const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', ctrl.listAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.contactJoiSchema), ctrl.addNew);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.contactJoiSchema),
  ctrl.updById
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteJoiSchema),
  ctrl.updFavorite
);

router.delete('/:contactId', isValidId, ctrl.deleteById);

module.exports = router;
