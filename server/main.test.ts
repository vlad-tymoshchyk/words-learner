import request from 'supertest';
import { app } from './main';
import { readYaml, writeYaml } from './utils';
import { returnAsMock } from './test-utils';
import { endpoints } from './constants';

jest.mock('./utils');
const readYamlMock = returnAsMock(readYaml);

it('"/status" works', async () => {
  await request(app).get('/status').expect(200);
});

it('takes data from yaml', async () => {
  const filename = 'filename-123';
  const payload = { one: { word: 'one' } };
  readYamlMock.mockReturnValueOnce(payload);

  const res = await request(app)
    .get(`${endpoints.words}?filename=${filename}`)
    .expect(200);
  expect(res.body).toStrictEqual(payload);
  expect(readYamlMock).toHaveBeenCalledWith(filename);
});

it('writes data to yaml and returns merged data', async () => {
  const filename = 'filename-123';
  const fileData = { one: { word: 'one' } };
  const payloadData = { two: { word: 'two' } };
  const mergedData = { ...fileData, ...payloadData };
  readYamlMock.mockReturnValueOnce(fileData);

  const res = await request(app)
    .post(`${endpoints.words}?filename=${filename}`)
    .send(payloadData)
    .expect(200);
  expect(res.body).toStrictEqual(mergedData);
  expect(writeYaml).toHaveBeenCalledWith(`storage/${filename}`, mergedData);
});
