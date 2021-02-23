// element-ui.js
import Vue from 'vue'
import {
  Button,Upload,Message,Form,Input,FormItem,Popover,Collapse,
  CollapseItem,Card,Row,
  Col,
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Button,Upload,Message,Form,Input,FormItem,Popover,Collapse,
  CollapseItem,Card,Row,
  Col,
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
Vue.prototype.$message = Message

Vue.use(Element, { locale })
