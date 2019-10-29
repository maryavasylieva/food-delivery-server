const debug = require("debug")("controller");

const { userService } = require("../services/user-service");

module.exports = {
  postUser: async function(req, res) {
    try {
      const user = await userService.postUser(req.body);
      res.json(user);
    } catch (e) {
      debug("error %O", e);
    }
  },

  getById: async function(res, req) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getUser(id);
      res.json(user);
    } catch (e) {
      debug("Catch error %O", e);
    }
  }
};
