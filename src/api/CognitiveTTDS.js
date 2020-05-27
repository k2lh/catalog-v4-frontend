export function getCountsData(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['', 'cloud', 'gbs', 'ZZZ'],
        data: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getRegionData(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['REGI', 'At least 5 skills ', 'At least 10 skills'],
        data: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getSkillCountsData(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['REGI', 'At least 5 skills ', 'At least 10 skills'],
        data: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getSkillDistributionData(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['INCOUNTRY_MGR_NAME', 'GLOBAL_MGR_NAME ', 'SVC_AREA', 'CIC_LOCATION', 'At least 5 skills', 'At least 10 skills', '# of people'],
        data: []
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
        columns: ['PANK', 'MANAGER NAME', 'COURSE COUNT', 'EMPLOYEE COUNT'],
        data: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
