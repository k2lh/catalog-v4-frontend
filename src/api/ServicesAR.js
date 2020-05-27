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
  export function getProfessionCertifications(params) {
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
  export function getTopServicesAcademy(params) {
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
  export function Chart(params) {
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
  export function getDrawAreaChart() {
    const tmpList = {
      data: {
        code: 0,
        data: {
          drawData: []
        }
      }
    }

    return new Promise(resolve => {
      resolve(tmpList)
    })
  }
  export function getDrawWordCloudChart() {
    const tmpList = {
      data: {}
    }

    return new Promise(resolve => {
      resolve(tmpList)
    })
  }
