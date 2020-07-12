// uuid驗證要用
const uuid = '1f1839a8-d78f-4fc7-b088-b55e63cc35a3';
// 省下反覆打網址的時間
const apiPath = 'https://course-ec-api.hexschool.io/api/';
new Vue({
    el:'#app',
    data(){
       return{
           user:{
               email:'',
               password:'',
           },
           token:'',
       };
    },
    methods:{
        signin(){
            const api =`${apiPath}/auth/login`;
            axios.post(api, this.user).then((response) =>{
                console.log(response)
                // 存token跟到期日
                const token = response.data.token;
                const expired = response.data.expired;
                //    存cookie  到期日就固定expierd*1000
                document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`
            }).catch((error) =>{
                console.log(error);
            });

        },
        signout(){
            document.cookie = `hexToken=; expires=; path=/`

        },
        getData(){
            const api =`${apiPath}/auth/login`;
            this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log('token', token)

        },
    },

})