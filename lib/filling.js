'use strict';

const ioa = require('ioa');

const { config, apis } = ioa.main;

const { servers, tags, securitySchemes } = config;

const namesConf = {};

for (const item of tags) {
  namesConf[item.name] = item;
}

for (const name in apis) {

  const uniqueTag = {};

  const api = apis[name];

  const { tags, paths, components } = api;

  if (api.servers === undefined) {
    api.servers = servers;
  }

  if (components) {
    if (components.securitySchemes === undefined) {
      components.securitySchemes = securitySchemes;
    }
  } else {
    api.components = { securitySchemes };
  }

  for (const name in paths) {

    const methods = paths[name];

    if (methods) {

      for (const name in methods) {

        const method = methods[name];

        if (method) {

          const tagNames = method.tags;

          if (tagNames) {

            for (const name of tagNames) {

              if (uniqueTag[name] === undefined) {

                if (namesConf[name]) {

                  uniqueTag[name] = namesConf[name];

                }

              }

            }

          }

        }

      }

    }

  }

  for (const name in uniqueTag) {

    tags.push(uniqueTag[name]);

  }

}