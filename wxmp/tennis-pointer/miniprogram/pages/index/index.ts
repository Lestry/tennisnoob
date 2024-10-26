// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    // 比赛设置-是否锁定（比赛开始计分时设置为true）
    matchConfig_lock: false,
    // 比赛设置-是否有占先
    matchConfig_hasAd: false,
    // 比赛设置-每盘X局获胜
    matchConfig_setGames: 6,
    // 比赛设置-决胜局开始于X平
    matchConfig_tieBreakStart: 6,
    // 比赛设置-决胜局X分获胜
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
    // 改变分数
    changePoint(player: 'playerLeft' | 'playerRight', type: 'gamePoint' | 'setPoint', point: number) {
      console.log(player, type, point);
    },
    // 左侧选手的局分-1
    handleSubstractPlayerLeftGamePoint() {
      this.changePoint('playerLeft', 'gamePoint', -1);
    },
    // 左侧选手的局分+1
    handleAddPlayerLeftGamePoint() {
      this.changePoint('playerLeft', 'gamePoint', +1);
    },
    // 右侧选手的局分-1
    handleSubstractPlayerRightGamePoint() {
      this.changePoint('playerRight', 'gamePoint', -1);
    },
    // 右侧选手的局分+1
    handleAddPlayerRightGamePoint() {
      this.changePoint('playerRight', 'gamePoint', +1);
    },
    // 左侧选手的盘分-1
    handleSubstractPlayerLeftSetPoint() {
      this.changePoint('playerLeft', 'setPoint', -1);
    },
    // 左侧选手的盘分+1
    handleAddPlayerLeftSetPoint() {
      this.changePoint('playerLeft', 'setPoint', +1);
    },
    // 右侧选手的盘分-1
    handleSubstractPlayerRightSetPoint() {
      this.changePoint('playerRight', 'setPoint', -1);
    },
    // 右侧选手的盘分+1
    handleAddPlayerRightSetPoint() {
      this.changePoint('playerRight', 'setPoint', +1);
    },
    // 重置比分并解锁比赛设置
    handleReset() {
      wx.showModal({
        title: '确定重置比分？',
        content: '当前的比分将被清空，比赛设置保留',
        confirmText: '确认重置',
        cancelText: '取消重置',
        success: ({ confirm }) => {
          if (confirm) {
            this.setData({
              matchConfig_lock: false,
              playerLeft_gamePoint: 0,
              playerLeft_setPoint: 0,
              playerRight_gamePoint: 0,
              playerRight_setPoint: 0,
            })
          }
        }
      })
    }
  },
})
