// Ná í json með myndum
let json;
db.collection("images") // Nafnið á collection í okkar gagnagrunni
  .get()
  .then(function(querySnapshot) {
    json = getJson(querySnapshot); // kallar í getJson function sem við bjuggum til sem loopar í gegnum querySnapshot objectið og returnar array með þeim upplýsingum.
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

// Modal code
getImage = imageId => {
  findImageWithId(imageId);
};
findImageWithId = id => {
  let currentImage;
  cardImages.forEach(image => {
    if (image.imageId == id) {
      currentImage = image;
    }
  });
  showModal(currentImage);
};
showModal = image => {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div class="content-holder">

        <h5 class=""modal-heading>Description:</Heading>
        <p class="modal-description">${checkDescription(image)}</p>

        <h5 class=""modal-heading>Tags: </Heading>
        <p class="modal-tags">${getModalTags(image)}</p>
    </div>
  `;
};
getModalTags = image => {
  let string = "";
  image.imgInfo.forEach(tag => {
    string += tag + ", ";
  });
  return string;
};
checkDescription = image => {
  if (image.microDescription.text) {
    return image.microDescription.text;
  } else {
    return "No caption avalible";
  }
};
