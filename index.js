const app = require('./server/app');
const { PORT } = require('./server/config/keys');

app.listen(PORT, () => {
  console.log('server is running');
})