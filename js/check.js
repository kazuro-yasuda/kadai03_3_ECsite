window.onload = function () {
  let items = JSON.parse(localStorage.getItem("items")); //ローカルストレージの商品データの配列
  let ele = document.getElementById("js_shopping_list"); //カートの商品を追加する要素
  let fragment = document.createDocumentFragment(); //DOMの追加処理用のフラグメント
  let total = 0; //商品の合計金額
  let total_ele = document.getElementById("js_total"); //商品の合計金額表示用の要素
  let confirm_btn = document.getElementById("js_confirm"); //購入確定ボタン

  if (items) {
    // カート商品の数分、要素を作成
    for (let i = 0; i < items.length; i++) {
      let li = document.createElement("li");
      let h2 = document.createElement("h2");
      // let videos = codument.createElement("videos");
      let price = document.createElement("div");

      price.classList.add("price");

      h2.appendChild(document.createTextNode(items[i].name));
      price.appendChild(document.createTextNode(items[i].price));
      // videos.appendChild(document.createTextNode(items[i].videos));

      li.appendChild(h2);
      li.appendChild(price);
      fragment.appendChild(li);
      // li.appendChild(videos);

      // 合計金額を加算
      total = total + items[i].price;
    }
  }

  // 作成した要素の追加
  ele.appendChild(fragment);
  // 合計金額の表示
  total_ele.innerHTML = total;

  confirm_btn.addEventListener("click", function () {
    alert("購入確定しました。");
    localStorage.removeItem("items");
  });
};
