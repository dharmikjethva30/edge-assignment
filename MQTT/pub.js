const mqtt = require('mqtt');

// Connect to the MQTT broker
const client = mqtt.connect('http://broker.hivemq.com/');

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Publish a message to the topic
  client.publish('test/topic', 'Hello, MQTT!');
  
  // Close the connection after publishing
});

// Handle error events
client.on('error', (error) => {
  console.error('Error:', error);
});
