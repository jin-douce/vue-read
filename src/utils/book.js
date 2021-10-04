import { getReadTime } from './localStorage'
// 静态变量
export const THEME_LIST = [
  { name: 'default',
    bgc: '#fff',
    color: 'rgb(10, 10, 10)'
  },
  { name: 'gold',
    bgc: 'rgb(199, 189, 160)',
    color: 'rgb(85, 77, 52)'
  },
  { name: 'eye',
    bgc: '#a9c1a9',
    color: 'rgb(45, 87, 45)'
  },
  { 
    name: 'night',
    bgc: '#000000',
    color: 'rgb(144, 145, 144)'
  },
]
export const FONT_SIZE_LIST = [
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
  ]


export function getReadTimeByMinute(fileName){
  const readTime = getReadTime(fileName)
  if(!readTime){
    return 0
  }else{
    return Math.ceil(readTime/60)
  }
}

// 将树形结构的目录转化为一维数组
export function flatten(array){
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}