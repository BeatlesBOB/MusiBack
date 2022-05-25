module.exports = (io) => {
    const QRCODE = function (data) {
        const socket = this; // hence the 'function' above, as an arrow function will not work
        socket.broadcast.emit("QRCODE",data);
    };
    return {
        QRCODE,
    }
  }