goog.provide('chapter2.App');
goog.require('goog.ui.HsvPalette');

/** @constructor */
chapter2.App = function() {
  // 色選択ウィジェットを作成
  this.palette = new goog.ui.HsvPalette();
  this.palette.render(document.getElementById('palette'));

  document.getElementById('bgcolor-btn').onclick = goog.bind(this.setBGColor, this);
}

chapter2.App.prototype.setBGColor = function() {
  document.body.style.backgroundColor = this.palette.getColor();
}

// chapter2.App のインスタンスを作成
new chapter2.App();