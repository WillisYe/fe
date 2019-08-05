// 获取用户信息
import router from '@/router/index'
export function getUserinfo() {
    let userinfo = sessionStorage.getItem("userinfo");
    if (userinfo) {
        userinfo = JSON.parse(userinfo);
        return userinfo
    } else {
        router.push('/login')
    }
}