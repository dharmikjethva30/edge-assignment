const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('example.proto');
const { ExampleService } = grpc.loadPackageDefinition(packageDefinition);

const client = new ExampleService('localhost:50051', grpc.credentials.createInsecure());

const message = 'Hello, gRPC!';
client.SendMessage({ message }, (err, response) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Received reply:', response.reply);
});
