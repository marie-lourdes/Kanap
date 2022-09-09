let requet= fetch("http://localhost:3000/api/products");
console.log("requete",requet);


 fetch("http://localhost:3000/api/products").then(function(res){
        if(res.ok){
            return res.json();  
        };
        console.log(res);
    }).then(function(catalogue){
        console.log( "verification des produits kanapé",catalogue) 
        let productsCatalogue= document.querySelector("#items");
        for (cata of catalogue){
           
            let linkProduct= document.createElement("a");
            let articleProducts= document.createElement("article");
            let imgProduct= document.createElement("img");
            imgProduct.src=cata.imageUrl;

           /* articleProducts.innerText= cata;*/
            articleProducts.appendChild(imgProduct);
            linkProduct.appendChild(articleProducts);
            productsCatalogue.appendChild(linkProduct);

            console.log("cata", cata)
        };
        
        console.log( "product catalogue",productsCatalogue);
    }).catch(function(error){
        console.log("error", error);
       
    });
 




/*let items= document.querySelector("#items");
for(kanape of productCatalogue){

}*/