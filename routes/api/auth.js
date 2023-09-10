const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/users');

const router = express.Router();

router.post('/signup', validateBody(schemas.userSignupJoiSchema), ctrl.signUp);

router.post('/login', validateBody(schemas.userLoginJoiSchema), ctrl.logIn);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.userChangeSubscriptionSchema),
  ctrl.changeSubscription
);

module.exports = router;
