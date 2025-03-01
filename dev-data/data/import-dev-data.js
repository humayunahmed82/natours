import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import 'dotenv/config';

import path from 'path';
import { fileURLToPath } from 'url';
import Tour from '../../models/tourModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log('Database connection successfully!'));

const Data = Tour;

// Read JSON File
const tours = JSON.parse(
  readFileSync(`${__dirname}/tours-simple.json`, 'utf8'),
);

// Import All Data from DB
const importData = async () => {
  try {
    await Data.create(tours);
    console.log('Data successfuly Loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await Data.deleteMany();
    console.log('Dstat successfuly Deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
