const jwt = require('jsonwebtoken');

const generateToken = (id, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return token;
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Token generation failed: ' + error.message);
  }
};

module.exports = { generateToken };