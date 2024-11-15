const ImageCache: { [key: string]: HTMLImageElement } = Object.create(null);
/**根据图片路径地址，获取图片后缓存 , 避免重复请求
 * @param url 图片路径
 */
function getImgPromise(url: string): Promise<HTMLImageElement> {
  let img = ImageCache[url];
  if (!img) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      console.log(url,'www')
      img.onload = () => {
        ImageCache[url] = img;
        resolve(img);
      };
      img.src = `${url}`;
    });
  }
  return Promise.resolve(img);
}
/**加载需要提前加载的异步图片，保证图片层级正确 */
export function loadImg(urls: string[] = ["/assets/images/map/map_selected.png"]) {
  urls.forEach((url) => getImgPromise(url));
}
export function getImageCache(key: string) {
    return ImageCache[key];
}
