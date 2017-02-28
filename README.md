# FinalScheduler

终极排班管理系统，改变传统的排班模式！

使用技术： JFinal2.0 + Bootstrap + SeaJS + FullCalender.js（源码修改二次开发）

数据库：MySQL

**扫描关注 微信公众号：giscafer**

![giscafer](http://giscafer.com/static/images/qrcode_giscafer.jpg)


## 使用
创建名为`finalschedule`的数据库，然后导入sql文件夹中的结构表和数据；部署启动项目即可。（sql中有数据库用户名名称`dlwy`，请修改为自己的用户名称或创建一样的用户）
## 功能介绍

#### 人员管理

对人员信息的维护，增删改查等

![人员管理][1]

#### 分组管理

对人员进行分组，对不同的任务或者部门人员分组来管理排班，分组支持增删改查等

![分组管理][2]
![分组管理][7]

#### 班次设置

排班班次设置，支持自定义班次名称、颜色和时间等

![班次设置][3]

#### 排班管理

根据分组的人员和班次的设置排班，班次的颜色和班次设置同步

![排班管理][4]
![分组管理][6]

#### 考勤统计

统计人员的考勤情况，正常，迟到，旷工，请假等各种可以定制的。
![考勤统计][5]

## A reward 

请我喝杯咖啡

![支付宝](./alipay.png)
![微信](./wechat.png)

## License
	
项目中除`fullCallendar.js`插件商用收费外（请到官网了解，这里只做学习使用），其他遵循`MIT`。

---

> [giscafer.com](http://giscafer.com) &nbsp;&middot;&nbsp;
> GitHub [@giscafer](https://github.com/giscafer) &nbsp;&middot;&nbsp;
> Weibo [@Nickbing Lao](https://weibo.com/laohoubin)

  [1]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/person.png
  [2]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/group.png
  [3]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/planset.png
  [4]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/scheduler.png
  [5]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/check.png
  [6]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/simple.png
  [7]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/simple2.png
