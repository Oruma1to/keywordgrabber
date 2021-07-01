const axios = require('axios')
const cheerio = require('cheerio')
const prompt = require('prompt-sync')({ sigint: true })

const runScraper = async () => {
  const new_url = prompt('Enter a URL: ')
  let url = new_url
  if (url.includes('youtube.com')) {
    console.log(`Now grabbing: ${new_url}`)
    let keywords = []
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    $('meta').each((i, el) => {
      if ($(el).attr('name') === 'keywords') {
        keywords = $(el).attr('content')
      }
    })
    console.log('<-------------------------------------------->')
    keywords.split(',').forEach((keyword, idx) => {
      console.log(idx + 1, keyword)
    })
    // console.log("List of keywords: " + keywords)
    console.log(`Total number of keywords: ${keywords.split(', ').length}`)
    console.log(`Total string length: ${keywords.length}`)

  } else {
    console.log('Please enter a valid youtube url')
    runScraper()
  }
}

runScraper()