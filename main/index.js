import ioa from 'ioa';

const { app } = ioa;

app.use("@ioa/config");
app.use("@ioa/ormv");
app.use("./lib");

app.loader({
  "test": {
    level: 100,
    action() {
      // console.log(app.apis.home);
    }
  }
});
