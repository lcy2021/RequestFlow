import HeaderModel from "@/models/HeaderModel";

export default class HeaderUtil {
  private static instance: HeaderUtil;
  private readonly root: HeaderModel;
  private constructor() {
    this.root = {
      current: "root",
      isEnd: false,
      children: {},
    };
  }
  static getInstance(): HeaderUtil {
    if (!this.instance) {
      this.instance = new HeaderUtil();
    }
    return this.instance;
  }
  insertHeader(headers: Array<string>): void {
    for (const header of headers) {
      //Define ptr
      let cur: HeaderModel = this.root;
      const splits = header.toLocaleLowerCase().split("");
      for (let i = 0; i < splits.length; i++) {
        const item = splits[i];
        if (cur.children[item]) {
          cur = cur.children[item];
        } else {
          const newNode: HeaderModel = {
            current: item,
            children: {},
            isEnd: i === splits.length - 1,
            endStr: i === splits.length - 1 ? header : "",
          };
          cur.children[item] = newNode;
          cur = newNode;
        }
      }
    }
  }

  searchPrefix(prefix: string): Array<string> {
    const res: Array<string> = [];
    const spilits = prefix.toLocaleLowerCase().split("");
    let cur = this.root;
    for (const item of spilits) {
      if (cur.children[item]) {
        cur = cur.children[item];
      } else {
        break;
      }
    }
    if (!cur.isEnd) {
      //Use dfs to filter headers
      const stack: Array<HeaderModel> = [];
      stack.push(cur);
      while (stack.length > 0) {
        const node = stack.pop() as HeaderModel;
        if (node?.isEnd) {
          res.push(node.endStr ?? "");
        }
        const keys = Object.keys(node.children);
        for (let i = keys.length - 1; i >= 0; i--) {
          stack.push(node.children[keys[i]]);
        }
      }
    }
    return res;
  }
}
