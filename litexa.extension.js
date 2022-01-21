module.exports = function (options, lib) {
  console.log('Initializing extension', options)
  return {
    runtime: {
      apiName: "NameFreeInvocation",
      source: require("./handler.js")
    },
    lib: {}
  }
}