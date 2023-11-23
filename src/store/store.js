import { reactive } from 'vue'
export const store = reactive({
    baseUrl: "http://localhost:8000",
    inputDisable: false,
    timeOutTime: 2000,
    error_messages: new Map([
      ['timeoutError', "请求超时！"],
      ['illegalInputError', "非法输入！"]
    ]),
    field_names: [
      {id: 1, label: "科技科普"},
      {id: 2, label: "文化艺术"},
      {id: 3, label: "政治历史"},
      {id: 4, label: "经济金融"},
      {id: 5, label: "医疗健康"},
      {id: 6, label: "国防军事"},
      {id: 7, label: "教育考试"},
      {id: 8, label: "娱乐时尚"},
      {id: 9, label: "体育赛事"},
    ],
    router_names: new Map([
      ['posts', "帖子 Posts"],
      ['posts-heat', "帖子热度值"],
      ['posts-influence', "影响力前N帖子"],
      ['users', "用户 Users"],
      ['users-heat', "用户热度值"],
      ['users-influence', "影响力前N用户"],
      ['info', "提交数据"]
    ]),
    list_names: [
        [
          {name: "帖子 Posts", path: "posts"},
          {name: "帖子热度值", path: "posts-heat"},
          {name: "影响力前N帖子", path: "posts-influence"},
        ],
        [
          {name: "用户 Users", path: "users"},
          {name: "用户热度值", path: "users-heat"},
          {name: "影响力前N用户", path: "users-influence"},
        ],
        [
          {name: "提交数据 Info", path: "info"},
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