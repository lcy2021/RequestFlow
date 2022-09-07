import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/style/reset.scss";
import HeaderUtil from "@/utils/HeaderUtil";
import { HttpHeader } from "@/enums/HttpHeader";

HeaderUtil.getInstance().insertHeader(Object.keys(HttpHeader));
createApp(App).use(store, key).use(router).use(ElementPlus).mount("#app");
