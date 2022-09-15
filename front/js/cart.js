//recuperation du panier depuis le localStorage
let tabCartStorage= JSON.parse(localStorage.getItem("produits"));
console.log("tabcart storage",tabCartStorage)

// récupération et affichage dans le DOM des produits du localStorage
while( tabCartStorage != null) {
    for( productSelected of tabCartStorage){
        console.log("produit selctionné panier", productSelected);
        const sectionBascket= document.getElementById("cart__items");
        const articleBascket= document.createElement("article");
        articleBascket.setAttribute("class","cart__item");
        articleBascket.dataset.id= productSelected.idProduit;
        articleBascket.dataset.color= productSelected.couleur;
        const divImgItem= document.createElement("div");
        divImgItem.setAttribute("class","cart__item__img");
        const imgArticle= document.createElement("img");
        let id= articleBascket.dataset.id;
        imgArticle.src= productSelected.imgUrl;
        imgArticle.alt= productSelected.altImg;
        const divContentItem= document.createElement("div");
        divContentItem.setAttribute("class","cart__item__content");
        const divDescriptionItem= document.createElement("div");
        divDescriptionItem.setAttribute("class","cart__item__content__description");
        const titleItem= document.createElement("h2");
        titleItem.textContent= productSelected.nameProduct;
        const colorItem= document.createElement("p");
        colorItem.textContent= productSelected.couleur;
        const priceItem= document.createElement("p");
        priceItem.textContent= productSelected.priceProduct +" "+"€";
        const divContentSettingItem= document.createElement("div");
        divContentSettingItem.setAttribute("class","cart__item__content__settings");
        const divContentQuantityItem= document.createElement("div");
        divContentQuantityItem.setAttribute("class","cart__item__content__settings__quantity")
        const quantityItem= document.createElement("p");
        quantityItem.textContent= "Qté" + " "+":";
        const inputQuantity= document.createElement("input");
        inputQuantity.type= "number";
        inputQuantity.setAttribute("class","itemQuantity");
        inputQuantity.setAttribute("name","itemQuantity");
        inputQuantity.min= "1";
        inputQuantity.max= "100";
        inputQuantity.value= productSelected.quantite;
        const divContentDeleteItem= document.createElement("div");
        divContentDeleteItem.setAttribute("class","cart__item__content__settings__delete");
        const deleteItem= document.createElement("p");
        deleteItem.setAttribute("class","deleteItem");
        deleteItem.textContent= "Supprimer";

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

        // élément closest  cibler article  avec data-id
        const dataArticleProduct= inputQuantity.closest(":not(div, input)");
        console.log("data article product", dataArticleProduct );

        dataId= articleBascket.dataset.id;
        console.log( "data id article", dataId);
        dataArticleProduct.dataId;
    
        // recuperation de la quantité modifiée du produit
        function quantityProduct (){
            function modifQuantity(){
                inputQuantity.addEventListener("change", function(event){
                        let val= event.target.value;
                        console.log( "inputQuantity value modifié listener",val);
                       
                  
                      
                     return( productSelected.quantite=val,
                       
                        localStorage.setItem("produits",JSON.stringify(tabCartStorage)),
                     (tabCartStorage= JSON.parse(localStorage.getItem("produits")))
                     );
                        
                });
                
            };
            modifQuantity();
            return;
        }
       /* localStorage.removeItem("produits");
        tabCartStorage=[];
        localStorage.setItem("produits",JSON.stringify(productSelected))
        tabCartStorage= JSON.parse(localStorage.getItem("produits"))*/
        quantityProduct();

        // bouton supprimer produit
        const btnDelete= document.querySelector(".deleteItem");
        btnDelete.addEventListener("click", function(){
            inputQuantity.value= modifQuantity();
            productSelected.quantite= inputQuantity.value;
        });
       
    };
   
    break;       
}


console.log("produit selected storage",tabCartStorage);











        
      
  





