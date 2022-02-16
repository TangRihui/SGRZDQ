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
        const res = await cloud.callFunction({
            name: 'getCurTime',
        })
        const date = res.result.date
        const days = res.result.days
        const day = date[1].month + '.' + date[1].day
        const hours = DATE.getHours() < 10 ? '0' + DATE.getHours().toString() : DATE.getHours().toString()
        const time = hours + ':' + DATE.getMinutes()
        //将获取到的数据对象赋值给变量，接下来需要用该对象向Excel表中添加数据



        if (type == 3) {
            var usersCount = await db.collection('users').count()
            var selectPromise
            var usersInfo = []
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
            var dataCVS = `users-${day}-${time}.xlsx`
            //声明一个Excel表
            var alldata = [];
            var row = ['姓名', '密码', 'openid', '权限', '工号', '班组',
                '性别', '出生日期', '年龄', '籍贯', '现居地', '政治面貌', '联系电话', '身份证号', '身份证地址',
                '参加工作时间', '到热轧厂时间', '工种', '岗位', 'HR岗位', '岗位序列', '岗次', '第一职业',
                '鉴定等级', '证书编号', '发证日期', '发证机关', '毕业院校', '专业', '学历', '学位', '职称', '证书号']; //表格的属性，也就是表头说明对象
            alldata.push(row); //将此行数据添加到一个向表格中存数据的数组中
            //接下来是通过循环将数据存到向表格中存数据的数组中
            for (let key = 0; key < usersInfo.length; key++) {
                let arr = [];
                arr.push(usersInfo[key].name);
                arr.push(usersInfo[key].pwd);
                arr.push(usersInfo[key].openid);
                arr.push(usersInfo[key].type);
                arr.push(usersInfo[key].eid);
                arr.push(usersInfo[key].group);
                arr.push(usersInfo[key].sex);
                arr.push(usersInfo[key].birth);
                arr.push(usersInfo[key].age);
                arr.push(usersInfo[key].native);
                arr.push(usersInfo[key].politic);
                arr.push(usersInfo[key].tel);
                arr.push(usersInfo[key].id_no);
                arr.push(usersInfo[key].id_add);
                arr.push(usersInfo[key].work_date);
                arr.push(usersInfo[key].arr_date);
                arr.push(usersInfo[key].work_type);
                arr.push(usersInfo[key].post);
                arr.push(usersInfo[key].post_hr);
                arr.push(usersInfo[key].post_no);
                arr.push(usersInfo[key].post_level);
                arr.push(usersInfo[key].first_work);
                arr.push(usersInfo[key].cer_level);
                arr.push(usersInfo[key].cer_id);
                arr.push(usersInfo[key].cer_date);
                arr.push(usersInfo[key].cer_org);
                arr.push(usersInfo[key].college);
                arr.push(usersInfo[key].major);
                arr.push(usersInfo[key].edu);
                arr.push(usersInfo[key].degree);
                arr.push(usersInfo[key].post_title);
                arr.push(usersInfo[key].post_id);
                arr.push(usersInfo[key].note);
                alldata.push(arr)
            }
        }
        else if (type == 2) {

        }
        else if (type == 1) {

        }
        else {

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
            days
        }
    } catch (error) {
        console.error(error)
    }
}