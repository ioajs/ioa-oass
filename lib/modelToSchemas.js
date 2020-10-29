'use strict';

const types = {
  "timestamp": {
    "type": "string",
    "format": "date-time"
  },
  "array": {
    "type": "array",
    "items": {}
  }
}

const parser = {
  /**
   * 递归验证器
   * @param {*} express
   */
  recursion(express) {

    // 选项值为对象
    if (typeof express === "object") {

      const { type } = express;

      // express为验证表达式
      if (type) {
        if (types[type]) {
          return Object.assign(express, types[type]);
        } else {
          // console.log(type)
          return express;
        }
      }

      // express为数组结构
      else if (Array.isArray(express)) {
        return this.array(express);
      }

      // express为对象结构
      else {
        return this.object(express);
      }

    }

    // express为字符窜类型声明
    else if (typeof express === "string") {

      const replace = types[express];

      if (replace) {
        return replace;
      } else {
        return { type: express }
      }

    }

  },
  /**
   * 对象结构
   * @param {*} express
   */
  object(express) {

    const properties = {};

    for (const name in express) {

      const value = this.recursion(express[name]);

      properties[name] = value;

    }

    return {
      type: "object",
      properties
    };

  },
  /**
   * 数组结构
   * @param {*} express
   */
  array(express) {

    const [option] = express;

    // 子集递归验证
    const items = this.recursion(option);

    return {
      "type": "array",
      items
    };

  }
}

/**
 * 将模型转换成schema
 * @param {object} model ormv模型实例
 * @param {object} expand 扩展选项
 */
module.exports = function (model, expand) {

  if (model === undefined) {
    throw new Error(`模型不允许为空`);
  }

  const { name } = model;

  const schema = { "$ref": `#/components/schemas/${name}` };

  const schemas = {
    schema,
    list: {
      "application/json": {
        "schema": {
          "type": "object",
          "properties": {
            "list": {
              "type": "array",
              "items": schema,
            },
          },
        }
      }
    },
    details: {
      "application/json": { schema }
    },
    reqBody: {
      "name": "body",
      "in": "body",
      "required": true,
      schema
    }
  };

  schemas.type = "object";
  schemas.properties = {};

  const { properties } = schemas;

  const { options } = model;

  for (const key in options) {
    properties[key] = parser.recursion(options[key]);
  }

  if (expand) {
    for (const key in expand) {
      properties[key] = parser.recursion(expand[key]);
    }
  }

  return schemas;

};
