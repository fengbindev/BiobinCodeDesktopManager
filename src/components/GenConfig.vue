<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">{{$t('message.field_config')}}：{{ tableName }}</span>
            <el-dropdown
                placement='bottom-start'
                size="mini"
                style="float:right"
                :show-timeout=100
                :hide-timeout=300>
                <el-button
                  style="padding: 6px 9px;margin-right:5px"
                  :loading="genLoading"
                  size="mini"
                  type="success"
                >{{$t('message.btn_save_gen')}}</el-button>
                <el-dropdown-menu class='connection-menu-more-ul' slot="dropdown">
                  <el-dropdown-item @click.native='toGen(temp)' :key="temp.templateName" v-for="temp in codeTemplateList">
                    <span>{{temp.templateName}}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown
              placement='bottom-start'
              size="mini"
              style="float:right"
              :show-timeout=100
              :hide-timeout=300>
              <el-button
              style="padding: 6px 9px;margin-right:5px"
                icon="el-icon-view"
                size="mini"
                type="success"
              >{{$t('message.btn_preview')}}</el-button>
              <el-dropdown-menu class='connection-menu-more-ul' slot="dropdown">
                <el-dropdown-item @click.native='previewHandler(temp)' :key="temp.templateName" v-for="temp in codeTemplateList">
                  <span>{{temp.templateName}}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
                :loading="columnLoading"
                icon="el-icon-check"
                size="mini"
                style="float:right;padding: 6px 9px;margin-right:5px"
                type="primary"
                @click="saveColumnConfig"
              >{{$t('message.btn_save')}}</el-button>
            <el-tooltip class="item" effect="dark" :content="$t('message.sync_tooltip')" placement="top-start">
              <el-button
                :loading="syncLoading"
                icon="el-icon-refresh"
                size="mini"
                style="float:right;padding: 6px 9px;margin-right:5px"
                type="info"
                @click="syncColumn"
              >{{$t('message.btn_sync')}}</el-button>
            </el-tooltip>
          </div>
          <el-form size="small" label-width="90px">
            <el-table v-loading="loading" :data="data" :max-height="tableHeight" size="small" style="width: 100%;margin-bottom: 15px">
              <el-table-column prop="columnName" :label="$t('message.field_name')" />
              <el-table-column prop="columnType" :label="$t('message.field_type')" />
              <el-table-column prop="remark" :label="$t('message.field_desc')">
                <template slot-scope="scope">
                  <el-input v-model="data[scope.$index].remark" size="mini" class="edit-input" />
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('message.notnull')" width="70px">
                <template slot-scope="scope">
                  <el-checkbox v-model="data[scope.$index].notNull" />
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('message.list_show')" width="70px">
                <template slot-scope="scope">
                  <el-checkbox v-model="data[scope.$index].listShow" />
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('message.form_show')" width="70px">
                <template slot-scope="scope">
                  <el-checkbox v-model="data[scope.$index].formShow" />
                </template>
              </el-table-column>
              <el-table-column :label="$t('message.form_type')">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].formType" filterable class="edit-input" clearable size="mini" :placeholder="$t('message.gen_placeholder')">
                    <el-option
                      :label="$t('message.gen_query_option1')"
                      value="Input"
                    />
                    <el-option
                      :label="$t('message.gen_query_option2')"
                      value="Textarea"
                    />
                    <el-option
                      :label="$t('message.gen_query_option3')"
                      value="Radio"
                    />
                    <el-option
                      :label="$t('message.gen_query_option4')"
                      value="Select"
                    />
                    <el-option
                      :label="$t('message.gen_query_option5')"
                      value="Date"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column :label="$t('message.query_type')">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].queryType" filterable class="edit-input" clearable size="mini" :placeholder="$t('message.gen_placeholder')">
                    <el-option
                      label="="
                      value="="
                    />
                    <el-option
                      label="!="
                      value="!="
                    />
                    <el-option
                      label=">="
                      value=">="
                    />
                    <el-option
                      label="<="
                      value="<="
                    />
                    <el-option
                      label="Like"
                      value="Like"
                    />
                    <el-option
                      label="NotNull"
                      value="NotNull"
                    />
                    <el-option
                      label="BetWeen"
                      value="BetWeen"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <!-- <el-table-column :label="$t('message.date_anao')">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].dateAnnotation" filterable class="edit-input" clearable size="mini" :placeholder="$t('message.gen_placeholder')">
                    <el-option
                      :label="$t('message.gen_auto_createTime')"
                      value="CreationTimestamp"
                    />
                    <el-option
                      :label="$t('message.gen_auto_updateTime')"
                      value="UpdateTimestamp"
                    />
                  </el-select>
                </template>
              </el-table-column> -->
              <el-table-column :label="$t('message.dict_sel')">
                <template slot-scope="scope">
                  <el-input v-model="data[scope.$index].dictName" size="mini" class="edit-input" :placeholder="$t('message.gen_placeholder')"/>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">{{$t('message.gen_config')}}</span>
            <el-button
              :loading="configLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="doSubmit"
            >{{$t('message.btn_save')}}</el-button>
          </div>
          <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
            <el-row>
              <el-col :md="8" :xl="4">
                <el-form-item label="关联机构" prop="orgFlag">
                  <el-radio-group v-model="form.orgFlag" size="mini" style="width: 100%">
                    <el-radio-button label="true">是</el-radio-button>
                    <el-radio-button label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="8" :xl="4">
                <el-form-item label="关联作物" prop="cropFlag">
                  <el-radio-group v-model="form.cropFlag" size="mini">
                    <el-radio-button label="true">是</el-radio-button>
                    <el-radio-button label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="8" :xl="4">
                <el-form-item label="高级搜索" prop="adSearch">
                  <el-radio-group v-model="form.adSearch" size="mini">
                    <el-radio-button label="true">是</el-radio-button>
                    <el-radio-button label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="$t('message.gen_author')" prop="author">
              <el-input v-model="form.author" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">{{$t('message.gen_author_info')}}</span>
            </el-form-item>
             <el-form-item :label="$t('message.gen_api')" prop="apiAlias">
              <el-input v-model="form.apiAlias" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">{{$t('message.gen_api_info')}}</span>
            </el-form-item>
            <el-form-item :label="$t('message.gen_pack')" prop="pack">
              <el-input v-model="form.pack" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">{{$t('message.gen_pack_info')}}</span>
            </el-form-item>
            <el-form-item :label="$t('message.gen_prefix')" prop="prefix">
              <el-input v-model="form.prefix"  style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">{{$t('message.gen_prefix_info')}}</span>
            </el-form-item>
            <!-- <el-form-item label="是否覆盖" prop="cover">
              <el-radio-group v-model="form.cover" size="mini" style="width: 40%">
                <el-radio-button label="true">是</el-radio-button>
                <el-radio-button label="false">否</el-radio-button>
              </el-radio-group>
              <span style="color: #C0C0C0;margin-left: 10px;">谨防误操作，请慎重选择</span>
            </el-form-item> -->
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="$t('message.btn_preview')" :visible.sync="previewDialogVisible" width="90%" destroy-on-close class="gen-preview-dialog">
      <GenPreview ref="previewDialog" :data="previewData" :activeName="previewData.length > 0 ? previewData[0].name : ''"/>
      <template #footer>
        <el-button @click="previewDialogVisible=false" >{{ $t('el.messagebox.cancel') }}</el-button>
      </template>
	</el-dialog>

  </div>
