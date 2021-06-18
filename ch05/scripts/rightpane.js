goog.provide('tinyword.RightPane');

goog.require('goog.array');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('goog.ui.TabBar.Location');
goog.require('goog.ui.TabBarRenderer');

tinyword.RightPane = class extends goog.ui.Component {

  /**
   * @param {goog.dom.DomHelper=} opt_domHelper
   */
  constructor(opt_domHelper) {
    super(opt_domHelper);

    this.tabBar_ = new goog.ui.TabBar(
        goog.ui.TabBar.Location.TOP, goog.ui.TabBarRenderer.getInstance(), opt_domHelper);
    this.addChild(this.tabBar_);

    const editorTab = new goog.ui.Tab('エディタ', null, opt_domHelper);
    editorTab.setId('editor-tab');
    this.tabBar_.addChild(editorTab);

    const previewTab = new goog.ui.Tab('プレビュー', null, opt_domHelper);
    previewTab.setId('preview-tab');
    this.tabBar_.addChild(previewTab);
  }

  /** @override */
  createDom() {
    const dom = this.getDomHelper();
    this.tabBar_.createDom();
    this.setElementInternal(
      dom.createDom('div', tinyword.RightPane.CLASS_NAME_,
          dom.createDom('div', tinyword.RightPane.TABBAR_CLASS_NAME_, this.tabBar_.getElement(),
              dom.createDom('div', 'goog-tab-bar-clear')),
          dom.createDom('div', tinyword.RightPane.CONTENT_CLASS_NAME_),
          dom.createDom('div', tinyword.RightPane.CONTENT_CLASS_NAME_)));


    this.tabBar_.forEachChild(tab => {
        tab.createDom();
        this.tabBar_.getContentElement().appendChild(tab.getElement());
    });
  }

  resize(size) {
    const dom = this.getDomHelper();
    const tabBarEl = this.tabBar_.getElement().parentNode;
    const tabBarSize = goog.style.getBorderBoxSize(tabBarEl).height;
    const contentSize = Math.max(size.height - tabBarSize - 2, 0);
    goog.array.forEach(
        dom.getElementsByTagNameAndClass('div', tinyword.RightPane.CONTENT_CLASS_NAME_, this.getElement()),
        el => {
          goog.style.setStyle(el, 'height', `${contentSize}px`);
        }
    );
  }
}
tinyword.RightPane.CLASS_NAME_ = goog.getCssName('rightpane');
tinyword.RightPane.TABBAR_CLASS_NAME_ = goog.getCssName(tinyword.RightPane.CLASS_NAME_, 'tabbar');
tinyword.RightPane.CONTENT_CLASS_NAME_ = goog.getCssName(tinyword.RightPane.CLASS_NAME_, 'content');
