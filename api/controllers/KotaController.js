/**
 * KotaController
 *
 * @description :: Server-side logic for managing kotas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			res.view('kota/index');
		}
	},
	get: function(req, res) {
		var knex = sails.config.knex;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			knex.select().table('kota').then(function(result) {
				var number = 1;
				result.forEach(function(val, key) {
					result[key].number 	= number;
					result[key].act 	= '<div class="btn-group"><button class="btn btn-warning btn-kota-update" data-id="'+val.kota_id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-kota-delete" data-id="'+val.kota_id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-kota-detail" data-id="'+val.kota_id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
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
	    var out 		= {};
		var knex 		= sails.config.knex;
		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var kota 		= req.param('kota_name');
			if (kota !== '') {
				var data = {
					kota_name: kota
				};

				knex('kota').insert(data).then(function(id) {
					out = {
						status: true,
						msg: 'Data Kota berhasil ditambahkan'
					};
					sails.sockets.broadcast('global', 'kota_add', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'Kota tidak boleh kosong'
				};

				res.send(out);
			}
		}
	},
	show_edit: function(req, res) {
		var knex = sails.config.knex;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var kota_id = req.param('kota_id');
			if (kota_id !== '') {
				knex.select().table('kota').where({
					kota_id: kota_id
				}).then(function(result) {
					out = {
						status: true,
						data: result[0]
					};

					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'ID Kota tidak boleh kosong'
				};

				res.send(out);
			}
		}
	},
	update: function(req, res) {
	    var out 		= {};
		var knex 		= sails.config.knex;
		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var kota_id 		= req.param('kota_id');
			var kota 			= req.param('kota_name');
			if (kota !== '') {
				var data = {
					kota_name: kota
				};

				knex('kota').where({
					kota_id: kota_id
				}).update(data).then(function(id) {
					out = {
						status: true,
						msg: 'Data Kota berhasil diupdate'
					};
					sails.sockets.broadcast('global', 'kota_update', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'Kota tidak boleh kosong'
				};

				res.send(out);
			}
		}
	},
	delete: function(req, res) {
	    var out 		= {};
		var knex 		= sails.config.knex;
		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var kota_id 		= req.param('kota_id');
			if (kota_id !== '') {
				knex('kota').where({
					kota_id: kota_id
				}).del().then(function(id) {
					out = {
						status: true,
						msg: 'Data Kota berhasil dihapus'
					};
					sails.sockets.broadcast('global', 'kota_delete', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'ID Kota tidak boleh kosong'
				};

				res.send(out);
			}
		}
	},
	detail: function(req, res) {
		var out 		= {};
		var knex 		= sails.config.knex;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var kota_id = req.param('kota_id');
			if (kota_id !== '') {
				knex
				.select('pegawai_name', 'pegawai_telp', knex.raw('IF(pegawai_gender="L", "Laki-laki", "Perempuan") AS pegawai_gender'), 'posisi_name')
				.from('pegawai')
				.leftJoin('posisi', 'pegawai.pegawai_posisi_id', 'posisi.posisi_id')
				.where('pegawai_kota_id', kota_id)
				.then(function(result) {
					var data = {
						"data" : result
					};

					res.send(data);
				});
			} else {
				out = {
					status: false,
					msg: 'ID Kota tidak boleh kosong'
				};

				res.send(out);
			}
		}
	}
};

