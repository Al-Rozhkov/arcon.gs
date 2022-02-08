const path = require('path')
const fs = require('fs-extra')
const yaml = require('js-yaml')

/**
 * It parses single yaml file (usually as array).
 * Adds each item in array as node to specified collection.
 * If property "children" exist then adds each item as child node.
 */
class YamlArraySource {
  static defaultOptions() {
    return {
      typeName: 'yamlCollection',
      path: '',
    }
  }

  constructor(api, options = YamlArraySource.defaultOptions()) {
    this.options = options
    this.context = options.baseDir
      ? api.resolve(options.baseDir)
      : api.context

    api.loadSource(async actions => {
      this.collection = actions.addCollection(options.typeName)
      this.origin = path.join(this.context, options.path)
      const nodes = yaml.load(await fs.readFile(this.origin, 'utf8'))
      this.addNodes(nodes)
    })
  }

  /**
   * Adds items to collection
   * @param {Array} items
   * @param {*} parent 
   */
  addNodes(items, parent = null) {
    let weight = 0
    for (const item of items) {
      const node = this.collection.addNode({
        ...item,
        internal: {
          origin: this.origin
        },
        weight,
        parent
      })
      if (item.children) {
        this.addNodes(item.children, node.path)
      }
    }
  }
}

module.exports = YamlArraySource
