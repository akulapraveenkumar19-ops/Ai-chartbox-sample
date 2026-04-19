const http = require('http');

const data = JSON.stringify({message: 'hello'});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  let body = '';
  res.on('data', chunk => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Response Body:');
    console.log(body);
  });
});

req.on('error', e => {
  console.error('Error:', e);
});

req.write(data);
req.end();
