const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;




const Product = require('../model/product');
const Category = require('../model/category');
const { truncate } = require('fs');


module.exports = {
    amazon : () => {
        amazonHeader = async () => {
            Category.distinct("category",{ "subcategory":"electronics" })
            .then(result => {
                console.log(result)
                return result
            }).then(async response => {
                return await Promise.all(
                    response.map(async list =>{
                        const data = [];
                        

                            for(index=1; index<=10;index++)
                            {

                                const result = await request.get(`https://www.amazon.in/s?k=${list}&page=${index}`);
                                const $ = await cheerio.load(result);
                            
                                $('.s-asin').each((i,el)=> {
                                    const title = $(el).find('h2 span').text();  
                                    const price = $(el).find('.a-price-whole').text();
                                    const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                                    const image = $(el).find('.s-image').attr('src');
                                    const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                                    const item = list;
                                    const datas = {i,title,price,rating,link,image,item };
                                    // const datas = {i, title}
                                    data.push(datas);
                                    
                                });
                            }
                        
                        
                        data.map(async product => {
                           
                            const html = await request.get(product.link);
                            const $ = await cheerio.load(html);
                
                            product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
                            product.id = $("#averageCustomerReviews").attr("data-asin");
                            product.description = $('#productDescription p').text().trim();
                            product.brand = $("#bylineInfo").text();
                           
                        
                            const id = product.id;
                            const title = product.title;
                            const category = product.item;
                            const link = product.link;
                            const image = product.image;
                            const allimage = product.allimage;
                            const description = product.description;
                            const brand = product.brand;
                            const rating = product.rating;
                            const price = product.price;
                            const subcategory = "electronics";
                            const productDesc = {id,title,price,brand,description, rating,link,image, allimage};

                            Product.update(
                                {id:id},
                                { 
                                    $setOnInsert : {
                                        id : id,
                                        link:link,
                                        brand: brand,
                                        category: category,
                                        subcategory:subcategory,
                                        title:title,
                                        price:price,
                                        rating:rating,
                                        description:description,
                                        image:image,
                                        allimage:allimage,
                                        status:"inactive"
                                    }
                                },
                                {upsert:true}
                            ).then(res => {
                                console.log(res)
                           
                            })
                            .catch(err => {
                                console.log(err)
                            })
                            
                        
                        })
                        console.log("data : "+ data.length, list); 
                        data.pop();
                    }
                ))
            }).catch(err=>{
                console.log(err)
            })
            
           
        }

       
        main = async () => {
           const amazonHead = await amazonHeader();           
        }

        main();
    },





    clothing : () => {
        amazonClothing = async () => {
            Category.distinct("category",{ "subcategory":"clothing" })
            .then(result => {
                console.log(result)
                return result
            }).then(async response => {
                return await Promise.all(
                    response.map(async list =>{
                        const data = [];
                        for(index=1; index<=10;index++)
                        {
                            const result = await request.get(`https://www.amazon.in/s?k=${list}&page=${index}`);
                            const $ = await cheerio.load(result);
                        
                            $('.s-asin').each((i,el)=> {
                                const title = $(el).find('h2 span').text();  
                                const price = $(el).find('.a-price-whole').text();
                                const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                                const image = $(el).find('.s-image').attr('src');
                                const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                                const item = list;
                               
                                // const datas = {i, title}
                                Product.update(
                                    {title:title},
                                    { 
                                        $setOnInsert : {
                                            category:item,
                                            link:link,
                                            title:title,
                                            price:price,
                                            rating:rating,
                                            image:image,
                                            status:"inactive"
                                        }
                                    },
                                    {upsert:true}
                                ).then(res => {
                                    console.log(res)
                               
                                })
                                
                            });
                        }
                    }
                ))
            })
            
        }     
        
        main = async () => {
            const amazonHead = await amazonClothing();           
         }
 
         main();
    }
    
}














