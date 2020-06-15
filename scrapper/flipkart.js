const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;


 
const Product = require('../model/category');
const Flipkart = require('../model/flipkart');

module.exports = {
    flipkart : () => {
        flipkartHeader = async () => {
            Product.distinct("category",{ "subcategory":"electronics" })
            .then(result => {
                console.log(result)
                return result
            }).then(async response => {
                return await Promise.all(
                    response.map(async list =>{
                        for(index=0; index<=10; index++){
                            const result = await request.get('https://www.flipkart.com/search?q='+list+"&page="+index);
                            const $ = await cheerio.load(result);
                        
                            $('.bhgxx2 ').each((i,el)=> {
                        
                                const title = $(el).find('._3wU53n').text();
                                const price = $(el).find('._1vC4OE').text().slice(1);
                                
                                
                                Flipkart.update(
                                    {title:title},
                                    {$setOnInsert : {title:title,price:price}},
                                    {upsert:true}
                                )
                                .then(res => {
                                    console.log(res)
                                })
                            
                            });
                        }
                       
                    }
                ))
            })
        }

        main = async () => {
            const flipHead = await flipkartHeader();
           
        }

        main();
    }
    
}















// flipkartHeader = async () => {
//     Product.find({ "subcategory":"electronics" })
//     .then(result => {
//         // console.log(result)
//         return result
//     }).then(async response => {
//         return await Promise.all(
//             response.map(async list =>{
//                 const result = await request.get('https://www.flipkart.com/search?q='+list.category);
//                 const $ = await cheerio.load(result);
            
//                 $('.IIdQZO').each((i,el)=> {
//                     list.id = $(el).attr('data-tkid');
//                     list.brand = $(el).find('._2B_pmu').text();
//                     list.price  = $(el).find('._1vC4OE').text()
//                     list.link = $(el).find('._3dqZjq').attr('href');

//                     const id = list.id;
//                     const brand = list.brand;
//                     const price = list.price;
//                     const link = list.link;
//                     const title = list.title;
                    
//                     datas = {i,id,brand,price,link,title}
//                     console.log(datas)
//                     flipdata.push(datas)
            
//                 });
            
//                 return flipdata; 
//             }
//         )
//         )
//     }).catch(err => {
//         console.log(err)
//     })
// }




// flipkart : () => {
//     flipkartHeader = async () => {
//         for(searchIndex=0; searchIndex <= electronicsItem.length; searchIndex++){
//             for(index=0;index <=3; index++){
//                 const result = await request.get('https://www.flipkart.com/search?q='+electronicsItem[searchIndex]+"&page="+index);
//                 const $ = await cheerio.load(result);
            
//                 $('.IIdQZO').each((i,el)=> {
//                     const id = $(el).attr('data-tkid');2
//                     const brand = $(el).find('._2B_pmu').text();
//                     const name = $(el).find('._2mylT6').text();
//                     const image = $(el).find('._1A8_B6').html();
//                     const price  = $(el).find('._1vC4OE').text()
//                     const mrp = $(el).find('._3auQ3N').text();
//                     const link = $(el).find('._3dqZjq').attr('href');
                    
//                     datas = {i,id,brand,name,image,price,mrp,link}
//                     console.log(datas)
//                     data.push(datas)
            
//                 });
//             }}
//         return data;
//     }
    
//     const main = async () => {
//         const flipHead = await flipkartHeader();
//         console.log('Flipkart data : ' + flipHead.length);
//     }
    
//     main();
    
// }