goog.provide('tinyword.TreeControl');

goog.require('goog.ui.tree.TreeControl');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.ds.DataManager');
goog.require('goog.ds.Expr');

goog.require('tinyword.TreeNode');

tinyword.TreeControl = class extends goog.ui.tree.TreeControl {

  /**
   * @param {boolean=} opt_folderOnly
   * @param {goog.dom.DomHelper=} opt_domHelper
   */
  constructor(opt_folderOnly, opt_domHelper) {
    const config = goog.object.clone(goog.ui.tree.TreeControl.defaultConfig);
    config.cleardotPath = 'closure-library/closure/goog/images/tree/cleardot.gif';
    super('/', config, opt_domHelper);

    /**
     * @private
     * @type {string}
     */
    this.dsPath_ = `$${tinyword.App.DS_ROOT}`;

    /**
     * @private
     * @type {Object}
     * データソースのパスから対応するツリーノードを見つけるための辞書。メニューによるフォルダ操作を実装するのに使用する。
     */
    this.nodes_ = {};
    this.nodes_[this.dsPath_] = this;

    const dm = goog.ds.DataManager.getInstance();
    this.loadFromDataNode_(this, dm.getChildNode(this.dsPath_));

    /**
     * @private
     * @type {boolean | undefined}
     */
    this.folderOnly_ = opt_folderOnly;

    /**
     * @private
     * @type {Function}
     */
    this.callback_ = goog.bind(this.onTreeChanged_, this);
    dm.addListener(this.callback_, `${this.dsPath_}/...`);
  }

  /** @override */
  disposeInternal() {
    goog.ds.DataManager.getInstance().removeListeners(this.callback_);
    super.disposeInternal();
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

  /** @private */
  loadFromDataNode_(parentTreeNode, parentDataNode) {
    const entryNode = parentDataNode.getChildNode('entry');

    const nodeList = entryNode && entryNode.get();
    if (nodeList) {
      const treeNodes = [];
      let treeNode, dataNode;
      for (let i = 0, l = nodeList.getCount(); i < l; ++i) {
        dataNode = nodeList.getByIndex(i);
        if (dataNode) {
          treeNode = this.createNode_(dataNode);
          if (treeNode) {
            treeNodes.push(treeNode);
            if (treeNode.getFileType() == 'folder') {
              this.loadFromDataNode_(treeNode, dataNode);
            }
          }
        }
      }
      treeNodes.sort((a, b) => {
        return goog.string.numerateCompare(a.sortKey, b.sortKey);
      });
      treeNodes.forEach(treeNode => {
        parentTreeNode.add(treeNode);
      });
    }
  }

  /** @private */
  createNode_(dataNode) {
    const type = dataNode.getChildNodeValue('@type') || '';
    const text = dataNode.getChildNodeValue('#text') || '';
    const path = dataNode.getDataPath();
    if (this.folderOnly_ && type !== 'folder') {
      return null;
    }
    const node = new tinyword.TreeNode(
      text, type, path, this.getConfig(), this.getDomHelper());
    this.nodes_[path] = node;
    return node;
  }

  /**
   * @private
   * @param {string} dataPath_ datasource path
   */
  onTreeChanged_(dataPath_) {
    const dataPath = dataPath_.replace(/\/[#@][^\/]+$/g, '');
    const expr = goog.ds.Expr.create(dataPath);
    const dataNode = expr.getNode();
    const treeNode = this.nodes_[dataPath];
    if (dataNode) {
      if (treeNode) {
        // 名前変更
        treeNode.setText(dataNode.getChildNodeValue('#text') || '');
      } else if (!this.folderOnly_ || dataNode.getChildNodeValue('@type') === 'folder') {
        // 新規ノードの追加
        const parent = this.nodes_[expr.getParent().getParent().getSource()];
        if (parent) {
          parent.add(this.createNode_(dataNode));
        }
      }
    } else if (treeNode) {
      // ノードの削除
      const parent = this.nodes_[expr.getParent().getParent().getSource()];
      if (parent) {
        parent.removeChild(treeNode);
        delete this.nodes_[dataPath];
      }
    }
  }
}
