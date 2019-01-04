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
}
tinyword.LeftPane.CLASS_NAME_ = goog.getCssName('leftpane');
