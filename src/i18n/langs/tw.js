const tw = {
  message: {
    new_connection: '新增連線',
    refresh_connection: '重新整理',
    edit_connection: '編輯連線',
    duplicate_connection: '複製連接',
    del_connection: '刪除連線',
    close_connection: '關閉連線',
    add_new_line: '新增行',
    dump_to_clipboard: "複製為命令",
    db_version: 'DB 版本',
    process_id: '處理程序 ID',
    used_memory: '已使用記憶體',
    used_memory_peak: '記憶體佔用峰值',
    used_memory_lua: 'Lua 佔用記憶體',
    connected_clients: '用戶端連線數',
    total_connections_received: '歷史連線數',
    total_commands_processed: '歷史命令數',
    key_statistics: '鍵值統計',
    all_redis_info: 'Redis 資訊總覽',
    server: '伺服器',
    memory: '記憶體',
    stats: '狀態',
    settings: '基本設定',
    ui_settings: '外觀',
    feature_settings: '功能',
    common_settings: '通用',
    confirm_to_delete_row_data: '確認刪除該行資料？',
    delete_success: '刪除成功',
    delete_failed: '刪除失敗',
    modify_success: '修改成功',
    modify_failed: '修改失敗',
    add_success: '新增成功',
    add_failed: '新增失敗',
    value_exists: '值已存在',
    refresh_success: '重新整理成功',
    click_enter_to_rename: '點擊或者按 Enter 鍵來重新命名',
    click_enter_to_ttl: '點擊或者按 Enter 鍵來修改過期時間',
    confirm_to_delete_key: '確認刪除 {key} ？',
    confirm_to_rename_key: '確認重命名 {old} -> {new} ？',
    edit_line: '修改行',
    auto_refresh: '自動重新整理',
    auto_refresh_tip: '自動重新整理開關，每 {interval} 秒重新整理一次',
    key_not_exists: '鍵不存在',
    collapse_all: '全部摺疊',
    expand_all: '全部展開',
    json_format_failed: 'JSON 格式化失敗',
    msgpack_format_failed: 'Msgpack 格式化失敗',
    php_unserialize_format_failed: 'PHP Unserialize 格式化失敗',
    clean_up: '清空',
    redis_console: 'Redis 控制台',
    confirm_to_delete_connection: '確認刪除連線？',
    connection_exists: '連線設定已存在',
    close_to_edit_connection: '編輯前必須關閉連線，確定要繼續嗎',
    close_to_connection: '確認關閉連線？',
    ttl_delete: '設定 TTL<=0 將刪除該鍵，是否確認？',
    max_page_reached: '已到達最大頁碼',
    add_new_key: '新增鍵',
    enter_new_key: '請先輸入新的鍵名',
    key_type: '類型',
    save: '儲存',
    enter_to_search: 'Enter 鍵進行搜尋',
    export_success: '匯出成功',
    select_import_file: '選擇設定檔',
    import_success: '匯入成功',
    put_file_here: '將檔案拖到此處，或點擊選擇',
    config_connections: '連線設定',
    import: '匯入',
    export: '匯出',
    open: '打開',
    close: '關閉',
    open_new_tab: '以新視窗打開',
    exact_search: '精確搜尋',
    enter_to_exec: '輸入 Redis 指令後，按 Enter 鍵執行，上下鍵切換指令歷史紀錄',
    pre_version: '目前版本',
    manual_update: '手動下載',
    retry_too_many_times: '嘗試重連次數過多，請檢查伺服器狀態',
    key_to_search: '輸入關鍵字搜尋',
    begin_update: '更新',
    ignore_this_version: '忽略此版本',
    check_update: '檢查更新',
    update_checking: '檢查更新中, 請稍後...',
    update_available: '發現新版本',
    update_not_available: '目前為最新版本',
    update_error: '更新失敗',
    update_downloading: '下載中...',
    update_download_progress: '下載進度',
    update_downloaded: '更新下載完成，重啟用戶端生效.\
    [Tips]: 如果您使用的是Windows，請在關閉應用程序後等待桌面圖標刷新到正常狀態（大約10秒），然後重新打開',
    mac_not_support_auto_update: 'Mac 暫時不支援自動更新，請手動<a href="https://github.com/qishibo/AnotherRedisDesktopManager/releases">下載</a>後重新安裝，\
    或者執行brew reinstall --cask another-redis-desktop-manager\
    <br><br>🧡如果對您有用，您可以通過<a href="https://apps.apple.com/app/id1516451072">AppStore</a>贊助，AppStore會自動為您更新。',
    font_family: '字體選擇',
    font_faq_title: '字體設定說明',
    font_faq: '1. 可以設定多個字體<br>2. 字體選擇是有分先後順序的，建議首先選擇英文字體，然後再選擇中文字體<br>\
    3. 某些異常情況無法載入系統字體列表時，可以手動輸入已安裝的字體名稱',
    private_key_faq: '目前支持RSA格式私鑰，即以<pre>-----BEGIN RSA PRIVATE KEY-----</pre>開頭，\
    以<pre>-----BEGIN OPENSSH PRIVATE KEY-----</pre>開頭的，需要執行\
    <pre>ssh-keygen -p -m pem -f ~/.ssh/id_rsa</pre>進行格式轉換後再使用，該操作不會影響以前的私鑰登入',
    dark_mode: '深色模式',
    load_more_keys: '載入更多',
    key_name: '鍵名',
    project_home: '專案主頁',
    cluster_faq: '選擇叢集中任一節點設定填入即可，會自動識別其它節點',
    redis_status: 'Redis訊息',
    confirm_flush_db: '確認刪除db{db}中的所有鍵值嗎？',
    flushdb: '刪除所有鍵',
    flushdb_prompt: '輸入 "{txt}"',
    info_disabled: 'Info命令執行異常（可能已被禁用），無法顯示Redis訊息',
    page_zoom: '頁面縮放',
    scan_disabled: 'Scan命令執行異常（可能已被禁用），無法顯示key列表',
    key_type_not_support: '該類型暫不支持視覺化展示，請使用Console',
    delete_folder: '掃描並刪除整個資料夾',
    multiple_select: '多項選擇',
    copy: '複製',
    copy_success: '複製成功',
    keys_to_be_deleted: '即將刪除的鍵',
    delete_all: '全部删除',
    clear_cache: '清除緩存',
    mark_color: '標記顏色',
    key_no_permission: '文件讀取權限已過期，請手動重新選擇密鑰文件',
    toggle_check_all: '全選 | 取消全選',
    select_lang: '選擇語言',
    clear_cache_tip: '如果客戶端出現問題，此操作將刪除所有連接和配置以恢復客戶端',
    detail: '詳情',
    separator_tip: '樹視圖的分隔符，設置為空可禁用樹並將鍵顯示為列表',
    confirm_modify_unvisible_content: '內容包含不可見的字符，您可以在Hex視圖中進行安全編輯。如果繼續在Text視圖中進行編輯可能會導致編碼錯誤，確定要繼續嗎？',
    keys_per_loading: '加載數量',
    keys_per_loading_tip: '每次加載的key數量, 設置太大的話可能會影響使用性能',
    host: '地址',
    port: '端口',
    username: '用戶名',
    password: '密碼',
    connection_name: '連接名稱',
    separator: '分隔符',
    timeout: '超時',
    private_key: '私鑰',
    public_key: '公鑰',
    authority: '授權',
    redis_node_password: 'Redis節點密碼',
    master_group_name: 'Master組名',
    command_log: '日誌',
    sentinel_faq: '您可以選擇多個哨兵之一。 地址、端口、密碼請填寫哨兵配置。 Redis節點密碼是sentinel監控的Master節點的密碼。',
    hotkey: '熱鍵',
    persist: '刪除過期時間',
    custom_formatter: '自定義格式化',
    edit: '編輯',
    new: '新增',
    custom: '自定義',
    hide_window: '隱藏窗口',
    minimize_window: '最小化窗口',
    maximize_window: '最大化窗口',
    load_all_keys: '載入所有',
    show_load_all_keys: '啟用按鈕以加載所有鍵',
    load_all_keys_tip: '一次載入所有密鑰。如果密鑰數量過多，客戶端可能會卡住，請正確使用',
    tree_node_overflow: '鍵或資料夾太多，僅保留{num}個以顯示。 如果您的鍵不在此處，建議使用模糊搜索，或設置分隔符以將密鑰分散到文件夾中',
    connection_readonly: '只讀模式，禁止添加、編輯和刪除',
    memory_analysis: '內存分析',
    begin: '開始',
    pause: '暫停',
    restart: '重新開始',
    max_display: '最大顯示數量：{num}',
    max_scan: '最大掃描數量：{num}',
    close_left: '關閉左側標籤',
    close_right: '關閉右側標籤',
    close_other: '關閉其他標籤',
  },
};

export default tw;