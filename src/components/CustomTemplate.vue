<template>
    <el-container class="main">
        <el-aside class="tableTainAside" width="200px" style="border-right: 1px solid #e4e0e0;">
            <el-input
                size="mini"
                style="width:calc(100% - 40px);margin-right:3px"
                :placeholder="$t('message.input_search_content')"
                @input="searchHandler">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="primary" icon="el-icon-plus" circle style="padding: 5px"  @click="template.dialog=true;template.mod='add'"></el-button>
            <div v-loading="loadingTableList" style="margin-top:5px">
                <!-- 表列表 -->
                <el-table :data="tableData" highlight-current-row @row-click="handleRowClickT" style="width:180px">
                    <el-table-column :show-overflow-tooltip='true' prop="templateName"></el-table-column>
                    <el-table-column width="65" :show-overflow-tooltip='true' prop="templateName">
                         <template slot-scope="scope">
                            <el-button @click="handleEditClick(scope.row)" type="text" icon="el-icon-edit" size="small"></el-button>
                            <el-button @click="handleDelClick(scope.row)" type="text" icon="el-icon-delete" size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-aside>
        <el-main style="padding: 0px 10px">
            <el-row>
                <el-button type="info" size="mini" icon="el-icon-info" @click="desc.dialog=true">{{$t('message.template_desc')}}</el-button>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="genCode.dialog=true" :disabled="currentTemplate.templateName==''">{{$t('message.code_template_add')}}</el-button>
            </el-row>
            <el-tabs v-model="activeName" :closable="true" @tab-remove="codeTabRemovehandler">
                <el-tab-pane :label="item.codeTemplateName" :name="item.codeTemplateName" :key="item.codeTemplateName" v-for="item in currentTemplate.codeTemplateList">
                    <JsonEditor class="custom-template-editor" :content="item.content" :language="item.fileType" :readOnly="false" :name="item.codeTemplateName" @contentwatch="contentwatch"/>
                </el-tab-pane>
            </el-tabs>
        </el-main>
        <el-dialog :title="$t('message.template_desc')" :visible.sync="desc.dialog" :close-on-click-modal='false' append-to-body>
            <el-alert :title="$t('message.template_desc_title')" type="info" show-icon></el-alert>
            <JsonEditor :content="desc.content" language="json"/>
        </el-dialog>   
        <el-dialog :title="$t('message.template_add')" :visible.sync="template.dialog" :close-on-click-modal='false' append-to-body>
            <el-form :model="template" :rules="templateRules" label-position="top" size="mini" ref="templateRef" @submit.native.prevent>
                <el-form-item :label="$t('message.template_name')" prop="templateName">
                <el-input v-model='template.templateName'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="template.dialog = false">{{ $t('el.messagebox.cancel') }}</el-button>
                <el-button type="primary" @click="addTemplate">{{ $t('el.messagebox.confirm') }}</el-button>
            </div>
        </el-dialog>   
        <el-dialog :title="$t('message.code_template')" :visible.sync="genCode.dialog" :close-on-click-modal='false' append-to-body>
            <el-form :model="genCode" :rules="codeTemplateRules" label-position="top" size="mini"  ref="codeTemplateRef" @submit.native.prevent>
                <el-form-item :label="$t('message.template_name')" prop="codeTemplateName">
                    <el-input v-model='genCode.codeTemplateName'></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.template_file_type')" prop="fileType">
                    <el-input v-model='genCode.fileType'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="genCode.dialog = false">{{ $t('el.messagebox.cancel') }}</el-button>
                <el-button type="primary" @click="addCodeTemplate">{{ $t('el.messagebox.confirm') }}</el-button>
            </div>
        </el-dialog>   
    </el-container>
</template>

