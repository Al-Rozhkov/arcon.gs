module.exports = {
  /**
   * Process the content inside of a custom block and prepare it for execution in a testing environment
   * @param {SFCCustomBlock[]} blocks All of the blocks matching your type, returned from `@vue/component-compiler-utils`
   * @param {string} vueOptionsNamespace The internal namespace for a component's Vue Options in vue-jest
   * @param {string} filename The SFC file being processed
   * @param {Object} config The full Jest config
   * @returns {string} The code to be output after processing all of the blocks matched by this type
   */
  process({ blocks, vueOptionsNamespace, filename, config }) {
    console.log('- We process it! - ' + filename)
    console.log(vueOptionsNamespace)
  }
}
