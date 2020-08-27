const axios = require('axios')
const cheerio = require('cheerio')
const prompt = require('prompt-sync')({sigint: true})

const runScraper = async () => {
  const url = `https://www.youtube.com/watch?v=LoziivfAAjE`
  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  let keywords = []

  // console.log(keywords)
  $('meta').each((i, el) => {
    if ($(el).attr('name') === 'keywords') {
      keywords = $(el).attr('content').split(', ')
    }
  })

  console.log(keywords)
}

runScraper()