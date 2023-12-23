export function getformbody(params) {
  let formbody = [];
  for (let prop in params) {
    let encodedKey = encodeURIComponent(prop);
    let encodedValue = encodeURIComponent(params[prop]); //encodeURIComponent makes akash gupta as akash%20gupta
    formbody.push(encodedKey + "=" + encodedValue);
  }
  return formbody.join("&");
}
