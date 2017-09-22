const puppeteer = require('puppeteer');

(async () => {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///D:/work-station/node-lifetrick/index.html');

    const posts  = await page.evaluate(() => {
      return {width: window.innerWidth, height: window.innerHeight};
      // const wrappers = document.querySelectorAll('div.reddit-post-wrapper');
      //
      // const posts = wrappers.map(wrapper => {
      //  // Try to find imgUrl
      //  const post = wrapper.querySelector('div.reddit-post')
      //  const img = post.querySelector('img');
      //  // Try to get the category
      //  const postFooter = wrapper.querySelector('div.reddit-post-footer')
      //  const anchorCategory = postFooter.querySelector('a.category-tag')
      //  const category = anchorCategory.innerText
      //
      //  return {
      //    imgUrl: img.src,
      //    category,
      //  }
      // })
      //
      // return posts;
    });

    console.log(posts);
    //await page.screenshot({path: 'receipt.png'});
    browser.close();
  }catch(err){
    console.log(err)
  }
})();