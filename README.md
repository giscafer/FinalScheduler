# FinalScheduler

终极排班管理系统，改变传统的排班模式！

使用技术： JFinal2.0 + Bootstrap + SeaJS + FullCalender.js
数据库：MySQL

## 使用
创建名为`finalschedule`的数据库，然后倒入sql文件夹中的结构表和数据；部署启动项目即可。

## 功能介绍

#### 人员管理

对人员信息的维护，增删改查等

![人员管理][1]

#### 分组管理

对人员进行分组，对不同的任务或者部门人员分组来管理排班，分组支持增删改查等

![分组管理][2]

#### 班次设置

排班班次设置，支持自定义班次名称、颜色和时间等

![班次设置][3]

#### 排班管理

根据分组的人员和班次的设置排班，班次的颜色和班次设置同步

![排班管理][4]

#### 考勤统计

统计人员的考勤情况，正常，迟到，旷工，请假等各种可以定制的。
![考勤统计][5]

#### 统计报表（未开发）

#### 其他功能（未开发）

## License

MIT © 2015-2016 Nickbing Lao

  [1]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/person.png
  [2]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/group.png
  [3]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/planset.png
  [4]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/scheduler.png
  [5]: https://raw.githubusercontent.com/giscafer/FinalScheduler/master/WebRoot/public/images/show/check.png