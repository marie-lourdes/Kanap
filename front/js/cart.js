//recuperation du panier depuis le localStorage
let tabCartStorage = JSON.parse(localStorage.getItem("produits"));
console.log("tabcart storage", tabCartStorage)


// récupération et affichage dans le DOM des produits du localStorag

for (let productSelected of tabCartStorage) {
  console.log("produit selctionné panier", productSelected);
  const sectionBascket = document.getElementById("cart__items");
  const articleBascket = document.createElement("article");
  articleBascket.setAttribute("class", "cart__item");
  articleBascket.dataset.id = productSelected.idProduit;
  articleBascket.dataset.color = productSelected.couleur;


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
  priceItem.textContent = productSelected.priceProduct + " " + "€";
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



  dataId = articleBascket.dataset.id
  dataColor = articleBascket.dataset.color;
  console.log("data id article", dataId);
  console.log("data color", dataColor)



// Recuperation des quantité modifié avec listener sur les inputs de chaque article des produits du storage
  inputQuantity.addEventListener("change", function (event) {
    let dataArticleProduct = inputQuantity.closest("article");
    let color = dataArticleProduct.getAttribute("data-color");
      let id = dataArticleProduct.getAttribute("data-id");
      console.log("COLOR ", color)
      console.log("ID ", id)
    console.log("input quantity", inputQuantity)
    console.log("data id listener", dataId)
    let val = event.target.value;

    console.log("inputQuantity value modifié listener", dataArticleProduct);

    //productSelected.quantite = val;
    console.log("productselected modifié", productSelected.quantite)

    console.log("PRODUCT", productSelected)
    tabCartStorage.forEach(elem => {
      if (elem.couleur === color && elem.idProduit === id) {
        elem.quantite = val;
      }
    });


    localStorage.setItem("produits", JSON.stringify(tabCartStorage));
    console.log("TAB CART STORAGE", tabCartStorage);
    tabCartStorage = JSON.parse(localStorage.getItem("produits"));
  });

  // bouton supprimer produit


  /*let btnDelete = document.querySelectorAll(".deleteItem");*/
  /*console.log("btn delete", btnDelete)*/

  deleteItem.addEventListener("click", function () {
    let deleteProduct = deleteItem.closest("article");
    let color = deleteProduct.getAttribute("data-color");
      let id = deleteProduct.getAttribute("data-id");
   
    tabCartStorage.forEach(elem => {
      if (elem.couleur === color && elem.idProduit === id) {
   
        /*tabCartStorage.removeItem("produits",elem)*/
        deleteProduct.remove();
        
             
        console.log("element supprimé", deleteProduct)
        localStorage.setItem("produits", JSON.stringify(tabCartStorage.elem));
        tabCartStorage = JSON.parse(localStorage.getItem("produits"));
      
      
        
     
      }
    
      /*localStorage.setItem("produits", JSON.stringify(tabCartStorage));
      console.log("TAB CART STORAGE", tabCartStorage);
      tabCartStorage = JSON.parse(localStorage.getItem("produits"));   */ 
      
    });
   
    
  });

  console.log("TAB CART STORAGE", tabCartStorage);

}


console.log("produit selected storage", tabCartStorage);

  
console.log( "tabcart  storage apres supression element", tabCartStorage)








