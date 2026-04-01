import jwt from 'jsonwebtoken';

function getJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;

  if (process.env.NODE_ENV !== 'production') {
    return 'dev-only-jwt-secret';
  }

  throw new Error('JWT_SECRET is required in production');
}

export function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyAuthHeader(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization token');
  }

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, getJwtSecret());
}
