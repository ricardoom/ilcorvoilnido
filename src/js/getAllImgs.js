
const allImgs = document.querySelectorAll('figure img');
// console.log(allImgs);
// remove the srcset attribute where webp is not supported:
function imgData(result, object) {

  object.forEach((img) => {
    const { srcset, src } = img.dataset;
    // eslint-disable-next-line no-console
    // console.log(`data-srcset is: ${srcset},\n src is: ${src}`);
    if (srcset && src) {
      // img.attributes.removeNamedItem('srcset');
      // src = srcset;
      // [srcset, src] = [src, srcset];
      img.setAttribute('src', `${srcset}`);
      // img.removeAttribute(srcset);
      // img.removeAttribute(src)
      // eslint-disable-next-line no-console
      console.log(srcset);
    }
  });
  // console.log(object);
}
