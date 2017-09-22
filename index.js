const puppeteer = require('puppeteer');
const url = "http://lifetricks.com/";

(async () => {
  try{
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);

    const posts  = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('div.reddit-post-wrapper');

      const _wrappers = []

      for(let i = 0; i < nodeList.length; i++){
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
       }catch(err){
         return null;
       }
      })

      return posts;
    });

    console.log(posts);
    await browser.close();
  }catch(err){
    console.log(err)
  }
})();