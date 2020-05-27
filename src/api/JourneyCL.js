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

 export function getCourseCompleteData(params) {
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

 export function getCompletionRates(params) {
   const tmpList = {
     data: {
       code: 0,
       data: {
         columns: ['month', 'quantity'],
         rows: []
       }
     }
   }

   return new Promise(resolve => {
     resolve(tmpList)
   })
 }
