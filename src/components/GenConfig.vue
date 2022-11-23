<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">字段配置：{{ tableName }}</span>
            <el-button
              :loading="genLoading"
              icon="el-icon-s-promotion"
              size="mini"
              style="float: right; padding: 6px 9px;"
              type="success"
              @click="toGen"
            >保存&生成</el-button>
            <el-button
              :loading="columnLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px;margin-right: 9px"
              type="primary"
              @click="saveColumnConfig"
            >保存</el-button>
            <el-tooltip class="item" effect="dark" content="数据库中表字段变动时使用该功能" placement="top-start">
              <el-button
                :loading="syncLoading"
                icon="el-icon-refresh"
                size="mini"
                style="float: right; padding: 6px 9px;"
                type="info"
                @click="syncColumn"
              >同步</el-button>
            </el-tooltip>
          </div>
          <el-form size="small" label-width="90px">
            <el-table v-loading="loading" :data="data" :max-height="tableHeight" size="small" style="width: 100%;margin-bottom: 15px">
              <el-table-column prop="columnName" label="字段名称" />
              <el-table-column prop="columnType" label="字段类型" />
              <el-table-column prop="remark" label="字段描述">
                <template slot-scope="scope">
                  <el-input v-model="data[scope.$index].remark" size="mini" class="edit-input" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="必填" width="70px">
                <template slot-scope="scope">
                  <el-checkbox v-model="data[scope.$index].notNull" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="列表" width="70px">
                <template slot-scope="scope">
                  <el-checkbox v-model="data[scope.$index].listShow" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="表单" width="70px">
                <template slot-scope="scope">
                  <el-checkbox v-model="data[scope.$index].formShow" />
                </template>
              </el-table-column>
              <el-table-column label="表单类型">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].formType" filterable class="edit-input" clearable size="mini" placeholder="请选择">
                    <el-option
                      label="文本框"
                      value="Input"
                    />
                    <el-option
                      label="文本域"
                      value="Textarea"
                    />
                    <el-option
                      label="单选框"
                      value="Radio"
                    />
                    <el-option
                      label="下拉框"
                      value="Select"
                    />
                    <el-option
                      label="日期框"
                      value="Date"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="查询方式">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].queryType" filterable class="edit-input" clearable size="mini" placeholder="请选择">
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
              <el-table-column label="日期注解">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].dateAnnotation" filterable class="edit-input" clearable size="mini" placeholder="请选择">
                    <el-option
                      label="自动创建时间"
                      value="CreationTimestamp"
                    />
                    <el-option
                      label="自动更新时间"
                      value="UpdateTimestamp"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="关联字典">
                <template slot-scope="scope">
                  <el-select v-model="data[scope.$index].dictName" filterable class="edit-input" clearable size="mini" placeholder="请选择">
                    <el-option v-for="item in dicts" :key="item.id" :label="item.remark === '' ? item.name : item.remark" :value="item.name" />
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">生成配置</span>
            <el-button
              :loading="configLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="doSubmit"
            >保存</el-button>
          </div>
          <el-form ref="form" :model="form" :rules="rules" size="small" label-width="78px">
            <el-form-item label="作者名称" prop="author">
              <el-input v-model="form.author" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">类上面的作者名称</span>
            </el-form-item>
            <el-form-item label="模块名称" prop="moduleName">
              <el-input v-model="form.moduleName" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">模块的名称，请选择项目中已存在的模块</span>
            </el-form-item>
            <el-form-item label="至于包下" prop="pack">
              <el-input v-model="form.pack" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">项目包的名称，生成的代码放到哪个包里面</span>
            </el-form-item>
            <el-form-item label="接口名称" prop="apiAlias">
              <el-input v-model="form.apiAlias" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">接口的名称，用于控制器与接口文档中</span>
            </el-form-item>
            <el-form-item label="前端路径" prop="path">
              <el-input v-model="form.path" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">输入views文件夹下的目录，不存在即创建</span>
            </el-form-item>
            <!--            <el-form-item label="接口目录">-->
            <!--              <el-input v-model="form.apiPath" style="width: 40%" />-->
            <!--              <span style="color: #C0C0C0;margin-left: 10px;">Api存放路径[src/api]，为空则自动生成路径</span>-->
            <!--            </el-form-item>-->
            <el-form-item label="去表前缀" prop="prefix">
              <el-input v-model="form.prefix" placeholder="默认不去除表前缀" style="width: 40%" />
              <span style="color: #C0C0C0;margin-left: 10px;">默认不去除表前缀，可自定义</span>
            </el-form-item>
            <el-form-item label="是否覆盖" prop="cover">
              <el-radio-group v-model="form.cover" size="mini" style="width: 40%">
                <el-radio-button label="true">是</el-radio-button>
                <el-radio-button label="false">否</el-radio-button>
              </el-radio-group>
              <span style="color: #C0C0C0;margin-left: 10px;">谨防误操作，请慎重选择</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import db from '@/db.js'
export default {
  name: 'GeneratorConfig',
  components: {},
  props: ['client','database','tableName'],
  data() {
    return {
      activeName: 'first', tableHeight: 550, loading: false, columnLoading: false, configLoading: false, dicts: [], syncLoading: false, genLoading: false,
      data: [],
      form: { tableName: '', author: '', pack: '', path: '', moduleName: '', cover: 'false', apiPath: '', prefix: '', apiAlias: null },
      rules: {
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        pack: [
          { required: true, message: '包路径不能为空', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '包路径不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '前端路径不能为空', trigger: 'blur' }
        ],
        apiAlias: [
          { required: true, message: '接口名称不能为空', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
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
          formShow: true
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
    toGen() {
      this.genLoading = true
   
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
