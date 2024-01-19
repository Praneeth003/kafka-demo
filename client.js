const {Kafka} = require('kafkajs');

exports.kafka = new Kafka({
    clientId: 'demo',
    brokers: ['192.168.1.225:9092']
});