const cheerio = require("cheerio");
const axios = require("axios");
require('colors')

axios.get("https://synotec.tn/categorie-produit/scolaire/pack-en-promo-scolaire-2/").then(urlResp =>{
    const $ =cheerio.load(urlResp.data);
    let dataArray = [];
    $("h4.product-title").each((i,element) => {
      const link = $(element).find("a").attr("href");
      const title = $(element).find("a").text();
      //console.log(title.green);
      //console.log(link.blue);
      //console.log("--------------------\n");
      dataArray.push({title:title, link:link });
    })
        console.log(dataArray);
        //console.log(params);
});

