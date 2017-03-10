<template>
  <div class="">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">运营平台</el-breadcrumb-item>
      <el-breadcrumb-item>款式</el-breadcrumb-item>
      <el-breadcrumb-item>新增款式</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="style-ruleForm">
      <div class="breadcrumb-title">款式信息</div>
      <el-form-item label="款式名称:" prop="name">
        <el-col :span="11">
          <el-input  v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="款式类目:" prop="category">
        <el-col :span="11">
        <el-cascader
          placeholder="试试搜索：衣服"
          :options="category"
          v-model="ruleForm.category"
          filterable
        ></el-cascader>
        </el-col>
      </el-form-item>
      <el-form-item label="计量单位:" prop="unit">
        <el-select v-model="ruleForm.unit" placeholder="请选择">
          <el-option
            v-for="item in units"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签:">
        <el-checkbox-group v-model="ruleForm.tag">
          <el-checkbox label="爆款" name="tag"></el-checkbox>
          <el-checkbox label="新款" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊工艺:" prop="craft">
        <el-radio-group v-model="ruleForm.craft">
          <el-radio label="无"></el-radio>
          <el-radio label="绣花"></el-radio>
          <el-radio label="印花"></el-radio>
          <el-radio label="钉珠"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="税点" prop="tax">
        <el-radio-group v-model="ruleForm.tax">
          <el-radio label="None">不含</el-radio>
          <el-radio label="Common3">普3%</el-radio>
          <el-radio label="Common17">普17%</el-radio>
          <el-radio label="Special3">专3%</el-radio>
          <el-radio label="Special17">专17%</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商城显示:" prop="mallShow">
        <el-switch
          v-model="ruleForm.mallShow"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="样衣:" prop="haveSample">
        <el-switch
          v-model="ruleForm.haveSample"
          on-text="有"
          off-text="无">
        </el-switch>
      </el-form-item>
      <el-form-item label="正方形图片:" prop="squarefile">
        <el-col style="position:relative;border:1px solid #ddd;border-radius:5px;padding:20px;min-height:240px;" :span="20">
          <el-upload
            class="squarefile"
            :file-list="ruleForm.squarefile"
            action="//jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="text-right" style="position: absolute;bottom: 0;right: 10px;color:red;">
            建议尺寸>=800*800,单张大小不超过2M，最多可上传10张图片。支持jpg,png,gif格式图片
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="长方形图片:" prop="rectanglefile">
        <el-col style="position:relative;border:1px solid #ddd;border-radius:5px;padding:20px;min-height:240px;" :span="20">
          <el-upload
            class="rectanglefile"
            :file-list="ruleForm.rectanglefile"
            action="//jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="text-right" style="position: absolute;bottom: 0;right: 10px;color:red;">
            建议尺寸>=800*1200,单张大小不超过2M，最多可上传10张图片。支持jpg,png,gif格式图片
          </div>
        </el-col>
      </el-form-item>
      <div class="breadcrumb-title">属性</div>
      <el-form-item label="属性1:">
        <el-checkbox-group v-model="ruleForm.tag">
          <el-checkbox label="爆款" name="tag"></el-checkbox>
          <el-checkbox label="新款" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="breadcrumb-title">规格/售价</div>
      <el-form-item label="颜色:">
        <el-checkbox-group v-model="ruleForm.tag">
          <el-checkbox label="爆款" name="tag"></el-checkbox>
          <el-checkbox label="新款" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="尺码:">
        <el-checkbox-group v-model="ruleForm.tag">
          <el-checkbox label="爆款" name="tag"></el-checkbox>
          <el-checkbox label="新款" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="规格:">
        <el-col :span="23">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="color"
              label="颜色">
            </el-table-column>
            <el-table-column
              prop="size"
              label="尺码">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item label="价格区间:">
        <el-col :span="23">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              label="起订量">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.minBuyCount" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="商品单价（元）">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.minBuyCount" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="成本（元）">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.minBuyCount" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="货期（天）">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.minBuyCount" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="毛利率（天）">
              <template scope="scope">
                <el-input size="small" v-model="scope.row.minBuyCount" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item label="单价截止日期" prop="deadline">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.deadline" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<style lang="less">
  .squarefile{
    .el-upload-list__item,
    .el-upload{
      width: 80px;
      height: 80px;
      line-height: 78px;
    }
  }
  .rectanglefile{
    .el-upload-list__item,
    .el-upload{
      width: 80px;
      height: 120px;
      line-height: 118px;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        tableData: [{
          color: '红色',
          size: 'X'
        }, {
          color: '蓝色',
          size: 'X'
        }, {
          color: '白色',
          size: 'X'
        }, {
          color: '黑色',
          size: 'X'
        }],
        dialogImageUrl: '',
        dialogVisible: false,
        units: [{
          value: '1',
          label: '件'
        }, {
          value: '2',
          label: '套'
        }],
        category: [{
          value: 'zhinan',
          label: '男装',
          children: [{
            value: 'waitao',
            label: '外套',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }]
        }],
        ruleForm: {
          name: '',
          category: [],
          unit: '',
          tag: [],
          craft: '无',
          tax: 'None',
          mallShow: true,
          haveSample: false,
          squarefile: [],
          rectanglefile: [],
          delivery: false,
          deadline: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          category: [
            { type: 'array', required: true, message: '请选择类目', trigger: 'change' }
          ],
          unit: [
            { required: true, message: '请选择计量单位', trigger: 'change' }
          ],
          craft: [
            { required: true, message: '请选择特殊工艺', trigger: 'change' }
          ],
          tax: [
            { required: true, message: '请选择税点', trigger: 'change' }
          ],
          mallShow: [
            { required: true, message: '请选择商城显示', trigger: 'change' }
          ],
          haveSample: [
            { required: true, message: '请选择样衣', trigger: 'change' }
          ],
          squarefile: [
            { type: 'array', required: true, message: '请上传正方形图片', trigger: 'change' }
          ],
          rectanglefile: [
            { type: 'array', required: true, message: '请上传正方形图片', trigger: 'change' }
          ],
          deadline: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]

        }
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
