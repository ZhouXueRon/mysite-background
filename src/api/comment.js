// 评论管理
import request from "@/utils/request";

/**
 * 分页获取评论
 * @param {*} page 当前页
 * @param {*} limit 没有显示条数 
 * @returns 
 */
export function findComment(page, limit) {
    return request({
        url: '/api/comment',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}

/**
 * 根据指标 id 删除评论
 * @param {*} id 
 * @returns 
 */
export function delComment(id) {
    return request({
        url: `/api/comment/${id}`,
        method: 'delete',
    })
}