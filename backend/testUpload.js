const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

const form = new FormData();
form.append('eventName', 'Test Event 123');
form.append('clubName', 'General');
form.append('maxSeats', '50');
// dummy image
fs.writeFileSync('test.png', 'fake image data');
form.append('image', fs.createReadStream('test.png'));

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/events',
  method: 'POST',
  headers: {
    ...form.getHeaders(),
    // We don't have a token, but we can bypass or see if we get a 401
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, data));
});

req.on('error', (e) => console.error('Req Error:', e));
form.pipe(req);
