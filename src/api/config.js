
export const prefix = '/api/v2'

// region 模块前缀

export const module_auth = '/auth'
export const module_admin = '/admin'
export const module_basic = '/basic'// 海露基础服务
export const module_xinan = '/xinan'// 海露基础服务

export const module_auth_prefix = prefix + module_auth
export const module_admin_prefix = prefix + module_admin
export const module_basic_prefix = prefix + module_basic
export const module_xinan_prefix = prefix + module_xinan

// endregion

// region 文件管理
export const File_Upload = module_basic_prefix + '/upload'
export const File_Upload_single = File_Upload + '/single/goods'
export const file_Upload_single_article = File_Upload + '/single/article'

// endregion

// region 登录接口
export const auth_login = module_auth_prefix + '/login/2'
export const auth_token_refresh = module_auth_prefix + '/token/refresh/'
export const auth_logout = module_auth_prefix + '/logout/'

// endregion

// region 百货商户入驻

export const entering_prefix = module_admin_prefix + '/pc/merchantsettledin'
export const entering_list = entering_prefix + '/entryInformationList'
export const entering_detail = entering_prefix + '/mcEntryInFormationDetails'
export const entering_change_state = entering_prefix + '/changeState'

// endregion

// region 心安救助审核列表
export const xinan_prefix = module_admin_prefix + '/pc/xinAnBackstage'
export const xinan_rescue_list = xinan_prefix + '/rescueList'
export const xinan_rescue_detail = xinan_prefix + '/rescueDetails'
export const xinan_rescue_change_state = xinan_prefix + '/changeState'

// endregion

// region 心安会员列表

export const member_prefix = module_admin_prefix + '/pc/xinAnBackstage'
export const member_rescue_list = member_prefix + '/shoplist'
export const member_rescue_detail = member_prefix + '/shopdetails'

// endregion

// region 心安参保人列表
export const insured_prefix = module_admin_prefix + '/xinan/platform/join'
export const insured_rescue_list = insured_prefix + '/findList'
export const insured_rescue_detail = insured_prefix + '/findInsured'
export const insured_rescue_change_state = insured_prefix + '/updMemberStatus'

// 服务商列表
export const serviceProviders_prefix = module_admin_prefix + '/serviceProviders/findList'
export const serviceProvidersOrder_prefix = module_admin_prefix + '/hlOrder/findList'
export const editServiceProvidersOrder_prefix = module_admin_prefix + '/hlOrder/edit'
// endregion

// 提现审核接口
export const withdrawal_examine = module_admin_prefix + '/pc/withdrawal'
export const withdrawal_examine_list = withdrawal_examine + '/list'
export const withdrawal_examine_getHlIncomeTransferOutModelDetail = withdrawal_examine + '/getHlIncomeTransferOutModelDetail'
export const withdrawal_examine_updateToExamine = withdrawal_examine + '/updateToExamine'
export const withdrawal_examine_exportExcel = withdrawal_examine + '/exportExcel'
// endregion

// region 系统管理-管理员列表
export const admin_prefix = module_admin_prefix + '/system/admin'
export const admin_rescue_list = admin_prefix + '/list'// 列表
export const admin_rescue_detail = admin_prefix + '/search-account'// 详情信息
export const admin_change_status = admin_prefix + '/change-status'// 变更账号启用状态
export const admin_add_account = admin_prefix + '/add-account'// 添加账号
export const admin_change_roles = admin_prefix + '/change-roles'// 变更角色
export const admin_modify_pwd = admin_prefix + '/modify-pwd'// 修改密码
export const admin_reset_pwd = admin_prefix + '/reset-pwd'// 重置密码
export const admin_delete = admin_prefix + '/del-account'// 重置密码
// endregion

