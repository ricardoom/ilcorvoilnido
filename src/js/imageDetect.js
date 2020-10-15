/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

function detectImageFormat() {
  Modernizr.on('webp', (result) => {
    if (result) {
      // supported
      console.log(`webp: ${result}, webp supported`);
    } else {
      console.log(`webp: ${result}, webp not supported`);
      // remove the srcset attributes so Safari will render only the jpg
      // and all the other browsers will render the srcset
      imgData(result, allImgs);
    }
  });
}
