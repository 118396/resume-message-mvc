!function () {
    var view = document.querySelector('#topNavBar')
    var controller = { // controller 对象
        view: null,  //view 开始是空的 
        init: function(view){ //初始化
            this.view = view //将view 存在自己的 view 里面  这里的 this 是 controller 这个对象 
            this.bindEvents() //绑定
            // this.bingEvents.call(this)
        },
        bindEvents: function(){ //绑定 view 事件
            var view = this.view
            window.addEventListener('scroll',(xxx) => {
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    view.classList.remove('sticky')
                    this.deactive()
                }
            })
            // 箭头函数没有 this
        },
        active: function(){ //激活 view
            this.view.classList.add('sticky')
        },
        deactive: function(){ //非激活 view
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)//用controller调用 view ，
    //controller.init.call(controller, view) 
}.call()