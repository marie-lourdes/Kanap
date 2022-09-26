//..............Recuperation de l id du produit selectionné sur la page  actuelle du produit.............

let params = new URLSearchParams( window.location.search );
let idSelected = params.get( "id" );
console.log( "id selectionné id selectionné", idSelected );

//............ Requête du produit selectionné avec son id..................

let request = fetch( `http://localhost:3000/api/products/${idSelected}` );
console.log( "requete", request ); // vérification du code http 

//..........Traitement de la réponse retourné par l'api en objet javascript..............

let productSelected = request.then( function( res ){
    if( res.ok ){
        return res.json();  
    }
})
.catch( function( error ){
    console.log( "error requête", error ); 
});

//................. Recupération du produit selectionné en objet javascrit  de la promesse productSelected...............

productSelected.then( function( productSelect ){
    console.log( "produit selectionné", productSelect ); // verification du contenu de l objet du produit
    //Sélection et création des éléments du DOM et affichage des éléments (détails du produit) dans le DOM de la page produit
    let itemImg = document.querySelector( ".item__img" );
    let imgProductSelected = document.createElement( "img" );
    imgProductSelected.src = productSelect.imageUrl;
    imgProductSelected.alt = productSelect.altTxt;
    let titleProduct = document.querySelector( ".item__content__titlePrice #title" );
    titleProduct.textContent = productSelect.name;
    let priceProduct = document.querySelector( "#title + p > #price" );
    priceProduct.textContent = productSelect.price;
    let descriptionProduct = document.querySelector( ".item__content__description__title + #description" );
    descriptionProduct.textContent = productSelect.description;
    //relier l'image du produit au DOM avec son element parent et affichage dans le DOM
    itemImg.appendChild( imgProductSelected ); 
    // création des options par couleur de chaque produit sélectionné
    for( let colorProduct of productSelect.colors ){
        let selectColor = document.querySelector( ".item__content__settings__color #colors" ); 
        let optionColor = document.createElement( "option" );
        optionColor.setAttribute( "name", "color" );
        optionColor.setAttribute( "id", colorProduct );
        optionColor.value = colorProduct;
        optionColor.textContent = colorProduct;
       //relier les options au parent <select>
        selectColor.appendChild( optionColor );
    }
  
    //................ Ajout du panier avec une "boite à outil de fonctions" class et ses methodes statiques...............
   
    class addCart{
        //création de la methode statique  pour recupérer la couleur
        static addColor( selectColor ){
            selectColor = document.querySelector( ".item__content__settings__color #colors" ); 
            selectColor.addEventListener( "input", function( event ){
                selectColor = event.target.value;
                console.log( "couleur", selectColor );
                let option = document.querySelector( ".item__content__settings__color #colors option" )
                option.value = selectColor; 
                console.log( "couleur methode statique", option );
            });       
            return selectColor;   
        }
      
         //création de la methode statique  pour recupérer la quantité
        static addQuantity( inputQuantity ){
            inputQuantity = document.getElementById( "itemQuantity" );
            inputQuantity.addEventListener( "input", function( event ){
            let val = event.target.value;
            inputQuantity = val;

            //mise à jour dans le DOM de la quantité dans l'attribut value de l imputQuantity 
            document.getElementById( "itemQuantity" ).removeAttribute( "value" );
            document.getElementById( "itemQuantity" ).setAttribute( "value", val );

            console.log("nombre de produit", inputQuantity)
            console.log( "nombre de produit affiché dans le DOM", document.getElementById( "itemQuantity" ) );           
            });           
            return inputQuantity; 
        }
        
        //création de la methode statique pour enregistrer le panier et  le choix de la couleur et de la quantité du produit
        static addQuantityColorWindowStorage( inputQuantity, selectColor ){
            //recupération de la quantité et de la couleur  en appelant les methodes statique addQuantity et addColor
            selectColor = addCart.addColor();
            inputQuantity = addCart.addQuantity();
            
            // recupération de la promesse resolue productSelected et création du panier productStorage
            let btnAddCart = document.querySelector( "#addToCart" );
            btnAddCart.addEventListener( "click", function(){
                let productStorage = {
                    idProduit:idSelected,
                    imgUrl:productSelect.imageUrl,
                    altImg:productSelect.altTxt,
                    nameProduct:productSelect.name,
                    couleur: selectColor.value,
                    priceProduct:productSelect.price,
                    quantite: inputQuantity.value  
                };

                //création de la fonction pour l'enregistrement du panier dans le localstorage
                const addProductSelected = () => { //création de la fonction qui enregistre le panier productStorage
                    tabCartStorage.push( productStorage );
                    localStorage.setItem( "produits", JSON.stringify( tabCartStorage ) );
               };
            
                let tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );
                // si le localstorage est vide on crée un nouveau tableau
                if(tabCartStorage == null){
                    tabCartStorage = [];
                    addProductSelected();
                    console.log( "tableau storage", tabCartStorage );              
                }else if( tabCartStorage != null ){
                //si le localstorage contient des produits et avec le même id et la meme couleur , on incremente la quantité en modifiant le tableau 
                    for( let product of tabCartStorage ){
                        console.log( "produt stockée", product );
                        if( product.idProduit == idSelected && product.couleur == selectColor.value ){
                            return(
                                product.quantite++,
                                console.log( "product quantité ++", product.quantite ),
                                localStorage.setItem( "produits", JSON.stringify( tabCartStorage ) ),
                                ( tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) ) )
                            );
                        }
                    }              
                    addProductSelected();
                }               
                return tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );                      
            });                        
        }    
    }
    addCart.addQuantityColorWindowStorage();
})
.catch( function( error ){
    console.log( "error reponse", error );
   
});



   




    

