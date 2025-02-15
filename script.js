const products =  [
{id: 1,name:"Mobile",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlCAuv7gbRqsjVhugaI9AjnzEfL_ukSFOsKg&s",price:10000},
{id: 2,name:"Headphone",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2y8tzyGf3UEUeUttjasYuNnPkMqhIm43EA&s",price:200},
{id: 3,name:"car",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxSDBvYFtgSCbjz9GI1Q3xP5QOGDuCpm81A&s",price:90780},
{id: 4,name:"car",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWCELmyesuI7x7UaWH4jTr6iva7cz5XUdVUw&s",price:34667},
{id: 5,name:"bike",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhKIZ7Gccl4yxIVB3F8eQ4V_-JhqeG5ZTCQ&s",price:9000},
{id: 6,name:"scuti",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjJU6KGBSnbaWf3loNT6pO4Vf-8moM-_VPaQ&s",price:8900},
{id: 7,name:"car",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXowz1FO0-jzxik-RtD5SLyIb_w713QdyCGw&s",price:8749},
{id: 8,name:"Mobile",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzK8nayNBlPDtRDmQLUQJMwLNBwkwqSGuug&s",price:80000},
{id: 9,name:"bike",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvtrqtewohQPf8E8Uaa0CsbXT24P5DGiBvg&s",price:789},
{id: 10,name:"dress",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1XuuMNiYVLFlDAK9tp7XCNw2Bnd1Kn2jLiA&s",price:2080},
{id: 11,name:"scuti",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjJU6KGBSnbaWf3loNT6pO4Vf-8moM-_VPaQ&s",price:5770},
{id: 12,name:"dress",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzK8nayNBlPDtRDmQLUQJMwLNBwkwqSGuug&s",price:2560},
{id: 13,name:"dress",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFluXUXlnpwRlsXrC4HIExdUZJHRBWDeXlGw&s",price:6780},
{id: 14,name:"computer",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhOt8yVPy6GGZ4tjCXHpImPPqpNoEwJGeE2Q&s",price:57000},
{id: 15,name:"watch",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBdIVwbteI5LarvBDzQAzE9XCwTCM1hRAhQ&s",price:500},
{id: 16,name:"TV",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuKJie0juKWcdhusAQnbewXgPP7ia4c3GcIg&s",price:56000},


]

//Render Products

function renderProducts(Products,productList){
    const container = document.getElementById(productList);
container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML= `
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
         <button onclick = "addToCart(${product.id})">Add to cart</button>
        
        `
        container.appendChild(productDiv);
    })

    }
    if(document.getElementById("productList"))renderProducts(products,"productList");

     //Search funcationality
     function searchProducts(query){
        const filterProducts = products.filter(product =>
                product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
        renderProducts(filterProducts,"productList");
     }



        //Add EventListner to button
        document.getElementById("searchButton")?.addEventListener("click",() => {
            const query = document.getElementById("productSearch").value;
            searchProducts(query);
        })

        //Sorting
        function sortProducts(criteria){
            if(criteria === "price"){
                return products.sort((a,b) => a.price-b.price);

            }
            return products;

        }


        //Adding Event listeners
        document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
            const sortedProducts = sortProducts(event.target.value);
            renderProducts(sortedProducts,"productList");
            
        })

    //Add to cart

    function addToCart(productId){
        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem("cart"))||[];
        cart.push(product);
        localStorage.setItem("cart",JSON.stringify(cart));
        alert(`${product.name} is added to cart`)
        renderCart();
    }


    //Render items in cart

    function renderCart(){
        const cart = JSON.parse(localStorage.getItem("cart"))||[];
        const container = document.getElementById("cartItems");
        container.innerHTML="";
        if(cart.length == 0){
            container.innerHTML="<h1> Your Cart Is Empty</h1>"
        }
        cart.forEach(item => {
            const cartDiv = document.createElement("div");
            cartDiv.classList.add("cart-item");
            cartDiv.innerHTML=`

     
            

            <img src="${item.Image}"/>
            <h3>${item.name}</h3>
            <h2>${item.price}</h2>
            <button onclick="removeFromCart(${item.id})">Remove</button> 
            `

            container.appendChild(cartDiv);
        })
           renderSubtotal(cart);

        }
        //Remove from cart
     function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart"))||[];
        cart =cart.filter(item => item.id !== productId);
        localStorage.setItem("cart" ,JSON.stringify(cart));
        alert("Product is removed successfully");
        renderCart();

       }


    //Calculate subtotal
        function renderSubtotal(cart){
        const subtotal = cart.reduce((total,item) => total + item.price,0);
        const subtotalContainer = document.getElementById("subtotal");
        if(cart.length > 0){
        subtotalContainer.innerHTNL = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
        }
    if(document.getElementById("productList"))renderProducts(products,"productList");
    if(document.getElementById("cartItems"))renderCart();



