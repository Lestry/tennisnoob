// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    // 比赛设置-是否锁定（比赛开始计分时设置为true）
    matchConfig_lock: false,
    // 比赛设置-是否有占先
    matchConfig_hasAd: false,
    // 比赛设置-决胜局开始于X平
    matchConfig_tieBreakStart: 6,
    // 比赛设置-决胜局分数（抢X）
    matchConfig_tieBreakPoint: 7,
    // 选手左：名称、局分、盘分
    playerLeft_name: '',
    playerLeft_gamePoint: 0,
    playerLeft_setPoint: 0,
    // 选手右：名称、局分、盘分
    playerRight_name: '',
    playerRight_gamePoint: 0,
    playerRight_setPoint: 0,
  },
  methods: {
    // 重置比分并解锁比赛设置
    handleReset() {
      this.setData({
        matchConfig_lock: false,
        playerLeft_gamePoint: 0,
        playerLeft_setPoint: 0,
        playerRight_gamePoint: 0,
        playerRight_setPoint: 0,
      })
    }
  },
})
