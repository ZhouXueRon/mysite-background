import request from "@/utils/request";

/**
 * 分页获取留言信息
 * @param {*} page 当前页
 * @param {*} limit 没有显示条数
 * @returns 
 */
export function findMessage(page, limit) {
    return request({
        url: '/api/message',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}

/**
 * 删除留言信息
 * @param {*} id 
 * @returns 
 */
export function delMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: 'delete'
    })
}