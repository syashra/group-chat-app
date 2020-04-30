const moment=require('moment')

const ntime = new Date().toLocaleTimeString('en-US')
// , {
//     timeZone: 'Asia/Mumbai'
//   },{ hour: '2-digit', minute: '2-digit' }
//   );
  
function formatMessage(username,text){
    return{
        username,
        text,
        time: ntime
    }
}

module.exports=formatMessage