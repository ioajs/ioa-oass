import ioa from 'ioa';
import Ormv from 'ormv';

const app = ioa.app();

app.export({
  "loads": {
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
  }
});

const ormvApp = ioa.component('@ioa/ormv');

const { $release } = ormvApp;

// 改写@ioa/ormv组件app.export({"loads"})配置，阻止数据库连接
for (const name in $release) {

  const component = $release[name];

  if (component.loads.model) {

    component.loads.model = {
      "level": 20,
      before({ root: app }) {

        app.Ormv = Ormv;
        app.ormv = new Ormv({});

      }
    }

  }

}

app.import({
  'modelToSchema.js': {
    'level': 30,
    module(modelToSchema) {
      app.export({ modelToSchema });
    }
  },
  'filling.js': {
    'level': 70,
  },
  'generate.js': {
    'level': 100
  },
});
