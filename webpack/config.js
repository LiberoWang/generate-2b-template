const componentList = [
  {
    httlName: 'template',
    library: '$leTemplateInit',
    componentName: 'template',
    list: [
      { terminal:'pc', chunksName: 'pc', entry: './src/main/pc/pc.js' },
      { terminal:'tablet', chunksName: 'tablet', entry: './src/main/tablet/tablet.js' },
      { terminal:'mobile', chunksName: 'mobile', entry: './src/main/mobile/mobile.js' }
    ]
  }
];

module.exports = (mode) => {
  // build打包
  if (mode === 'production') return componentList;
  
  // dev本地启动
  let entry = {};
  componentList.forEach(component => {
    component.list.forEach(item => {
      entry[item.chunksName] = item.entry
    })
  });

  return entry
}
