const imageContainer = document.getElementById("image-container")
const sortHighest = document.getElementById("highest")
const sortLowest = document.getElementById("lowest")
const search = document.getElementById("search")
let newCardImages;
let cardImages;


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyByIb4TWrs3WcDKgr_aMgyCFVVaPq26iRc",
    authDomain: "dropar-e12fb.firebaseapp.com",
    databaseURL: "https://dropar-e12fb.firebaseio.com",
    projectId: "dropar-e12fb",
    storageBucket: "dropar-e12fb.appspot.com",
    messagingSenderId: "983460445073"
};
firebase.initializeApp(config);
const db = firebase.firestore();

db.collection("images").get().then(function (querySnapshot) {
    cardImages = getJson(querySnapshot)
    displayImages(cardImages)
});
getJson = (array) => {
    let returnJson = [];
    array.forEach(function(doc){
        const data = doc.data();
        returnJson.push(data);
    })
    return returnJson;
}

displayImages = (array)=>{
    imageContainer.innerHTML = ""
    array.forEach(image=>{
        imageContainer.innerHTML += buildImage(image)

    })
}
buildImage = (image)=>{
    return`
    <div>
        <h3>${image.title}</h3>
        <p>${image.description}</p>
    </div>
    `
}

// Sorting
sortHighest.onclick = ()=>{
    console.log(newCardImages)
    if(typeof newCardImages!== undefined){
        newCardImages.sort((a,b)=>{
            return b.rating-a.rating
            
        })
        displayImages(newCardImages)
    }
    else{
        cardImages.sort((a,b)=>{
            return b.rating-a.rating
            
        })
        displayImages(cardImages)
    }
    
    // console.log(cardImages)
    // displayImages(cardImages)
}
sortLowest.onclick = ()=>{
    console.log(newCardImages)
    if(typeof newCardImages!== undefined){
        newCardImages.sort((a,b)=>{
            return a.rating-b.rating
            
        })
        displayImages(newCardImages)
    }
    else{
        cardImages.sort((a,b)=>{
            return a.rating-b.rating
            
        })
        displayImages(cardImages)
    }
}
// Search
search.onkeyup = () =>{
    let string = search.value.toString()
    newCardImages = cardImages.filter((currentImage)=>{
        console.log(currentImage.description)
        return currentImage.description.includes(string)
    })
    displayImages(newCardImages)
    console.log(string)
}






