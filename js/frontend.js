const imageContainer = document.getElementById("image-container");
const sortHighest = document.getElementById("highest");
const sortLowest = document.getElementById("lowest");
const searchbar = document.getElementById("searchbar");
const sortNewest = document.getElementById("newest");
const sortOldest = document.getElementById("oldest");

let newCardImages;
let cardImages; // card images global þannig hægt er að vinna með það hvar sem er.

// Firebase starting template sem tengjir firestore bakendann við franmendann hjá okkur
var config = {
  apiKey: "AIzaSyByIb4TWrs3WcDKgr_aMgyCFVVaPq26iRc",
  authDomain: "dropar-e12fb.firebaseapp.com",
  databaseURL: "https://dropar-e12fb.firebaseio.com",
  projectId: "dropar-e12fb",
  storageBucket: "dropar-e12fb.appspot.com",
  messagingSenderId: "983460445073"
};
firebase.initializeApp(config);
const db = firebase.firestore(); // Reference við firebase.firestore() þannig við þurfum ekki alltaf að segja firebase.firestore().eitthvadmethod heldur getum sagt db.eitthvadmethod

db.collection("images") // Nafnið á collection í okkar gagnagrunni
  .get()
  .then(function(querySnapshot) {
    cardImages = getJson(querySnapshot); // kallar í getJson function sem við bjuggum til sem loopar í gegnum querySnapshot objectið og returnar array með þeim upplýsingum.
    displayImages(cardImages); // Notum nýja cardImage json objectið og setjum inní displayImages til þess að loopa í gegnum það og birta á framendanum
  });

// Function sem tekur inn gögn úr gagnagrunni og setur i í json format (array af objectum) svo hægt sé að vinna með þau og nota high order array functions (sort,filter,map og etc)
getJson = array => {
  let returnJson = [];
  array.forEach(function(doc) {
    const data = doc.data();
    returnJson.push(data); // Pushar inn data sem er object inní array-ið
  });
  return returnJson; // Functionið skilar núna gögnonum á json formati
};
displayImages = array => {
  imageContainer.innerHTML = ""; // innerhtml-ið hreinsað í byrjun
  array.forEach(image => {
    // fyrir hverja einustu mynd
    imageContainer.innerHTML += buildImage(image); // Kallað í buildImage function með núverandi image sem parameter sem að returnar div með myndinni og það sett í innerhtml á iamgecontater sem birtir allar myndir
  });
  // imageContainer.innerHTML += "<div></div> <div></div> <div></div>"
};

//Build imge tekur inn eitt object í einu og returnar card-i með upplýsingum úr þeim object
buildImage = image => {
  dateTime = () => {
    function pad(value) { 
      if (value < 10) { 
        return '0' + value; 
      } 
      else 
      { 
          return value; 
      }
    } //pad bætir 0 framan við mínútur, svo það verður td. 20:00 en ekki 20:0, fann á stack overflow

    let time = new Date(image.date.seconds*1000);
    return `
      <div class="card-date">
        <p>Date:</p>
        <p>${pad(time.getDate())}.${pad(time.getMonth()+1)} ${ time.getFullYear()}</p> 
        <p>at</p>
        <p>${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}</p>
      </div>
     `

  }
  
  return `
        <div id="card">
            <img class="card-image" src="${image.imgUrl}">
            <div class="card-text">
            <h3>${image.title}</h3>
            <p> Description: ${image.description}</p>
            <p>Rating: ${image.rating}</p>
            <p>${dateTime()}</p>
            <button onclick="getImage('${
                  image.imageId
                }')" class="enable-modal" id="morebtn" data-toggle="modal" data-target="#modal">Read more</i></button>
            </div>
        </div>
    `;
};

// Sorting

// sortering functions sem að byrja fyrst á að athuga hvort að newCardImages sé undefined sem það er á línu 5 þar sem það er búið til og er þannig þangað til að það er búið að skrifa inn eh í input textboxið.Þá verður newCardImages filteruð gerð af cardImages og því ekki undefined.
sortHighest.onclick = () => {
  if (newCardImages) {
    // Ef newCardImages er í notkun viljum við nota það frekar þannig við séum ekki að nota cardImages sem hefur allar myndirnar heldur newCardImages sem hefur bara description sem matchar það sem notandinn er búinn að skrifa
    newCardImages.sort((a, b) => {
      return b.rating - a.rating;
    });
    displayImages(newCardImages);
  } else {
    cardImages.sort((a, b) => {
      console.log(cardImages);
      return b.rating - a.rating;
    });
    displayImages(cardImages);
  }
};
sortLowest.onclick = () => {
  if (newCardImages) {
    newCardImages.sort((a, b) => {
      return a.rating - b.rating;
    });
    displayImages(newCardImages);
  } else {
    cardImages.sort((a, b) => {
      return a.rating - b.rating;
    });
    displayImages(cardImages);
  }
};
sortNewest.onclick = () => {
  if (cardImages) {
    cardImages.sort((a, b) => {
      const timeA = a.date.seconds;
      const timeB = b.date.seconds;
      return timeB - timeA;
    });
    displayImages(cardImages);
  } else {
    newCardImages.sort((a, b) => {
      return a.timeAsec - b.timeBsec;
    });
    displayImages(newCardImages);
  }
};
sortOldest.onclick = () => {
  if (cardImages) {
    cardImages.sort((a, b) => {
      const timeA = a.date.seconds;
      const timeB = b.date.seconds;
      return timeA - timeB;
    });
    displayImages(cardImages);
  } else {
    newCardImages.sort((a, b) => {
      return b.timeAsec - a.timeBsec;
    });
    displayImages(newCardImages);
  }
};

// Search

//function sem keryrir í hver einasta skipti sem ýtt er á takka á lylklaborðinu inní search textbox inputinum.
searchbar.onkeyup = () => {
  let string = searchbar.value.toString(); // Strengur sem hefur alltaf sama gildi og það sem er verið að skrifa.
  newCardImages = cardImages.filter(currentImage => {
    var newString = string.toLowerCase(); // breytir string í lowercase
    var newDescription = currentImage.description.toLowerCase(); // breytir description í lowercase
    var newTitle = currentImage.title.toLowerCase(); //breytir title í lowercase

    var matchesDescription = newDescription.includes(newString); // ef að description matchar við searchið kemur niðurstaða
    var matchesTitle = newTitle.includes(newString); // ef að title matchar við searchið kemur niðustaða

    var result = matchesDescription || matchesTitle; // resultið getur verið úr description EÐA title  || = or  semsagt description or title

    return result; // Returnar cards þar sem description eða title matcha leitinni
  });

  displayImages(newCardImages); // Kallað í displayImages með nýja arrayinu. Það mun síðan hreinsa innerhtml-ið á iamgecontainer og loopa í gegnum og birta þetta í staðinn.
};
