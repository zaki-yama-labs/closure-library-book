goog.provide('tinyword.LeftPane');

goog.require('goog.dom.classes');
goog.require('goog.ui.Component');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarMenuButton');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');
goog.require('goog.array');

tinyword.LeftPane = class extends goog.ui.Component {

  /**
   * @param {goog.dom.DomHelper=} opt_domHelper
   */
  constructor(opt_domHelper) {
    super(opt_domHelper);

    /**
     * @private
     * @type {goog.ui.Toolbar}
     */
    this.toolbar_ = new goog.ui.Toolbar(
      goog.ui.ToolbarRenderer.getInstance(),
      goog.ui.Container.Orientation.HORIZONTAL,
      opt_domHelper);
    this.addChild(this.toolbar_);
  }

  /** @override */
  disposeInternal() {
    super.disposeInternal();
  }

  /** @override */
  canDecorate(element) {
    const dom = this.getDomHelper();
    const toolbarEl = dom.getElementsByTagNameAndClass(
      'div', goog.ui.ToolbarRenderer.CSS_CLASS, element)[0];
    return (toolbarEl && this.toolbar_.canDecorate(toolbarEl));
  }

  /** @override */
  decorateInternal(element) {
    super.decorateInternal(element);
    goog.dom.classes.add(element, tinyword.LeftPane.CLASS_NAME_);

    const dom = this.getDomHelper();
    let toolbarEl = dom.getElementsByTagNameAndClass(
      'div', goog.ui.ToolbarRenderer.CSS_CLASS, element)[0];
    if (!toolbarEl) {
      toolbarEl = dom.createDom('div', goog.ui.ToolbarRenderer.CSS_CLASS);
      dom.appendChild(element, toolbarEl);
    }
    this.toolbar_.decorate(toolbarEl);

    const fileMenu = new goog.ui.Menu(dom);
    fileMenu.setId('toolbar-file-menu');
    this.buildItemsForFileMenu_(fileMenu);

    const fileBtn = new goog.ui.ToolbarMenuButton(
      'ファイル', fileMenu, goog.ui.ToolbarMenuButtonRenderer.getInstance(), dom);
    this.toolbar_.addChild(fileBtn, true);
  }

  /** @override */
  createDom() {
    this.decorateInternal(this.getDomHelper().createDom('div'));
  }

  /** @override */
  enterDocument() {
    super.enterDocument();
  }

  /** @override */
  exitDocument(){
    super.exitDocument();
  }

  buildItemsForFileMenu_(menu) {
    const data = [
      ['newfolder', '新規フォルダ'],
      ['rename', '名前変更'],
      ['delete', '削除'],
    ];

    const dom = this.getDomHelper();
    data.forEach(entry => {
      const item = new goog.ui.MenuItem(entry[1], null, dom);
      item.setId(entry[0]);
      menu.addChild(item, true);
    });
  }
}
tinyword.LeftPane.CLASS_NAME_ = goog.getCssName('leftpane');
