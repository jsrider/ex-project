const encodeURL = window.encodeURIComponent,
  decodeURL = window.decodeURIComponent;

const getCookie = function(key){
  var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
    result = reg.exec(document.cookie);

  if (result) {
    return decodeURL(result[2]) || null;
  }

  return null;
};

const setCookie = function(key, value, expireMS = 1800, domain){
  document.cookie = key + "=" + encodeURL(value)
    + (domain ? ";domain="+domain : "")
    + (expireMS ? ";path=/;expires=" + new Date(new Date().getTime() + expireMS*1000).toGMTString() +";" : "");
};
/**
 * @params key {string} cache key
 * @params value {string} cache value
 * @params ss {boolen} is sessionStorage
 **/
const lsCache = () => {
  function Cache(key, ss) {
    this.key = key;
    this.cache = ss ? window.sessionStorage : window.localStorage;
  }
  if (window.localStorage) {
    Cache.prototype.getValue = function () {
      return this.cache.getItem(this.key);
    };
    Cache.prototype.setValue = function (value) {
      return this.cache.setItem(this.key, value);
    };
  } else {
    Cache.prototype.getValue = function () {
      return getCookie(this.key);
    };
    Cache.prototype.setValue = function (value) {
      return setCookie(this.key, value);
    };
  }

  return function (key, ss) {
    return new Cache(key, ss);
  };
};

export default lsCache();
