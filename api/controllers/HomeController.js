/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function rand_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	index: function(req, res) {
		var knex = sails.config.knex;
		var rand = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
		var pegawai, posisi, kota;
		var data_posisi=[], data_kota=[];

		if (req.session.data_login === undefined) {
			res.redirect('/');
		} else {
			knex.select().table('pegawai').then(function(result) {
				pegawai = result.length;
			});

			knex.select().table('posisi').then(function(result_posisi) {
				posisi = result_posisi.length;

				var index = 0;
				result_posisi.forEach(function(val, key) {
					var color = '#' +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)];

					knex('pegawai').where({
						pegawai_posisi_id: val.posisi_id
					}).then(function(result_pegawai) {
						data_posisi.push({
							value: result_pegawai.length,
							color: color,
							highlight: color,
							label: val.posisi_name
						});
						index++;
					});
				});
			});

			knex.select().table('kota').then(function(result_kota) {
				kota = result_kota.length;

				var index = 0;
				result_kota.forEach(function(val, key) {
					var color = '#' +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)] +rand[rand_number(0,15)];

					knex('pegawai').where({
						pegawai_kota_id: val.kota_id
					}).then(function(result_pegawai) {
						data_kota.push({
							value: result_pegawai.length,
							color: color,
							highlight: color,
							label: val.kota_name
						});
						index++;
					});
				});
			});

			setTimeout(function() {
				res.view('home', {
			      "jml_posisi": posisi,
			      "jml_kota": kota,
			      "jml_pegawai": pegawai,
			      "data_posisi": data_posisi,
			      "data_kota": data_kota
			    });
			}, 1000);
		}
	}
};