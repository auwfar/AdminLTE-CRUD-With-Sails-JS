/**
 * AuthController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var md5 	= require('md5');
module.exports = {
	login: function(req, res) {
		var knex 		= sails.config.knex;
		var out 		= {};

		if (req.param('username') !== '' && req.param('password') !== '') {
			knex('admin').where({
				admin_username: req.param('username'),
				admin_password: md5(req.param('password'))
			}).then(function(result) {
				if (result.length === 0) {
					out = {
						status: false,
						msg: 'Username/Password Salah Silahkan Login Kembali !'
					};
				} else {
					out = {
						status: true
					};
					req.session.data_login = result[0];
				}
				res.send(out);
			});
		} else {
			out = {
				status: false,
				msg: 'Username/Password tidak boleh kosong !'
			};
			res.send(out);
		}
	},
	logout: function(req, res) {
		req.session.destroy();
		res.redirect('/');
	}
};