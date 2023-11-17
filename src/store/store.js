import { reactive } from 'vue'
export const store = reactive({
    baseUrl: "http://localhost:8000",
    inputDisable: false,
    timeOutTime: 2000,
    error_messages: new Map([
      ['timeoutError', "超时！"],
      ['illegalInputError', "非法输入！"]
    ]),
    list_names: [
        [
          {name: "帖子Posts", path: "posts"},
          {name: "帖子热度值", path: "posts-heat"},
          {name: "影响力前N帖子", path: "posts-influence"},
        ],
        [
          {name: "用户Users", path: "users"},
          {name: "用户热度值", path: "users-heat"},
          {name: "影响力前N用户", path: "users-influence"},
        ],
        [
          {name: "提交数据Info", path: "info"},
          {name: "提交数据", path: "info"},
        ]
    ],
    getItemName(index) {
        switch (index) {
          case this.list_names[0][1].path:
            return this.list_names[0][1].name
            break;
          case this.list_names[0][2].path:
            return this.list_names[0][2].name
            break;
          case this.list_names[1][1].path:
            return this.list_names[1][1].name
            break;
          case this.list_names[1][2].path:
            return this.list_names[1][2].name
            break;
          case this.list_names[2][1].path:
            return this.list_names[2][1].name
            break;
        
          default:
            break;
        }
      }
})