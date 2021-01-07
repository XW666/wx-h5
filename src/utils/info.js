/**
 * //行业规模
 */
const clientCapacityType = [
  {
    value: 'SBS',
    text: '1-99'
  },
  {
    value: 'MA1',
    text: '100-299'
  },
  {
    value: 'MA2',
    text: '300-599'
  },
  {
    value: 'NA1',
    text: '600-999'
  },
  {
    value: 'NA2',
    text: '1000及以上'
  }
]

/**
 * 所属行业
 */
const clientIndustry = [
  {
    value: 'T',
    text: '互联网、IT、电子、通信'
  },

  {
    value: 'J',
    text: '金融业'
  },
  {
    value: 'K',
    text: '房地产业'
  },
  {
    value: 'C',
    text: '制造业'
  },

  {
    value: 'E',
    text: '建筑业'
  },
  {
    value: 'A',
    text: '农、林、牧、渔业'
  },
  {
    value: 'F',
    text: '交通运输、仓储和邮政业'
  },

  {
    value: 'H',
    text: '批发、零售、贸易'
  },
  {
    value: 'z',
    text: '专业服务'
  },
  {
    value: 'N',
    text: '能源、环保、矿产'
  },
  {
    value: 'P',
    text: '教育培训/科研'
  },
  {
    value: 'Q',
    text: '卫生和社会工作'
  },
  {
    value: 'R',
    text: '文化、体育和娱乐业'
  },
  {
    value: 'S',
    text: '公共管理、社会保障和社会组织'
  },

  {
    value: 'F',
    text: '生活服务'
  },


]
//测试
// const APPID = "wxd55cf04e0cdfb1a3"; //公众号的appid
const APPID = "wx6b8c4b29977b411a"; //公众号的appid
// const appSerect = "8defabdce9aa8df9d1cad4a64261e3d4";
//乾新通
// const APPID = "wxf902a13079ec7274"; //公众号的appid
// const appSerect = "f9df5c30a9823db1d0cf37fbd9bcdd7b";

export default {
  clientCapacityType,
  clientIndustry,
  APPID,
  // appSerect
}