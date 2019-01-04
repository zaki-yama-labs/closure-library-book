goog.provide('tinyword.LeftPane');

goog.require('goog.dom.classes');
goog.require('goog.ui.Component');

tinyword.LeftPane = class extends goog.ui.Component {

  /**
   * @param {goog.dom.DomHelper=} opt_domHelper
   */
  constructor(opt_domHelper) {
    super(opt_domHelper);
  }

  /** @override */
  disposeInternal() {
    super.disposeInternal();
  }

  /** @override */
  canDecorate(element) {
    return true;
  }

  /** @override */
  decorateInternal(element) {
    super.decorateInternal(element);
    goog.dom.classes.add(element, tinyword.LeftPane.CLASS_NAME_);
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