// region 系统管理-字典管理
export const dict_prefix = module_basic_prefix + '/system/dict'
export const dict_list = dict_prefix + '/list'// 查询字典列表
export const dict_category = dict_prefix + '/category'// 字典分类列表
export const dict_add = dict_prefix + '/add'// 新增字典项
export const dict_update = dict_prefix + '/update'// 更新字典数据
export const dict_detail = dict_prefix + '/detail'// 查询字典详情
export const dict_delete = dict_prefix + '/delete'// 查询字典详情
export const dict_re_cache_redis = dict_prefix + '/re-cache-redis'// 把所有字典数据重新加载到Redis
// endregion

// region 系统管理-菜单列表
export const menu_prefix = module_admin_prefix + '/system/menu'
export const menu_list = menu_prefix + '/list'// 列表
export const menu_tree_list = menu_prefix + '/tree'// 列表
export const menu_change_status = menu_prefix + '/change-status'// 变更菜单启用状态
export const menu_add_menu = menu_prefix + '/add-menu'// 添加菜单
export const menu_update_menu = menu_prefix + '/update-menu'// 编辑菜单
export const menu_del_menu = menu_prefix + '/del-menu'// 添加菜单

// endregion

// region 系统管理-角色列表
export const Role_prefix = module_admin_prefix + '/system/role'
export const Role_list = Role_prefix + '/list'// 列表
export const Role_add_role = Role_prefix + '/add-role'// 添加角色
export const Role_change_menus = Role_prefix + '/change-menus'// 变更菜单
export const Role_change_status = Role_prefix + '/change-status'// 变更角色启用状态
export const Role_update = Role_prefix + '/update-role'// 编辑角色
export const Role_del = Role_prefix + '/del-role'// 编辑角色
// endregion

// region 生活圈店铺管理
export const life_circle_prefix = module_admin_prefix + '/pc/mc-store'
export const life_circle_list = life_circle_prefix + '/mcStoreInformationList'// 列表
export const life_circle_Details = life_circle_prefix + '/mcStoreInformationDetails'// 店铺详情
export const life_circle_Entry = life_circle_prefix + '/updateMcStoreInformation'// 更改店铺商家信息
export const life_circle_change = life_circle_prefix + '/changeMcStoreInformationState'// 更改店铺审核状态
export const life_circle_delete = life_circle_prefix + '/delMcEntryInformation'// 删除店铺信息
// endregion

// region 经营行业
export const Management_prefix = module_admin_prefix + '/ManagementType'
export const Management_list = Management_prefix + '/find/queryBusinessType'// 列表
export const Management_add = Management_prefix + '/add/industry'// 添加经营行业
export const Management_change = Management_prefix + '/upd/industry'// 更改行业标签内容
export const Management_delete = Management_prefix + '/find/typeDetails'// 查询经营类型详细
// endregion

// region -修改店铺信息审核后台接口
export const store_informationexamine = module_admin_prefix + '/pc/store-exanime'
export const store_selectMcStoreExamineList = store_informationexamine + '/selectMcStoreExamineList' // 列表
export const store_updateStoreToExamine = store_informationexamine + '/updateStoreToExamine' // 更改审核状态
export const store_selectMcStoreExamineDetail = store_informationexamine + '/selectMcStoreExamineDetail' // 获取审批详情
// endregion


// region -商家入驻-生活圈后台
export const McLocal_prefix = module_admin_prefix + '/pc/life-circle'
export const McLocal_list = McLocal_prefix + '/localCircleEntryList'// 列表
export const McLocal_Details = McLocal_prefix + '/localCircleEntryDetails'// 详情
export const McLocal_Entry = McLocal_prefix + '/updLocalCircleEntry'// 更改生活圈商家入驻信息
export const McLocal_change = McLocal_prefix + '/changeLocalCircleState'// 更改生活圈商家入驻审核状态
export const McLocal_delete = McLocal_prefix + '/delLocalCircleEntry'// 删除生活圈商家入驻信息
// endregion

