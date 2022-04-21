window.onload = function () {
  let cart_btns = document.querySelectorAll(".js_cart_btn"); //カートボタン
  let cart_cnt_icon = document.getElementById("js_cart_cnt"); //カートの個数アイコン
  let cart_cnt = 0; //カートのアイテム数
  let clicked = []; //クリックされたカートアイコンのインデックス
  let save_items = []; //ローカルストレージ保存用の配列
  let items = JSON.parse(localStorage.getItem("items")); //ローカルストレージの商品データ配列 //文字列によって記述されている JavaScript の値やオブジェクトを構築

  // すでにカートに商品が入っている場合、カートアイコンのカウント表示とカートボタンをアクティブにする
  if (items) {
    let id;
    for (let i = 0; i < items.length; i++) {
      id = items[i].id;
      save_items.push(items[i]);
      clicked.push(id);
      activate_btn(id);
    }

    if (items.length != 0) {
      cart_cnt_icon.parentNode.classList.remove("hidden");
      cart_cnt_icon.innerHTML = cart_cnt;
    }
  }

  // カートボタンを押した際の処理
  cart_btns.forEach(function (cart_btn, index) {
    cart_btn.addEventListener("click", function () {
      // カートボタンがすでに押されているかの判定
      if (clicked.indexOf(index) >= 0) {
        for (let i = 0; i < clicked.length; i++) {
          if (clicked[i] == index) {
            clicked.splice(i, 1); //iの位置から−１引いて取り除く←indexは０からカウントのため
            save_items.splice(i, 1);
          }
        }

        inactivate_btn(index);
      } else if (clicked.indexOf(index) == -1) {
        //「検索にヒットしなければ-1を返す」
        //indexOf →文字列を検索
        let name = cart_btn.dataset.name; //商品の名前を取得
        let price = Number(cart_btn.dataset.price); //商品の値段を取得
        //※ 動画の埋め込み？？？？？ let video =

        clicked.push(index);
        save_items.push({
          id: index,
          name: name,
          price: price,
        });

        activate_btn(index);
      }

      //カウント表示
      function activate_btn(index) {
        cart_cnt++;
        if (cart_cnt >= 1) {
          cart_cnt_icon.parentNode.classList.remove("hidden"); //０：非表示　１以上：hiddenクラスを消して、表示する
        }
        cart_cnt_icon.innerHTML = cart_cnt;
        cart_btns[index].classList.add("item_cart_btn_active");
      }

      function inactivate_btn(index) {
        cart_cnt--;
        if (cart_cnt == 0) {
          cart_cnt_icon.parentNode.classList.add("hidden");
        }
        cart_cnt_icon.innerHTML = cart_cnt;
        cart_btns[index].classList.remove("item_cart_btn_active");
      }
      // ローカルストレージに商品データを保管
      localStorage.setItem("items", JSON.stringify(save_items)); //JavaScript のオブジェクトや値を JSON 文字列に変換

      //ページ読み込み、保存データ取得・表示　→未完成？？？
      //アプリケーションから消さないと作動しなくなる。。。
      // if (localStorage.getItem("items")) {
      //   const value = localStorage.getItem("items", JSON.stringify(save_items));
      //   $("#text_area").val(value);
    });
  });
};
