module.exports = (io) => {
    const onConnection = function (msg) {
        const socket = this; // hence the 'function' above, as an arrow function will not work
        socket.emit("onConnection",msg)
    };
    return {
        onConnection,
    }
  }