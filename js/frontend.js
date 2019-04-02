const imageContainer = document.getElementById("image-container")
const sortHighest = document.getElementById("highest")
const sortLowest = document.getElementById("lowest")
const search = document.getElementById("search")
let newCardImages;

const cardImages = [
    {
        title: "titill",
        imgUrl: "https://content1.jdmagicbox.com/comp/agra/i9/0562px562.x562.140606173444.v1i9/catalogue/nice-studio-mg-road-agar-agra-photo-studios-25q7xbvb33.jpg",
        rating: 5,
        description: "Llorem ipsum Llorem ipsumLlorem ipsumLlorem ipsum"
    },
    {
        title: "titill2",
        imgUrl: "https://content1.jdmagicbox.com/comp/agra/i9/0562px562.x562.140606173444.v1i9/catalogue/nice-studio-mg-road-agar-agra-photo-studios-25q7xbvb33.jpg",
        rating: 8,
        description: "sjomli sjomli sjomli sjomli sjomli"
    },
    {
        title: "titill2",
        imgUrl: "https://content1.jdmagicbox.com/comp/agra/i9/0562px562.x562.140606173444.v1i9/catalogue/nice-studio-mg-road-agar-agra-photo-studios-25q7xbvb33.jpg",
        rating: 9,
        description: "sjomli sjomli sjomli sjomli sjomli"
    },{
        title: "titill2",
        imgUrl: "https://content1.jdmagicbox.com/comp/agra/i9/0562px562.x562.140606173444.v1i9/catalogue/nice-studio-mg-road-agar-agra-photo-studios-25q7xbvb33.jpg",
        rating: 4,
        description: "sjomli sjomli sjomli sjomli sjomli"
    },{
        title: "titill2",
        imgUrl: "https://content1.jdmagicbox.com/comp/agra/i9/0562px562.x562.140606173444.v1i9/catalogue/nice-studio-mg-road-agar-agra-photo-studios-25q7xbvb33.jpg",
        rating: 3,
        description: "sjomli sjomli sjomli sjomli sjomli"
    }
]
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
displayImages(cardImages)

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