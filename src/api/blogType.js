import request from "@/utils/request";

/**
 * 获取所有分类
 * @returns 
 */
export function getBlogType() {
    return request({
        url: '/api/blogtype',
        method: 'get',
    })
}

/**
 * 根据 id 删除分类
 * @param {string} id 分类 id
 * @returns 
 */
export function delBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'delete',
    })
}

/**
 * 根据 id 查询分类
 * @param {string} id 分类 id
 * @returns 
 */
export function findOneBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'get',
    })
}

/**
 * 添加分类
 * @param {*} data 分类数据
 * @returns 
 */
export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data
    })
}

/**
 * 修改分类
 * @param {string} id  分类 id
 * @param {object} data  修改后的数据
 * @returns 
 */
export function updateBlogType({ id, data }) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'put',
        data
    })
}