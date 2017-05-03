module.exports = {
	join: function(socket, room) {
		sails.sockets.join(socket, room);
	}
};