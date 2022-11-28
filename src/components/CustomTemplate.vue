<template>
    <el-container class="main">
        <el-aside class="tableTainAside" width="200px" style="border-right: 1px solid #e4e0e0;">
            <el-input
                size="mini"
                style="width:calc(100% - 40px);margin-right:3px"
                placeholder="请输入内容"
                @input="searchHandler">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="primary" icon="el-icon-plus" circle style="padding: 5px"  @click="template.dialog=true"></el-button>
            <div v-loading="loadingTableList" style="margin-top:5px">
                <!-- 表列表 -->
                <el-table :data="templateList" highlight-current-row @row-click="handleRowClickT" style="width:180px">
                    <el-table-column :show-overflow-tooltip='true' prop="templateName"></el-table-column>
                </el-table>
            </div>
        </el-aside>
        <el-main style="padding: 0px 10px">
            <el-row>
                <el-button type="primary" size="mini" @click="genCode.dialog=true" :disabled="currentTemplate.templateName==''">添加代码模板</el-button>
            </el-row>
            <el-tabs v-model="activeName" >
                <el-tab-pane :label="item.codeTemplateName" :name="item.codeTemplateName" :key="item.codeTemplateName" v-for="item in currentTemplate.codeTemplateList">
                    <JsonEditor class="custom-template-editor" :content="item.content" :language="item.fileType" :readOnly="false" :name="item.codeTemplateName" @contentwatch="contentwatch"/>
                </el-tab-pane>
            </el-tabs>
        </el-main>
        <el-dialog title="添加模板" :visible.sync="template.dialog" :close-on-click-modal='false' append-to-body>
            <el-form :model="template" :rules="templateRules" label-position="top" size="mini" ref="templateRef" @submit.native.prevent>
                <el-form-item label="模板名称" prop="templateName">
                <el-input v-model='template.templateName'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="template.dialog = false">{{ $t('el.messagebox.cancel') }}</el-button>
                <el-button type="primary" @click="addTemplate">{{ $t('el.messagebox.confirm') }}</el-button>
            </div>
        </el-dialog>   
        <el-dialog title="代码模板" :visible.sync="genCode.dialog" :close-on-click-modal='false' append-to-body>
            <el-form :model="genCode" :rules="codeTemplateRules" label-position="top" size="mini"  ref="codeTemplateRef" @submit.native.prevent>
                <el-form-item label="模板名称" prop="codeTemplateName">
                    <el-input v-model='genCode.codeTemplateName'></el-input>
                </el-form-item>
                <el-form-item label="文件类型" prop="fileType">
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
            loadingTableList: false,
            tableNameSearch: '',
            templateList: [],
            activeName: '',
            templateRules: {
                templateName: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' },
                ],
            },
            codeTemplateRules: {
                codeTemplateName: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' },
                ],
                fileType: [
                    { required: true, message: '请输入文件类型', trigger: 'blur' },
                ],
            },
            currentTemplate: {
                templateName: '',
                codeTemplateList: []
            },
            template: {
                dialog: false,
                templateName: ''
            },
            genCode: {
                dialog: false,
                codeTemplateName: '',
                fileType: ''
            }
        }
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
        searchHandler(searchVal) {
            //this.templateList = this.tableTmpList.filter(item=>item.TABLE_NAME_COMMENT.indexOf(searchVal)>=0)
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
                this.$message.error("模板已经存在");
                return;
            }
            this.templateList.push({templateName: this.template.templateName, codeTemplateList:[]})
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
                this.$message.error("模板已经存在");
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
