let requet= fetch("http://localhost:3000/api/products");
console.log("requete",requet);
let request=fetch("http://localhost:3000/api/products");
let requestProduct= request.then(function(res){
    if(res.ok){
        return res.json();  
    };
    console.log(res);
}).catch(function(error){
    console.log("error", error);
   
});
  
requestProduct.then(function(catalogue){
    console.log( "verification des produits kanapé",catalogue) 
    let productsCatalogue=document.querySelector("#items");
    for (cata of catalogue){
       
        let linkProduct= document.createElement("a");
        let articleProducts= document.createElement("article");
        let imgProduct= document.createElement("img");
        imgProduct.src=cata.imageUrl;

        articleProducts.appendChild(imgProduct);
        linkProduct.appendChild(articleProducts);
        productsCatalogue.appendChild(linkProduct);  
    };   
   
});
  
console.log("requetes", requestProduct);

  



/*let items= document.querySelector("#items");
for(kanape of productCatalogue){

}*/