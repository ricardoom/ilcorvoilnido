//
// Il Nido Seattle
//

// Get the base URL from the document:
const baseURL = document.location;

const baseTitle = document.querySelector('title');

const baseBody = document.querySelector('body');

// Main elements in the DOM
const main = baseBody.querySelector('main');

// const mainNav = baseBody.querySelector('nav');

const footer = baseBody.querySelector('footer');

const nidoAddress = footer.firstElementChild;

// const corvoContain = document.querySelector('.ilcorvo-section');
const nidoContain = document.querySelector('.hero');
const defaultContain = document.querySelector('.default');

// const navLink = baseBody.querySelector('.restaurant-link');

// Content variable / flags
const nidoContent = nidoContain.children[1];
// const corvoContent = corvoContain.children[1];

// the content children:
// const allCorvoContentChildren = corvoContain.children;
const allNidoContentChildren = nidoContain.children;

// const mainBackgroundImage = baseBody.querySelector('.main-background-image__instaFeed');
const restaurant = {
  host: baseURL.host,
  port: baseURL.port,
  origin: baseURL.origin,
  path: baseURL.pathname,
  nido: {
    title: 'Il Nido Seattle',
    href: 'http://127.0.0.1:4040/',
    devHref: 'http://localhost:4040/',
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
};

if (
  baseURL.href === restaurant.nido.href
  || baseURL.href === restaurant.nido.devHref
  || baseURL.href === restaurant.nido.prodHrefSec
  || baseURL.href === restaurant.nido.prodHref
) {
  // il nido side
  if (baseURL.href === restaurant.nido.href) {
    // modify the nav urls based on environment:
    console.log('on a il nido local host');
  } else if (baseURL.href === restaurant.nido.devHref) {
    console.log('on the dev server');
  } else {
    console.log('production');    
  }
  baseTitle.innerText = restaurant.nido.title;
  baseBody.setAttribute('class', 'default ilnido');
  
  nidoContain.children[0].href = '#';
  
  main.removeChild(defaultContain);
} else {
  console.log('both failed for some reason... are you on 127... or localhost?');
}
