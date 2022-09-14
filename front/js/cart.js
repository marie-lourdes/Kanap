//recuperation du panier depuis le localStorage
let tabCartStorage= JSON.parse(localStorage.getItem("produits"));
console.log("produit selected storage",tabCartStorage);
for( productSelected of tabCartStorage){
    console.log("produit selctionné panier", productSelected);
}
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
        }

    });
 return reqResolve;
}
reqProducts()