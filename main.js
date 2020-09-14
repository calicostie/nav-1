const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "G", url: "https://github.com" },
  { logo: "J", url: "https://juejin.im" },
]; //用户第一次访问时x的值为null，故要做判断，如果xObject存在则返回xObject，若不存在，则使用默认数组

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove(); //除最后一项外其他都复制，用以保存之前的网址
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("添加快捷方式");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url,
  });
  render();
});

// window.onbeforeunload = () => {
//   const string = JSON.stringify(hashMap); //hashMap转换成字符串
//   localStorage.setItem("x", string); //存储到localStorage里，设置一个x，值为string
// };
