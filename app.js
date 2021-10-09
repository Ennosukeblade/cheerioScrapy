const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
//const path = require('path');
const allUsers = require('./scrape.json');
let json2xls = require("json2xls");
//import {moveFile} from 'move-file';

require('colors')
let dataArray = [];
axios.get("https://synotec.tn/categorie-produit/scolaire/pack-en-promo-scolaire-2/").then(urlResp =>{
    const $ =cheerio.load(urlResp.data);
    
    $("div.xs-product-content").each((i,element)=>{

        const link = $(element).find("a").attr("href");
        const title = $(element).find("a").text();
        const price = $(element).find("del").text();
        const discount = $(element).find("ins").text();
        
        dataArray.push({link:link, title:title, price:price, discount:discount});
        //console.log(dataArray);
        console.log(title.green);
        console.log(link.blue);
        console.log(price);
        console.log(discount.yellow);
        console.log("--------------------\n");

  })

let date = new Date();
h = date.getHours() - 1;
mn = date.getMinutes();
s = date.getSeconds();
d = date.getDate()<10? "0"+date.getDate():date.getDate();
mth = Number(date.getMonth()+1);
m = mth< 10 ? "0" + mth : mth;
y = date.getFullYear();

//await moveFile('./scrap')
/*      fs.rename('scrape.json', `scrape ${d}-${m}-${y}, ${h}h${mn}mn${s}s.json`, function(err) {
      if (err) throw err;
    console.log(err);
  });  */
if (!fs.existsSync('./old')) {
  fs.mkdirSync('./old')
}
   fs.writeFile (`./old/scrape ${d}-${m}-${y}, ${h}h${mn}mn${s}s.json`, JSON.stringify(dataArray), function(err) {
    if (err) throw err;
    console.log('Json file archived!!');
    });

    fs.writeFile (`scrape.json`, JSON.stringify(dataArray), function(err) {
      if (err) throw err;
      console.log('Json file generated!!');
      });
      let xls = json2xls(allUsers);
      fs.writeFile('scrape.xlsx', xls, 'binary',(err) => {
        if (err) {
              console.log("write xsl file error :", err);
         }
       console.log("scrape.xlsx file is saved!");
    });

}); 