<script type="text/javascript">
import JsonEditor from '@/components/JsonEditor'
export default {
    props: ['client', 'database'],
    components: {JsonEditor},
    data() {
        return {
            desc: {
                dialog: false,
                content: `
{
    "apiAlias": "接口别名",
    "_package": "包名称",
    "author": "作者",
    "date": "创建日期",
    "tableName": "表名",
    "simpleName": "去除前缀后的表名",
    "className": "大写开头的类名",
    "changeClassName": "小写开头的类名",
    "hasTimestamp": "是否存在 Timestamp 字段",
    "hasDate": "是否存在 Date 字段",
    "queryDate": "查询类中存在 Date 字段",
    "queryHasTimestamp": "查询类中存在 Timestamp 字段",
    "hasBigDecimal": "是否存在 BigDecimal 字段",
    "queryHasBigDecimal": "查询类中存在 BigDecimal 字段",
    "hasQuery": "是否需要创建查询",
    "auto": "是否自增主键",
    "hasDict": "是否存在字典",
    "hasDateAnnotation": "是否存在日期注解",
    "pkColumnType": "主键字段类型",
    "pkChangeColName": "主键小写字段名称",
    "pkCapitalColName": "主键大写字段名称",
    "asQuery": "是否存在查询",
    // 所有字段数据
    "columns": [{
        "remark": "字段描述",
        "columnKey": "主键类型",
        "columnType": "字段类型",
        "columnName": "字段名称",
        "istNotNull": "是否非空字段",
        "columnShow": "是否列表显示",
        "formShow": "是否表单显示",
        "formType": "表单组件类型",
        "changeColumnName": "小写开头的字段名",
        "capitalColumnName": "大写开头的字段名",
        "queryType": "查询方式"
    }],
    // 查询字段列表
    "queryColumns": [{
        "remark": "字段描述",
        "columnKey": "主键类型",
        "columnType": "字段类型",
        "columnName": "字段名称",
        "istNotNull": "是否非空字段",
        "columnShow": "是否列表显示",
        "formShow": "是否表单显示",
        "formType": "表单组件类型",
        "changeColumnName": "小写开头的字段名",
        "capitalColumnName": "大写开头的字段名",
        "queryType": "查询方式"
    }],
    // 范围查询字段列表
    "betweens": [{
        "remark": "字段描述",
        "columnKey": "主键类型",
        "columnType": "字段类型",
        "columnName": "字段名称",
        "istNotNull": "是否非空字段",
        "columnShow": "是否列表显示",
        "formShow": "是否表单显示",
        "formType": "表单组件类型",
        "changeColumnName": "小写开头的字段名",
        "capitalColumnName": "大写开头的字段名",
        "queryType": "查询方式"
    }],
    // 不为空的字段列表
    "isNotNullColumns": [{
        "remark": "字段描述",
        "columnKey": "主键类型",
        "columnType": "字段类型",
        "columnName": "字段名称",
        "istNotNull": "是否非空字段",
        "columnShow": "是否列表显示",
        "formShow": "是否表单显示",
        "formType": "表单组件类型",
        "changeColumnName": "小写开头的字段名",
        "capitalColumnName": "大写开头的字段名",
        "queryType": "查询方式"
    }],
}
                `,
            },
            loadingTableList: false,
            tableNameSearch: '',
            tableData: [],
            templateList: [],
            activeName: '',
            currentTemplate: {
                templateName: '',
                codeTemplateList: []
            },
            template: {
                mod: 'add',
                dialog: false,
                templateName: '',
                originName: ''
            },
            genCode: {
                dialog: false,
                codeTemplateName: '',
                fileType: ''
            }
        }
    },
    computed: {
      templateRules() {
        const rules = {
            templateName: [
              { required: true, message: this.$t('message.template_info1'), trigger: 'blur' },
            ],
        };
        return rules
      },
      codeTemplateRules() {
        const rules = {
            codeTemplateName: [
                { required: true, message: this.$t('message.template_info1'), trigger: 'blur' },
            ],
            fileType: [
                { required: true, message: this.$t('message.template_info2'), trigger: 'blur' },
            ],
        };
        return rules
      },
  },
    async created() {
       this.loadingTableList = true;
       this.templateList = this.getLocalStoryTemplateList()
       this.loadingTableList = false;
    },
    watch: {
        templateList: {
             deep: true,
             handler(newVal, oldVal) {
                this.tableData = newVal
                localStorage.setItem("templateList", JSON.stringify(newVal)) 
             }
        }
    },
    methods: {
        handleRowClickT(row) {
            let tempateName = row.templateName;
            this.currentTemplate.templateName = row.templateName
            let codeTemplateList = [];
            let templateList = this.getLocalStoryTemplateList()
            for(let i in templateList) {
                if (templateList[i].templateName == tempateName) {
                    codeTemplateList = templateList[i].codeTemplateList || [];
                    break;
                }
            }
            this.activeName = codeTemplateList.length > 0 ? codeTemplateList[0].codeTemplateName : ''
            this.currentTemplate.codeTemplateList= codeTemplateList;
        },
        handleEditClick(row) {
            this.template = {
                mod: 'edit',
                dialog: true,
                templateName: row.templateName,
                originName: row.templateName,
            }
        },
        handleDelClick(row) {
             this.$confirm(
                this.$t('message.template_del_info', {name: row.templateName}),
                { type: 'warning' },
            ).then(() => {
                this.templateList = this.templateList.filter(item => item.templateName != row.templateName )
            }).catch(() => {});
        },
        searchHandler(searchVal) {
            this.tableData = this.templateList.filter(item=>item.templateName.indexOf(searchVal)>=0)
        },
        getLocalStoryTemplateList() {
            return JSON.parse(localStorage.getItem("templateList") || "[]");
        },
        async addTemplate() {
            let validate = await this.$refs.templateRef.validate()
            if (!validate) {
                return
            }
            let exists = false;
            this.templateList.map((item) => {
                (item.templateName === this.template.templateName) && (exists = true);
            });
            if(exists) {
                this.$message.error(this.$t('message.template_info3'));
                return;
            }
            if(this.template.mod == 'add') {
                this.templateList.push({templateName: this.template.templateName, codeTemplateList:[]})
            }else {
                this.templateList.map(item => {
                    if(item.templateName == this.template.originName) {
                        item.templateName =  this.template.templateName
                    }
                })
            }
            this.template.templateName = ""
            this.template.dialog = false        
        },
        async addCodeTemplate() {
            let validate = await this.$refs.codeTemplateRef.validate()
            if (!validate) {
                return
            }
            let exists = false;
            this.currentTemplate.codeTemplateList.map((item) => {
                (item.codeTemplateName === this.genCode.codeTemplateName) && (exists = true);
            });
            if(exists) {
                this.$message.error(this.$t('message.template_info3'));
                return;
            }
            this.currentTemplate.codeTemplateList.push({
                codeTemplateName: this.genCode.codeTemplateName,
                fileType: this.genCode.fileType
            })
            this.templateList.map((item) => {
                if (item.templateName === this.currentTemplate.templateName) {
                    item.codeTemplateList = this.currentTemplate.codeTemplateList
                }
            });
            localStorage.setItem("templateList", JSON.stringify(this.templateList)) 
            this.activeName = this.genCode.codeTemplateName
            this.genCode.dialog = false
        },
        contentwatch(activeName, content) {
            let templateList = this.getLocalStoryTemplateList()
            if (content) {
                templateList.map(item => {
                    if(item.templateName == this.currentTemplate.templateName) {
                        if(item.codeTemplateList) {
                            item.codeTemplateList.map(codeItem => {
                                if(codeItem.codeTemplateName == activeName) {
                                    codeItem.content = content
                                }
                            })
                        }
                    }
                })
                localStorage.setItem("templateList", JSON.stringify(templateList)) 
            }
        },
        codeTabRemovehandler(codeTemplateName) {
            this.$confirm(
                this.$t('message.template_del_info', {name: codeTemplateName}),
                { type: 'warning' },
            ).then(() => {
                this.templateList.map(item => {
                    if(item.templateName == this.currentTemplate.templateName) {
                        if(item.codeTemplateList) {
                            item.codeTemplateList = item.codeTemplateList.filter((codeTemplate) =>  codeTemplate.codeTemplateName != codeTemplateName)
                            this.currentTemplate.codeTemplateList = item.codeTemplateList
                        }
                    }
                })
            }).catch(() => {});
        }
    }
}
</script>
<style scoped>
.search-input {
    line-height: 0px;
    width: 178px;
    margin-left: -20px;
}

</style>
<style>
.custom-template-editor .monaco-editor-con {
    height: calc(100vh - 240px) !important;
  }
.tableTainAside .el-table th.is-leaf {
    margin-top: 5px;
    display: none;
}
</style>
