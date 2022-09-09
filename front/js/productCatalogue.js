let requet= fetch("http://localhost:3000/api/products");
console.log("requete",requet);
let request=fetch("http://localhost:3000/api/products");
let requestProducts= request.then(function(res){
    if(res.ok){
        return res.json();  
    };
}).catch(function(error){
    console.log("error", error);
   
});
function reqProducts(){
   let req= requestProducts.then(function(catalogue){
        console.log("verification des produits kanapé",catalogue) 
        let productsCatalogue=document.querySelector("#items");
        for(product of catalogue){
           
            let linkProduct= document.createElement("a");
            let articleProducts= document.createElement("article");
            let imgProduct= document.createElement("img");
            imgProduct.src=product.imageUrl;
            imgProduct.alt=product.altTxt;
       
            articleProducts.appendChild(imgProduct);
            linkProduct.appendChild(articleProducts);
            productsCatalogue.appendChild(linkProduct);  
        };
       
    });
    return req;
};
 let catalogueProducts= reqProducts();
 
 

console.log("catalogue produit",catalogueProducts);

  


  



/*let items= document.querySelector("#items");
for(kanape of productCatalogue){

}*/