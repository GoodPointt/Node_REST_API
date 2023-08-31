const app = require('./app');

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(process.env.DEV_PORT, () => {
      console.log(
        `Server is running. Use our API on port: ${process.env.DEV_PORT}`
      );
    });
  })
  .then(() => console.log('✅Database connection successful'))
  .catch((error) => {
    console.log('⚠️Error connect to database:', error.message);
    process.exit(1);
  });
