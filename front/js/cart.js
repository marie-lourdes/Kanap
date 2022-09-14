//recuperation du panier depuis le localStorage
let tabCartStorage= JSON.parse(localStorage.getItem("produits"));
console.log("produit selected storage",tabCartStorage);
for( productSelected of tabCartStorage){
    console.log("produit selctionné panier", productSelected);
}