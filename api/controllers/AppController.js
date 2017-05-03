/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	public: function(req, res) {
		if (!req.isSocket || req.session.data_login === undefined) {
	      return res.badRequest();
	    }

		var room = 'global';

		SocketService.join(req.socket, room);
	}
};

