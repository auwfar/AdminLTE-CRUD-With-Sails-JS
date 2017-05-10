/**
 * PegawaiController
 *
 * @description :: Server-side logic for managing pegawais
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Excel 	= require('exceljs');
module.exports = {
	index: function(req, res) {
		var knex = sails.config.knex;
		var kota, posisi;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			knex.select().table('kota').then(function(result) {
				kota = result;
			});
			knex.select().table('posisi').then(function(result) {
				posisi = result;
			});

			setTimeout(function() {
				res.view('pegawai/index', {
					"kota": kota,
					"posisi": posisi
				});
			}, 1000);
		}
	},
	get: function(req, res) {
		var knex = sails.config.knex;

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			knex.select(['pegawai_id', 'pegawai_name', 'pegawai_telp', 'kota_name', knex.raw('IF(pegawai_gender="L", "Laki-laki", "Perempuan") as pegawai_gender'), 'posisi_name'])
			.from('pegawai')
			.join('posisi', 'pegawai.pegawai_posisi_id', 'posisi.posisi_id')
			.join('kota', 'pegawai.pegawai_kota_id', 'kota.kota_id')
			.then(function(result) {
				result.forEach(function(val, key) {
					result[key].act 	= '<div class="btn-group"><button class="btn btn-warning btn-pegawai-update" data-id="'+val.pegawai_id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-pegawai-delete" data-id="'+val.pegawai_id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button></div>';
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
			var pegawai_name 	= req.param('pegawai_name');
			var pegawai_telp 	= req.param('pegawai_telp');
			var pegawai_kota 	= req.param('pegawai_kota');
			var pegawai_gender 	= req.param('pegawai_gender');
			var pegawai_posisi 	= req.param('pegawai_posisi');
			if (pegawai_name !== '' && pegawai_telp !== '' && pegawai_kota !== '' && pegawai_gender !== '' && pegawai_posisi !== '') {
				var data = {
					pegawai_name: pegawai_name,
					pegawai_telp: pegawai_telp,
					pegawai_kota_id: pegawai_kota,
					pegawai_gender: pegawai_gender,
					pegawai_posisi_id: pegawai_posisi
				};

				knex('pegawai').insert(data).then(function(id) {
					out = {
						status: true,
						msg: 'Data Pegawai berhasil ditambahkan'
					};
					sails.sockets.broadcast('global', 'pegawai_add', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'Pegawai tidak boleh kosong'
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
			var pegawai_id = req.param('pegawai_id');
			if (pegawai_id !== '') {
				knex.select().table('pegawai').where({
					pegawai_id: pegawai_id
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
					msg: 'ID Pegawai tidak boleh kosong'
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
			var pegawai_id 		= req.param('pegawai_id');
			var pegawai_name 	= req.param('pegawai_name');
			var pegawai_telp 	= req.param('pegawai_telp');
			var pegawai_kota 	= req.param('pegawai_kota');
			var pegawai_gender 	= req.param('pegawai_gender');
			var pegawai_posisi 	= req.param('pegawai_posisi');
			if (pegawai_id !== '' && pegawai_name !== '' && pegawai_telp !== '' && pegawai_kota !== '' && pegawai_gender !== '' && pegawai_posisi !== '') {
				var data = {
					pegawai_name: pegawai_name,
					pegawai_telp: pegawai_telp,
					pegawai_kota_id: pegawai_kota,
					pegawai_gender: pegawai_gender,
					pegawai_posisi_id: pegawai_posisi
				};

				knex('pegawai').where({
					pegawai_id: pegawai_id
				}).update(data).then(function(id) {
					out = {
						status: true,
						msg: 'Data Pegawai berhasil diupdate'
					};
					sails.sockets.broadcast('global', 'pegawai_update', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'Pegawai tidak boleh kosong'
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
			var pegawai_id 		= req.param('pegawai_id');
			if (pegawai_id !== '') {
				knex('pegawai').where({
					pegawai_id: pegawai_id
				}).del().then(function(id) {
					out = {
						status: true,
						msg: 'Data Pegawai berhasil dihapus'
					};
					sails.sockets.broadcast('global', 'pegawai_delete', out);
					res.send(out);
				});
			} else {
				out = {
					status: false,
					msg: 'ID Pegawai tidak boleh kosong'
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
			var sheet 		= workbook.addWorksheet('Data Pegawai');
			var worksheet 	= workbook.getWorksheet('Data Pegawai');

			worksheet.addRow(['ID Pegawai', 'Nama Pegawai', 'Telp Pegawai', 'Kota Pegawai', 'Jenis Kelamin', 'Posisi Pegawai']);
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
			worksheet.getCell('C1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('D1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('E1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('F1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};

			knex.select().table('pegawai').then(function(result) {
				var cell = 2;
				result.forEach(function(val, key) {
					worksheet.addRow([val.pegawai_id, val.pegawai_name, val.pegawai_telp, val.pegawai_kota_id, val.pegawai_gender, val.pegawai_posisi_id]);

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
					worksheet.getCell('C'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('D'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('E'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('F'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					cell++;
				});

				// Style
				worksheet.getRow(1).font = {size: 12, bold: true };
				worksheet.getColumn(1).width = 12;
				worksheet.getColumn(2).width = 30;
				worksheet.getColumn(3).width = 13;
				worksheet.getColumn(4).width = 14;
				worksheet.getColumn(5).width = 14;
				worksheet.getColumn(6).width = 15;

				workbook.xlsx.writeFile('./assets/excel/Data Pegawai.xlsx')
			    .then(function() {
					res.download('./assets/excel/Data Pegawai.xlsx', function (err) {
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

