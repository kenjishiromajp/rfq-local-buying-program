import { isArray } from 'lodash';
// transform { bar: 'a', foo: 'b' } into 'bar=a&foo=b'
export function serialize(json: any) {
  return Object.keys(json)
    .filter(
      key =>
        (!isArray(json[key]) && json[key]) ||
        (isArray(json[key]) && json[key].length > 0),
    )
    .map(
      key =>
        `${key}=${
          Array.isArray(json[key])
            ? JSON.stringify(json[key])
            : encodeURIComponent(json[key])
        }`,
    )
    .join('&');
}

export function deserializeQuery(query: string): any {
  if (!query) {
    return null;
  }

  let q = decodeURI(query);
  if (q.indexOf('?') === 0) {
    q = q.slice(1);
  }
  const pairs = q.split('&');
  const result: any = {};
  pairs.forEach(pair => {
    const keyValue = pair.split('=');
    result[keyValue[0]] = decodeURIComponent(keyValue[1] || '');
  });
  return result;
}

export function jsonParseOrUndefined(value: string | string[]) {
  try {
    return JSON.parse(value.toString());
  } catch (error) {
    return undefined;
  }
}
