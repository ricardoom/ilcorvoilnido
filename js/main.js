const urlish = document.location;
// const domain = document.domain;
const defaultStyle = document.getElementsByTagName('body');
const defaultHead = document.getElementsByTagName('title');
const jointSection = document.getElementsByTagName('section');
const corvoSectionTitle = document.querySelector('.ilcorvo-section > a > h1');
const nidoSectionTitle = document.querySelector('.ilnido-section > a > h1');

//
// probably a better way to do this
// 
const corvoSection = jointSection[0];
const nidoSection = jointSection[1];

var ports = [ 5678, 4040, 1234 ];
var hrefs = ["http://127.0.0.1:5678/", "http://127.0.0.1:4040/" ];
var titles = [ "Il Corvo", "Il Nido" ];

// needs more thought. 
// explore looping
// 
const theJoint = {
  thePort : ports,
  theRefs : hrefs,
  theTitles : titles
}

console.log(urlish, theJoint, jointSection);

function init() {
  
  if (urlish.href == hrefs[0]) {
    //console.log("its 5678 from the array this time...");
    // yuk:
    corvoSectionTitle.insertAdjacentText('beforeend', ports[0]);
    defaultStyle[0].classList.toggle("ilnido");
    //TODO: abstract away hard coded titles
    defaultHead[0].text = titles[0];
    // theJoint.theTitles[1]
    corvoSection.children[0].href = "#";
  } else if (urlish.href == hrefs[1]) {
    //console.log("its 4040 from the array this time...");
    // yuk:
    nidoSectionTitle.insertAdjacentText('beforeend', ports[1]);
    defaultHead[0].text = titles[1];
    defaultStyle[0].classList.toggle("ilcorvo");
    nidoSection.children[0].href = "#";
  } else {
      console.log("Cook up some basic error / defualt");
  };
}

init();
