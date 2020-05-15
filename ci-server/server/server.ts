import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from '../routes/routes';



const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use('/api', router);

app.listen(3000, err => {
  if (err && err.message) {
    console.error(err.message);
  }

  console.log('CI-server is listening on port 3000');
});