function initialize() {
  const { flash_fe_core_tool } = window;
  flash_fe_core_tool.$AsyncLoadFileManagement.load(`${flash_fe_core_tool.$adobe.getAdobeVersionPath(cartAdobePath)}`);
  
  window.doAdobe = function(){
    return flash_fe_core_tool.$AsyncLoadFileManagement.load(`${flash_fe_core_tool.$adobe.getAdobeVersionPath(cartAdobePath)}`)
  }

  const Content  = require('./Content').default;

  window.ReactDOM.render(
    <Content />,
    document.getElementById('ofp-2b-demo-root')
  );
}

if (!$PRODUCTION) {
  initialize();
}

export default initialize;
