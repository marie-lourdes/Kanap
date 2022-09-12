//recuperation de l id du produit selectionné sur la page  actuelle du produit
params= new URLSearchParams(window.location.search);
idSelected=params.get("id");

console.log("id selectionné id selectionné",idSelected)
// requête du produit selectionné avec son id
let request= fetch(`http://localhost:3000/api/products/${idSelected}`);
console.log("requete",request);// vérification du code http 

let productSelected= request.then(function(res){
    if(res.ok){
        return res.json();  
    };
}).catch(function(error){
    console.log("error", error);
   
});
// recuperation du produit selectionné en objet javascrit 
productSelected.then(function(productSelect){
    console.log("produit selectionné",productSelect)// verification du contenu de l objet du produit
    //Sélection et création des éléments du DOM et affichage des éléments (détails du produit) dans le DOM de la page produit
    let itemImg= document.querySelector(".item__img");
    let imgProductSelected= document.createElement("img");
    imgProductSelected.src= productSelect.imageUrl;
    imgProductSelected.alt= productSelect.altTxt;
    let titleProduct= document.querySelector(".item__content__titlePrice #title");
    titleProduct.textContent= productSelect.name;
    let priceProduct= document.querySelector("#title + p > #price");
    priceProduct.textContent=productSelect.price;
    let descriptionProduct= document.querySelector(".item__content__description__title + #description");
    descriptionProduct.textContent= productSelect.description;
    //relier l'image du produit au DOM avec son element parent et affichage dans le DOM
    itemImg.appendChild(imgProductSelected); 
    // création des options par couleur de chaque produit sélectionné
    for( colorProduct of productSelect.colors){
        let selectColor= document.querySelector(".item__content__settings__color #colors"); 
        let optionColor= document.createElement("option");
        optionColor.setAttribute("name","color");
        optionColor.setAttribute("id",colorProduct);
        optionColor.value= colorProduct;
        optionColor.textContent= colorProduct;
        // modification de la couleur blanc du texte par defaut du body par la propriété style color des options 
        optionColor.style.color="#3d4c68";
       //relier les options au parent <select>
        selectColor.appendChild(optionColor);
    };

    class addCart {
        static addQuantity(inputQuantity){
            inputQuantity=document.querySelector("#quantity");
            inputQuantity.addEventListener("input",function(event){
                inputQuantity = event.target.value;
                console.log("nombre de produit",inputQuantity);
            });
            return inputQuantity;
        };
        static addColor(selectColor) {
            selectColor= document.querySelector(".item__content__settings__color #colors"); 
            selectColor.addEventListener("input",function(event){
                selectColor = event.target.value;
                console.log("couleur",selectColor); 
            });
            return selectColor;
        };
        static addQuantityColorWindowStorage(inputQuantity,selectColor){
            inputQuantity= addCart.addQuantity();
            selectColor= addCart.addColor();
            
            let btnAddCart= document.querySelector("#addToCart");
            let tableauLocalStorage =[];
            tableauLocalStorage.productStorage=[];
        
            btnAddCart.addEventListener("click", function(){
            
               /* let idproduit=window.localStorage.setItem("id produit",idSelected);
                let quantite=window.localStorage.setItem("quantite produit",inputQuantity.value);
               let couleur= window.localStorage.setItem("couleur produit",selectColor.value);*/
              /* let productStorage=window.localStorage.setItem("product storage",[`${idproduit}`,`${quantite}`,`${couleur}`]);*/
               
            
        
       
    
              /*console.log("quantité produit",window.localStorage.getItem("quantite produit"));
              console.log( "couleur produit",window.localStorage.getItem("couleur produit")); */
              
                 
            let productStorage=window.localStorage.setItem("product storage", JSON.stringify([window.localStorage.setItem("id produit",idSelected),
            window.localStorage.setItem("quantite produit",inputQuantity.value),
            window.localStorage.setItem("couleur produit",selectColor.value)]));
        
            productStorage=window.localStorage.getItem("product storage");
            productStorage.idProduit=window.localStorage.getItem("id produit");
            productStorage.quantite=window.localStorage.getItem("quantite produit");
            productStorage.couleur= window.localStorage.getItem("couleur produit");
           
          
            console.log("product storage", tableauLocalStorage.productStorage);
                  
            console.log("tableau local storage", tableauLocalStorage);
           
            });
            
           
            return tableauLocalStorage; 
        
         /*   if ( !tableauLocalStorage.productStorage){
                
                
               
            } else if(tableauLocalStorage.productStorage){
                tableauLocalStorage.push(tableauLocalStorage.productStorage);
            }
            else if (tableauLocalStorage.productStorage.idproduit == idSelected && tableauLocalStorage.productStorage.couleur == selectColor.value) {
             tableauLocalStorage.productStorage.quantite += inputQuantity.value;
            }*/
            
        };
    };

    addCart.addQuantityColorWindowStorage();

});






   



/*inputQuantity.addEventListener("input",function(event){


    inputQuantity = event.target.value;
    
    console.log("nombre de produit",inputQuantity)

});*/

   




    

