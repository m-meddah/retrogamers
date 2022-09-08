const express = require('express');

const { gameController: controller} = require('../../controllers');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

/**
 * GET /api/games/{id}
 * @summary Get one game
 * @tags Game
 * @param {number} id.path.required - game identifier
 * @return {Game} 200 - success response -application/json
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Game not found - application/json
 * 
 */
router.get('/:id(\\d+)', controllerHandler(controller.getOne));

module.exports = router;