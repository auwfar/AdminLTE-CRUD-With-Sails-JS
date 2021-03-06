/**
 * PosisiController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Excel 	= require('exceljs');
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
					result[key].act 	= '<div class="btn-group"><button class="btn btn-warning btn-posisi-update" data-id="'+val.posisi_id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-posisi-delete" data-id="'+val.posisi_id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-posisi-detail" data-id="'+val.posisi_id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
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
			var posisi 		= req.param('posisi_name');
			if (posisi !== '') {
				var data = {
					posisi_name: posisi
				};

				knex('posisi').insert(data).then(function(id) {
					out = {
						status: true,
						msg: 'Data Posisi berhasil ditambahkan'
					};
					sails.sockets.broadcast('global', 'posisi_add', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'Posisi tidak boleh kosong'
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
			var posisi_id = req.param('posisi_id');
			if (posisi_id !== '') {
				knex.select().table('posisi').where({
					posisi_id: posisi_id
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
					msg: 'ID Posisi tidak boleh kosong'
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
			var posisi_id 		= req.param('posisi_id');
			var posisi 			= req.param('posisi_name');
			if (posisi !== '') {
				var data = {
					posisi_name: posisi
				};

				knex('posisi').where({
					posisi_id: posisi_id
				}).update(data).then(function(id) {
					out = {
						status: true,
						msg: 'Data Posisi berhasil diupdate'
					};
					sails.sockets.broadcast('global', 'posisi_update', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'Posisi tidak boleh kosong'
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
			var posisi_id 		= req.param('posisi_id');
			if (posisi_id !== '') {
				knex('posisi').where({
					posisi_id: posisi_id
				}).del().then(function(id) {
					out = {
						status: true,
						msg: 'Data Posisi berhasil dihapus'
					};
					sails.sockets.broadcast('global', 'posisi_delete', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'ID Posisi tidak boleh kosong'
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
			var posisi_id = req.param('posisi_id');
			if (posisi_id !== '') {
				knex
				.select('pegawai_name', 'pegawai_telp', 'kota_name', knex.raw('IF(pegawai_gender="L", "Laki-laki", "Perempuan") AS pegawai_gender'))
				.from('pegawai')
				.leftJoin('kota', 'pegawai.pegawai_kota_id', 'kota.kota_id')
				.where('pegawai_posisi_id', posisi_id)
				.then(function(result) {
					var data = {
						"data" : result
					};

					res.send(data);
				});
			} else {
				out = {
					status: false,
					msg: 'ID Posisi tidak boleh kosong'
				};

				res.send(out);
			}
		}
	},
	export: function(req, res) {
		var knex = sails.config.knex;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			var workbook 	= new Excel.Workbook();
			var sheet 		= workbook.addWorksheet('Data Posisi');
			var worksheet 	= workbook.getWorksheet('Data Posisi');

			worksheet.addRow(['ID Posisi', 'Nama Posisi']);
			worksheet.getCell('A1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('B1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};

			knex.select().table('posisi').then(function(result) {
				var cell = 2;
				result.forEach(function(val, key) {
					worksheet.addRow([val.posisi_id, val.posisi_name]);

					worksheet.getCell('A'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('B'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					cell++;
				});

				// Style
				worksheet.getRow(1).font = {size: 12, bold: true };
				worksheet.getColumn(1).width = 8;
				worksheet.getColumn(2).width = 18;

				workbook.xlsx.writeFile('./assets/excel/Data Posisi.xlsx')
			    .then(function() {
					res.download('./assets/excel/Data Posisi.xlsx', function (err) {
			            if (err) {
			              return res.serverError(err);
			            } else {
			              return res.ok();
			            }
			        });
			    });
			});
		}
	}
};