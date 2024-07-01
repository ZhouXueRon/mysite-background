import request from "@/utils/request";

/**
 * 获取项目列表
 * @returns 
 */
export function findProject() {
    return request({
        url: '/api/project',
        method: 'get'
    })
}

/**
 * 新增项目
 * @param {*} data 提交的数据信息
 * @returns 
 */
export function addProject(data) {
    return request({
        url: '/api/project',
        method: 'post',
        data
    })
}

/**
 * 修改项目
 * @param {*} id 项目 id
 * @param {*} data 修改后的数据信息
 * @returns 
 */
export function setProject(id, data) {
    return request({
        url: `/api/project/${id}`,
        method: 'put',
        data
    })
}

/**
 * 根据项目 id 删除项目信息
 * @param {*} id 
 * @returns 
 */
export function delOneProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: 'delete',
    })
}