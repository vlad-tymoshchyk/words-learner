import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readYaml, writeYaml } from './utils';
import { endpoints } from './constants';

const PORT = process.env.PORT || 1080;

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (_, res) => res.sendStatus(200));

app.get<any, any, any, any, { filename?: string }>(
  endpoints.words,
  (req, res) => {
    const { filename } = req.query;
    const data = readYaml(filename);
    res.json(data).sendStatus(200);
  }
);

app.post<any, any, any, any, { filename?: string }>(
  endpoints.words,
  (req, res) => {
    const { filename } = req.query;
    const payloadData = req.body;
    const fileData = readYaml(req.query.filename);
    const mergedData = { ...fileData, ...payloadData };

    writeYaml(`storage/${filename}`, mergedData);

    res.json(mergedData).sendStatus(200);
  }
);

app.post('/test-string', (req, res) => {
  const testString: string = req.body.test_string;
  console.log('testString', testString);
  res.json({ formUs: 'Result here: ' + testString });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}
