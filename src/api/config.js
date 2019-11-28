export const prefix = '/api/v1'
export const module_auth = '/auth'
export const module_admin = '/admin'
export const module_xinan = '/xinan'

export const module_auth_prefix = prefix + module_auth
export const module_admin_prefix = prefix + module_admin
export const module_xinan_prefix = prefix + module_xinan

// region 登录接口
export const auth_login = module_auth_prefix + '/login/2'
export const auth_logout = module_auth_prefix + '/logout/'

// endregion

// region 百货商户入驻

export const entering_prefix = module_admin_prefix + '/pc/merchantsettledin'
export const entering_list = entering_prefix + '/entryInformationList'
export const entering_detail = entering_prefix + '/mcEntryInFormationDetails'

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
// endregion

// region 系统管理-菜单列表
export const Menu_prefix = module_admin_prefix + '/system/menu'
export const Menu_list = Menu_prefix + '/list'// 列表
export const Menu_change_status = Menu_prefix + '/change-status'// 变更菜单启用状态
export const Menu_add_menu = Menu_prefix + '/add-menu'// 添加菜单

// endregion

// region 系统管理-角色列表
export const Role_prefix = module_admin_prefix + '/system/role'
export const Role_list = Role_prefix + '/list'// 列表
export const Role_add_role = Role_prefix + '/add-role'// 添加角色
export const Role_change_menus = Role_prefix + '/change-menus'// 变更菜单
export const Role_change_status = Role_prefix + '/change-status'// 变更角色启用状态
// endregion

// region 店铺管理
export const shop_prefix = module_admin_prefix + '/pc/mc-store'
export const shop_list = shop_prefix + '/mcStoreInformationList'// 列表
export const shop_Details = shop_prefix + '/mcStoreInformationDetails'// 店铺详情
export const shop_Entry = shop_prefix + '/updLocalCircleEntry'// 更改店铺商家信息
export const shop_change = shop_prefix + '/changeMcStoreInformationState'// 更改店铺审核状态
export const shop_delete = shop_prefix + '/delMcEntryInformation'// 删除店铺信息
// endregion
