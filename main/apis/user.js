import ioa from 'ioa';
import OpenAPI from 'oass';

const { model, modelToSchema } = ioa.app;

const user = modelToSchema(model.user);

const { schema, list, details } = user;

const openapi = new OpenAPI({
  "openapi": "3.0.0",
  "info": {
    "title": "用户",
    "description": "",
    "version": "1.0.0"
  },
  "components": {
    schemas: { user },
  },
});

openapi.path("/admin/user", {
  "get": {
    "summary": "用户列表",
    "tags": ["admin"],
    "responses": {
      "200": {
        "content": list,
      }
    }
  },
  "post": {
    "summary": "创建用户",
    "tags": ["admin"],
    "parameters": [
      {
        "name": "body",
        "in": "body",
        "required": true,
        schema
      }
    ],
    "responses": {
      "200": {
        "content": details,
      }
    }
  },
})

openapi.path("/tenant/user", {
  "get": {
    "summary": "用户列表",
    "tags": ["tenant"],
    "responses": {
      "200": {
        "content": list,
      }
    }
  },
  "post": {
    "summary": "创建用户",
    "tags": ["tenant"],
    "parameters": [
      {
        "name": "body",
        "in": "body",
        "required": true,
        schema
      }
    ],
    "responses": {
      "200": {
        "content": details,
      }
    }
  },
})

openapi.path("/user/info", {
  "get": {
    "summary": "用户信息",
    "tags": ["user"],
    "responses": {
      "200": {
        "content": details,
      }
    }
  },
})

openapi.path("/user/mobilePhone", {
  "put": {
    "summary": "绑定手机号",
    "tags": ["user"],
    "parameters": [
      {
        "name": "body",
        "in": "body",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            'mobilePhone': {
              type: "number",
              allowNull: false,
              comment: "手机号",
            },
            'code': {
              type: "string",
              allowNull: false,
              comment: '短信验证码',
            },
          }
        }
      }
    ],
    "responses": {
      "200": {
        "content": details,
      }
    }
  },
})

openapi.path("/user/nickName", {
  "put": {
    "summary": "修改昵称",
    "tags": ["user"],
    "parameters": [
      {
        "name": "body",
        "in": "body",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            'nickName': {
              type: "string",
              allowNull: false,
              comment: '昵称',
            },
          }
        }
      }
    ],
    "responses": {
      "200": {
        "content": details,
      }
    }
  },
});

openapi.path("/user/avatar", {
  "put": {
    "summary": "修改头像",
    "tags": ["user"],
    "parameters": [
      {
        "name": "body",
        "in": "body",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            'avatar': {
              type: "string",
              allowNull: false,
              comment: '头像链接',
            },
          }
        }
      }
    ],
    "responses": {
      "200": {
        "content": details,
      }
    }
  },
});

export default openapi;
