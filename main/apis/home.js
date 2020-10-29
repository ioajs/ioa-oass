'use strict';

const OpenAPI = require('oass');

const openapi = new OpenAPI({
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "首页",
  }
});

const page = {
  "name": "page",
  "in": "query",
  "description": "分页id",
  "type": "integer",
  "default": 1,
}

const limit = {
  "name": "page",
  "in": "query",
  "description": "限制最大返回数量",
  "type": "integer",
  "default": 5,
}

const location = {
  "name": "location",
  "in": "query",
  "description": "坐标",
  "type": "string",
  "default": "22.575142,113.949981",
  "required": true,
}

const cid = {
  "name": "cid",
  "in": "path",
  "description": "分类id",
  "type": "integer",
  "default": 63,
  "required": true,
}

openapi.get("/city/home", {
  "summary": `首页分类菜单、折扣日历聚合`,
  "tags": ["user"],
  "parameters": [location],
  "responses": {
    "200": {
      "content": {
        'application/json': {
          'schema': {
            "type": 'object',
            "properties": {
              "category": {
                "type": 'array',
                "items": {

                }
              },
              "calendar": {
                "type": 'object',
              }
            }
          }
        }
      },
    }
  }
})

openapi.get("/city/home/recommend", {
  "summary": `首页推荐初始化数据，包含分类选项卡、默认推荐列表`,
  "tags": ["user"],
  "parameters": [location],
  "responses": {
    "200": {
      "content": {
        'application/json': {
          'schema': {
            "type": 'object',
            "properties": {
              // id: { type: 'integer', primaryKey: true, sequence: true },
            }
          }
        }
      },
    }
  }
})

openapi.get("/city/home/recommend/all", {
  "summary": `首页综合推荐列表`,
  "tags": ["user"],
  "parameters": [location, page, limit],
  "responses": {
    "200": {
      "content": {
        'application/json': {
          'schema': {
            "type": 'object',
            "properties": {

            }
          }
        }
      },
    }
  }
})

openapi.get("/city/home/recommend/{cid}", {
  "summary": `首页分类推荐列表`,
  "tags": ["user"],
  "parameters": [location, cid, page, limit],
  "responses": {
    "200": {
      "content": {
        'application/json': {
          'schema': {
            "type": 'object',
            "properties": {

            }
          }
        }
      },
    }
  }
})

module.exports = openapi;
