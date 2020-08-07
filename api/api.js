import { minRequest } from './index'

export default {
  // 获取验证码
  getVerificationCode: data => minRequest.get('/5ed60573319ca', data),
  // 登录 1
  login: data => minRequest.post('/5e1d2d4b04423', data),
 // 更新用户信息 5ea11102e176d
 uoDateuserInfo:data => minRequest.post('/5ea11102e176d',data),
  // 选择门店 暂时不用
  chooseStore:data =>minRequest.get('/5eb229fe5b435',data),
  // 桌台列表 
  TableList:data => minRequest.get('/5eaa7beaa6bb0',data),
  // 桌台详情 getOrderDetail
  getOrderDetail:data=>minRequest.get('/5eaa7bf2308c9',data),
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
  getChioceOrderDesk:data => minRequest.get('/5eb3802a73a0a',data),
  // 修改手机号 5ea1110825698
  setPhone:data => minRequest.post('/5ea1110825698',data),
  // 实名认证 5ea11111400f6
  postFace:data => minRequest.post('/5ea11111400f6',data),
  // 忽略线索 5ebcea9dd834b?clue_id=20
  getIgnore:data=> minRequest.get('/5ebcea9dd834b',data),
  // 商品列表 5eb3aad48546f
  getOrderProduceList: data => minRequest.get('/5eb3aad48546f',data),
  // 商品详情 5eb3aada41393?store_id=3&product_id=11
  getOriderProductDetail:data => minRequest.get('/5eb3aada41393',data),
  // 服务详情 5eb3aae228c4d?store_id=3&service_id=1
  getOriderServeDetail:data=>minRequest.get('/5eb3aae228c4d',data),
  // 套餐详情 5eb3aade317c0?store_id=3&setmeal_id=1
  getOriderPackageDetails:data => minRequest.get('/5eb3aade317c0',data),
  // 搜索桌台 5eb52f3a6edbb?group_id=1&condition=A1
  searchDesk:data => minRequest.get('/5eb52f3a6edbb',data),
  // 创建订单 5eb52c35b6bc6
  setOrder:data => minRequest.post('/5eb52c35b6bc6',data),
  // 预览订单 5eb52c3ac2714
  previewOrder:data => minRequest.post('/5eb52c3ac2714',data),
   // 确认订单 confirmOrder 5eb52c3e166a5
   confirmOrder:data => minRequest.post('/5eb52c3e166a5',data),
   // 取消预约 5ebe094bcd11e?booking_id=20
   cancelBooked:data=>minRequest.get('/5ebe094bcd11e',data),
   // 文件上传 5ebdf239b49c2
   fileUpLoad:data =>minRequest.post('/5ebdf239b49c2',data),
   // 我的下线 5eb7b9fc73cb3
   myDownLine:() => minRequest.get('/5eb7b9fc73cb3'),
   // 查询订单状态 5ebf582732acc?order_id=404
   getOrderStatus: data =>minRequest.get('/5ebf582732acc',data),
   // 获取H5页面路径
   getH5HTML: () => minRequest.get('/5eeb09055a53c'),
   // 获取支付方式 5ece2648aefc0
   getPayMethods: () => minRequest.get('/5ece2648aefc0'),
   // 发起支付 5ed7732591714
   postPay: data => minRequest.post('/5ed7732591714',data),
   // 身份验证cardYanZ
   cardYanZ: data => minRequest.post('/5ee82cd0ae369',data),
   // 设置提现密码 5edf3da4e9599
  setTXpsd: data => minRequest.post('/5ee82cc6f14dd',data),
  // 解绑银行卡 5ee05bdb90e53
  jieBankCard: () => minRequest.post('/5ee82cdf28b32'),
  // 获取发卡行信息 5edf641c4199d?bank_card_num=4323132135444121
  getCardInfo: data => minRequest.get('/5ee82cd56dbe4',data),
  // 绑定银行卡 5edf3db074e13
  postCard: data => minRequest.post('/5ee82cda2c2db',data),
  // 查询支付状态 5ed773317f6fd?transaction_id=33
  getPayTStatus: data => minRequest.get('/5ed773317f6fd',data),
  // 发放记录列表 5ede025dd130e?date=2020-06&page=1&limit=20
  faFangList: data => minRequest.get('/5f06847ea3df4',data),
  // 发放记录详情 5edf04c01ab0c?group_id=80
  faFangDetail: data => minRequest.get('/5f068483b9129',data),
  // 审核详情 5edf32ee906ea?remuneration_id=60
  getAuditdetails: data => minRequest.get('/5f0684944810a',data),
  // 工资详情 5edf32e863e02?remuneration_id=72
  getSelaDetail: data => minRequest.get('/5f06848f901a5',data),
  // 提成明细 5f06849891af0
  getTCList: data => minRequest.get('/5f06849891af0',data),
  // 获取提成合计 5f0684aa2bab4?start_time=2020-06-17&end_time=2020-08-01&store_id=1
  getTCAll: data => minRequest.get('/5f0684aa2bab4',data),
  // 提成详情 5f0684a491f03?commission_id=81
  getTcDatail: data => minRequest.get('/5f0684a491f03',data),
  // 冻结明细{{hosts}}5f1bd979643bb?page=1
  getDJlist: data => minRequest.get('/5f1bd979643bb',data),
   // 转账记录 5f1fd4d545895?date=2020-07&limit=10
   getZhBill: data => minRequest.get('/5f1fd4d545895',data),
   // 转账详情 5f1fd4f09f323?record_id=2
   getZhBillDetail: data => minRequest.get('/5f1fd4f09f323',data),
   // 我的收入
   getMyMoney: data => minRequest.get('/5f1fa2518ba7a',data),
     // 收支流水 5f213c4bcc529?limit=10&page=1
   getShouZ: data => minRequest.get('/5f213c4bcc529',data),
   // 提现记录 5f1fd43420b23?date=2020-07&limit=10&page=1
   getTiXian: data => minRequest.get('/5f1fd43420b23',data),
   // 提现详情 5f1fd4ace55b9?record_id=2
   getTiXianDetail: data => minRequest.get('/5f1fd4ace55b9',data),
   // 获取通联短信验证码 5efeedfebed30
   getTLCode: data => minRequest.get('/5efeedfebed30',data),
   //  会员协议 5f2a30778aafd
   getUserVip: data =>  minRequest.get('/5f2a307e3b6bd',data)
}
