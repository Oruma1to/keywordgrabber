const axios = require('axios')
const cheerio = require('cheerio')
const prompt = require('prompt-sync')({sigint: true})

const runScraper = async () => {
  const new_url = prompt('Enter a URL: ')
  console.log(`Now grabbing: ${new_url}`)
  url = new_url ? new_url : `https://www.youtube.com/watch?v=QRMvvhiHnk8`
  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  let keywords = []

  // console.log(keywords)
  $('meta').each((i, el) => {
    if ($(el).attr('name') === 'keywords') {
      keywords = $(el).attr('content')
    }
  })

  console.log(keywords)
  console.log(`Total number of keywords: ${keywords.split(', ').length}`)
  console.log(`Total string length: ${keywords.length}`)
  

}

runScraper()