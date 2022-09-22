//recuperation du panier depuis le localStorage
let tabCartStorage = JSON.parse(localStorage.getItem("produits"));
console.log("tabcart storage", tabCartStorage)

let totalPrice = 0;
let totalQuantite = 0;
// récupération et affichage dans le DOM des produits du localStorag

for (let productSelected of tabCartStorage) {
  console.log("produit selctionné panier", productSelected);
  const sectionBascket = document.getElementById("cart__items");
  const articleBascket = document.createElement("article");
  articleBascket.setAttribute("class", "cart__item");
  articleBascket.dataset.id = productSelected.idProduit;
  articleBascket.dataset.color = productSelected.couleur;

  // Détails produits
  const divImgItem = document.createElement("div");
  divImgItem.setAttribute("class", "cart__item__img");
  const imgArticle = document.createElement("img");
  imgArticle.src = productSelected.imgUrl;
  imgArticle.alt = productSelected.altImg;
  const divContentItem = document.createElement("div");
  divContentItem.setAttribute("class", "cart__item__content");
  const divDescriptionItem = document.createElement("div");
  divDescriptionItem.setAttribute("class", "cart__item__content__description");
  const titleItem = document.createElement("h2");
  titleItem.textContent = productSelected.nameProduct;
  const colorItem = document.createElement("p");
  colorItem.textContent = productSelected.couleur;
  const priceItem = document.createElement("p");
  let priceArticles = productSelected.priceProduct * productSelected.quantite;
  totalPrice += priceArticles;
  totalQuantite += parseInt(productSelected.quantite);
  priceItem.textContent = priceArticles + " " + "€";
  const divContentSettingItem = document.createElement("div");
  divContentSettingItem.setAttribute("class", "cart__item__content__settings");
  const divContentQuantityItem = document.createElement("div");
  divContentQuantityItem.setAttribute("class", "cart__item__content__settings__quantity")
  const quantityItem = document.createElement("p");
  quantityItem.textContent = "Qté" + " " + ":";
  const inputQuantity = document.createElement("input");
  inputQuantity.type = "number";
  inputQuantity.setAttribute("class", "itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.min = "1";
  inputQuantity.max = "100";
  inputQuantity.setAttribute("value", `${productSelected.quantite}`);
  const divContentDeleteItem = document.createElement("div");
  divContentDeleteItem.setAttribute("class", "cart__item__content__settings__delete");
  const deleteItem = document.createElement("p");
  deleteItem.setAttribute("class", "deleteItem");
  deleteItem.textContent = "Supprimer";
  const totalQuantityElement = document.getElementById("totalQuantity");
  console.log("span total quantity", totalQuantity);
  const totalPriceElement = document.getElementById("totalPrice");
  totalQuantityElement.textContent = `${totalQuantite}`;
  totalPriceElement.textContent = `${totalPrice}`;
  console.log("total price", totalPrice)
  console.log("total quantité", totalQuantite)

  divImgItem.appendChild(imgArticle);
  articleBascket.appendChild(divImgItem);
  divDescriptionItem.appendChild(titleItem);
  divDescriptionItem.appendChild(colorItem);
  divDescriptionItem.appendChild(priceItem);
  divContentItem.appendChild(divDescriptionItem);
  divContentQuantityItem.appendChild(quantityItem);
  divContentQuantityItem.appendChild(inputQuantity);
  divContentSettingItem.appendChild(divContentQuantityItem);
  divContentDeleteItem.appendChild(deleteItem);
  divContentSettingItem.appendChild(divContentDeleteItem);
  divContentItem.appendChild(divContentSettingItem);
  articleBascket.appendChild(divContentItem);
  sectionBascket.appendChild(articleBascket);

 console.log("typeof", typeof inputQuantity.value == "number")

  // Bouton modifier quantité:Recuperation des quantité modifié avec listener sur les inputs de chaque article des produits du storage
  inputQuantity.addEventListener("change", function (event) {
    let val = event.target.value;
    console.log("productselected modifié", productSelected.quantite)

    /* selectionner l'ancêtre le plus proche de l'input et qui soit un article avec closest()
     pour recuperer les datasets des articles  de produits parents de chaque input, correspondant au idproduit et couleur du produit stockée dans la TabCartStorage*/
    let dataArticleProduct = inputQuantity.closest("article");
    let color = dataArticleProduct.getAttribute("data-color");
    let id = dataArticleProduct.getAttribute("data-id");
    console.log("inputQuantity value modifié listener", dataArticleProduct);

    // productSelected  sans modification(previousQuantite) et product selected avec la modification de la valeur de l input stockée pour la comparaison pour le total de la quantité et le total du prix 
    let previousQuantite = productSelected.quantite;
    productSelected.quantite = val;
    console.log( "productedSelected quantite val",productSelected.quantite)

    tabCartStorage.forEach(elem => {
      if (elem.couleur === color && elem.idProduit === id) {
        //recueperation de la quantité modifiée
        elem.quantite = val;
        console.log("elem quantité val",elem.quantite)
        // calcul de la quantité modifié avec le prix du produit
        let calculArticlePrice = productSelected.priceProduct * val;
        console.log("price product: ", productSelected.priceProduct);
        // mise à jour de l 'affichage  dans le DOM du prix calculé avec la quantité modifié sans stocker le nouveau prix calculé dans le localstorage

        priceItem.textContent = calculArticlePrice + " " + "€";
        console.log("total quantité modifié", totalQuantite);
      }
    });

    // on reenregistre dans le locastorage le tableau de produits stockés avec les quantité modifié et recupere le tableau modifé de la tabCartStorage
    localStorage.setItem("produits", JSON.stringify(tabCartStorage));
    console.log("TAB CART STORAGE", tabCartStorage);
    tabCartStorage = JSON.parse(localStorage.getItem("produits"));

    // comparaison  de la quantité du produit et de la quantité modifié du produit par l input  pour incrementer ou desincrementer le total de quantité
   
    console.log(" function total val", val)
    console.log(" total quantity element ", totalQuantityElement.textContent);
    console.log(" total quantité function ", totalQuantite);
    console.log("product selcted total", productSelected.quantite)

    if (productSelected.quantite > previousQuantite) {
      totalQuantite = totalQuantite + (productSelected.quantite - previousQuantite);
      totalQuantityElement.textContent = totalQuantite;
      totalPrice += productSelected.priceProduct * (productSelected.quantite - previousQuantite);
      totalPriceElement.textContent = totalPrice;

      localStorage.setItem("produits", JSON.stringify(tabCartStorage));
      tabCartStorage = JSON.parse(localStorage.getItem("produits"));

      console.log(" total quantité function incrementé ", totalQuantite);

    } else if (productSelected.quantite < previousQuantite) {
      totalQuantite = totalQuantite - (previousQuantite - productSelected.quantite);
      totalQuantityElement.textContent = totalQuantite;
      totalPrice -= productSelected.priceProduct * (previousQuantite - productSelected.quantite);
      totalPriceElement.textContent = totalPrice;

      localStorage.setItem("produits", JSON.stringify(tabCartStorage));
      tabCartStorage = JSON.parse(localStorage.getItem("produits"));

      console.log(" total quantité function descrementé", totalQuantite);
    };

    localStorage.setItem("produits", JSON.stringify(tabCartStorage));
    tabCartStorage = JSON.parse(localStorage.getItem("produits"));

  });

  // bouton supprimer produit

  deleteItem.addEventListener("click", function (event) {
    event.preventDefault();
    let deleteProduct = deleteItem.closest("article");
    let color = deleteProduct.getAttribute("data-color");
    let id = deleteProduct.getAttribute("data-id");
    console.log("deleteproduct", deleteProduct);
    /* verifier la data color et data-id corresponde au idproduit et couleur du produit de la tabCartStorage avec filter(),
     pour supprimer  supprimer dans la TabCartStorage*/
    tabCartStorage.forEach(elem => {
      // supression de l element  par l event click dans le localstorage
      tabCartStorage = tabCartStorage.filter(function (elem) {
        if (elem.idProduit !== id) return true;
        if (elem.couleur !== color) return true;
        console.log("elem produit", elem);
      });

      //suppression de l'article du produit  dans le DOM en  generant un tableau avec les elements qui ont un id et une couleur differente de l'element supprimé
      if (elem.couleur === color && elem.idProduit === id) {
        deleteProduct.remove();
        console.log("tabcartstorage apres supression element", tabCartStorage);
      }
      console.log("evenet", event)
    });

    // on reenregistre dans le locastorage le tableau de produits stockés avec les produits non supprimé par le filter  dans la tabCartStorage
    /* on recupere la TabCartStorage avec les elements du DOM generé par la boucle for avec la mise à jour de la tabCartStorage 
   dans lequel la boucle itere sur chaque element et les affiche un a un et sans l element supprimé*/
    localStorage.setItem("produits", JSON.stringify(tabCartStorage));
    tabCartStorage = JSON.parse(localStorage.getItem("produits"));
  });
};

console.log("produit selected storage", tabCartStorage);
/*..................................modification...........................................*/
//Récupération dans  un objet contact des données saisies par  l'utilisateur dans le fomulaire 

//creation de l objet contact
const firstName= document.getElementById("firstName");
const lastName= document.getElementById("lastName");
const address= document.getElementById("address");
const city= document.getElementById("city");
const email= document.getElementById("email");
let contact = {
  firstName: firstName,
  lastName: lastName,
  address: address,
  city: city,
  email: email

}

// recuperation des données du formulaire dans l'objet contact avec verification des données au préalable*/

firstName.addEventListener("input", function(event){
  let msgError= document.getElementById("firstNameErrorMsg");
  let datafirstName=event.target.value;
 
  console.log("valeur is nan",isNaN(datafirstName));
  
  if(isNaN(datafirstName)!=true){
   error(firstName,msgError,"Prénom invalide");
  }else {
    contact.firstName= datafirstName;
 
  }
  console.log("contact input value",contact);
});

lastName.addEventListener("input", function(event){
  let msgError= document.getElementById("lastNameErrorMsg");
  let datalastName=event.target.value
  if(isNaN(datalastName)!=true){
    error(lastName,msgError,"Nom invalide");
  }else {
   contact.lastName=datalastName;
    
  }
  console.log("contact input value",contact);
});

address.addEventListener("change", function(event){
  let msgError= document.getElementById("addressErrorMsg");
  let dataAdress=event.target.value;
  const regex=/^(([A-Z])*(\d+)([A-Z])*)(-|\/|&)*(([A-Z])*(\d+)([A-Z])*)*((\/)*(([A-Z])*(\d+)([A-Z])*))*/;
 //test des normes du regex adresse avec les données de l'utilisateur
  let testRegex=regex.test(dataAdress);
  console.log("test regex", testRegex);
  if(testRegex){
    contact.address=dataAdress;
   
  }else{
    error(address,msgError,"Adresse invalide, Ex: 45, boulevard de Paris");
  }
    console.log("contact input value",contact);
});

city.addEventListener("input", function(event){
  let msgError= document.getElementById("cityErrorMsg");
  let dataCity=event.target.value;
  if(isNaN(dataCity)!=true){
    error(city,msgError,"Ville non valide");
  }else {
    contact.city=dataCity;
    
  }
  console.log("contact input value",contact)
});

email.addEventListener("change", function(event){
  let msgError= document.getElementById("emailErrorMsg");
  let emailAddress=event.target.value;
  const regexEmail=/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  //test des normes du regex email avec les données de l'utilisateur
  let testRegexEmail=regexEmail.test(emailAddress);
  console.log("test regex email", testRegexEmail);
  if(testRegexEmail){
   contact.email=emailAddress;

  }else{
    error(email,msgError,"Email invalide, Ex: contact@kanap.com");
  }
    console.log("contact input value",contact);
});

// function error input
function error(inputDataUser,msgError,txtError){
  inputDataUser.setAttribute("disabled", true);
  inputDataUser.style.border= " 2px solid #fbbcbc";
  msgError.textContent=txtError;

}
//enregistrement de l obejt user dans le localstorage avec les données utilisateur
localStorage.setItem("contact",JSON.stringify(contact));
let commandContact= JSON.parse(localStorage.getItem("contact"));

//Création du tableau produit avec l' id des produits
let products=[];

products=tabCartStorage.map(elem => {
  return elem.idProduit; /*(elem.nameProduct, elem.couleur,elem.quantite);*/
});

console.log("tableau products", products)
localStorage.setItem("products",JSON.stringify(products));
let commandProducts= JSON.parse(localStorage.getItem("products"));

console.log("tabcartstorage map",products)

//Enregistrement de l object contact dans localstorage et post object contact
const orderForm = document.querySelector(".cart__order__form");
console.log("order form", orderForm);
orderForm.addEventListener("submit", function(event){
  event.preventDefault();
  commandContact=localStorage.setItem("contact",JSON.stringify(contact));
  commandProducts=localStorage.setItem("products",JSON.stringify(products));
  fetch("http://localhost:3000/api/products/order",{
  method:"POST",
  headers:{
    "Accept":"application/json",
    "Content-Type":"application/json", 
  },
  body:JSON.stringify({contact,products})
  }).then(function(res){
    console.log("reponse", res)
    if(res.ok){
  
      return res.json();
    }
  }).then(function(value){
  
    console.log("value promise post",value)
    console.log("orderid ",value.orderId)
    // recupération du numero de commande crypté dans la reponse de l api et rediraction vers l url réecrite de la page de confirmation
    window.location.href= `./confirmation.html?orderId=${value.orderId}`
  
  }).then(function(error){
    console.log("error",error)
  });


  

  
});
 
 

