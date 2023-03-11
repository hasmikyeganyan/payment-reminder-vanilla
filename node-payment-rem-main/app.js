const useEnv = require('./utils/env');
const mongoose = require('mongoose');
const cors = require('cors');

useEnv();

const corsOpts = {
  origin: '*',
};

const express = require('express');

const app = express();

app.use(cors(corsOpts));
app.use(express.json());

const transactionRouter = require('./routes/transactions');
const etcRouter = require('./routes/etc');
const authRouter = require('./routes/auth.js');
const categoriesRouter = require('./routes/categories.js');
const reportsRouter = require('./routes/reports.js');

app.use(etcRouter);
app.use('/api', authRouter);
app.use('/api', transactionRouter);
app.use('/api', categoriesRouter);
app.use('/api', reportsRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => app.listen(4444))
  .catch((e) => {
    throw new Error(e);
  });
