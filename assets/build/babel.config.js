module.exports = (api) => {
  api.cache(true)

  const presets = [['@babel/preset-env', { targets: { node: '10' } }], '@babel/preset-react'];
  const plugins = []

  return {
    presets,
    plugins
  }

}