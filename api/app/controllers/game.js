const gameDatamapper = require('../models/game');
const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    /**
     * Game controller to get one record
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const game = await gameDatamapper.findOne(req.params.id);

        if (!game) {
            throw new ApiError('Game not found', { statusCode: 404 });
        };

        return res.json(game);
    }
};
