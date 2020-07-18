const uuid = '1f1839a8-d78f-4fc7-b088-b55e63cc35a3';
const apiPath = 'https://course-ec-api.hexschool.io/api/';
new Vue ({
    el:'#app',
    data: {
            user:{
                email:'',
                password:'',
            },
        },
    methods:{
        signin(){
            const api = `${apiPath}auth/login`;
            axios.post(api, this.user).then((response) => {
                const token = response.data.token;
                const expried = response.data.expried;
                // 登入登出用釋例3，getData用釋例2 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
                document.cookie = `cytoken=${token}; expires=${new Date(expried * 1000)}; path=/`;
                // 測試用code
                // var saveCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cytoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                // console.log(document.cookie);
                // console.log(saveCookie);
                // BOM到產品頁面
                window.location = 'products.html'
            }).catch((error) => {
                console.log(error);
            });
        },
    }

})