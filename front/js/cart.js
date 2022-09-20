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

  console.log("total price", totalPrice)
  console.log("total quantité", totalQuantite)
  const totalQuantityElement = document.getElementById("totalQuantity");
  console.log("span total quantity", totalQuantity);
  const totalPriceElement = document.getElementById("totalPrice");
  totalQuantityElement.textContent = `${totalQuantite}`;
  totalPriceElement.textContent = `${totalPrice}`;




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

    let previousQuantite = productSelected.quantite;

    console.log("inputQuantity value modifié listener", dataArticleProduct);
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
    //function modifTotalQuantite() {
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

    //};

    //modifTotalQuantite();

    localStorage.setItem("produits", JSON.stringify(tabCartStorage));

    tabCartStorage = JSON.parse(localStorage.getItem("produits"));

    // function modifTotalPrice() {

    //   if (productSelected.quantite <= val) {
    //     console.log("totalprice", totalPrice);
    //     totalPrice += priceArticles;
    //     totalPriceElement.textContent = totalPrice;


    //   } else if (productSelected.quantite >= val) {

    //     console.log("totalprice", totalPrice);
    //     totalPrice -= priceArticles;
    //     totalPriceElement.textContent = totalPrice;

    //   };



    // }


    //modifTotalPrice();
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

}

console.log("produit selected storage", tabCartStorage);












