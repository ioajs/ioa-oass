'use strict';

const fs = require('fs');
const ioa = require('ioa');

const { apis } = ioa.main;

if (ioa.argv.static) {

  fs.mkdirSync('./static', { recursive: true });

  for (const name in apis) {

    const value = apis[name];

    fs.writeFileSync(`./static/${name}.json`, JSON.stringify(value));

  }

}
