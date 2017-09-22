var exports = module.exports = {}

const puppeteer = {
  launch: {
    timeout: 3000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  waitForSelector: {
    timeout: 3000
  }
}

exports.puppeteer = puppeteer