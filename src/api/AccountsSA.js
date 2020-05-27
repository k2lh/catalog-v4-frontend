export function getHoursTrend(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['month', 'quantity'],
        rows: [{
            month: 'Jan',
            quantity: 8
          },
          {
            month: 'Feb',
            quantity: 2
          },
          {
            month: 'Mar',
            quantity: 5
          },
          {
            month: 'Apr',
            quantity: 3
          },
          {
            month: 'May',
            quantity: 1
          },
          {
            month: 'Jun',
            quantity: 1
          },
          {
            month: 'Jul',
            quantity: 1
          },
          {
            month: 'Aug',
            quantity: 1
          },
          {
            month: 'Sep',
            quantity: 1
          },
          {
            month: 'Oct',
            quantity: 1
          },
          {
            month: 'Nov',
            quantity: 1
          },
          {
            month: 'Dec',
            quantity: 1
          }
        ]
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getTopBadges(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['label', 'band6', 'band7'],
        rows: [{
            'label': 'Agile Explorer',
            'band6': 123,
            'band7': 300
          },
          {
            'label': 'Enterprise Design Thinking Practitioner',
            'band6': 1223,
            'band7': 600
          },
          {
            'label': 'Cognitive Practitioner',
            'band6': 2123,
            'band7': 9000
          },
          {
            'label': 'Big Data Foundations - Level 1',
            'band6': 4123,
            'band7': 1200
          },
          {
            'label': 'Data Science Foundations - Level 1',
            'band6': 3123,
            'band7': 1500
          },
          {
            'label': 'Mentor',
            'band6': 1123,
            'band7': 3100
          },
          {
            'label': 'Blockchina Essentials',
            'band6': 5123,
            'band7': 4000
          },
          {
            'label': 'Cloud Essentials',
            'band6': 6123,
            'band7': 1000
          },
          {
            'label': 'Associate Project Manager',
            'band6': 1123,
            'band7': 2000
          },
          {
            'label': 'Advisory Project Manager',
            'band6': 6123,
            'band7': 3000
          }

        ]
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}

export function getTopCertifications(params) {
  const tmpList = {
    data: {
      code: 0,
      data: {
        columns: ['label', 'band6', 'band7'],
        rows: [{
            'label': 'Axelos',
            'band6': 123,
            'band7': 300
          },
          {
            'label': 'Microsoft',
            'band6': 1223,
            'band7': 600
          },
          {
            'label': 'XXX',
            'band6': 2123,
            'band7': 9000
          },
          {
            'label': 'Cisco',
            'band6': 4123,
            'band7': 1200
          },
          {
            'label': 'PMI',
            'band6': 3123,
            'band7': 1500
          },
          {
            'label': 'Oracle',
            'band6': 1223,
            'band7': 3000
          },
          {
            'label': 'VMWare Company',
            'band6': 3123,
            'band7': 1000
          },
          {
            'label': 'ISC',
            'band6': 5123,
            'band7': 4000
          },
          {
            'label': 'PCI',
            'band6': 2123,
            'band7': 2000
          },
          {
            'label': 'ISACA',
            'band6': 5123,
            'band7': 2000
          }
        ]
      }
    }
  }

  return new Promise(resolve => {
    resolve(tmpList)
  })
}
