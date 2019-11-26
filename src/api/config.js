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
export const insured_prefix = module_xinan_prefix + '/xinan/platform/join'
export const insured_rescue_list = insured_prefix + '/findList'
export const insured_rescue_detail = insured_prefix + '/findInsured'
export const insured_rescue_change_state = insured_prefix + '/updMemberStatus'

// endregion
