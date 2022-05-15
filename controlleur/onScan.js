module.exports = (io) => {
    const onScan = function (data) {
        const socket = this; // hence the 'function' above, as an arrow function will not work
        socket.broadcast.emit(data);
    };
    return {
        onScan,
    }
  }