import { readFileSync, writeFileSync } from 'fs';
import yaml from 'js-yaml';
import { DataModel } from './types';

export const writeYaml = (filename: string, dump: DataModel): void => {
  writeFileSync(`storage/${filename}`, yaml.dump(dump));
};

export const readYaml = (filename: string): DataModel => {
  return yaml.load(readFileSync(`storage/${filename}`).toString()) as DataModel;
};
