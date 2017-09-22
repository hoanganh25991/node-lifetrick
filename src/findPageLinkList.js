const puppeteer = require('puppeteer');
const url = "http://lifetricks.com";

const waitForlinkList = (async() => {
  console.log(new Date().getTime())
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  console.log(new Date().getTime())
  try {
    console.log(new Date().getTime())
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('img')
    console.log(new Date().getTime())
    /**
     * @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageevaluatepagefunction-args
     * page.eveluate allow pass args into pageFunction
     *
     * #page.evaluate(pageFunction, ...args)
     *
     * 1. To deal with redirect on lifetrick, we need page wait for see "img"
     * (any elements, just wait for see something)
     *
     * @type {Object|Chromeless<U>|*|!Promise.<!Object|undefined>}
     */
    const linkList = await page.evaluate(async() => {
      const nodeList = document.querySelectorAll('div.navPageNumbers a');

      // Turn nodeList into array
      const _anchors = []
      for(let i = 0; i < nodeList.length; i++) {
        _anchors.push(nodeList[i])
      }

      // We filter anchor has link
      const anchorsHasLink = _anchors.filter(anchor => {
        const href = anchor.getAttribute("href")
        return href
      })

      const linkList = anchorsHasLink.map(anchor => {
        try {
          // Try to find href
          return anchor.getAttribute("href")
        } catch(err) {
          return null;
        }
      })
      return linkList;
    });
    // console.log(waitForlinkList);
    return linkList;
  } catch(err) {
    console.log(err.message)
    return null;
  } finally {
    await browser.close();
  }
})();

const parseLinkList = (link) => {
  console.log(new Date().getTime())
  // Only check with current pattern
  // If fail should die immediately
  const pattern = /\/page\/\d+/gi;
  const match = link.match(pattern)
  if(match){
    const pageX = match[0];
    const number = pageX.match(/\d+/gi)
    if(number){
      console.log(number[0])
      return number[0];
    }
    return null;
  }else{
    console.log("Die immediately. pattern not work")
    return null;
  }
}

waitForlinkList.then(linkList => {
  if(linkList){
    console.log(linkList)
    const x = linkList.map(link => parseLinkList(link))
    console.log(x)
  }
  console.log("No linkList to handle")
}).catch(err => console.log(err))