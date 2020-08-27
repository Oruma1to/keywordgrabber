const axios = require('axios')
const cheerio = require('cheerio')
const prompt = require('prompt-sync')({ sigint: true })
const fs = require('fs')

const runScraper = async () => {
  const new_terms = prompt('Enter a search term: ')
  const new_url = `https://www.youtube.com/results?search_query=${new_terms.split(' ').join('+')}`
  console.log(`Now grabbing: ${new_url}`)
 
  const response = await axios.get(new_url)

  console.log(Object.keys(response))

  const $ = cheerio.load(response.data)

  let alinks = []

  // console.log(keywords)
  $('a').each((i, el) => {
    // if ($(el).attr('id') == 'thumbnail') {
      alinks.push($(el).attr('href'))
    // }
  })

  console.log(alinks)
  
  fs.writeFile(`youtube-search-${new_terms.split(' ').join('+')}`, response.data , (err) => {
    if (err) throw err
    console.log('Saved file')
  })
}

runScraper()