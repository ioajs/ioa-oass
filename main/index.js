export default {
  components: [
    "@ioa/config",
    "@ioa/ormv",
    "./lib"
  ],
  import: {
    "test": {
      level: 100,
      action() {
        // console.log(app.apis.home);
      }
    }
  }
}