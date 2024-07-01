// 个人设置
import request from "@/utils/request";

/**
 * 获取全局设置
 * @returns 
 */
export function getSetting() {
    return request({
        url: '/api/setting',
        method: 'get'
    })
}

/**
 * 修改全局设置
 * @param {*} data 修改后的数据
 * @returns 
 */
export function setSetting(data) {
    return request({
        url: '/api/setting',
        method: 'put',
        data
    })
}