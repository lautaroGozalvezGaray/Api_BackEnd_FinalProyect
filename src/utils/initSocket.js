const MessageDaoMongoDb = require("../data_Persistence/daos/messages/messagesDaoMongoDb.js");
const logger = require("../utils/Log4js");

const messages = new MessageDaoMongoDb();

const initSocket = (io) =>{
    io.on('connection', async(socket) => {
        logger.info("Usuario conectado");
        //emite los mensajes guardados
        const mensajes = await messages.getAll();
        socket.emit('listaMensajesBienvenida', mensajes)
        //escucha el nuevo mensaje, lo guarda y llama a listaMensajesActualizada enviandole los mensajes
        socket.on('nuevoMensaje', async(data) => {
            await messages.save(data)
            const mensajes = await messages.getAll();
            io.sockets.emit('listaMensajesActualizada', mensajes)
        })
        socket.on('disconnect', () => {
            logger.info('Usuario desconectado');
        })
    })
}

module.exports = initSocket