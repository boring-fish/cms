export const saveLocal = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocal = (key: string) => {
  let data = localStorage.getItem(key);
  if (!data || data === 'undefined') {
    return null;
  } else {
    return JSON.parse(data);
  }
};


const _loadCSS = (url: string, callback?: Function) => {
  _removeCSSNode(url);
  let style: any = document.createElement('link');
  style.rel = 'stylesheet';
  if (style['readyState']) {
    //IE
    style['onreadystatechange'] = function() {
      if (style['readyState'] === 'loaded' || style['readyState'] === 'complete') {
        style['onreadystatechange'] = null;
        typeof callback === 'function' && callback();
      }
    };
  } else {
    //Others: Firefox, Safari, Chrome, and Opera
    style.onload = function() {
      typeof callback === 'function' && callback();
    };
  }
  style.href = url;
  document.head.appendChild(style);
};

const _loadJS = (url: string, callback?: Function) => {
  _removeJSNode(url);
  let script: any = document.createElement('script');
  script.type = 'text/javascript';
  if (script['readyState']) {
    //IE
    script['onreadystatechange'] = function() {
      if (script['readyState'] === 'loaded' || script['readyState'] === 'complete') {
        script['onreadystatechange'] = null;
        typeof callback === 'function' && callback();
      }
    };
  } else {
    //Others: Firefox, Safari, Chrome, and Opera
    script.onload = function() {
      typeof callback === 'function' && callback();
    };
  }
  script.src = url;
  document.body.appendChild(script);
};

const _removeJSNode = (url: string) => {
  let elList: any = document.querySelectorAll(`script[src='${url}']`);
  for (let index = 0; index < elList.length; index++) {
    elList[index].parentNode.removeChild(elList[index]);
  }
};

const _removeCSSNode = (url: string) => {
  let elList: any = document.querySelectorAll(`link[href='${url}']`);
  for (let index = 0; index < elList.length; index++) {
    elList[index].parentNode.removeChild(elList[index]);
  }
};

export const loadResources = (url: string | Array<string>, callback?: Function) => {
  if (typeof url === 'string') {
    if (/\.css(\?*\S*)$/.test(url)) {
      _loadCSS(url, callback);
    } else if (/\.js(\?*\S*)$/.test(url)) {
      _loadJS(url, callback);
    }
  } else {
    let count = 1;
    for (let index = 0; index < url.length; index++) {
      if (/\.css(\?*\S*)$/.test(url[index])) {
        _loadCSS(url[index], function() {
          if (count === url.length) {
            typeof callback === 'function' && callback(index, count);
          }
          count++;
        });
      } else if (/\.js(\?*\S*)$/.test(url[index])) {
        _loadJS(url[index], function() {
          if (count === url.length) {
            typeof callback === 'function' && callback(index, count);
          }
          count++;
        });
      }
    }
  }
};
