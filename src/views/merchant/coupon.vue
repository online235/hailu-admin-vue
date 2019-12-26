<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>到店卷列表</h2></div>
      <div>

        <el-select
          style="width:20%;min-width:150px;"
          ref="major" v-model="storeTotalType" filterable placeholder="选择经营行业">
          <el-option v-for="(major,index) in managementListData" :key="index" :label="major.managementName" :value="major.managementId" />
        </el-select>

        <el-input
          v-model="volumeName"
          placeholder="请输入卷名称"
          style="width:20%;min-width:150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="search()"
        >搜索</el-button>
        <el-button v-if="reset" @click="cancel()">重置</el-button>
      </div>
    </div>
    <el-table
      border
      :data="couponList"
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.dateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卷名称">
        <template slot-scope="scope">
          <span>{{ scope.row.volumeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到店卷面值(元)">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.bookValue }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="到店卷售价(元)">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.salesPrice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="文字介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.textIntroduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.toExamineDisplay
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.shelfStateDisplay
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)"
          >审核</el-button>

          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @onConfirm="deleteBtn(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="page"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

<!--  审核详细  -->
    <el-dialog
      title="详情审核"
      :visible.sync="checkModel"
      width="1000px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="couponDetail" label-width="200px">
        <el-form-item label="编号：">
          <div>{{ couponDetail.id }}</div>
        </el-form-item>
        <el-form-item label="商家编号：">
          <div>{{ couponDetail.numberId }}</div>
        </el-form-item>
        <el-form-item label="门店编号：">
          <div>{{ couponDetail.shopNumberId == '1' ? '全部门店' : couponDetail.shopNumberId }}</div>
        </el-form-item>
        <el-form-item label="商品总分类编号：">
          <div>{{ couponDetail.storeTotalType }}</div>
        </el-form-item>
        <el-form-item label="卷名称：">
          <div>{{ couponDetail.volumeName }}</div>
        </el-form-item>
        <el-form-item label="到店卷面值(元)：">
          <div>{{ couponDetail.bookValue }}</div>
        </el-form-item>
        <el-form-item label="到店卷售价(元)：">
          <div>{{ couponDetail.salesPrice }}</div>
        </el-form-item>

        <el-form-item label="到店卷有效期类型：">
          <div>{{ couponDetail.validPeriodType == 1 ? '相对时间' : '指定时间' }}</div>
        </el-form-item>
        <el-form-item v-if = "couponDetail.validPeriodType == 2" label="开始时间：">
          <div>{{ couponDetail.startTime }}</div>
        </el-form-item>
        <el-form-item v-if = "couponDetail.validPeriodType == 2" label="结束时间：">
          <div>{{ couponDetail.endTime }}</div>
        </el-form-item>
        <el-form-item v-if = "couponDetail.validPeriodType == 1" label="下单后有效时间（天）：">
          <div>{{ couponDetail.timeAfterOrder }} 天</div>
        </el-form-item>

        <el-form-item label="上架状态：">
          <div>{{ couponDetail.shelfStateDisplay }}</div>
        </el-form-item>
        <el-form-item label="文字介绍：">
          <div>{{ couponDetail.textIntroduction }}</div>
        </el-form-item>
        <el-form-item label="审核：">
          <div>{{ couponDetail.toExamineDisplay }}</div>
        </el-form-item>
        <el-form-item label="进店是否可用积累使用：">
          <div>{{ couponDetail.accumulationUse }}</div>
        </el-form-item>
        <el-form-item label="提前预约时间文本介绍：">
          <div>{{ couponDetail.appointmentIntroduction }}</div>
        </el-form-item>
        <el-form-item label="节假日不可用时间(节假日)：">
          <div>{{ couponDetail.holidayUnavailableTime }}</div>
        </el-form-item>
        <el-form-item label="审核通过立即上架：">
          <div>{{ couponDetail.immediatelyMounted == 1 ? '是' : '否' }}</div>
        </el-form-item>
        <el-form-item label="是否需要预约：">
          <div>{{ couponDetail.needAppointment == 1 ? '是' : '否' }}</div>
        </el-form-item>
        <el-form-item label="适用年龄：">
          <div>{{ couponDetail.preferentialConcession }}</div>
        </el-form-item>
        <el-form-item label="是否时间限制：">
          <div>{{ couponDetail.timeLimit == 1 ? '是' : '否' }}</div>
        </el-form-item>
        <el-form-item label="每周不可用时间：">
          <div>{{ couponDetail.UnavailableTimeDayDisplay }}</div>
        </el-form-item>
        <el-form-item label="到店卷是否全场通用：">
          <div>{{ couponDetail.universalField == 1 ? '是' : '否' }}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div>{{ couponDetail.dateTime }}</div>
        </el-form-item>

        <el-form-item :index="(index+'')" v-for="(item,index) in this.pictureDataList" :key="index" v-if = "item.pictureType == 1" label="主图">
          <div class="demo-image__preview" >
            <el-tooltip content="点击删除" placement="bottom" effect="light">
            <el-image
              style="width: 200px; height: 150px"
              :src="imgHead + item.picturePath "
              :preview-src-list="picturePathList"
              @click="openDel(item.couponId,item.id)"
            />
            </el-tooltip>
          </div>
        </el-form-item>

        <el-form-item :index="(index+'')" v-for="(item,index) in this.pictureDataList" :key="index"  v-if = "item.pictureType == 2" label="特色">
          <div class="demo-image__preview">
            <el-tooltip content="点击删除" placement="bottom" effect="light">
              <el-image
                        style="width: 200px; height: 150px"
                        :src="imgHead + item.picturePath "
                        :preview-src-list="picturePathList"
                        @click="openDel(item.couponId,item.id)"
              />
            </el-tooltip>
          </div>
        </el-form-item>

        <el-form-item label="审核状态：">
          <el-select v-model="region" placeholder="请选择审核状态">
            <el-option
              v-for="(item, index) in choose"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModel = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  couponDel,
  pictureDel,
  couponList,
  pictureList,
  CouponStateUpd,
  couponDetails,
  ManageList
} from '@/api/coupon'
import { module_basic_prefix } from '@/api/config'
    export default {
        data() {
          return {
            page: 1,                            // 第N页
            size : 10,                          // 第N页
            total : 0,                          // 总记录数
            totalPage: 0,                       // 总页数
            checkModel: false,                  // 审核模态框
            storeTotalType: '',                 // 经营类型总编号
            couponList: [],                     // 到店卷列表
            couponDetail: '',                   // 到店卷详情
            region: 0,                          // 审核(审核中-1,审核通过-2,审核不通过-3)
            imgHead: '',                        // 图片请求头
            reset: false,                          // 重置按钮

            srcList: [                          // 默认图片
              'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
            ],


            choose: [
              { id: 1, name: '审核中' },
              { id: 2, name: '审核通过' },
              { id: 3, name: '审核不通过' }
            ],

            // 卷字段
            id: '',                             // 编号
            endTime: '',                        // 结束时间
            suitAge: '',                        // 适用年龄
            dateTime: '',                       // 创建时间
            numberId: '',                       // 商家编号
            toExamine: 0,                       // 审核(审核中-1,审核通过-2,审核不通过-3)
            startTime: '',                      // 开始时间
            bookValue: '',                      // 到店卷面值(元)
            timeLimit: 0,                       // 是否时间限制（1-是、2-否）
            volumeName: '',                     // 卷名称
            salesPrice: '',                     // 到店卷售价(元)
            shelfState: 0,                      // 上架状态(未上架-1、已上架-2、已下架-3)
            shopNumberId: '',                   // 门店编号（1-为全部）
            timeAfterOrder: '',                 // 下单后有效时间（天）
            universalField: 0,                  // 到店卷是否全场通用(1-是、2-否)
            updateDateTime: '',                 // 更新时间
            validPeriodType: '',                // 到店卷有效期类型（1-相对时间、2-指定时间）
            accumulationUse: '',                // 进店是否可用积累使用
            needAppointment: 0,                 // 是否需要预约(1-是、2-否)
            textIntroduction: '',               // 文字介绍
            toExamineDisplay: '',               // 审核
            shelfStateDisplay: '',              // 上架状态
            unavailableTimeDay: '',             // 每周不可用时间(0.1.2.3.4.5.6-星期)
            immediatelyMounted: 0,              // 审核通过立即上架（1-是、2-否）
            holidayUnavailableTime: '',         // 节假日不可用时间(节假日)
            preferentialConcession: '',         // 可否与其它优惠同享
            appointmentIntroduction: '',        // 提前预约时间文本介绍
            UnavailableTimeDayDisplay: '',      // 每周不可用时间

            //卷图片字段
            pictureId: '',                      // 图片编号
            couponId: '',                       // 卷编号
            state: 0,                           // 状态(启用-1、禁用-0)
            picturePath: '',                    // 图片路径
            pictureType: 0,                     // 图片类型(主图-1、特色-2)
            stateDisPlay: '',                   // 状态
            pictureTypeDisPlay: '',             // 图片类型
            pictureDataList: [],                // 图片列表
            picturePathList: [],                // 路径数组


            managementId: '',                   // 经营编号
            managementName: '',                 // 经营名称
            managementListData: [],             // 经营行业
          }
        },
      created() {
        this.imgHead = module_basic_prefix;
        this.listData();  // 列表数据加载
        this.managementList() // 经营行业
      },

      methods: {
        isItEmpty(obj){
          if(typeof obj == 'undefined' || obj == null || obj == '' || obj == undefined){
            return true;
          }else{
            return false;
          }
        },

        handleCurrentChange(val) {
          // 分页
          this.page = val
          this.listData()
        },

        managementList() {
          ManageList({
            parentId: 0
          }).then(res => {
            if (res.code == 200) {
              this.managementListData = res.data
            }
          })
        },

        //卷列表
        listData() {
          const params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.size);
          if (!this.isItEmpty(this.storeTotalType)){
            params.append("storeTotalType", this.storeTotalType)
          }
          if (!this.isItEmpty(this.volumeName)){
            params.append("volumeName", this.volumeName)
          }
          couponList(params).then(res => {
            if (res.code == 200){
              this.couponList = res.data.datas;
              this.total = res.data.total;
              this.totalPage = res.data.totalPage;

            }
          })
        },

        // 重置
        cancel(){
          this.storeTotalType = null;
          this.volumeName = null;
          this.listData();
          this.reset = false;
        },

        // 搜索
        search(){
          this.reset = true;
          this.listData();
          this.page = 1;
        },

        //图片列表
        listPictureData(id) {
          const params = new URLSearchParams();
          params.append('couponId', id);
          pictureList(params).then(res => {
            if (res.code == 200) {
              this.pictureDataList = res.data;
              for (let i = 0; i < res.data.length; i++){
                this.picturePathList.push(this.imgHead + res.data[i].picturePath)
              }
            }
          })
        },

        //卷详细
        handleEdit(id) {
          // 审核按钮
          const params = new URLSearchParams();
          params.append('id', id);
          couponDetails(params).then(res => {
            if (res.code == 200) {
              this.couponDetail = res.data;
              this.checkModel = true;
              this.toExamine = res.data.toExamine;
              this.region = res.data.toExamine;
              this.id = res.data.id;
              this.listPictureData(id)
            }
          })
        },


        confirm() {
          // 详情审核确认按钮
          this.checkModel = false;
          if (this.toExamine != this.region){

          const params = new URLSearchParams();
          params.append('id', this.id)
          params.append('toExamine', this.region);
          CouponStateUpd(params).then(res => {
            if (res.code == 200) {
              this.listData();
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          })

          }
        },

        //删除图片
        deletePicture(couponId, pictureId) {
          // 删除
          pictureDel({
            id: pictureId,
            couponId: couponId
          }).then(res => {
            if (res.code == 200) {
              this.handleEdit(this.id);
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          })
        },

        //删除卷
        deleteBtn(index, row) {
          // 删除
          couponDel({
            id: row.id
          }).then(res => {
            if (res.code == 200) {
              this.listData();
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          })
        },

        openDel(couponId, pictureId) {
          this.$confirm('此操作将删除该该图片, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.deletePicture(couponId, pictureId);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

      }
    }
</script>

<style>

</style>
