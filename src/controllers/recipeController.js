const { recipeService } = require('../services');
const { code, error } = require('../schema');

const createRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const payload = req.user;

    const { status, notification } = await recipeService.createRecipe(recipe, payload);

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

module.exports = {
  createRecipe,
};