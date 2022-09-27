//................recupération du panier depuis le localStorage...............
let tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );
console.log( "panier du localStorage", tabCartStorage );

/* compteur à zero pour le prix et la quantité  dont les valeurs  s'accumuleront lors de la boucle du panier "tabCartStorage"
 pour donner le total du prix et de la quantité de tous les produits ajoutés au panier et enregistrés dans le localstorage*/
let totalPrice = 0;
console.log( "compteur prix total du panier", totalPrice );
let totalQuantite = 0;
console.log( "compteur quantité totale d'article du panier", totalQuantite );

//.............. récupération et affichage dans le DOM des produits du localStorage..................

for( let productSelected of tabCartStorage ){
  console.log( "produit selctionné panier", productSelected );
  const sectionBascket = document.getElementById( "cart__items" );
  const articleBascket = document.createElement( "article" );
  articleBascket.setAttribute( "class", "cart__item" );
  articleBascket.dataset.id = productSelected.idProduit;
  articleBascket.dataset.color = productSelected.couleur;

  // Détails produits
  const divImgItem = document.createElement( "div" );
  divImgItem.setAttribute( "class", "cart__item__img" );
  const imgArticle = document.createElement( "img" );
  imgArticle.src = productSelected.imgUrl;
  imgArticle.alt = productSelected.altImg;
  const divContentItem = document.createElement("div");
  divContentItem.setAttribute( "class", "cart__item__content" );
  const divDescriptionItem = document.createElement( "div" );
  divDescriptionItem.setAttribute( "class", "cart__item__content__description" );
  const titleItem = document.createElement( "h2" );
  titleItem.textContent = productSelected.nameProduct;
  const colorItem = document.createElement( "p" );
  colorItem.textContent = productSelected.couleur;
  const priceItem = document.createElement( "p" );
  let priceArticles = productSelected.priceProduct * productSelected.quantite;
  console.log( "prix total article", priceArticles );
  totalPrice += priceArticles;
  totalQuantite += parseInt( productSelected.quantite );
  priceItem.textContent = priceArticles + " " + "€";
  const divContentSettingItem = document.createElement( "div" );
  divContentSettingItem.setAttribute( "class", "cart__item__content__settings" );
  const divContentQuantityItem = document.createElement( "div" );
  divContentQuantityItem.setAttribute( "class", "cart__item__content__settings__quantity" );
  const quantityItem = document.createElement( "p" );
  quantityItem.textContent = "Qté" + " " + ":";
  const inputQuantity = document.createElement( "input" );
  inputQuantity.type = "number";
  inputQuantity.setAttribute( "class", "itemQuantity" );
  inputQuantity.setAttribute( "name", "itemQuantity" );
  inputQuantity.min = "1";
  inputQuantity.max = "100";
  inputQuantity.setAttribute( "value", `${productSelected.quantite}` );
  const divContentDeleteItem = document.createElement( "div" );
  divContentDeleteItem.setAttribute( "class", "cart__item__content__settings__delete" );
  const deleteItem = document.createElement( "p" );
  deleteItem.setAttribute( "class", "deleteItem" );
  deleteItem.textContent = "Supprimer";
  const totalQuantityElement = document.getElementById( "totalQuantity" );
  console.log( "span total quantite", totalQuantite );
  const totalPriceElement = document.getElementById( "totalPrice" );
  totalQuantityElement.textContent = `${totalQuantite}`;
  totalPriceElement.textContent = `${totalPrice}`;
  console.log( "total price", totalPrice );
  console.log( "total quantité", totalQuantite );
 
  divImgItem.appendChild( imgArticle );
  articleBascket.appendChild( divImgItem );
  divDescriptionItem.appendChild( titleItem );
  divDescriptionItem.appendChild( colorItem );
  divDescriptionItem.appendChild( priceItem );
  divContentItem.appendChild( divDescriptionItem );
  divContentQuantityItem.appendChild( quantityItem );
  divContentQuantityItem.appendChild( inputQuantity );
  divContentSettingItem.appendChild( divContentQuantityItem );
  divContentDeleteItem.appendChild( deleteItem );
  divContentSettingItem.appendChild( divContentDeleteItem );
  divContentItem.appendChild( divContentSettingItem );
  articleBascket.appendChild( divContentItem );
  sectionBascket.appendChild( articleBascket );

  console.log( "section racapitulatif du panier", sectionBascket );
  console.log( "article produit", articleBascket );
  
  //.......................Bouton modifier quantité produit.....................

  // Bouton modifier quantité:Recuperation des quantités modifié avec listener sur les inputs de chaque article des produits du storage
  inputQuantity.addEventListener( "change", function ( event ){
    let val = event.target.value;

    /* selectionner l'ancêtre le plus proche de l'input et qui soit un article avec closest()
     pour recuperer les datasets des articles  de produits parents de chaque input, correspondant au idproduit et couleur du produit stockée dans la TabCartStorage*/
    let dataArticleProduct = inputQuantity.closest( "article" );
    let color = dataArticleProduct.getAttribute( "data-color" );
    let id = dataArticleProduct.getAttribute( "data-id" );
    console.log( "article avec inputQuantity value modifié listener", dataArticleProduct );

    // productSelected  sans modification (previousQuantite) et product selected avec la modification de la valeur de l input stockée pour la comparaison pour le total de la quantité et le total du prix 
    let previousQuantite = productSelected.quantite;
    productSelected.quantite = val;
    console.log( "quantité produit modifié", productSelected.quantite );
    // On reparcourt le tabCartorage pour s'assurer de modifier la quantité correspondant à la data-id et à la data-color de l article du DOM du produit corresponant à l idProduit et à la couleur du produit stocké dans le localStorage
    // si les id et couleur correspondent au data-id et data-color de l article , on modifie la quantité du produit dans localstorage avec la valeur recuperé par le listener "val"
    tabCartStorage.forEach( elem => {
      if( elem.couleur === color && elem.idProduit === id ){
        //recupération de la quantité modifiée
        elem.quantite = val;
        console.log( "elem quantité val", elem.quantite );
        //mise à jour de la quantité dans le DOM
        inputQuantity.removeAttribute( "value" );
        inputQuantity.setAttribute( "value", `${elem.quantite}` );

        // calcul de la quantité modifié avec le prix du produit
        let calculArticlePrice = productSelected.priceProduct * val;
        console.log( "price product: ", productSelected.priceProduct );
        // mise à jour de l 'affichage  dans le DOM du prix calculé avec la quantité modifié sans stocker le nouveau prix calculé dans le localstorage
        priceItem.textContent = calculArticlePrice + " " + "€";
        console.log( "total quantité modifié", totalQuantite );
      }
    });

    //on reenregistre dans le locastorage le tableau de produits stockés avec les quantité modifiés et recupere le tableau modifé de la tabCartStorage
    updateProductModified();
    console.log( "tabCartStorage avec quantité modifié", tabCartStorage );

    // comparaison  de la quantité du produit sans modification de la quantité (previousQuantote) et de la quantité modifiée du produit par l input  pour incrementer ou desincrementer le total de quantité
   
    console.log( " val", val );
    console.log( "total quantity element avant modification ", totalQuantityElement.textContent );
    console.log( "total quantité  ", totalQuantite );
    console.log( "product selected total", productSelected.quantite );
    // si la quantité modifiée est supérieur à la quantité précédente on incremente la quantité total des articles et on recalcule le prix total avec la difference de quantité entre la variable previousQuantite (quantité non modifié) et la variable productSelected.quantite modifié
    if( productSelected.quantite > previousQuantite ){
      totalQuantite = totalQuantite + ( productSelected.quantite - previousQuantite );
      totalQuantityElement.textContent = totalQuantite;
      totalPrice += productSelected.priceProduct * ( productSelected.quantite - previousQuantite );
      totalPriceElement.textContent = totalPrice;
      updateProductModified();
      console.log(" total quantité function incrementé ", totalQuantite);
    // si la quantité modifiée est inférieure à la quantité précédente on desincremente la quantité total des articles et on recalcule le prix total avec la difference de quantité entre la variable previousQuantite (quantité non modifié) et la variable productSelected.quantite modifié
    }else if( productSelected.quantite < previousQuantite ){
      totalQuantite = totalQuantite - ( previousQuantite - productSelected.quantite );
      totalQuantityElement.textContent = totalQuantite;
      totalPrice -= productSelected.priceProduct * ( previousQuantite - productSelected.quantite );
      totalPriceElement.textContent = totalPrice;
      updateProductModified();
      console.log( " total quantité function descrementé", totalQuantite );
    }
     updateProductModified();
  });

  // création fonction pour enregistrer les modifications du localStorage et récupérer les modifications
      
  const updateProductModified= () => {
    localStorage.setItem( "produits", JSON.stringify( tabCartStorage ) );
    tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );
  };

  //.......................Bouton supprimer produit.....................

  // bouton supprimer produit

  deleteItem.addEventListener( "click", function ( event ){
    event.preventDefault();
    let deleteProduct = deleteItem.closest( "article" );
    let color = deleteProduct.getAttribute( "data-color" );
    let id = deleteProduct.getAttribute( "data-id" );
    console.log( "deleteproduct", deleteProduct );

    /* verifier la data color et data-id corresponde au idproduit et couleur du produit de la tabCartStorage avec filter(),
     pour supprimer   dans la TabCartStorage*/
    tabCartStorage.forEach( elem => {
      /*- supression de l'élément  par l'event click dans le localstorage en vérifiant de supprimer le produit stocké qui correspond a la data-id et à la dat-color de l article du DOM du produit
         -en  generant un nouveau tableau de la tabCartStorage avec les elements qui ont un id et une couleur differente de l'element supprimé*/
      tabCartStorage = tabCartStorage.filter( function ( elem ){
        if ( elem.idProduit !== id ) return true;
        if ( elem.couleur !== color ) return true;
        console.log( "elem produit", elem );
      });

      //suppression de l'article du produit  dans le DOM avec la verification de la correspondance entre l'idProduit et la couleur du produit stocké et la data-id et data-color de l'article du produit
      if ( elem.couleur === color && elem.idProduit === id ){
        deleteProduct.remove();
        console.log( "tabcartstorage apres supression element", tabCartStorage );
      }
      console.log( "event", event );
    });

    /*- on reenregistre dans le locastorage le tableau de produits stockés avec les produits non supprimé par le filter  dans la tabCartStorage
      -on recupere la TabCartStorage avec les elements du DOM generé par la boucle for avec la mise à jour de la tabCartStorage 
    dans lequel la boucle itere sur chaque element et les affiche un a un et sans l element supprimé */
    updateProductModified();
  });
}

