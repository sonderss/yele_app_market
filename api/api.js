import { minRequest } from './index'

export default {
  // 获取验证码
  getVerificationCode: data => minRequest.get('/5e1d7e2b7dac6', data),
  // 登录 1
  login: data => minRequest.post('/5e1d2d4b04423', data),
 // 更新用户信息
 uoDateuserInfo:data => minRequest.post('/5ea00df043f69',data),
  // 选择门店
  chooseStore:data =>minRequest.get('/5eb229fe5b435',data),
  // 桌台列表 
  TableList:data => minRequest.get('/5eaa7beaa6bb0',data),
  // 个人资料 1
  userInfo:data =>minRequest.get('/5ea1110c67573',data),
  // 门店公告列表
  storMentList:() =>minRequest.get('/5ea152001c50e'),
  // 门店公告详情 ?notice_id=1
  storMentDetail:data => minRequest.get('/5ea1520706393',data),
  // 平台活动  {{hosts}}5eb4d3fc8f631?page=1&limit=20 1
  platformActivities:data => minRequest.get('/5eb4d3fc8f631',data),
  // 邀请记录 5ea7edad4669a?condition=55 1
  invitationRecord:data=>minRequest.get('/5ea7edad4669a',data),
  // 我的线索 5ea3eea43f747 1
  getMyClue:() => minRequest.get('/5ea3eea43f747'),
  // 线索管理 5ea3eea95408e 1
  getClueManagement: () =>minRequest.get('/5ea3eea95408e'),
  // 选择门店 5ea3ee94e1c5c 1
  getSeletStore:() => minRequest.get('/5ea3ee94e1c5c'),
  // 线索用户管理 5ea7d70a43079
  getClueUser:data => minRequest.get('/5ea7d70a43079',data),
  // 修改提成比例  5ea7d7209b052
  commissionProportion:data => minRequest.post('/5ea7d7209b052',data)
}
