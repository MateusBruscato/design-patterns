InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from './../index.js';

function handleRequest(request, response) {
  response.end('Hello');
}

const server = http.createServer(handleRequest);
const PORT = 3000;

server.listen(PORT, () =>
  console.log('server running at', server.address().port)
);
