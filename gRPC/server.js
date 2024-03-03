const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('example.proto');
const { ExampleService } = grpc.loadPackageDefinition(packageDefinition);

function sendMessage(call, callback) {
  const message = call.request.message;
  console.log('Received message:', message);
  const reply = `Server received message: ${message}`;
  callback(null, { reply });
}

const server = new grpc.Server();
server.addService(ExampleService.service, { SendMessage: sendMessage });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to start gRPC server:', err);
    return;
  }
  console.log(`gRPC server is running on port ${port}`);
  server.start();
});
