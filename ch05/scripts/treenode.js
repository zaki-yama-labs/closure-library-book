goog.provide('tinyword.TreeNode');

goog.require('goog.string');
goog.require('goog.functions');
goog.require('goog.ui.tree.TreeNode');

tinyword.TreeNode = class extends goog.ui.tree.TreeNode {
  /**
   * @param {string} name
   * @param {string} type
   * @param {string} dsPath
   * @param {object} opt_config
   * @param {goog.dom.DomHelper} opt_domHelper
   */
  constructor(name, type, dsPath, opt_config, opt_domHelper) {
    super(goog.string.htmlEscape(name), opt_config, opt_domHelper);

    /**
     * @private
     * @type {string}
     */
    this.fileType_ = type;

    /**
     * @private
     * @type {string}
     */
    this.dsPath_ = dsPath;

    /**
     * @type {string}
     */
    this.sortKey = (type === 'folder' ? '0' :'1') + name;
  }

  /**
   * ファイルタイプに応じてアイコンを変更
   * @return {string} icon class name
   * @override
   */
  getCalculatedIconClass() {
    if (this.fileType_ === 'folder' && !this.hasChildren()) {
      const config = this.getConfig();
      return `${config.cssTreeIcon} ${config.cssCollapsedFolderIcon}`;
    } else {
      return super.getCalculatedIconClass();
    }
  }

  isRootNode() {
    return false;
  }

  getDataSourcePath() {
    return this.dsPath_;
  }

  // フォルダなら "folder"、通常ファイルなら "file" を返す
  getFileType() {
    return this.fileType_;
  }
}
