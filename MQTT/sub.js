const mqtt = require('mqtt');

// Connect to the MQTT broker
const client = mqtt.connect('http://broker.hivemq.com');

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to the topic
  client.subscribe('test/topic', (err) => {
    if (!err) {
      console.log('Subscribed to topic');
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log('Received message on topic:', topic, 'Message:', message.toString());

});

// Handle error events
client.on('error', (error) => {
  console.error('Error:', error);
});
