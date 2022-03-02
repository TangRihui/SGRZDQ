const cloud = require('wx-server-sdk')
cloud.init({
    env: "sgrzsbgl-7gyn4rque41a73ad" //编写云开发环境
})
const xlsx = require('node-xlsx') //导入Excel类库
const db = cloud.database() //声明数据库对象
const _ = db.command
const DATE = new Date()

exports.main = async (event, context) => {
    try {
        const type = event.type
        const group = event.group
        const res = await cloud.callFunction({
            name: 'getCurTime',
        })
        const date = res.result.date
        const days = res.result.days
        const day = date[1].month + '.' + date[1].day
        const hours = DATE.getHours() < 10 ? '0' + DATE.getHours().toString() : DATE.getHours().toString()
        const time = hours + '：' + DATE.getMinutes()
        //将获取到的数据对象赋值给变量，接下来需要用该对象向Excel表中添加数据
        var usersCount = await db.collection('users').count()
        var selectPromise
        var usersInfo = []
        var xlsxName = ''
        if (type == 3) {
            xlsxName = '全体职工'
            for (let i = 0; i < usersCount.total; i += 1000) {
                if (i > 0) {
                    selectPromise = await db.collection('users').where({}).limit(1000).skip(i).get().then(res => {
                        usersInfo = usersInfo.concat(res.data)
                    })
                } else {
                    //skip值为0时，会报错
                    selectPromise = await db.collection('users').where({}).limit(1000).get().then(res => {
                        usersInfo = usersInfo.concat(res.data)
                    })
                }
            }
        }
        else if (type == 2) {
            xlsxName = group
            if (group == '轧钢班') {
                for (let i = 0; i < usersCount.total; i += 1000) {
                    if (i > 0) {
                        selectPromise = await db.collection('users').where({ group: '轧钢班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢甲班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢甲班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢乙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢乙班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丙班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丁班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丁班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                    } else {
                        //skip值为0时，会报错
                        selectPromise = await db.collection('users').where({ group: '轧钢班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢甲班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢甲班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢乙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢乙班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丙班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丁班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '轧钢丁班（卷取）' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                    }
                }
            }
            else if (group == '加热班') {
                for (let i = 0; i < usersCount.total; i += 1000) {
                    if (i > 0) {
                        selectPromise = await db.collection('users').where({ group: '加热班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热甲班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热乙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热丙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热丁班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                    } else {
                        //skip值为0时，会报错
                        selectPromise = await db.collection('users').where({ group: '加热班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热甲班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热乙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热丙班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                        selectPromise = await db.collection('users').where({ group: '加热丁班' }).limit(1000).skip(i).get().then(res => {
                            usersInfo = usersInfo.concat(res.data)
                        })
                    }
                }
            }

        }
        else if (type == 1) {
            xlsxName = group
            for (let i = 0; i < usersCount.total; i += 1000) {
                if (i > 0) {
                    selectPromise = await db.collection('users').where({ group: group }).limit(1000).skip(i).get().then(res => {
                        usersInfo = usersInfo.concat(res.data)
                    })
                } else {
                    //skip值为0时，会报错
                    selectPromise = await db.collection('users').where({ group: group }).limit(1000).get().then(res => {
                        usersInfo = usersInfo.concat(res.data)
                    })
                }
            }
        }
        else {

        }




        var dataCVS = `${xlsxName}-${day}-${time}.xlsx`
        //声明一个Excel表
        var alldata = [];
        var row = ['姓名', '密码', 'openid', '权限', '工号', '班组',
            '性别', '出生日期', '年龄', '籍贯', '现居地', '政治面貌', '联系电话', '身份证号', '身份证地址',
            '参加工作时间', '到热轧厂时间', '工种', '岗位', 'HR岗位', '岗位序列', '岗次', '第一职业',
            '鉴定等级', '证书编号', '发证日期', '发证机关', '毕业院校', '专业', '学历', '学位', '职称', '证书号']; //表格的属性，也就是表头说明对象
        alldata.push(row); //将此行数据添加到一个向表格中存数据的数组中
        var typeArray = ['用户', '小班组管理员', '大班组管理员', '系统管理员']
        var sexArray = ['未填写', '男', '女']
        var politicArray = ['未填写', '党员', '预备党员', '积极分子', '团员', '群众']
        var work_typeArray = ['未填写', '轧制原料工', '金属轧制工']
        var postArray = ['未填写', '机长', '安全员', '加热工', '粗轧工', '精轧工', '卷取工']
        var post_hrArray = ['未填写', '主任', '书记', '副主任', '技术（业务）主管', '机长', '安全员', '加热工', '粗轧工', '精轧工', '卷取工']
        var post_noArray = ['未填写', '管理', '技术主管', '技术', '操作', '实习']
        var post_levelArray = ['未填写', '五岗', '六岗', '七岗', '八岗', '九岗']
        var cer_levelArray = ['未填写', '中级工程师', '助理工程师', '助理技师', '五级', '四级', '三级', '二级', '一级']
        var eduArray = ['未填写', '研究生', '大学本科', '大学专科', '专科院校', '中等专业学校', '高级技校', '技校', '高中', '职高', '初中', '小学', '其它']
        var degreeArray = ['未填写', '博士', '硕士', '学士']
        var post_titleArray = ['未填写', '高级工程师', '中级工程师', '助理工程师', '首席技师', '主任技师', '主管技师', '高级技师']
        //接下来是通过循环将数据存到向表格中存数据的数组中
        for (let key = 0; key < usersInfo.length; key++) {
            let type = typeArray[usersInfo[key].type]
            let sex = sexArray[usersInfo[key].sex]
            let politic = politicArray[usersInfo[key].politic]
            let work_type = work_typeArray[usersInfo[key].work_type]
            let post = postArray[usersInfo[key].post]
            let post_hr = post_hrArray[usersInfo[key].post_hr]
            let post_no = post_noArray[usersInfo[key].post_no]
            let post_level = post_levelArray[usersInfo[key].post_level]
            let cer_level = cer_levelArray[usersInfo[key].cer_level]
            let edu = eduArray[usersInfo[key].edu]
            let degree = degreeArray[usersInfo[key].degree]
            let post_title = post_titleArray[usersInfo[key].post_title]

            let arr = [];
            arr.push(usersInfo[key].name);
            arr.push(usersInfo[key].pwd);
            arr.push(usersInfo[key].openid);
            arr.push(type);
            arr.push(usersInfo[key].eid);
            arr.push(usersInfo[key].group);
            arr.push(sex);
            arr.push(usersInfo[key].birth);
            arr.push(usersInfo[key].age);
            arr.push(usersInfo[key].native);
            arr.push(politic);
            arr.push(usersInfo[key].tel);
            arr.push(usersInfo[key].id_no);
            arr.push(usersInfo[key].id_add);
            arr.push(usersInfo[key].work_date);
            arr.push(usersInfo[key].arr_date);
            arr.push(work_type);
            arr.push(post);
            arr.push(post_hr);
            arr.push(post_no);
            arr.push(post_level);
            arr.push(usersInfo[key].first_work);
            arr.push(cer_level);
            arr.push(usersInfo[key].cer_id);
            arr.push(usersInfo[key].cer_date);
            arr.push(usersInfo[key].cer_org);
            arr.push(usersInfo[key].college);
            arr.push(usersInfo[key].major);
            arr.push(edu);
            arr.push(degree);
            arr.push(post_title);
            arr.push(usersInfo[key].post_id);
            arr.push(usersInfo[key].note);
            alldata.push(arr)
        }


        var buffer = await xlsx.build([{
            name: "usersBackup",
            data: alldata
        }]);
        //将表格存入到存储库中并返回文件ID
        const uploadFile = await cloud.uploadFile({
            cloudPath: dataCVS,
            fileContent: buffer, //excel二进制文件
        })
        return {
            uploadFile,
            dataCVS,
            alldata,
            date,
            days,
            usersInfo
        }
    } catch (error) {
        console.error(error)
    }
}