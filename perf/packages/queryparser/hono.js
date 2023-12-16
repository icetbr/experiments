// Optimized
const _decodeURI = (value) => {
    if (!/[%+]/.test(value)) {
      return value
    }
    if (value.indexOf('+') !== -1) {
      value = value.replace(/\+/g, ' ')
    }
    return /%/.test(value) ? decodeURIComponent_(value) : value
  }

  export const getQueryParam = (
    url,
    key,
    multiple,i
  ) => {
    let encoded

    if (!multiple && key && !/[%+]/.test(key)) {
      // optimized for unencoded key

      let keyIndex = url.indexOf(`?${key}`, 8)
      if (keyIndex === -1) {
        keyIndex = url.indexOf(`&${key}`, 8)
      }
      while (keyIndex !== -1) {
        const trailingKeyCode = url.charCodeAt(keyIndex + key.length + 1)
        if (trailingKeyCode === 61) {
          const valueIndex = keyIndex + key.length + 2
          const endIndex = url.indexOf('&', valueIndex)
          return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex))
        } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
          return ''
        }
        keyIndex = url.indexOf(`&${key}`, keyIndex + 1)
      }

      encoded = /[%+]/.test(url)
      if (!encoded) {
        return undefined
      }
      // fallback to default routine
    }

    const results = {}
    encoded ??= /[%+]/.test(url)

    let keyIndex = i//url.indexOf('?', 8)
    while (keyIndex !== -1) {
      const nextKeyIndex = url.indexOf('&', keyIndex + 1)
      let valueIndex = url.indexOf('=', keyIndex)
      if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
        valueIndex = -1
      }
      let name = url.slice(
        keyIndex + 1,
        valueIndex === -1 ? (nextKeyIndex === -1 ? undefined : nextKeyIndex) : valueIndex
      )
      if (encoded) {
        name = _decodeURI(name)
      }

      keyIndex = nextKeyIndex

      if (name === '') {
        continue
      }

      let value
      if (valueIndex === -1) {
        value = ''
      } else {
        value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex)
        if (encoded) {
          value = _decodeURI(value)
        }
      }

      if (multiple) {
        ;((results[name] ??= [])).push(value)
      } else {
        results[name] ??= value
      }
    }

    return key ? results[key] : results
  }
