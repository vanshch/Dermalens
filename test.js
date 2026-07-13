import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Server start time from the endpoint
const server_start_time = 1731840845655;

// Generate secret using the same method as backend
const secret = crypto.createHash('sha256')
                    .update(server_start_time.toString())
                    .digest('hex');

// Create the token payload
const payload = {
    username: 'admin'  // as required in the backend check
};

// Create token with custom header including the time
const token = jwt.sign(payload, secret, {
    header: {
        alg: 'HS256',
        typ: 'JWT',
        time: server_start_time  // adding server_start_time to header as required
    }
});

console.log('Generated Token:', token);

// Verify the token (optional, for testing)
try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded payload:', decoded);
    
    const header = jwt.decode(token, { complete: true });
    console.log('Complete token data:', header);
} catch (err) {
    console.error('Token verification failed:', err);
}