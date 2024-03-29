let _ = require('lodash');
// import template from 'art-template/lib/template-web.js'
import { 
    frontListTemplateV1,
    frontAddTemplateV1,
    adminDomainTemplateV1,
    adminMapperTemplateV1,
    adminMapperXmlTemplateV1,
    adminServiceTemplateV1,
    adminServiceImpTemplateV1,
    adminControllerTemplateV1
} from '@/templates/v1/index.js'
import { 
    frontIndexTemplateV2, 
    frontSaveTemplateV2, 
    adminDomainTemplateV2, 
    adminDtoTemplateV2, 
    adminMapperTemplateV2, 
    adminMapperXmlTemplateV2, 
    adminServiceTemplateV2, 
    adminServiceImpTemplateV2, 
    adminControllerTemplateV2
} from '@/templates/v2/index.js'
export default {
    /**
     * 日期格式化
     * @param {*} date 
     * @param {*} fmt 
     * @returns 
     */
    dateFormat(date, fmt='yyyy-MM-dd hh:mm:ss') {
        date = date ? new Date(date) : new Date()
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    },
    getTemplateList() {
        // 获取模板
        let localTemplateList = JSON.parse(localStorage.getItem("templateList") || "[]")
        if (localTemplateList.length == 0) {
            let templates = [
                {
                    "templateName":"百奥云V1模板",
                    "codeTemplateList":[
                        {"codeTemplateName":"list.html","fileType":"html","content": frontListTemplateV1},
                        {"codeTemplateName":"add.html","fileType":"html","content": frontAddTemplateV1},
                        {"codeTemplateName":"domain.java","fileType":"java","content": adminDomainTemplateV1},
                        {"codeTemplateName":"mapper.java","fileType":"java","content": adminMapperTemplateV1},
                        {"codeTemplateName":"mapperXml.xml","fileType":"xml","content": adminMapperXmlTemplateV1},
                        {"codeTemplateName":"service.java","fileType":"java","content": adminServiceTemplateV1},
                        {"codeTemplateName":"serviceImp.java","fileType":"java","content": adminServiceImpTemplateV1},
                        {"codeTemplateName":"controller.java","fileType":"java","content": adminControllerTemplateV1},
                    ]
                },
                {   
                    "templateName":"百奥云V2模板",
                    "codeTemplateList":
                        [
                            {"codeTemplateName":"index.vue","fileType":"vue","content": frontIndexTemplateV2},
                            {"codeTemplateName":"save.vue","fileType":"vue","content": frontSaveTemplateV2},
                            {"codeTemplateName":"domain.java","fileType":"java","content": adminDomainTemplateV2},
                            {"codeTemplateName":"pageDTO.java","fileType":"java","content": adminDtoTemplateV2},
                            {"codeTemplateName":"mapper.java","fileType":"java","content": adminMapperTemplateV2},
                            {"codeTemplateName":"mapperXml.xml","fileType":"xml","content": adminMapperXmlTemplateV2},
                            {"codeTemplateName":"service.java","fileType":"java","content": adminServiceTemplateV2},
                            {"codeTemplateName":"serviceImp.java","fileType":"java","content": adminServiceImpTemplateV2},
                            {"codeTemplateName":"controller.java","fileType":"java","content": adminControllerTemplateV2},
                        ]
                }
            ]
            // 保存模板
            localStorage.setItem("templateList", JSON.stringify(templates)) 
        }
        return JSON.parse(localStorage.getItem("templateList") || "[]")
    },
       
    /**
     * 转换java字段类型
     * @param {*} type 
     * @returns 
     */
    converJavaField(type) {
        switch(type) {
            case "tinyint":
                return "Boolean"
            case "smallint":
                return "Integer"
            case "int":
                return "Integer"
            case "integer":
                return "Integer"
            case "bigint":
                return "Long"
            case "float":
                return "Float"
            case "double":
                return "Double"
            case "decimal":
                return "BigDecimal"
            case "bit":
                return "Boolean"
            case "char":
                return "String"
            case "varchar":
                return "String"
            case "tinytext":
                return "String"
            case "text":
                return "String"
            case "mediumtext":
                return "String"
            case "longtext":
                return "String"
            case "date":
                return "Date"
            case "datetime":
                return "Date"
            case "timestamp":
                return "Timestamp"
            default: 
                return "unknowType"
        }
    },
    /**
     * 获取模版数据
     * @param {*} columnInfos 
     * @param {*} configId 
     */
    getGenData(columnInfos, config) {
        let data = {}
        // 关联机构
        data.orgFlag = config.orgFlag
        // 关联作物
        data.cropFlag = config.cropFlag
        // 高级搜索
        data.adSearch = config.adSearch
        // 接口别名
        data.apiAlias = config.apiAlias;
        // 包名称
        data._package=config.pack
        // 模块名称
        data.moduleName=config.moduleName
        // 作者
        data.author=config.author
        // 创建日期
        data.date=this.dateFormat();
        // 表名
        data.tableName=config.tableName
        data.simpleName=config.tableName
        // 大写开头的类名
        var className = _.upperFirst(_.camelCase(config.tableName));
        // 小写开头的类名
        var changeClassName = _.camelCase(config.tableName);
        // 判断是否去除表前缀
        if (config.prefix) {
            var simpleName = _.startsWith(config.tableName, config.prefix) ? _.replace(config.tableName, config.prefix, "") : config.tableName
            data.simpleName = simpleName
            className = _.upperFirst(_.camelCase(simpleName));
            changeClassName = _.camelCase(simpleName);
        }
        data.className = className
        data.changeClassName = changeClassName
        // 存在 Timestamp 字段
        data.hasTimestamp = false
        // 存在 Date 字段
        data.hasDate = false
        // 查询类中存在 Date 字段
        data.queryDate = false
        // 查询类中存在 Timestamp 字段
        data.queryHasTimestamp = false
        // 存在 BigDecimal 字段
        data.hasBigDecimal = false
        // 查询类中存在 BigDecimal 字段
        data.queryHasBigDecimal = false
        // 是否需要创建查询
        data.hasQuery = false
        // 自增主键
        data.auto = false
        // 存在字典
        data.hasDict = false
        // 存在日期注解
        data.hasDateAnnotation = false
        data.columns = []
        data.queryColumns = []
        data.betweens = []
        data.isNotNullColumns = []

        for(let i in columnInfos) {
            let item = {}
            // 字段描述
            item.remark = columnInfos[i].remark
            // 字段类型
            item.columnKey = columnInfos[i].keyType
            // 主键类型
            var colType = this.converJavaField(columnInfos[i].columnType)
            // 小写开头的字段名
            var changeColumnName = _.camelCase(columnInfos[i].columnName);
            // 大写开头的字段名
            var capitalColumnName = _.upperFirst(_.camelCase(columnInfos[i].columnName));
            if ("PRI" == columnInfos[i].keyType) {
                // 存储主键类型
                data.pkColumnType= colType
                // 存储小写开头的字段名
                data.pkChangeColName= changeColumnName
                // 存储大写开头的字段名
                data.pkCapitalColName= capitalColumnName
            }
            // 是否存在 Timestamp 类型的字段
            if ("Timestamp" == colType) {
                data.hasTimestamp = true
            }
             // 是否存在 Timestamp 类型的字段
             if ("Date" == colType || "DateTime" == colType) {
                data.hasDate = true
            }
            // 是否存在 BigDecimal 类型的字段
            if ("BigDecimal" == colType) {
                data.hasBigDecimal = true
            }
            // 主键是否自增
            if ("auto_increment" == columnInfos[i].extra) {
                data.auto = true
            }

             // 存储字段类型
             item.columnType = colType
             // 存储字原始段名称
             item.columnName = columnInfos[i].columnName
             // 不为空
             item.istNotNull = columnInfos[i].notNull
             // 字段列表显示
             item.columnShow = columnInfos[i].listShow
             // 表单显示
             item.formShow = columnInfos[i].formShow
             // 表单组件类型
             item.formType = columnInfos[i].formType ? columnInfos[i].formType : "Input"
             // 小写开头的字段名称
             item.changeColumnName = changeColumnName
             //大写开头的字段名称
             item.capitalColumnName = capitalColumnName
             // 关联字典
             item.dictName = columnInfos[i].dictName || ""
            // 添加非空字段信息
            if (columnInfos[i].notNull) {
                data.isNotNullColumns.push(item);
            }
             // 判断是否有查询，如有则把查询的字段set进columnQuery
             if (columnInfos[i].queryType) {
                // 查询类型
                item.queryType = columnInfos[i].queryType
                // 是否存在查询
                data.hasQuery = true
                // 查询中存储 Timestamp 类型
                if ("Timestamp" == colType) {
                    data.queryHasTimestamp = true
                }
                if ("Date" == colType || "DateTime" == colType) {
                    data.queryDate = true
                }
                if ("BigDecimal" == colType) {
                    data.queryHasBigDecimal = true
                }
                if ("between" == columnInfos[i].queryType) {
                    data.betweens.push(item);
                } else {
                    // 添加到查询列表中
                    data.queryColumns.push(item);
                }
             }

            data.columns.push(item)
        }
        return data
    }
}