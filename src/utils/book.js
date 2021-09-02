import { getReadTime } from './localStorage'

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

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]



// 动态添加css文件，改变全局主题
export function addCss(href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss(href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
      link.parentNode.removeChild(link)
    }
  }
}

export function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}

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