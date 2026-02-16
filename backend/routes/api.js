const express = require('express');
const router = express.Router();
router.get('/monthly', apiController.getMonthly);
router.get('/insights', apiController.getInsights);