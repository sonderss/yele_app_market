import { minRequest } from './index'

export default {
  // 获取验证码
  getVerificationCode: data => minRequest.get('/5e1d7e2b7dac6', data),
  // 登录 1
  login: data => minRequest.post('/5e1d2d4b04423', data),
 // 更新用户信息 5ea11102e176d
 uoDateuserInfo:data => minRequest.post('/5ea11102e176d',data),
  // 选择门店 暂时不用
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
  // 提交线索 选择门店 5ea3ee94e1c5c 1
  getSeletStore:() => minRequest.get('/5ea3ee94e1c5c'),
  // 线索用户管理 5ea7d70a43079
  getClueUser:data => minRequest.get('/5ea7d70a43079',data),
  // 修改提成比例  5ea7d7209b052
  commissionProportion:data => minRequest.post('/5ea7d7209b052',data),
  // 个人任务  5eb38b138bff1
  getPersonTask:() => minRequest.get('/5eb38b138bff1'),
  // 团队任务 5eb23259a91aa
  getTeamTask:() =>minRequest.get('/5eb23259a91aa'),
  // 团队成员业绩 5eb2729e69167
  getTeamUserJobs:() =>minRequest.get('/5eb2729e69167'),
  // 区域任务 5eb37a4e1798a
  getAreaTask:() => minRequest.get('/5eb37a4e1798a'),
  // 区域组织业绩 5eb37a57a6add
  getAreaTaskUserJob:() => minRequest.get('/5eb37a57a6add'),
  // 选择日期 5eb3d420980ca?store_id=3
  chinceStoreDate:data=>minRequest.get('/5eb3d420980ca',data),
  // 提交线索 5ea3ee9f4a2d1
  postClue:data=>minRequest.post('/5ea3ee9f4a2d1',data),
  // 预约选择门店 5eb3c924e2580 
  apinStore:()=>minRequest.get('/5eb3c924e2580'),
  // 获取桌台分组 ?store_id=3&date=2020-05-07
  getDeskGroup:data =>minRequest.get('/5eb3c92a6831a',data),
  // 空闲桌台 5eb677bfe864f?group_id=1&date=2020-05-07
  getIdelDesk:data =>minRequest.get('/5eb677bfe864f',data),
  // 预约  5eb521c57345a
  appMent:data => minRequest.post('/5eb521c57345a',data),
  // 预约记录 5eb52f40e43f8
  getBookList:() => minRequest.get('/5eb52f40e43f8'),
  // 下单记录 5eaa4a95b36c0
  getOrderList:()=>minRequest.get('/5eaa4a95b36c0'),
  // 下单详情 5eb621dda3e3f
  getOrderDetailDown:data => minRequest.get('/5eb621dda3e3f',data),
  // 取消订单 5eaa4aa6df9f2
  cancelOrder:data=> minRequest.post('/5eaa4aa6df9f2',data),
  // 下单 选择门店 lng=113.3282&lat=23.16144
  chooseStoreLG:data => minRequest.get('/5ea803a0e5d4b',data),
  // 选择桌台  5eb3802a73a0a?store_id=3
  getChioceOrderDesk:data => minRequest.get('/5eb3802a73a0a',data)

}
