'use strict';

const app = require('@app');
const Ormv = require('ormv');
const consoln = require("consoln");

app.emit("loads", {
  'apis': {
    'level': 40,
    directory(data) {

      for (const name in data) {
        const value = data[name];
        if (value.index) {
          data[name] = value.index;
        } else {
          data[name] = value;
        }
      }

      return data;

    }
  }
});

const appOrmv = app.use("@ioa/ormv");

const { model } = appOrmv.$emitData.loads;

/**
 * 覆盖@ioa/ormv组件中model.before钩子，阻止数据库连接
 */
model.before = function ({ root: app }) {

  const config = app.config["@ioa/ormv"];

  if (config === undefined) {
    throw consoln.error(new Error(`在父组件${app.$name}中未找到“@ioa/ormv”配置项`));
  }

  app.Ormv = Ormv;

  const ormv = new Ormv(config);

  app.ormv = ormv;

}

app.loader({
  'model': null,
  'modelToSchemas.js': {
    'level': 30,
    module(func) {
      app.emit("modelToSchemas", func);
    }
  },
  'filling.js': {
    'level': 70,
  },
  'generate.js': {
    'level': 100
  },
});
