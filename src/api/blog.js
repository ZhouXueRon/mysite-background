import request from "@/utils/request";

/**
 * 分页获取文章
 * @param {number} page 当前页
 * @param {number} limit 每页展示的数据条数
 * @returns 
 */
export function findBlog(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}

/**
 * 根据 id 删除文章
 * @param {string} id 文章 id
 * @returns 
 */
export function delOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}

/**
 * 添加文章
 * @param {object} data 
 * @returns 
 */
export function addBlog(data) {
    return request({
        url: '/api/blog',
        method: 'post',
        data
    })
}

/**
 * 
 * @param {string} param0 要修改的文章 id
 * @param {object} param1 修改文章的内容
 * @returns 
 */
export function editBlog({ id, data }) {
    return request({
        url: `/api/blog/${id}`,
        method: 'put',
        data
    })
}

/**
 * 根据文章 id 查询文章信息
 * @param {*} id 文章 id
 * @returns 
 */
export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get',
    })
}