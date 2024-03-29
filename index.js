const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

async function scrapeWebsite(url) {
  console.log(process.env.TOKEN)
  try {
    const response = await axios.get(url);
    const html = response.data;
    
    // Load the HTML into Cheerio
    const $ = cheerio.load(html);
    
    // Select all elements with class name '.Box-row'
    const articleLinks = $('.Box-row h2 a');
    
    // Extract href property of the <a> tag within the <h2> tag of each .Box-row
    const links = articleLinks.map((index, element) => {
      return `https://github.com${$(element).attr('href')}`;
    }).get();
    
    
    for (let link of links) {
      console.log(link);
    }
  } catch (error) {
    console.error('Error fetching the website:', error);
  }
}

// URL of the webpage you want to scrape
const url = 'https://github.com/trending';

scrapeWebsite(url);
