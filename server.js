const app = require('./app');

app.listen(process.env.DEV_PORT, () => {
  console.log(
    `Server is running. Use our API on port: ${process.env.DEV_PORT}`
  );
});
