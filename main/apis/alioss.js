'use strict';

const OpenAPI = require('oass');

const openapi = new OpenAPI({
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "阿里云OSS",
    "summary": "",
  },
});

const parameters = [
  {
    "type": "string",
    "in": "query",
    "name": "category",
    "description": "分类目录路径"
  },
  {
    "type": "file",
    "in": "formData",
    "name": "$",
    "required": true,
    "description": "自定义文件上传字段，支持单个、多个文件"
  }
];

const responses = {
  "200": {
    "schema": {
      "type": "object",
      "summary": "与上传的JSON数据结构一致"
    }
  }
}

openapi.path("/alioss/user/avatar", {
  "post": {
    tags: ["user"],
    summary: "上传用户头像",
    parameters,
    responses
  },
  "put": {
    tags: ["user"],
    summary: "更新用户头像",
    parameters,
    responses
  }
})

openapi.path("/alioss/user/comment", {
  "post": {
    tags: ["user"],
    summary: "上传评论图片、视频",
    parameters,
    responses
  }
})

openapi.path("/alioss/tenant/brand", {
  "post": {
    tags: ["tenant"],
    summary: "上传品牌图片",
    parameters,
    responses
  }
})

openapi.path("/alioss/tenant/school", {
  "post": {
    tags: ["tenant"],
    summary: "上传校区图片",
    parameters,
    responses
  }
})

openapi.path("/alioss/tenant/course", {
  "post": {
    tags: ["tenant"],
    summary: "上传课程图片",
    parameters,
    responses
  }
})

openapi.path("/alioss/tenant/teacher", {
  "post": {
    tags: ["tenant"],
    summary: "上传教师图片",
    parameters,
    responses
  }
})

openapi.path("/alioss/tenant/comment", {
  "post": {
    tags: ["tenant"],
    summary: "上传评论图片、视频",
    parameters,
    responses
  }
})

openapi.path("/alioss/admin/ad", {
  "post": {
    tags: ["admin"],
    summary: "广告位",
    parameters,
    responses
  }
})

openapi.path("/alioss/admin/category", {
  "post": {
    tags: ["admin"],
    summary: "分类菜单",
    parameters,
    responses
  }
})

module.exports = openapi;
