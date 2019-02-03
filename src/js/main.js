const baseURL = document.location;
const baseTitle = document.querySelector('title');
const baseBody = document.querySelector('body');
const main = document.querySelector('main');

const footer = document.querySelector('footer');
const corvoAddress = footer.lastElementChild;
const nidoAddress = footer.firstElementChild;

const corvoContain = document.querySelector('.ilcorvo-section');
const nidoContain = document.querySelector('.ilnido-section');

const defaultContain = document.querySelector('.default');

const nidoNav = baseBody.children[0];
const nidoContent = nidoContain.children[1];
const corvoContent = corvoContain.children[1];
const allCorvoContentChildren = corvoContain.children;
const mainBackgroundImage = document.querySelector('.main-background__instaFeed');

const theNewJoint = {
  host: baseURL.host,
  port: baseURL.port,
  nido: {
    title: 'Il Nido',
    href: 'http://127.0.0.1:4040/',
    devHref: 'http://ilnido.bulletprooftoupee.com/',
    instaURL: 'https://www.instagram.com/p/BnkaHsWFrbl/media/?size=l',
    staticImgURL: './img/firePlaceCold.smaller.jpg',
    contact: {
      address: '2717 61st Ave SW, Seattle, WA 98116',
      phone: '2061234567',
    },
  },
  corvo: {
    title: 'Il Corvo',
    href: 'http://127.0.0.1:5678/',
    instaURL: 'https://www.instagram.com/p/Bo14AOfnOaw/media/?size=l',
    staticImgURLL: 'img/main.bg.jpg',
    contact: {
      address: '217 James St. Seattle, WA 98104',
      phone: '2065380999',
    },
  },
};

//
// in production, swap out ports for .host or some logic
// where we can switch on fly from prod <=> development...
//

if (theNewJoint.port == 4040 || baseURL.href == theNewJoint.nido.devHref) {
  // il nido side

  console.log(baseTitle.text);
  // mucho refactoring here:
  baseTitle.innerText = theNewJoint.nido.title;
  baseBody.setAttribute('class', 'default ilnido');
  nidoNav.setAttribute('class', 'ilnido-nav');
  footer.removeChild(corvoAddress);
  nidoContain.children[0].href = '#';
  corvoContain.children[0].href = theNewJoint.corvo.href;
  // mainBackgroundImage.setAttribute('src', theNewJoint.nido.staticImgURL);
  // corvoContain.removeChild(corvoContent);
  main.removeChild(defaultContain);
  corvoContain.remove(allCorvoContentChildren);
} else if (theNewJoint.port == 5678) {
  // il corvo side
  baseTitle.innerText = theNewJoint.corvo.title;
  baseBody.setAttribute('class', 'default ilcorvo');
  nidoContain.children[0].href = theNewJoint.nido.href;
  footer.removeChild(nidoAddress);
  corvoContain.children[0].href = '#';
  mainBackgroundImage.setAttribute('src', theNewJoint.corvo.instaURL);
  nidoContain.removeChild(nidoContent);
} else {
  console.log('both failed for some reason');
}
