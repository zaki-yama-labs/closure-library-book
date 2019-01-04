goog.provide('tinyword.RightPane');

goog.require('goog.ui.Component');

tinyword.RightPane = class extends goog.ui.Component {

  /**
   * @param {goog.dom.DomHelper=} opt_domHelper
   */
  constructor(opt_domHelper) {
    super(opt_domHelper);
  }

  /** @override */
  createDom() {
    const dom = this.getDomHelper();
    this.setElementInternal(
      dom.createDom('div', tinyword.RightPane.CLASS_NAME_)
    );
  }
}
tinyword.RightPane.CLASS_NAME_ = goog.getCssName('rightpane');
