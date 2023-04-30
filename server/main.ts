import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 1080;

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (_, res) => res.sendStatus(200));

app.post('/test-string', (req, res) => {
  const testString: string = req.body.test_string;
  console.log('testString', testString);
  res.json({ formUs: 'Result here: ' + testString });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
