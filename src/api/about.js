import request from "@/utils/request";

/**
 * 获取关于我信息
 * @returns 
 */
export function getAbout() {
    return request({
        url: '/api/about',
        method: 'get'
    })
}

/**
 * 设置关于我 url 信息
 * @param {*} data 
 * @returns 
 */
export function setAbout(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data
    })
}