</template>

<script>
// 不需要在表单得固定字段列表
const fixclounms = ["org_id", "crop_id", "del_flag", "create_by", "create_time", "update_by", "update_time"];
import db from '@/db.js'
import generator from '@/generator.js'
import GenPreview from './GenPreview.vue'
const { app } = require('electron');
const path = require('path');
const fs = require('fs');
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
// let frontIndexTemplate = require('../templates/front/index.art');
// let frontSaveTemplate = require('../templates/front/save.art');
// let adminDomainTemplate = require('../templates/admin/domain.art');
// let adminDtoTemplate = require('../templates/admin/pageDTO.art');
// let adminMapperTemplate = require('../templates/admin/mapper.art');
// let adminMapperXmlTemplate = require('../templates/admin/mapperXml.art');
// let adminServiceTemplate = require('../templates/admin/service.art');
// let adminServiceImpTemplate = require('../templates/admin/serviceImp.art');
// let adminControllerTemplate = require('../templates/admin/controller.art');
import template from 'art-template/lib/template-web.js'
export default {
  name: 'GeneratorConfig',
  components: {GenPreview},
  props: ['client','database','tableName'],
  data() {
    return {
      fixclounms: fixclounms,
      activeName: 'first', tableHeight: 550, loading: false, columnLoading: false, configLoading: false, dicts: [], syncLoading: false, genLoading: false,previewDialogVisible: false,
      data: [],
      form: { tableName: '', author: '', pack: '', path: '', moduleName: '', cover: 'false', apiPath: '', prefix: '', apiAlias: null, orgFlag: true, cropFlag: true, adSearch: true },
      previewData: [],
      codeTemplateList: generator.getTemplateList()
    }
  },
  computed: {
    rules() {
       const rules = {
        orgFlag: [
           { required: true, message: this.$t('message.gen_placeholder'), trigger: 'blur' }
        ],
        cropFlag: [
           { required: true, message: this.$t('message.gen_placeholder'), trigger: 'blur' }
        ],
        author: [
          { required: true, message: this.$t('message.gen_author_info2'), trigger: 'blur' }
        ],
        pack: [
          { required: true, message: this.$t('message.gen_pack_info2'), trigger: 'blur' }
        ],
        // moduleName: [
        //   { required: true, message: '包路径不能为空', trigger: 'blur' }
        // ],
        // path: [
        //   { required: true, message: this.$t('message.gen_pack_info2'), trigger: 'blur' }
        // ],
        apiAlias: [
          { required: true, message: this.$t('message.gen_api_info2'), trigger: 'blur' }
        ],
        // cover: [
        //   { required: true, message: '不能为空', trigger: 'blur' }
        // ]
      };
      return rules
    }
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 300
    this.$nextTick(() => {
      if(this.tableName) {
          this.getColumns();
          this.getConfig();
      }
    })

    // console.log(template)
    // var render = require('../templates/test.art');
    // console.log('html', render({
    //   column:[],
    //   base: {
    //     rowKey: 'xx'
    //   }
    // }))
  },
  watch: {
    tableName(tableName) {
      this.getColumns();
      this.getConfig();
    }
  },
  methods: {
   async getColumns() {
      this.loading = true
      const database =  await this.$indexDB.open("masterDB")
      let result = await database.get('code_column_config', this.client.connectionName + "_" + this.tableName)
      if(!result || result.columns.length == 0) {
        let columns = await this.queryTableColumns()
        result = columns
        await database.add("code_column_config", {columns, columnId: this.client.connectionName + "_" + this.tableName})
      }
      this.data = result.columns
      this.loading = false
      database.close();
      return result.columns
    },
    async queryTableColumns() {
      let con = Object.assign({}, this.client);
      let clist = await db.queryTableColumnList(con, this.database, this.tableName)
      let columns = []
      for(let i in clist) {
        columns.push({
          tableName: this.tableName,
          columnName: clist[i].columnName,
          columnType: clist[i].dataType,
          keyType: clist[i].columnKey,
          extra: clist[i].extra,
          notNull: clist[i].isNullable == 'NO' ? true : false,
          remark: clist[i].columnComment,
          listShow: true,
          formShow: fixclounms.indexOf(clist[i].columnName) == -1
        })
      }
      return columns
    },
    // 同步字段
    async syncColumn() {
      this.syncLoading = true
      let columnInfos = await this.getColumns()
      let columnInfoList = await this.queryTableColumns()
      // 第一种情况，数据库类字段改变或者新增字段
      for(let i in columnInfoList) {
        // 根据字段名称查找
        let b = false;
        for(let j in columnInfos) {
            // 如果能找到，就修改
            if(columnInfos[j].columnName == columnInfoList[i].columnName) {
              columnInfos[j].extra = columnInfoList[i].extra
              columnInfos[j].keyType = columnInfoList[i].keyType
              if (!(columnInfos[j].remark)) {
                  columnInfos[j].remark = columnInfoList[i].remark
              }
              b = true
              break;
            }
        }
        if (!b) {
           // 如果找不到，则保存新字段信息
           columnInfos.push({
            tableName: this.tableName,
            columnName: columnInfoList[i].columnName,
            columnType: columnInfoList[i].dataType,
            keyType: columnInfoList[i].columnKey,
            extra: columnInfoList[i].extra,
            notNull: columnInfoList[i].isNullable == 'NO' ? true : false,
            remark: columnInfoList[i].columnComment,
            listShow: true,
            formShow: true
          })
        } 
      }
      // 第二种情况，数据库字段删除了
      for(var i = 0; i < columnInfos.length; i++) {
        let b = false;
        for(let j in columnInfoList) {
          if(columnInfos[i].columnName == columnInfoList[j].columnName) {
            b = true;
            break;
          }
        }
        // 如果找不到，就代表字段被删除了，则需要删除该字段
        if (!b) {
          columnInfos.splic(i, 1);
          i--;
        }
      }
      this.syncLoading = false
      this.$message.success('同步成功')
    },
    async saveColumnConfig() {
      this.columnLoading = true
      const database =  await this.$indexDB.open("masterDB")
      await database.put("code_column_config", {columns: this.data, columnId: this.client.connectionName + "_" + this.tableName})
      database.close();
      this.columnLoading = false
      this.$message.success('保存成功')
    },
    async getConfig() {
      const database =  await this.$indexDB.open("masterDB")
      let result = await database.get('code_gen_config', this.client.connectionName + "_" + this.tableName)
      if(result && result.config) {
        this.form = result.config
      }else {
        this.form = {}
      }
      return this.form
    }, 
    doSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.configLoading = true
          const database =  await this.$indexDB.open("masterDB")
            let data = Object.assign({}, this.form)
            data.tableName = this.tableName
            await database.put("code_gen_config", {config: data, configId: this.client.connectionName + "_" + this.tableName})
            database.close();
            this.configLoading = false
            this.$message.success('保存成功')
        }
      })
    },
    previewHandler(templateData) {
      this.previewDialogVisible = true
      let data = generator.getGenData(this.data, this.form);
      console.log(data)
      // this.previewData = [
      //   {
      //     name: 'index.vue',
      //     content: this.replaceBlank(frontIndexTemplate(data)),
      //     language: 'javascript'
      //   },
      //   {
      //     name: 'save.vue',
      //     content: this.replaceBlank(frontSaveTemplate(data)),
      //     language: 'javascript'
      //   },
      //   {
      //     name: 'domain.java',
      //     content: this.replaceBlank(adminDomainTemplate(data)),
      //     language: 'java'
      //   },
      //   {
      //     name: 'pageReqDTO.java',
      //     content: this.replaceBlank(adminDtoTemplate(data)),
      //     language: 'java'
      //   },
      //   {
      //     name: 'mapper.java',
      //     content: this.replaceBlank(adminMapperTemplate(data)),
      //     language: 'java'
      //   },
      //   {
      //     name: 'mapperXml.xml',
      //     content: this.replaceBlank(adminMapperXmlTemplate(data)),
      //     language: 'xml'
      //   },
      //   {
      //     name: 'service.java',
      //     content: this.replaceBlank(adminServiceTemplate(data)),
      //     language: 'java'
      //   },
      //   {
      //     name: 'serviceImp.java',
      //     content: this.replaceBlank(adminServiceImpTemplate(data)),
      //     language: 'java'
      //   },
      //   {
      //     name: 'controller.java',
      //     content: this.replaceBlank(adminControllerTemplate(data)),
      //     language: 'java'
      //   }
      // ];
      let codeTemplateList = templateData.codeTemplateList;
      this.previewData = [];
      codeTemplateList.map(item=> {
        this.previewData.push({
          name: item.codeTemplateName,
          content: this.replaceBlank(template.render(item.content, data)),
          language: item.fileType
        })
      })
    },
    async toGen(templateData) {
      this.genLoading = true
      let codeTemplateList = templateData.codeTemplateList;
      const zip = new JSZip();
      let data = generator.getGenData(this.data, this.form);
      codeTemplateList.map(item=> {
         zip.file(item.codeTemplateName, this.replaceBlank(template.render(item.content, data)));
      })
      await zip.generateAsync({ type: 'blob' }).then(content => {
        // 生成二进制流
        saveAs(content, this.tableName + "_" +templateData.templateName + '.zip'); // 利用file-saver保存文件  自定义文件名
      });
      this.genLoading = false
    },
    customTemplate() {
        this.$bus.$emit('clicTemplate', this.client);
    },
    replaceBlank(content){
      return content.replace(/(\n[\s\t]*\r*\n)/g, '\n\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
    }
  }
}
</script>

<style scoped>
  .edit-input .el-input__inner {
    border: 1px solid #e5e6e7;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<style>
  .gen-preview-dialog .el-dialog__body {
    padding-top: 10px;
  }
</style>
