export default {
  "./lib": {
    "servers": [
      {
        url: "https://{host}",
        variables: {
          host: {
            default: 'api.google.com',
          },
          version: {
            default: 'v1',
            enum: ['v1'],
          }
        }
      }
    ],
    "securitySchemes": {
      "sign": {
        "type": "apiKey",
        "in": "header",
        "name": "签名",
        "scheme": "bearer"
      },
    },
    "tags": [
      {
        "name": "open",
        "description": "开放接口"
      },
      {
        "name": "user",
        "description": "用户"
      },
      {
        "name": "tenant",
        "description": "商户"
      },
      {
        "name": "admin",
        "description": "管理员"
      },
      {
        "name": "distribution",
        "description": "分销商"
      },
      {
        "name": "nats",
        "description": "nats消息队列"
      },
    ]
  },
}