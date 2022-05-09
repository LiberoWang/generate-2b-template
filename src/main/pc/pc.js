// import loadScripts from '@utils/loadScripts';

function initialize() {
  console.log('initialize start:');
  const Content  = require('./Content').default;

  window.ReactDOM.render(
    <Content />,
    document.getElementById('ofp-2b-demo-root')
  );
}

// if (!$PRODUCTION) {
//   const react = 'https://unpkg.com/react@17/umd/react.development.js';
//   const reactdom = 'https://unpkg.com/react-dom@17/umd/react-dom.development.js';
//   loadScripts([react, reactdom]).then(() => {
//     initialize()
//   });
//   initialize();
// }

export default initialize;
