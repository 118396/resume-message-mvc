!function(){
  var view  = document.querySelector('section.message')
  var modle ={
    init : function(){
      var APP_ID = 'Ne1RJ5Dtcxs7SCfTbLJj9KOH-gzGzoHsz'
      var APP_KEY = 'kDVSo8HhSCsPof8zfw508r2T'
      AV.init({appId: APP_ID, appKey: APP_KEY })
    },
    //获取数据
    fetch: function(){      // fetch 获取
      var query = new AV.Query('Message');
      return query.find()//Promise 对象
    },
    //创建数据
    save: function(name,content){
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({//Promise 对象
        'name': name,
        'content': content
      })
    }
  }

  var controller = {
    view : null,
    modle : null,
    messageList: null,
    init: function(view, modle){
      this.view = view // 获取到 view
      this.modle = modle

      this.messageList = view.querySelector('#messageList') //从 view 里面找到messageList
      this.form = view.querySelector('form')//找到 form
      this.modle.init() //初始化 
      this.loadMessages() // 加载Message
      this.bindEvents() //绑定事件
    } ,
    loadMessages: function(){
      this.modle.fetch().then(
        (messages) => {
        let array = messages.map((item)=> item.attributes)
        array.forEach((item) => {
          let li = document.createElement('li') //创建元素
          li.innerText = `${item.name}: ${item.content}`//用户输入的东西
          this.messageList.appendChild(li)//插到页面里
        })
      }
    )
    },
    bindEvents: function(){ // bindEvents 除了绑定事件以外，其他事情都不做
     
      this.form.addEventListener('submit', function(e){
        e.preventDefault()//阻止刷新页面
        this.saveMessage()
      })
    },
   saveMessage: function(){
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value//找到名字叫 content 的 input
      let name = myForm.querySelector('input[name=name]').value
      this.modle.save(name,content).then(function (object) {
        let li = document.createElement('li') 
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
        myForm.querySelector('input[name=content]').value=''//让 input 的 value 等于空字符串
       // window.location.reload() //自动刷新
      })
    }
  }
  controller.init(view,modle)

}.call()



// 为什么监听 submit 而不是 button 
// 因为需要监听 submit 和 回车两个事件

 // 不用 for 循坏
 // 用 forEach 和 map

 


/*
// 创建 TestObject 表
var x = AV.Object.extend('wh2');
//在表中创建一行数据
var o = new x();
// 数据内容是 words：'Hello World!'
// 如果保存成功，则运行 alert
o.save({
  words: 'Hi'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/