import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import path from 'path'; // Added for path module
import dummyDatabase, { User } from './dummyDatabase';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const secretKey = 'your-secret-key';

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: User | undefined = dummyDatabase[username];
  if (user && user.password === password) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/user', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { username: string };
    const username = decoded.username;

    const user = dummyDatabase[username];

    if (user) {
      res.json({ number: user.number });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Serve the index.html file for the root path
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
