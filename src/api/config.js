export const prefix = '/api/v1'
export const module_auth = '/auth'
export const module_admin = '/admin'

// region 登录接口
export const auth_prefix = prefix + module_auth
export const auth_login = auth_prefix + '/login/2'
export const auth_logout = auth_prefix + '/auth/logout/'

// endregion

// region 百货商户入驻

export const admin_prefix = prefix + module_admin
export const entering_prefix = admin_prefix + '/pc/merchantsettledin'
export const entering_list = entering_prefix + '/entryInformationList'
export const entering_detail = entering_prefix + '/mcEntryInFormationDetails'

// endregion

// region 心安会员列表

export const xinan_prefix = admin_prefix + '/pc/xinAnBackstage'
export const xinan_rescue_list = xinan_prefix + '/rescueList'
export const xinan_rescue_detail = xinan_prefix + '/rescueDetails'
export const xinan_rescue_change_state = xinan_prefix + '/changeState'

// endregion
