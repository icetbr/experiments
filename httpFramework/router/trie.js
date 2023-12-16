import { Node } from "./node.js"

export class Trie {
  context = { varIndex: 0 }
  root = new Node()

  insert(path, index, pathErrorCheckOnly) {
    const paramMap = []

    const groups = [] // [mark, original string]
    for (let i = 0; ; ) {
      let replaced = false
      path = path.replace(/\{[^}]+\}/g, m => {
        const mark = `@\\${i}`
        groups[i] = [mark, m]
        i++
        replaced = true
        return mark
      })
      if (!replaced) {
        break
      }
    }

    /**
     *  - pattern (:label, :label{0-9]+}, ...)
     *  - /* wildcard
     *  - character
     */
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || []
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i]
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1])
          break
        }
      }
    }

    this.root.insert(tokens, index, paramMap, this.context, pathErrorCheckOnly)

    return paramMap
  }

  buildRegExp() {
    let regexp = this.root.buildRegExpStr()
    if (regexp === "") {
      return [/^$/, [], []] // never match
    }

    let captureIndex = 0
    const indexReplacementMap = []
    const paramReplacementMap = []

    regexp = regexp.replace(
      /#(\d+)|@(\d+)|\.\*\$/g,
      (_, handlerIndex, paramIndex) => {
        if (typeof handlerIndex !== "undefined") {
          indexReplacementMap[++captureIndex] = Number(handlerIndex)
          return "$()"
        }
        if (typeof paramIndex !== "undefined") {
          paramReplacementMap[Number(paramIndex)] = ++captureIndex
          return ""
        }

        return ""
      }
    )

    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap]
  }
}
