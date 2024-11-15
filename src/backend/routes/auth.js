router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists with this email'
      });
    }
    
    // ... rest of registration logic ...
    
  } catch (error) {
    res.status(500).json({
      message: 'Server error during registration'
    });
  }
}); 