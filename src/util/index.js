// 时间格式化
export const dateFormat = (date = new Date(), fmt = 'YYYY-MM-DD HH:mm:ss') => {
    let o  = {
        "M+": date.getMonth() + 1,     // 月
        "D+": date.getDate(),          // 日
        'H+': date.getHours(),         // 时
        "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,         // 时
        "m+": date.getMinutes(),       // 分
        "s+": date.getSeconds(),       // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3),    // 季度
        'S': date.getMilliseconds(),   // 毫秒数
    }
    let week = {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
    }

    if(/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if(/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for(let k in o){
      if(new RegExp("("+ k +")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr(("" + o[k]).length)))
      }
    }
    
    return fmt
}