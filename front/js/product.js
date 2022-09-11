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

productSelected.then(function(productSelect){
    let itemImg= document.querySelector(".item__img");
    let imgProductSelected= document.createElement("img");
    imgProductSelected.src= productSelect.imageUrl;
    imgProductSelected.alt= productSelect.altTxt;
 console.log("produit selectionné",productSelect)
 console.log("titre du produit", productSelect.name)
    itemImg.appendChild(imgProductSelected);
});
