goog.provide('tinyword.LeftPane');

goog.require('goog.dom.classes');
goog.require('goog.ui.Component');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarMenuButton');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');

goog.require('tinyword.TreeControl');

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

    /**
     * @private
     * @type {tinyword.TreeControl}
     */
    this.treeControl_ = new tinyword.TreeControl(false, opt_domHelper);
    this.addChild(this.treeControl_);
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

    let treeEl = dom.getElementsByTagNameAndClass(
      'div', tinyword.LeftPane.TREE_CLASS_NAME_)[0];
    if (!treeEl) {
      treeEl = dom.createDom('div', tinyword.LeftPane.TREE_CLASS_NAME_);
      dom.appendChild(element, treeEl);
    }
    this.treeControl_.createDom();
    dom.appendChild(treeEl, this.treeControl_.getElement());
  }

  /** @override */
  createDom() {
    this.decorateInternal(this.getDomHelper().createDom('div'));
  }

  /** @override */
  enterDocument() {
    super.enterDocument();

    const handler = this.getHandler();
    handler.listen(
      this.toolbar_,
      goog.ui.Component.EventType.ACTION,
      this.onSelectMenuItem_);
    handler.listen(
      this.toolbar_,
      goog.ui.Menu.EventType.SHOW,
      this.onShowMenu_);
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

  onSelectMenuItem_(e) {
    switch (e.target.getId()) {
      case 'newfolder':
        this.onNewFolder_(e);
        break;
      case 'rename':
        this.onRename_(e);
        break;
      case 'delete':
        this.onDelete_(e);
        break;
    }
  }

  onNewFolder_(e) {
    const treeNode = this.treeControl_.getSelectedItem();
    if (treeNode && treeNode.getFileType() === 'folder') {
      const parentPath = treeNode.getDataSourcePath();
      const parentNode = goog.ds.Expr.create(parentPath).getNode();
      const entryNode = parentNode && parentNode.getChildNode('entry', true);
      entryNode.setChildNode(
        `f${Math.random()}`, { '#text':'新規フォルダ', '@type': 'folder' }
      );
    }
  }

  onRename_(e) {
    const treeNode = this.treeControl_.getSelectedItem();
    if (treeNode && !treeNode.isRootNode()) {
      const path = treeNode.getDataSourcePath();
      const node = goog.ds.Expr.create(path).getNode();
      let name = node.getChildNodeValue('#text');
      if (name = window.prompt('新しい名前を指定してください。', name)) {
        node.setChildNode('#text', name);
      }
    }
  }

  onDelete_(e) {
    const treeNode = this.treeControl_.getSelectedItem();
    if (treeNode && !treeNode.hasChildren() && !treeNode.isRootNode()) {
      const expr = goog.ds.Expr.create(treeNode.getDataSourcePath());
      const node = expr.getNode();
      const parent = expr.getParent().getNode();
      if (node && parent) {
        parent.setChildNode(node.getDataName(), null);
      }
    }

  }

  onShowMenu_(e) {
    const menu = e.target;
    if (/-file-menu$/.test(menu.getId())) {
      const node = this.treeControl_.getSelectedItem();
      const sub = node && !node.isRootNode();
      menu.getChild('newfolder').setEnabled(node && node.getFileType() === 'folder');
      menu.getChild('rename').setEnabled(sub);
      menu.getChild('delete').setEnabled(sub && !node.hasChildren());
    }
  }
}
tinyword.LeftPane.CLASS_NAME_ = goog.getCssName('leftpane');
tinyword.LeftPane.TREE_CLASS_NAME_ = goog.getCssName(tinyword.LeftPane.CLASS_NAME_, 'tree');
