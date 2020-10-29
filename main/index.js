'use strict';

const app = require('@app');

app.use("./lib");
app.use("@ioa/config");
app.use("@ioa/ormv");

app.loader({
  test: {
    level: 100,
    action() {
      // console.log(app.apis.home);
    }
  }
});
