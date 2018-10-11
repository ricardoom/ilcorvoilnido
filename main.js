const urlish = document.location;
const defaultStyle = document.getElementsByTagName('body');
const defaultHead = document.getElementsByTagName('head');
const itsthejoint = document.getElementsByTagName('section');
const corvoSection = itsthejoint[0];
const nidoSection = itsthejoint[1];

var ports = [ 5678, 4040, 1234 ];
var hrefs = ["http://127.0.0.1:5678/", "http://127.0.0.1:4040/" ]


// some simple class toggling logic


console.log(urlish, itsthejoint);

function init() {
  
  if (urlish.href == hrefs[0]) {
    console.log("its 5678 from the array this time...");
    // yuk:
    corvoSection.children[0].children[0].insertAdjacentText('beforeend', ports[0]);
    defaultStyle[0].classList.toggle("ilnido");
    defaultHead[0].childNodes[5].text = "Il Corvo"
    corvoSection.children[0].href = "#";
  } else if (urlish.href == hrefs[1]) {
      console.log("its 4040 from the array this time...");
    // yuk:
    nidoSection.children[0].children[0].insertAdjacentText('beforeend', ports[1]);
    defaultHead[0].childNodes[5].text = "Il Nido";
    defaultStyle[0].classList.toggle("ilcorvo");
    nidoSection.children[0].href = "#";
  } else {
      console.log("Cook up some basic error / defualt");
  };
}

init();
