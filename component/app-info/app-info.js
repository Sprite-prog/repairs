// component/app-info/app-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shenQinginfo:{
      type:Object,
      value:{}
    },
    pic_array:{
      type:Array,
      value:[],
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    hx_index:'',
    files: [{
      url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
    }, {
      loading: true
    }, {
      error: true
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(event){
      console.log(event);
      const hx_index = event.detail.value;
      const pic_array_title = this.properties.pic_array[hx_index].Title;
      this.setData({
        isShow: true,
        hx_index: event.detail.value,
      })
      this.triggerEvent('picker', { pic_array_title: hx_index});
    },
    input(event){
      let value=event.detail.value;
      this.triggerEvent('intro', { intro: value });
    },
    blur(event) {
      let value = event.detail.value;
      this.triggerEvent('intro', { intro: value });
    },
  }
})
