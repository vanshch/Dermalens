const express = require('express');
const router = express.Router();

// Mock authentication middleware
const authenticateToken = (req, res, next) => {
  next();
};

// Mock user routes
router.post('/api/register', (req, res) => {
  res.json({ status: 'ok', message: 'User registered successfully' });
});

router.post('/api/login', (req, res) => {
  res.json({ 
    status: 'ok', 
    token: 'mock-token-123',
    user: {
      id: 1,
      email: req.body.email,
      name: 'Mock User'
    }
  });
});

// Mock protected routes
router.get('/api/user/profile', authenticateToken, (req, res) => {
  res.json({ 
    status: 'ok',
    user: {
      id: 1,
      email: 'mock@example.com',
      name: 'Mock User'
    }
  });
});

router.put('/api/user/profile', authenticateToken, (req, res) => {
  res.json({ status: 'ok', message: 'Profile updated successfully' });
});

// Mock data routes
router.get('/api/data', authenticateToken, (req, res) => {
  res.json({ 
    status: 'ok',
    data: [
      { id: 1, title: 'Mock Data 1' },
      { id: 2, title: 'Mock Data 2' }
    ]
  });
});

router.post('/api/data', authenticateToken, (req, res) => {
  res.json({ status: 'ok', message: 'Data created successfully' });
});

router.put('/api/data/:id', authenticateToken, (req, res) => {
  res.json({ status: 'ok', message: 'Data updated successfully' });
});

router.delete('/api/data/:id', authenticateToken, (req, res) => {
  res.json({ status: 'ok', message: 'Data deleted successfully' });
});

module.exports = router; 