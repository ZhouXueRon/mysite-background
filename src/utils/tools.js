// 工具函数

/**
 * 日期格式化
 * @param {Date} timestamp 日期（默认为当前日期）
 * @param {String} format 返回的日期格式（默认为 YYYY-MM-DD）
 * @returns 
 */
export function formatDate(timestamp = new Date(), format = 'YYYY-MM-DD') {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    // 通过 padStart 不足两位的用 0 填充
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    const second = `${date.getSeconds()}`.padStart(2, '0');
    const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const week = weekArr[date.getDay()];
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('hh', hour)
        .replace('mm', minute)
        .replace('ss', second)
        .replace('w', week);
}