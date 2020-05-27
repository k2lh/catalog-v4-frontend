export function getPractitionersBadges(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'cost'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getEnrolledInEdvisor(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'cost', 'profit'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getPractitionerActivity(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'cost', 'profit'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getEnrollmentsByRegion(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'cost', 'profit'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getCertificateDescription(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['datestamp', 'cost', 'profit'],
        rows: []
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getFilterList(params) {
  const tmpList = {
    data: {
      code: 0,
      data: []
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getRHFilterList(params) {
  const tmpList = {
    data: {
      code: 0,
      data: []
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
export function getTabFilterList(params) {
  const tmpList = {
    data: {
      code: 0,
      data: []
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
