const en = {
  message: {
    new_connection: 'New Connection',
    refresh_connection: 'Refresh',
    edit_connection: 'Edit Connection',
    duplicate_connection: 'Duplicate Connection',
    del_connection: 'Delete Connection',
    close_connection: 'Close Connection',
    add_new_line: 'Add New Line',
    dump_to_clipboard: "Copy as command",
    db_version: 'DB Version',
    process_id: 'Process ID',
    used_memory: 'Used Memory',
    used_memory_peak: 'Used Memory Peak',
    used_memory_lua: 'Used Memory Lua',
    connected_clients: 'Connected Clients',
    total_connections_received: 'Total Connections',
    total_commands_processed: 'Total Commands',
    key_statistics: 'Key Statistics',
    all_db_info: 'All Connection Info',
    read_total: 'Total read volume',
    write_total: 'Total write volume',
    runtime: 'Runtime',
    log_total: 'Log file size',
    runtime_threads:'Runtime threads',
    server: 'Server',
    memory: 'Memory',
    template: "Template",
    stats: 'Stats',
    settings: 'Settings',
    ui_settings: 'Appearance',
    feature_settings: 'Function',
    common_settings: 'General',
    confirm_to_delete_row_data: 'Confirm To Delete The Row Data?',
    delete_success: 'Delete Success',
    delete_failed: 'Delete Failed',
    modify_success: 'Modify Success',
    modify_failed: 'Modify Failed',
    add_success: 'Add Success',
    add_failed: 'Add Failed',
    value_exists: 'Value Exists',
    refresh_success: 'Refresh Success',
    click_enter_to_rename: 'Click Or Press Enter To Rename',
    click_enter_to_ttl: 'Click Or Press Enter To Modify TTL',
    confirm_to_delete_key: 'Confirm To Delete {key} ?',
    confirm_to_rename_key: 'Confirm To Rename {old} -> {new} ?',
    edit_line: 'Edit Line',
    auto_refresh: 'Auto Refresh',
    auto_refresh_tip: 'Auto Refresh Switch, Refresh Every {interval} Seconds',
    key_not_exists: 'Key Not Exists',
    collapse_all: 'Collapse All',
    expand_all: 'Expand All',
    json_format_failed: 'Json Parse Failed',
    msgpack_format_failed: 'Msgpack Parse Failed',
    php_unserialize_format_failed: 'PHP Unserialize Failed',
    clean_up: 'Clean Up',
    redis_console: 'Redis Console',
    confirm_to_delete_connection: 'Confirm To Delete Connection ?',
    connection_exists: 'Connection Config Already Exists',
    close_to_edit_connection: 'You Must Close The Connection Before Editing',
    close_to_connection: 'Confirm To Close Connection ?',
    ttl_delete: 'Set TTL<=0 Will Delete The Key Directly',
    max_page_reached: 'Max Page Reached',
    add_new_key: 'New DB',
    enter_new_key: 'Enter Your New Key Name First',
    key_type: 'Key Type',
    save: 'Save',
    enter_to_search: 'Enter To Search',
    export_success: 'Export Success',
    select_import_file: 'Select The File',
    import_success: 'Import Success',
    put_file_here: 'Drag File Here Or Click To Select',
    config_connections: 'Connections',
    rules_connection_name: 'Please enter a connection name',
    rules_host: 'Please enter the address',
    rules_port: 'Please enter port',
    rules_auth: 'Please enter your password.',
    rules_username: 'Please enter the user name',
    database_name: 'Database',
    input_search_content: 'Search',
    field_config: 'Field Configuration',
    btn_sync: 'Sync',
    btn_save: 'Save',
    btn_preview: 'Preview',
    btn_save_gen:'Save & Build',
    field_name: 'Field Name',
    field_type: 'Field Type',
    field_desc: 'Field Description',
    notnull: 'Required',
    list_show: 'List',
    form_show: 'Form',
    form_type: 'Form Type',
    query_type: 'Query Type',
    date_anao: 'Date Annotation',
    dict_sel: 'Dict',
    gen_config: 'Build the configuration',
    gen_author: 'Author',
    gen_author_info: 'The author name above the class',
    gen_author_info2: 'The author cannot be null',
    gen_api: 'Interface Name',
    gen_api_info: 'The name of the interface, used in the controller and interface documentation',
    gen_api_info2: 'The interface name cannot be empty',
    gen_pack:'Package',
    gen_pack_info: 'The name of the project package, in which package the generated code goes',
    gen_pack_info2: 'The package path cannot be empty',
    gen_prefix: 'Remove prefix',
    gen_prefix_info: 'By default, the table prefix is not removed. You can customize it',
    sync_tooltip:'Use this function when table fields in the database change',
    gen_placeholder: 'Please select',
    gen_query_option1: 'Input',
    gen_query_option2: 'Textarea',
    gen_query_option3: 'Radio',
    gen_query_option4: 'Select',
    gen_query_option5: 'Date',
    gen_auto_createTime:'Automatic creation time',
    gen_auto_updateTime:'Automatic time update',
    sync_success: 'Synchronization succeeded',
    save_success:'Saved successfully',
    template_manager: 'Template Management',
    template_add: 'Add Template',
    template_name: 'Template Name',
    template_file_type: 'File Type',
    code_template: 'Code Template',
    code_template_add: 'Add Code Template',
    template_info1: 'Please enter a template name',
    template_info2: 'Please enter the file type',
    template_info3: 'The template already exists',
    import: 'Import',
    export: 'Export',
    open: 'Open',
    close: 'Close',
    open_new_tab: 'Open In New Tab',
    exact_search: 'Exact Search',
    enter_to_exec: 'Press Enter To Exec Commands, Up and Down To Switch History',
    pre_version: 'Version',
    manual_update: 'Manual Download',
    retry_too_many_times: 'Too Many Attempts To Reconnect. Please Check The Server Status',
    key_to_search: 'Keyword Search',
    begin_update: 'Update',
    ignore_this_version: 'Ignore this version',
    check_update: 'Check Update',
    update_checking: 'Checking For Updates, Wait A Moment...',
    update_available: 'New Version Found',
    update_not_available: 'Your version is up to date',
    update_error: 'Update Failed',
    update_downloading: 'Downloading...',
    update_download_progress: 'Download Progress',
    update_downloaded: 'Update Download Completed, Restart Your App Please.\
    [Tips]: If you are using Windows, after closing the app, waiting the desktop icon to refresh to a normal state(about 10 seconds), and then you can reopen it',
    mac_not_support_auto_update: 'Mac Does Not Support Automatic Update, Please Manually <a href="https://github.com/">Download</a>',
    font_family: 'Font Family',
    font_faq_title: 'Font Setting Instructions',
    font_faq: '1. Multiple fonts can be set<br>\
    2. Font selection is orderly. It is suggested to choose English font first and then font in your language<br>\
    3. When the system font list cannot be loaded in some exceptional cases, you can enter the installed font name manually.',
    private_key_faq: 'RSA format private key is supported, which starts with <pre>-----BEGIN RSA PRIVATE KEY-----</pre>\
    as to starts with<pre>-----BEGIN OPENSSH PRIVATE KEY-----</pre>you need to convert format via <pre>ssh-keygen -p -m pem -f ~/.ssh/id_rsa</pre>This operation will not affect the previous private key login',
    dark_mode: 'Dark Mode',
    load_more_keys: 'load more',
    key_name: 'Key Name',
    project_home: 'Project Home',
    cluster_faq: 'Select any node in the cluster to fill in, and other nodes will be identified automatically.',
    db_status: 'DB Info',
    flushdb_prompt: 'Input "{txt}"',
    info_disabled: 'Info command execution exception(may have been disabled), redis info cannot be displayed',
    page_zoom: 'Page Zoom',
    scan_disabled: 'Scan command execution exception(may have been disabled), key list cannot be displayed',
    key_type_not_support: 'Visual display is not supported for this type. Please use console',
    delete_folder: 'Scan And Delete Whole Folder',
    multiple_select: 'Multiple Select',
    copy: 'Copy',
    copy_success: 'Copy success',
    keys_to_be_deleted: 'Keys To Be Deleted',
    delete_all: 'Delete All',
    clear_cache: 'Clear Cache',
    mark_color: 'Mark Color',
    key_no_permission: 'File read permission has expired, please reselect the key file manually',
    toggle_check_all: 'Select all | Unselect all',
    select_lang: 'Select Language',
    clear_cache_tip: 'When there is a problem with the client, this operation will delete all the connections and configurations to recover the client',
    detail: 'Detail',
    separator_tip: 'The separator of the tree view, set to empty to disable tree and display keys as list',
    confirm_modify_unvisible_content: 'The content contains invisible characters, you can edit safely in the "Hex View". If continuing to edit in the "Text View" may cause coding errors, sure to continue?',
    keys_per_loading: 'Load Number',
    keys_per_loading_tip: 'The number of keys loaded each time. Setting too large may affect performance',
    host: 'Host',
    port: 'Port',
    username: 'Username',
    password: 'Password',
    connection_name: 'Connection Name',
    separator: 'Separator',
    timeout: 'Timeout',
    private_key: 'Private Key',
    public_key: 'Public Key',
    authority: 'Authority',
    redis_node_password: 'Redis Node Password',
    master_group_name: 'Master Group Name',
    command_log: 'Log',
    hotkey: 'Hot Key',
    persist: 'Remove Expire Time',
    custom_formatter: 'Custom Formatter',
    edit: 'Edit',
    new: 'New',
    custom: 'Customize',
    hide_window: 'Hide Window',
    minimize_window: 'Minimize window',
    maximize_window: 'Maximize window',
    load_all_keys: 'load all',
    connection_readonly: 'Readonly mode. Adding, editing and deleting are prohibited',
    memory_analysis: 'Memory Analysis',
    begin: 'Begin',
    pause: 'Pause',
    restart: 'Restart',
    close_left: 'Close Left Tabs',
    close_right: 'Close Right Tabs',
    close_other: 'Close Other Tabs',
  },
};

export default en;
