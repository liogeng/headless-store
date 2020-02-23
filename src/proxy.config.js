const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/user"
    ],

    "target": "https://wxncdqh.applinzi.com",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
]

module.exports = PROXY_CONFIG;
