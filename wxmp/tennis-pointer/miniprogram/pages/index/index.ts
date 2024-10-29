// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    // 局分展示文案
    GAME_POINT_SHOW: ['0', '15', '30', '40', 'AD'],
    // 比赛设置-是否锁定（比赛开始计分时设置为true）
    matchConfig_lock: false,
    // 比赛设置-是否有占先
    matchConfig_hasAd: false,
    // 比赛设置-决胜局开始于X平
    matchConfig_tieBreakStart: 6,
    // 是否比赛结束
    isMatchEnd: false,
    // 是否决胜局
    isTieBreak: false,
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
    // 左侧选手的局分-1
    handleSubstractPlayerLeftGamePoint() {
      if (this.data.playerLeft_gamePoint > 0) {
        this.setData({
          playerLeft_gamePoint: this.data.playerLeft_gamePoint - 1
        })
      }
    },
    // 左侧选手的局分+1
    handleAddPlayerLeftGamePoint() {
      const { matchConfig_hasAd, isTieBreak, playerLeft_gamePoint, playerRight_gamePoint } = this.data;
      const _newPoint = playerLeft_gamePoint + 1;
      if (isTieBreak) {
        // 决胜局中可以一直增加
        this.setData({
          playerLeft_gamePoint: _newPoint
        });
      } else if (matchConfig_hasAd) {
        // 有占先的情况下，需要看对手分数

      }
    },
    // 右侧选手的局分-1
    handleSubstractPlayerRightGamePoint() {
      if (this.data.playerRight_gamePoint > 0) {
        this.setData({
          playerLeft_gamePoint: this.data.playerRight_gamePoint - 1
        })
      }
    },
    // 右侧选手的局分+1
    handleAddPlayerRightGamePoint() {
      console.log('playerRight', 'gamePoint', +1);
    },
    // 左侧选手的盘分-1
    handleSubstractPlayerLeftSetPoint() {
      console.log('playerLeft', 'setPoint', -1);
    },
    // 左侧选手的盘分+1
    handleAddPlayerLeftSetPoint() {
      console.log('playerLeft', 'setPoint', +1);
    },
    // 右侧选手的盘分-1
    handleSubstractPlayerRightSetPoint() {
      console.log('playerRight', 'setPoint', -1);
    },
    // 右侧选手的盘分+1
    handleAddPlayerRightSetPoint() {
      console.log('playerRight', 'setPoint', +1);
    },
    // 比赛结束
    handleEnd() {
      const { isTieBreak, playerLeft_gamePoint, playerRight_gamePoint, playerLeft_setPoint, playerRight_setPoint } = this.data;
      if (isTieBreak) {
        // 决胜局分数只要不相等就允许结束
        if (playerLeft_gamePoint === playerRight_gamePoint) {
          wx.showToast({
            title: '决胜局小分相同不允许结束比赛',
            icon: 'none',
          });
        } else if (playerLeft_gamePoint > playerRight_gamePoint) {
          this.setData({
            isMatchEnd: true,
            playerLeft_setPoint: playerLeft_setPoint + 1,
          });
        } else {
          this.setData({
            isMatchEnd: true,
            playerRight_setPoint: playerRight_setPoint + 1,
          });
        }
      } else if (playerLeft_setPoint === playerRight_setPoint) {
        wx.showToast({
          title: '大分相同不允许结束比赛',
          icon: 'none',
        });
      } else {
        // 非决胜局分出胜负 小分清0显示
        this.setData({
          isMatchEnd: true,
          playerLeft_gamePoint: 0,
          playerRight_gamePoint: 0,
        });
      }
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
              isTieBreak: false,
              isMatchEnd: false,
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
