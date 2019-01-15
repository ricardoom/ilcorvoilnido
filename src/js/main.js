const baseURL = document.location;
const baseTitle = document.querySelector('title');
const baseBody = document.querySelector('body');
const main = document.querySelector('main');

const corvoContain = document.querySelector('.ilcorvo-section');
const nidoContain = document.querySelector('.ilnido-section');
const defaultContain = document.querySelector('.default');

const nidoContent = nidoContain.children[1];
const corvoContent = corvoContain.children[1];
const allCorvoContentChildren = corvoContain.children;
const mainBackgroundImage = document.querySelector(
  '.main-background__instaFeed',
);

const theNewJoint = {
  host: baseURL.host,
  port: baseURL.port,
  nido: {
    title: 'Il Nido',
    href: 'http://127.0.0.1:4040/',
    instaURL: 'https://www.instagram.com/p/BnkaHsWFrbl/media/?size=l',
  },
  corvo: {
    title: 'Il Corvo',
    href: 'http://127.0.0.1:5678/',
    instaURL: 'https://www.instagram.com/p/Bo14AOfnOaw/media/?size=l',
    localURL: 'img/main.bg.jpg',
  },
};

//
// in production, swap out ports for .host or some logic
// where we can switch on fly from prod <=> development...
//

if (theNewJoint.port == 4040) {
  // il nido side
  console.log(baseTitle.text);

  baseTitle.innerText = theNewJoint.nido.title;
  baseBody.setAttribute('class', 'default ilnido');
  nidoContain.children[0].href = '#';
  corvoContain.children[0].href = theNewJoint.corvo.href;
  mainBackgroundImage.setAttribute('src', theNewJoint.nido.instaURL);
  // corvoContain.removeChild(corvoContent);
  corvoContain.remove(allCorvoContentChildren);
} else if (theNewJoint.port == 5678) {
  // il corvo side
  baseTitle.innerText = theNewJoint.corvo.title;
  baseBody.setAttribute('class', 'default ilcorvo');
  nidoContain.children[0].href = theNewJoint.nido.href;
  corvoContain.children[0].href = '#';
  mainBackgroundImage.setAttribute('src', theNewJoint.corvo.instaURL);
  nidoContain.removeChild(nidoContent);
} else {
  console.log('both failed for some reason');
}