// region 心安-政府慈善公益
export const Charitable_prefix = module_admin_prefix + '/app'
export const Charitable_list = Charitable_prefix + '/xinAn/governmentPublicWelfare'// 管理员根据token查询公益列表
export const Charitable_Details = Charitable_prefix + '/xinAn/detailed'// 根据编号查询公益详细
export const Charitable_addPublic = Charitable_prefix + '/xinAn/addPublicInterest'// 添加添加公益
export const Charitable_addArticle = Charitable_prefix + '/xinan/addGovernment'// 添加文章
export const Charitable_article = Charitable_prefix + '/xinan/articleList'// 超级管理员查询文章列表
export const Charitable_modify = Charitable_prefix + '/xinan/modify'// 修改文章
export const Charitable_Delete = Charitable_prefix + '/xinAn/delCharitable'// 删除公益
export const Charitable_detailedInfor = Charitable_prefix + '/xinan/detailedInformation'// 超查询账号下详细信息
export const Charitable_findCityNameByCode = Charitable_prefix + '/xinan/findCityNameByCode'// 获取当个城市名称
// endregion

// region APP管理
export const AppTable_prefix = module_admin_prefix + '/appManagement'
export const VersionTable_list = AppTable_prefix + '/version/findList'// 版本管理列表
export const VersionTable_save = AppTable_prefix + '/version/save'// 保存版本管理
export const VersionDelete_save = AppTable_prefix + '/version/version/'// 删除版本管理

// region 百货商户入驻

export const openApi_prefix = module_admin_prefix + '/open-api/account'
export const openApi_list = openApi_prefix + '/list'
export const openApi_del = openApi_prefix + '/del-account'
export const openApi_add = openApi_prefix + '/add-account'

// endregion

// region 心安救助历史案例

export const caseHistory_prefix = module_admin_prefix + '/pc/xaHelpMember'
export const caseHistory_list = caseHistory_prefix + '/list' // 查询救助历史案例列表
export const caseHistory_del = caseHistory_prefix + '/getXaHelpMemberModelDetail' // 查询单条救助案例详情
export const caseHistory_add = caseHistory_prefix + '/insertXaHelpMember' // 插入救助案例
export const caseHistory_alter = caseHistory_prefix + '/updateXaHelpMember' // 更新救助案例数据

// endregion

// region 心安期数统计

export const statistics_prefix = module_admin_prefix + '/pc/xaStatistics'
export const statistics_list = statistics_prefix + '/list' // 查询期数统计列表
export const statistics_del = statistics_prefix + '/getXaStatisticsDetail' // 查询单条期数统计数据详情
export const statistics_add = statistics_prefix + '/insertXaStatistics' // 插入期数统计数据
export const statistics_alter = statistics_prefix + '/updateXaStatistics' // 更新期数统计数据

// endregion

// region 广告管理

export const Banner_prefix = module_admin_prefix + '/banner'
export const Banner_list = Banner_prefix + '/list' // 查询广告列表
export const Banner_del = Banner_prefix + '/getBannerDetail' // 查询广告详情
export const Banner_add = Banner_prefix + '/insertBanner' // 插入广告
export const Banner_alter = Banner_prefix + '/updateBanner' // 更新广告

// endregion

// region 标签

export const Tag_prefix = module_admin_prefix + '/pc/tag'
export const Tag_list = Tag_prefix + '/findMcSysTagList' // 标签列表
export const Tag_del = Tag_prefix + '/findTag' // 根据编号查询一个标签
export const Tag_shop = Tag_prefix + '/shopLabel' // 根据店铺编号查询店铺下的标签
export const Tag_add = Tag_prefix + '/addTag' // 添加标签
export const Tag_Details = Tag_prefix + '/delTag' // 删除标签
export const Tag_alter = Tag_prefix + '/modifyTag' // 修改标签属性

// endregion
// 地址
export const address_prefix = module_xinan_prefix + '/nation/findParentListByCode' // 获取地址信息

