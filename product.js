// 分頁元件
Vue.component('pagination',{
    template:'#pagination',
    data(){
        return{
            
        };
    },
    props:{
        pages:{},
    },
    methods:{
        emitPages(item){
            this.$emit('emit-pages',item);
        },

    },
});
// new vue
new Vue({
    el:'#app',
    data: {
        products:[],
        pagination:{},
        tempProduct:{
            imageUrl:[],
        },
        isNew:false,
        status:{
            fileUploading:false,
        },
        user:{
            token:'',
            uuid:'1f1839a8-d78f-4fc7-b088-b55e63cc35a3',
        },
    },
    created(){
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(this.user.token === ''){
            window.location = 'login.html';
        }
        this.getProducts();
    },
    methods:{
        getProducts(page = 1){
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
            axios.get(api).then((response) =>{
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
            });
        },
        openModal(isNew, item){
            switch(isNew){
                case 'new':
                    this.tempProduct = {
                        imageUrl:[],
                    };
                this.isNew = true;
                $('#productModal').modal('show');
                break;

                case'edit':
                    this.getProducts(item.id);
                    this.isNew = false;
                    break;
                
                case'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#delProductModal').modal('show');
                    break;
                    default:
                    break;
            }
        },
        getProduct(id){
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products/${id}`;
            axios.get(api).then((res) =>{
                this.tempProduct = res.data.data;
                $('#productModal').modal('show');
            }).catch((error) => {
                console.log(error);
            });
        },
        updateProduct(){
            let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            let httpMethod = 'post';
            if(!this.isNew){
                api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
                httpMethod = 'patch';
            }
        
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        axios[httpMethod](api, this.tempProduct).then(() =>{
            $('#productModal').modal('hide');
            this.getProducts();
        }).catch((error) =>{
            console.log(error)
        });
        },
        delProduct(){
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.defaults.headers.common.Authorization =  `Bearer ${this.user.token}`;
            axios.delete(url).then(() =>{
                $('#delProductModal').modal('hide');
                this.getProducts();
            });
        },
    },
})