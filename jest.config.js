module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue2-jest",
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  globals: {
    '@vue/vue2-jest': {
      transform: {
        'static-query': require('./gridsome-data-jest-processor'),
        'page-query': require('./gridsome-data-jest-processor'),
      }
    }
  }
}
