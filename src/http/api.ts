import { delone, devEnv, dev_url, get, post, prodEnv, prod_url, put } from "./http"

export const apis = {
    envs:{
        devEnv,
        dev_url,
        prodEnv,
        prod_url
    },
    /**
    机构管理接口
     */
    userManageApi: {
        
        get(p) {
            return get('/api/user/list', p)
        },
        add(p) {
            return post("/api/orgpos", p)
        },
        update(p) {
            return put("/api/orgpos", p)
        },
        delete(p) {
            return delone("/api/orgpos", p)
        }
    },
    baiduYun:{
        getFontFromImage(p){
            return post("/api/baiduyun/getFontFromImage",p)
        }
    }
    

}

