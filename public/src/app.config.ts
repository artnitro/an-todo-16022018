/**
 * Set up variables.
 */

export const COLORS = {
  black: '#2c2c2c',
  red: '#950000',
}

export const SOURCE = {
  connectApi: 'https://api.antodo.local:3000/api/v1/',
  connectApiSocket: 'wss://api.antodo.local:3000/api/v1/',
  connectOauth: 'https://oauth.antodo.local:5000/oauth/v1/'
}

export const LOCAL = {
  userData: '16022018-user',
  forgotPwd: '16022018-forgotpwd',
  language: '16022018-language'
}

export const LANGUAGE = {
  defaultLanguage: 'en'
}

// Drop down menus.

export const MENU = {
  languages: [
    {
      id: 1,
      item: 'english',
      data: 'en'
    },
    {
      id: 2,
      item: 'español',
      data: 'es'
    }
  ]
}
