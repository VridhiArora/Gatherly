const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

// Get a token by logging in
const loginData = JSON.stringify({
  username: "adminUser", // We'll just create a dummy admin
  rollno: "adminRoll",
  password: "adminPassword"
});

const loginReq = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const response = JSON.parse(body);
    const token = response.token;
    
    // Now upload
    const form = new FormData();
    form.append('eventName', 'Test Event ' + Date.now());
    form.append('clubName', 'General');
    form.append('maxSeats', '50');
    form.append('image', fs.createReadStream('d:/CSE/BEE/Gatherly/frontend/public/c1.png'));

    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/events',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${token}`
      }
    }, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => console.log('Response:', res2.statusCode, data));
    });

    form.pipe(req);
  });
});

loginReq.write(loginData);
loginReq.end();
