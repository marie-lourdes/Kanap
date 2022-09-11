params= new URLSearchParams(window.location.search);
idSelected=params.get("id");

console.log("id selectionné id selectionné",idSelected)
let request= fetch(`http://localhost:3000/api/products/${idSelected}`);
console.log("requete",request);
// Requête GET des données des produits de l'api et transformation des données au format json en objet javascript

let productSelected= request.then(function(res){
    if(res.ok){
        return res.json();  
    };
}).catch(function(error){
    console.log("error", error);
   
});

productSelected.then(function(product){
 console.log("produit selectionné",product)
});
