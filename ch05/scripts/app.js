goog.provide('tinyword.App');

goog.require('goog.events.EventHandler');
goog.require('goog.ds.DataManager');
goog.require('goog.ds.JsDataSource');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.math.Size');
goog.require('goog.ui.Component');
goog.require('goog.ui.SplitPane');

goog.require('tinyword.LeftPane');
goog.require('tinyword.RightPane');

/** @constructor */
tinyword.App = class {
  constructor() {
    // イベントハンドラを管理するためのEventHandlerを生成
    /**
     * @private
     * @type {goog.events.EventHandler}
     */
    this.eventHandler_ = new goog.events.EventHandler(this);

    /**
     * @private
     * @type {tinyword.LeftPane}
     */
    this.leftPane_ = new tinyword.LeftPane();

    /**
     * @private
     * @type {tinyword.RightPane}
     */
    this.rightPane_ = new tinyword.RightPane();

    /**
     * @private
     * @type {goog.ui.SplitPane}
     */
    this.splitPane_ = new goog.ui.SplitPane(
      this.leftPane_, this.rightPane_,
      goog.ui.SplitPane.Orientation.HORIZONTAL
    );

    /**
     * @private
     * @type {goog.dom.ViewportSizeMonitor}
     */
    this.viewportSizeMonitor_ = new goog.dom.ViewportSizeMonitor();

    this.initialize_(tinyword.App.dummyData_);
  }

  // アプリケーションを初期化
  initialize_(tree) {
    // ファイルツリーを初期化
    const dm = goog.ds.DataManager.getInstance();
    dm.addDataSource(new goog.ds.JsDataSource(tree, tinyword.App.DS_ROOT), true);

    this.splitPane_.setInitialSize(200);
    this.splitPane_.render(goog.dom.getElement('main'));

    this.eventHandler_.listen(this.viewportSizeMonitor_,
      goog.events.EventType.RESIZE,
      this.onResizeViewport_);
    this.onResizeViewport_();
  }

  onResizeViewport_() {
    const size = this.viewportSizeMonitor_.getSize();
    const titleSize = goog.style.getBorderBoxSize(goog.dom.getElement('title'));
    this.splitPane_.setSize(new goog.math.Size(
      size.width - 4*2, size.height - 4*2 - titleSize.height));
  }
};
goog.addSingletonGetter(tinyword.App);

tinyword.App.dummyData_ = {
  '@type': 'folder', 'entry': {
    'f1': {
      '#text':'フォルダ1',
      '@type': 'folder',
      'entry': {
        'f4': {
          '#text': 'サブフォルダ',
          '@type': 'folder',
        },
        'f5':{
          '#text': 'ファイル2',
          '@type':'file',
        },
      },
    },
    'f2': {
      '#text': 'フォルダ2',
      '@type': 'folder',
    },
    'f3': {
      '#text': 'ファイル1',
      '@type': 'file',
    },
  },
};

// データソースの名前
tinyword.App.DS_ROOT = 'FileTree';

// tinyword.Appインスタンスを作成
tinyword.App.getInstance();