console.log( "produit selected storage", tabCartStorage );

//....................Formulaire: Récupération dans  un objet contact des données saisies par  l'utilisateur................ 

//création de l objet contact
const firstName = document.getElementById( "firstName" );
const lastName = document.getElementById( "lastName");
const address = document.getElementById( "address" );
const city = document.getElementById( "city" );
const email = document.getElementById( "email" );

let contact = {
  firstName: firstName,
  lastName: lastName,
  address: address,
  city: city,
  email: email
};

// récupération des données du formulaire dans l'objet contact avec verification des données au préalable (avec message d'erreur) avant de les stocker dans l'objet contact

firstName.addEventListener( "input", function( event ){
  let msgError = document.getElementById( "firstNameErrorMsg" );
  let dataFirstName = event.target.value;
  console.log( "test dataFirstName", isNaN( dataFirstName ) );
  if( isNaN( dataFirstName ) != true ){
   error( firstName, msgError, "Prénom invalide" );
  }else{
    contact.firstName = dataFirstName;
  }
  console.log( "contact input value", contact );
});

lastName.addEventListener( "input", function( event ){
  let msgError = document.getElementById( "lastNameErrorMsg" );
  let dataLastName = event.target.value;
  console.log( "test dataLasttName", isNaN( dataLastName ) );

  if( isNaN( dataLastName ) != true ){
    error( lastName, msgError, "Nom invalide" );
  }else{
   contact.lastName = dataLastName; 
  }
  console.log("contact input value", contact);
});

