export function getPlansByRegion(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'data'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getPlansByMonth(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'total'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getDetailData(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['CNUM*', 'Notes ID*', 'Manager Name', 'Plan Title', 'Data Enrolled', 'Data Completed', 'Required Activities', 'Avg. Required Activities Completed', 'Avg. Planned Completed Percent'],
        data: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
