goog.provide('tinyword.TreeControl');

goog.require('goog.ui.tree.TreeControl');
goog.require('goog.object');

tinyword.TreeControl = class extends goog.ui.tree.TreeControl {

  /**
   * @param {boolean=} opt_folderOnly
   * @param {goog.dom.DomHelper=} opt_domHelper
   */
  constructor(opt_folderOnly, opt_domHelper) {
    const config = goog.object.clone(goog.ui.tree.TreeControl.defaultConfig);
    config.cleardotPath = 'closure-library/closure/goog/images/tree/cleardot.gif';
    super('/', config, opt_domHelper);

    this.opt_folderOnly_ = opt_folderOnly;
  }

  isRootNode() {
    return true;
  }

  getDataSourcePath() {
    return this.dsPath_;
  }

  getFileType() {
    return 'folder';
  }
}
