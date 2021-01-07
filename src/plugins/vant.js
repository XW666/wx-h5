// 按需全局引入 vant组件
// 按需全局引入 vant组件
import Vue from 'vue'
import { Field } from 'vant'
import { Form } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';
import { Button } from 'vant';
import { Area } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Area);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Form);
Vue.use(Field)
