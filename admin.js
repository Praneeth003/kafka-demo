const {kafka} = require('./client');


async function init(){
    const admin = kafka.admin();
    console.log('Connecting...');
    await admin.connect();
    console.log('Connected!');

    console.log('Creating topics...');
    await admin.createTopics({
        topics: [{
            topic: 'Rider-Updates',
            numPartitions: 2
        },],
    });
    console.log('Created topic successfully!');

    console.log('Disconnecting...');
    await admin.disconnect();
    console.log('Disconnected!');
}

init();