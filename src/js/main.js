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
const navLink = document.querySelector('.restaurant-link');
const nidoContent = nidoContain.children[1];
const corvoContent = corvoContain.children[1];
const allCorvoContentChildren = corvoContain.children;
const mainBackgroundImage = document.querySelector('.main-background__instaFeed');

const restaurant = {
  host: baseURL.host,
  port: baseURL.port,
  nido: {
    title: 'Il Nido',
    href: 'http://127.0.0.1:4040/',
    devHref: 'http://ilnido.bulletprooftoupee.com/',
    prodHref: 'http://ilnidoseattle.com/',
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
    devHref: 'http://ilcorvo.bulletprooftoupee.com/',
    prodHref: 'http://ilcovropasta.com/',
    instaURL: 'https://www.instagram.com/p/Bo14AOfnOaw/media/?size=l',
    staticImgURL: 'img/main.bg.jpg',
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

if (restaurant.port == 4040 || baseURL.href == restaurant.nido.devHref) {
  // il nido side
  if (restaurant.port == 4040) {
    // modify the nav urls based on environment:
    console.log('on a il nido local host');
    navLink.href = restaurant.corvo.href;
  } else if (baseURL.href == restaurant.nido.devHref) {
    console.log('on the dev server');
    navLink.href = restaurant.corvo.devHref;
  } else {
    console.log('production');
    navLink.href = restaurant.corvo.prodHref;
  }
  // console.log(baseTitle.text);
  // mucho refactoring here:
  baseTitle.innerText = restaurant.nido.title;
  baseBody.setAttribute('class', 'default ilnido');
  nidoNav.setAttribute('class', 'ilnido-nav');
  footer.removeChild(corvoAddress);
  nidoContain.children[0].href = '#';
  corvoContain.children[0].href = restaurant.corvo.href;
  // mainBackgroundImage.setAttribute('src', restaurant.nido.staticImgURL);
  // corvoContain.removeChild(corvoContent);
  main.removeChild(defaultContain);
  corvoContain.remove(allCorvoContentChildren);
} else if (restaurant.port == 5678 || baseURL.href == restaurant.corvo.devHref) {
  // il corvo side
  if (restaurant.port == 5678) {
    console.log('on a corvo local host');
  } else if (baseURL.href == restaurant.corvo.devHref) {
    console.log('on the dev server');
  } else {
    console.log('zilch...');
  }
  baseTitle.innerText = restaurant.corvo.title;
  baseBody.setAttribute('class', 'default ilcorvo');
  nidoContain.children[0].href = restaurant.nido.href;
  footer.removeChild(nidoAddress);
  corvoContain.children[0].href = '#';
  mainBackgroundImage.setAttribute('src', restaurant.corvo.instaURL);
  nidoContain.removeChild(nidoContent);
} else {
  console.log('both failed for some reason');
}
