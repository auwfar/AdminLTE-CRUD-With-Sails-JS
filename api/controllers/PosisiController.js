/**
 * PosisiController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			res.view('posisi/index');
		}
	},
	get: function(req, res) {
		var knex = sails.config.knex;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			knex.select().table('posisi').then(function(result) {
				var number = 1;
				result.forEach(function(val, key) {
					result[key].number 	= number;
					result[key].act 	= '<button class="btn btn-warning btn-posisi-update" data-id="'+val.posisi_id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-posisi-delete" data-id="'+val.posisi_id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-posisi-detail" data-id="'+val.posisi_id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button>';
					number++;
				});
				var data = {
					"data" : result
				};

				res.send(data);
			});
		}
	},
	add: function(req, res) {
		if (!req.isSocket) {
	      return res.badRequest();
	    }

	    var out 		= {};
		var knex 		= sails.config.knex;
		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var param 		= req.allParams();
			var posisi 		= param[0].value;

			if (posisi !== '') {
				var data = {
					posisi_name: posisi
				};

				knex('posisi').insert(data).then(function(id) {
					out = {
						status: true
					};
					sails.sockets.broadcast('global', 'posisi_add', out);
				});
				res.send(out);
			} else {
				out = {
					status: false,
					msg: 'Posisi tidak boleh kosong'
				};

				res.send(out);
			}
		}
	}
};