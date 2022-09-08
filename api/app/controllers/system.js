const systemDataMapper = require('../models/system');
const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    /**
     * System controller to get all records
     * @param {object} _ Express req.object (not used)
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const systems = await systemDataMapper.findAll();
        return res.json(systems)
    },

    /**
     * System controller to get one record
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const system = await systemDataMapper.findByPk(req.params.id);

        if (!system) {
            throw new ApiError('System not found', { statusCode: 404 });
        };

        return res.json(system);
    },

    /**
     * System controller to get all games from this system
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAllGames(req, res) {
        const games = await systemDataMapper.findAllGames(req.params.id);

        if (games.length === 0) {
            throw new ApiError('System not found', { statusCode: 404 })
        };

        return res.json(games);
    }
};
