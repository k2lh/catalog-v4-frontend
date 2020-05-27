export function getLearningData(params) {
  const tmpList = {
    data: {
      code: 0,
      data: [{
          userid: "123",
          currentYearBadgeNum: 8,
          contractNumber: 1,
          currentYearBadgeList: ["Tech Specialist L1"],
          badgesProg: 1,
          badgeHist: [],
          allYearBadgeNum: 1,
          allYearBadgeList: [],
          classes: 106,
          classList: [],
          classHist: []
        }
      ]
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
