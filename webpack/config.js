/**
 * httlName: when uploading Components with the CMS, it's the same as 'engune.xxx' in the html template ('xxx' is the httlName).
 * library: the name of the initialization function that just like 'initialize' exported by the entry file. And it's used for initializetion execution in the script of the httl file.
 * componentName: it's the same as the componentName that set in the outermost div of httl.
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
  // production build
  if (mode === 'production') return componentList;
  
  // dev build
  let entry = {};
  componentList.forEach(component => {
    component.list.forEach(item => {
      entry[item.chunksName] = item.entry
    })
  });

  return entry
}
