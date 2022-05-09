/**
 * httlName: 和CMS后台上传Components的时候与html模板中engin.xxx保持一致（xxx即是httlName）
 * library: 即是入口文件导出的初始化函数名称(initialize),用于httl文件的script脚本的初始化执行
 * componentName: 与httl最外层div设置的componentName保持一致
 */

const componentList = [
  {
    httlName: "{{ httlName }}",
    library: "{{ library }}",
    componentName: "{{ componentName }}",
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
