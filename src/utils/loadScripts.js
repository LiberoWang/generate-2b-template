export default function loadScripts(urls) {
  if (Array.isArray(urls)) {
    const arr = urls.map(item => addScript(item));
    return Promise.all(arr);
  }

  return addScript(urls);
}

function addScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
    script.onerror = reject;
    script.addEventListener('load', function() {
      resolve(url);
    }, false);
  });
}
