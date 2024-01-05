import db from '@/server/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userToken = req.headers.authorization?.split(' ')[1];

  if (!userToken) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }

  switch (req.method) {
    case 'GET': {
      const user = await db.findUserByToken(userToken);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      } else {
        res.status(200).json({ user });
      }
    }
    case 'PUT': {
      const user = await db.findUserByToken(userToken);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (req.body.email) {
        const isValidEmail = validator.isEmail(req.body.email);
        if (!isValidEmail) {
          res.status(422).json({ error: 'Invalid email format' });
          return;
        }
        user.email = req.body.email;
      }

      if (req.body.name) {
        user.name = req.body.name;
      }

      if (req.body.phone) {
        user.phone = req.body.phone;
      }

      const success = await db.updateUser(user.id, user);

      if (success) {
        res.status(200).json({ user });
      } else {
        res.status(422).json({ user });
      }
    }
    default: {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
}
