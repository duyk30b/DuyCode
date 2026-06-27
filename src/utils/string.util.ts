const _CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + '!@#$%^&*()_-[]{};\':",./<>?'

export class ESString {
  static randomString = (length = 10, characters = _CHARSET): string => {
    let result = ''
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  static randomId(): string {
    return Date.now().toString(36) + ESString.randomString()
  }

  static encodePath(path: string): string {
    return path
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/')
  }

  static normalizePath(path: string): string {
    return '/' + path.replace(/^\/+|\/+$/g, '')
  }

  static joinPath(...parts: string[]) {
    return (
      '/' +
      parts
        .filter(Boolean)
        .map((p) => ESString.encodePath(p).replace(/^\/+|\/+$/g, ''))
        .join('/')
    )
  }

  static slugify(input: string): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  static convertViToEn = (root: string): string => {
    return (root || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  }

  static customFilter = (str = '', filter = '', skip = 2): boolean => {
    str = str || ''
    filter = filter || ''
    const key = ESString.convertViToEn(filter.trim()).replace(/[^a-zA-Z0-9 ]/g, '')
    const stringConvert = ESString.convertViToEn(str.trim()).replace(/[^a-zA-Z0-9 ]/g, '')
    let pattern = ''
    key.split('').forEach((item) => {
      pattern = `${pattern}.{0,${skip}}${item}`
    })
    const regex = new RegExp(pattern, 'i')

    return regex.test(stringConvert)
  }

  static generateCharset = (privateKey: string, charset = _CHARSET): string => {
    let tempString = charset
    let result = ''
    for (let i = 0; i < _CHARSET.length; i += 1) {
      const kIndex = i % privateKey.length
      const charCode = privateKey.charCodeAt(kIndex)
      const tIndex = charCode % tempString.length

      result = tempString[tIndex] + result
      tempString = tempString.substring(tIndex + 1) + tempString.substring(0, tIndex)
    }
    return result
  }

  static encrypt = (rootString: string, privateKey?: string, expiryTime?: number): string => {
    if (!privateKey) privateKey = 'ABC123'
    const rootObject = { r: rootString, e: expiryTime != null ? Date.now() + expiryTime : null }
    const rootObjectJson = JSON.stringify(rootObject)
    let hash = ESString.generateCharset(privateKey)
    let result = ''
    for (let i = 0; i < rootObjectJson.length; i += 1) {
      hash = ESString.generateCharset(privateKey, hash)
      const index = _CHARSET.indexOf(rootObjectJson[i])
      if (index === -1) {
        result += rootObjectJson[i]
      } else {
        result += hash[index]
      }
    }
    return result
  }

  static decrypt = (cipherText: string, privateKey?: string): string => {
    if (!privateKey) privateKey = 'ABC123'
    let hash = ESString.generateCharset(privateKey)
    let rootObjectJson = ''
    for (let i = 0; i < cipherText.length; i += 1) {
      hash = ESString.generateCharset(privateKey, hash)
      const index = hash.indexOf(cipherText[i])
      if (index === -1) {
        rootObjectJson += cipherText[i]
      } else {
        rootObjectJson += _CHARSET[index]
      }
    }

    let r: string, e: number
    try {
      const parse = JSON.parse(rootObjectJson)
      r = parse.r as string
      e = parse.e as number
    } catch (error: any) {
      throw new Error('invalid privateKey')
    }

    if (e != null && e < Date.now()) {
      throw new Error('String invalid expiry time')
    }
    return r
  }
}
