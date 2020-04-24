//
// Il Nido & Il Corvo Seattle
//
// Get the base URL from the document:
const baseURL = document.location;

const baseTitle = document.querySelector('title');
const baseBody = document.querySelector('body');

// Main elements in the DOM
const main = baseBody.querySelector('main');

const mainNav = baseBody.querySelector('nav');

const footer = baseBody.querySelector('footer');

const corvoAddress = footer.lastElementChild;
const nidoAddress = footer.firstElementChild;

const corvoContain = document.querySelector('.ilcorvo-section');
const nidoContain = document.querySelector('.ilnido-section');
const defaultContain = document.querySelector('.default');

const navLink = baseBody.querySelector('.restaurant-link');

// Content variable / flags
const nidoContent = nidoContain.children[1];
const corvoContent = corvoContain.children[1];

// the content children:
const allCorvoContentChildren = corvoContain.children;
const allNidoContentChildren = nidoContain.children;

const mainBackgroundImage = baseBody.querySelector('.main-background-image__instaFeed');
const restaurant = {
  host: baseURL.host,
  port: baseURL.port,
  origin: baseURL.origin,
  path: baseURL.pathname,
  nido: {
    title: 'Il Nido Seattle',
    href: 'http://127.0.0.1:4040/',
    devHref: 'http://ilnido.bulletprooftoupee.com/',
    prodHref: 'http://ilnidoseattle.com/',
    prodHrefSec: 'https://ilnidoseattle.com/',
    instaURL: 'https://www.instagram.com/p/BnkaHsWFrbl/media/?size=l',
    staticImgURL: './img/firePlaceCold.smaller.jpg',
    googleSiteVerification: 'ebn5WipMEe9IkbXBdqN7sV8925O_tFqEt0J6PxbLRIE',
    contact: {
      address: '2717 61st Ave SW, Seattle, WA 98116',
      phone: '2064666256',
      email: 'ilnidoseattle@icloud.com',
    },
  },
  corvo: {
    title: 'Il Corvo Seattle',
    href: 'http://127.0.0.1:5050/',
    devHref: 'http://ilcorvo.bulletprooftoupee.com/',
    prodHref: 'http://ilcorvopasta.com/',
    instaURL: 'https://www.instagram.com/p/Bo14AOfnOaw/media/?size=l',
    staticImgURL: './img/img0236.jpg ',
    contact: {
      address: '217 James St. Seattle, WA 98104',
      phone: '2065380999',
      email: 'ilcorvopasta@gmail.com',
    },
  },
};

if (
  baseURL.href == restaurant.nido.href
  || baseURL.href == restaurant.nido.devHref
  || baseURL.href == restaurant.nido.prodHrefSec
  || baseURL.href == restaurant.nido.prodHref
) {
  // il nido side
  if (baseURL.href === restaurant.nido.href) {
    // modify the nav urls based on environment:
    console.log('on a il nido local host');
    navLink.href = restaurant.corvo.href;
    navLink.setAttribute('target', '_blank');
  } else if (baseURL.href === restaurant.nido.devHref) {
    console.log('on the dev server');
    navLink.href = restaurant.corvo.devHref;
    navLink.setAttribute('target', '_blank');
  } else {
    console.log('production');
    navLink.href = restaurant.corvo.prodHref;
    navLink.setAttribute('target', '_blank');
  }
  baseTitle.innerText = restaurant.nido.title;
  baseBody.setAttribute('class', 'default ilnido');
  mainNav.setAttribute('class', 'ilnido-nav');
  navLink.innerText = restaurant.corvo.title;
  footer.removeChild(corvoAddress);
  nidoContain.children[0].href = '#';
  corvoContain.children[0].href = restaurant.corvo.href;
  main.removeChild(defaultContain);
  corvoContain.remove(allCorvoContentChildren);
} else if (
  baseURL.href == restaurant.corvo.href
  || baseURL.href == restaurant.corvo.devHref
  || baseURL.href == restaurant.corvo.prodHref
) {
  // il corvo side
  if (baseURL.href == restaurant.corvo.href) {
    console.log('on a corvo local host');
    navLink.href = restaurant.nido.href;
    navLink.setAttribute('target', '_blank');
  } else if (baseURL.href == restaurant.corvo.devHref) {
    console.log('on the dev server');
    navLink.href = restaurant.nido.devHref;
    navLink.setAttribute('target', '_blank');
  } else {
    console.log('production');
    navLink.href = restaurant.nido.prodHref;
    navLink.setAttribute('target', '_blank');
  }
  baseTitle.innerText = restaurant.corvo.title;
  baseBody.setAttribute('class', 'default ilcorvo');
  navLink.innerText = restaurant.nido.title;
  nidoContain.children[0].href = restaurant.nido.href;
  footer.removeChild(nidoAddress);
  corvoContain.children[0].href = '#';
  mainBackgroundImage.setAttribute('src', restaurant.corvo.staticImgURL);
  main.removeChild(defaultContain);
  nidoContain.remove(allNidoContentChildren);
} else {
  console.log('both failed for some reason... are you on 127... or localhost?');
}
