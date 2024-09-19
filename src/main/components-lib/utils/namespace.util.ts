function _bem(namespace: string, block?: string, element?: string, modifier?: string) {
  let name = namespace;
  if (block) {
    name += "-" + block;
  }
  if (element) {
    name += "__" + element;
  }
  if (modifier) {
    name += "--" + modifier;
  }
  return name;
}
export function useNamespace(namespace: string) {
  const b = (block: string) => {
    return _bem(namespace, block);
  };
  const be = (block: string, element: string) => {
    return _bem(namespace, block, element);
  };
  const bem = (block: string, element: string, modify: string) => {
    return _bem(namespace, block, element, modify);
  };
  const em = (element: string, modify: string) => {
    return _bem(namespace, undefined, element, modify);
  };
  const e = (element: string) => {
    return _bem(namespace, undefined, element);
  };
  const m = (modify: string) => {
    return _bem(namespace, undefined, undefined, modify);
  };
  const bm = (block: string, modify: string) => {
    return _bem(namespace, block, undefined, modify);
  };
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bem,
    bm,
  };
}
