const puppeteer = require('puppeteer');
var exports = module.exports = {};

const findLinkListInHomePage = async function(homepage){
  // Open browser
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  // Try go to page get link list
  let linkList;
  
  try {
    const page = await browser.newPage();
    await page.goto(homepage);
    await page.waitForSelector('img')
    /**
     * @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageevaluatepagefunction-args
     * #page.evaluate(pageFunction, ...args)
     */
    const _linkList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('div.navPageNumbers a');
      // Turn nodeList into array
      const _anchors = []
      for(let i = 0; i < nodeList.length; i++) {
        _anchors.push(nodeList[i])
      }
      // Get link from anchor
      return _anchors.map(anchor => {
                  return anchor.getAttribute("href")
                })
                // Remove anchor without href
                .filter(anchor => anchor)
    });

    linkList = _linkList;

  } catch(err) {
    console.log(`[INFO] Fail go to page: ${homepage}`)
    linkList = null;

  } finally {
    // Close browser after everthing DONE
    await browser.close();
  }
  
  return linkList
}

const parseLinkList = (link) => {
  // Only check with current pattern
  const pattern = /\/page\/\d+/gi;
  let pageLink;
  try{
    const pageXMatch = link.match(pattern)
    const pageX = pageXMatch[0];
    let restUrl = link.split(pageX)
    restUrl[0] = restUrl[0] + "/page/"
    const numPageMatch = pageX.match(/\d+/gi)
    let numPage = numPageMatch[0]
    if(typeof numPage === 'undefined' || numPage === null){
      pageLink = null
    }

    // Convert to number
    numPage = Number(numPage)
    if(isNaN(numPage)){
      pageLink = null
    }

    pageLink = {numPage, restUrl}
  }catch(err){
    return null
  }
  
  return pageLink
}

const find = async function(homepage){
  const linkList = await findLinkListInHomePage(homepage)
  if(linkList === null){
    return null
  }

  const firstPageLink = linkList[0];
  const lastPageLink  = linkList[linkList.length - 1]
  const startNumPage = parseLinkList[firstPageLink]
  console.log("startNumPage", startNumPage)
  const lastNumPage = parseLinkList(lastPageLink)

  if(startNumPage === null || lastNumPage === null){
    return null
  }

  const pageLink = {
    restUrl: startNumPage.restUrl,
    startNumPage: startNumPage.numPage,
    lastNumPage: lastNumPage.numPage
  }

  return pageLink
}

exports.find = find 