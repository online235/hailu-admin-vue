
export const prefix = '/api/v2'

// region 模块前缀

export const module_auth = '/auth'
export const module_admin = '/admin'
export const module_basic = '/basic'// 海露基础服务

export const module_auth_prefix = prefix + module_auth
export const module_admin_prefix = prefix + module_admin
export const module_basic_prefix = prefix + module_basic

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

// region 百货商户入驻

export const caseHistory_prefix = module_admin_prefix + '/pc/xaHelpMember'
export const caseHistory_list = caseHistory_prefix + '/list' // 查询救助历史案例列表
export const caseHistory_del = caseHistory_prefix + '/getXaHelpMemberModelDetail' // 查询单条救助案例详情
export const caseHistory_add = caseHistory_prefix + '/insertXaHelpMember' // 插入救助案例
export const caseHistory_alter = caseHistory_prefix + '/updateXaHelpMember' // 更新救助案例数据

// endregion
