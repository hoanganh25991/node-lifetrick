const puppeteer = require('puppeteer');
const url = "http://lifetricks.com/page/1/";

(async() => {
  try {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);

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
    const posts = await page.evaluate(async() => {
      const nodeList = document.querySelectorAll('div.reddit-post-wrapper');
      const _wrappers = []
      for(let i = 0; i < nodeList.length; i++) {
        _wrappers.push(nodeList[i])
      }
      // We have to filter wrappers out, bcs some wrapper is for ads
      // So, only get exactly className as "reddit-post-wrapper"
      const wrappers = _wrappers.filter(wrapper => {
        const className = wrapper.getAttribute("class")
        return className === "reddit-post-wrapper"
      })
      const posts = wrappers.map(wrapper => {
        try {
          // Try to find imgUrl
          const post = wrapper.querySelector('div.reddit-post')
          const img = post.querySelector('img');
          // Try to get the category
          const postFooter = wrapper.querySelector('div.reddit-post-footer')
          const anchorCategory = postFooter.querySelector('a.category-tag')
          const category = anchorCategory.innerText

          return {
            imgUrl: img.src,
            category,
          }
        } catch(err) {
          return null;
        }
      })

      return posts;
    }, await page.waitForSelector('img'));

    console.log(posts);
    await browser.close();
  } catch(err) {
    console.log(err)
  }
})();