address.addEventListener( "change", function( event ){
  let msgError = document.getElementById( "addressErrorMsg" );
  let dataAdress = event.target.value;
  const regex = /^(([A-Z])*(\d+)([A-Z])*)(-|\/|&)*(([A-Z])*(\d+)([A-Z])*)*((\/)*(([A-Z])*(\d+)([A-Z])*))*/;
 //test des normes du regex adresse avec les données de l'utilisateur
  let testRegex = regex.test( dataAdress );
  console.log( "test regex", testRegex );

  if( testRegex ){
    contact.address = dataAdress;
  }else{
    error( address, msgError, "Adresse invalide, Ex: 45, boulevard de Paris" );
  }
  console.log( "contact input value", contact );
});

city.addEventListener( "input", function( event ){
  let msgError = document.getElementById( "cityErrorMsg" );
  let dataCity = event.target.value;
  console.log( "test city", isNaN( dataCity ) );

  if( isNaN( dataCity ) != true ){
    error( city, msgError, "Ville non valide" );
  }else{
    contact.city = dataCity; 
  }
  console.log( "contact input value", contact );
});

email.addEventListener( "change", function( event ){
  let msgError = document.getElementById( "emailErrorMsg" );
  let emailAddress = event.target.value;
  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  //test des normes du regex email avec les données de l'utilisateur
  let testRegexEmail = regexEmail.test( emailAddress );
  console.log( "test regex email", testRegexEmail );

  if( testRegexEmail ){
   contact.email = emailAddress;
  }else{
    error( email, msgError, "Email invalide, Ex: contact@kanap.com" );
  }
  console.log("contact input value", contact);
});

