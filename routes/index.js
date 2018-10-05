'use strict'
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const fs = require('fs')
const config = require('config')

const errors = require('../util/error_handling')
const positionController = require( '../controllers/position' )
const routeController = require( '../controllers/route' )

router.get('/services/:lat/:lng', positionController.index )
router.post('/route', routeController.index )

module.exports = router
