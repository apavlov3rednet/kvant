const EventEmitter = require('events');

class Logger extends EventEmitter {
    log = (msg) => {
        console.log(msg);
        this.emit('some_event', {id: 1, key: 'Some'})
    }
}

const userName = "Tony";

module.exports = {Logger, userName};


//const emitter = new EventEmitter();

// const log = (msg) => {
//     console.log(msg);
//     emitter.emit('some_events', {id: 1, key: 2});
// }

// module.exports = log;

