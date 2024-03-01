import { message } from 'antd';
import axios from 'axios';

console.log("process.env.REACT_APP_BASE_URL",process.env.REACT_APP_ENV)
export const dev_url='http://124.220.72.195:8096'
export const prod_url='http://124.220.72.195:8097'

export const devEnv="development"
export const prodEnv="production"

const instance = axios.create({
    timeout: 15000,
    baseURL: process.env.REACT_APP_ENV==prodEnv?prod_url:dev_url
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
}, function (error) {
    return Promise.resolve(error)
})

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log("neterrrrr", error)
        if (!error.response) {
            message.info("网络连接错误")
        }
        else {
            const status = error.response.status
            console.log("wrong", error.response.data)
            let errMsg = error.response.data.data.message
            switch (status) {
                case 400:
                    message.info(`请求字段或方式错误:${errMsg}`)
                    break
                case 401:
                    message.info("权限不足或登录过期");
                    localStorage.removeItem('token')
                    localStorage.removeItem('userDetail')
                    window.location.reload();
                    break
                case 403:
                    message.info('权限不足')
                    break
                case 404:
                    message.info(`请求错误,未找到资源:${errMsg}`)
                    break
                case 500:
                    message.info(`${errMsg},服务端错误`)
                    break
                default:
                    message.info(`请求错误：${errMsg}`)
            }
            return status >= 200 && status < 300
        }
        return new Promise.reject(error.response.data)
    }
)
instance.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let item in data) {
        ret += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
    }
    return ret
}]

export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params: params }).then(
            res => {
                resolve(res.data)
            }
        ).catch(
            err => {
                reject(err.data)
            }
        )
    })
}
export const post = (url, params, headObj) => {
    return new Promise((resolve, reject) => {
        instance.post(url, params, { headers: headObj || { Authorization: "Bearer " + localStorage.getItem('token') } }).then(
            res => {
                resolve(res.data)
            }
        ).catch(
            err => {
                reject(err.data)
            }
        )
    })
}
export const put = (url, params) => {
    return new Promise((resolve, reject) => {
        instance.put(url, params).then(
            res => {
                resolve(res.data)
            }
        ).catch(
            err => {
                reject(err.data)
            }
        )
    })
}
export const delone = (url, params) => {
    return new Promise((resolve, reject) => {
        instance.delete(url, { params: params }).then(
            res => {
                resolve(res.data)
            }
        ).catch(
            err => {
                reject(err.data)
            }
        )
    })
}


export default instance