// function error input pour un feedback visuel
function error( inputDataUser, msgError, txtError ){
  inputDataUser.setAttribute( "disabled", true );
  inputDataUser.style.border = "2px solid #fbbcbc";
  msgError.textContent = txtError;
}

//enregistrement de l objet contact dans le localstorage avec les données utilisateur
localStorage.setItem( "contact", JSON.stringify( contact ) );
let commandContact = JSON.parse(localStorage.getItem( "contact" ) );

//....................Récupération des id produit  dans  un tableau products ................ 

//Création du tableau products avec la selection de l' id des produits stockés dans le localStorage
let products = [];
products = tabCartStorage.map( elem => {
  return elem.idProduit; 
});

//enregistrement du tableau products dans le localstorage avec l 'id des produits
localStorage.setItem( "products", JSON.stringify( products ) );
let commandProducts = JSON.parse( localStorage.getItem( "products" ) );

console.log( "tabcartstorage map id", products );

//....................Formulaire: Bouton commander ................ 

/*Au clic du bouton commander:
-Enregistrement de l objet contact et du tableau id produit dans localstorage
- et requete POST sur l api de l objet contact et du tableau id produit*/

const orderForm = document.querySelector( ".cart__order__form" );
console.log( "order form", orderForm );
orderForm.addEventListener( "submit", function( event ){
  event.preventDefault();
  commandContact = localStorage.setItem( "contact", JSON.stringify( contact ) );
  commandProducts = localStorage.setItem( "products", JSON.stringify( products ) );
  fetch( "http://localhost:3000/api/products/order", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json" 
  },
  body: JSON.stringify( {contact, products} )
  })
  .then( function( res ){
    console.log("reponse", res);
    if( res.ok ){
      return res.json();
    }
  })
  .then( function( value ){
   // recupération du numero de commande crypté dans la reponse de l api et redirection vers l url réecrite de la page de confirmation
    console.log( "value promise post", value );
    console.log( "orderid ", value.orderId );
    window.location.href = `./confirmation.html?orderId=${value.orderId}`; 
  })
  .catch( function( error ){
    console.log( "error", error );
  });
});
 
 

