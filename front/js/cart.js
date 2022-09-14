//recuperation du panier depuis le localStorage
let tabCartStorage= JSON.parse(localStorage.getItem("produits"));


// Requête GET des données des produits de l'api et transformation des données au format json en objet javascript
let request=fetch("http://localhost:3000/api/products");
let requestProducts= request.then(function(res){
    if(res.ok){
        return res.json();  
    };
}).catch(function(error){
    console.log("error", error);
   
});
// Récupération des produits retournés par l'api et sous forme d'objet javascript
function reqProducts(){
    let reqResolve= Promise.resolve(requestProducts);
    reqResolve.then(function(respProducts){
        for( product of respProducts){
            console.log("product api", product);
            idProduct= product._id;
            console.log("id product", idProduct);
            const imgUrl= product.imageUrl;
         
            console.log("img product", imgUrl)
            
        }
        for( productSelected of tabCartStorage){
            console.log("produit selctionné panier", productSelected);
            const sectionBascket= document.getElementById("cart__items");
            const articleBascket= document.createElement("article");
            articleBascket.dataset.id= productSelected.idProduit;
            articleBascket.dataset.color= productSelected.couleur;
            const divImgItem= document.createElement("div");
            divImgItem.setAttribute("class","cart__item__img");
            const imgArticle= document.createElement("img");
           let id= articleBascket.dataset.id;
           imgArticle.src= productSelected.imgUrl;
           imgArticle.alt= productSelected.altImg;

           /* imgArticle.src= `http://localhost:3000/?${id}/images`;*/

        
        
            divImgItem.appendChild(imgArticle);
            articleBascket.appendChild(divImgItem);
            sectionBascket.appendChild(articleBascket);
           
        };
        console.log("produit selected storage",tabCartStorage);
        
      
    });
 return reqResolve;
}
reqProducts();



