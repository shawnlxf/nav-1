const $siteList = $('.website-list')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const $iconMode = $('.icon-mode')
const originHashMap = [
    { url: 'https://news.qq.com/', text: '腾讯新闻' },
    { url: 'https://zhihu.com/', text: '知乎' }
]
const hashMap = xObject || originHashMap
const $reset = $('.reset')

$iconMode.on('click', () => {
    if ($iconMode.text() === '文字') {
        $iconMode.text("favicon")
    } else {
        $iconMode.text("文字")
    }
    applyHashMap()
})

// 防止在重置之前保存 hashMap
let store = true

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
}

function setIcon($li, node) {
    if ($iconMode.text() === '文字') {
        const img = $li[0].querySelector('img')
        img.setAttribute('src', '')
        const icon = $li[0].querySelector('.icon-text')
        const text = $li[0].querySelector('.site-text')
        if (!text.innerText) {
            icon.innerText = "?"
            text.innerText = "undefined"
        } else {
            icon.innerText = text.innerText[0]
        }
    } else {
        const icon = $li[0].querySelector('.icon-text')
        icon.innerText = ''
        const text = $li[0].querySelector('.site-text')
        if (!text.innerText) {
            text.innerText = "undefined"
        }
        const img = $li[0].querySelector('img')
        const faviconUrl = node.url.replace('//', '//' + 'favicon.link/')
        img.setAttribute('src', faviconUrl)
    }
}

const applyHashMap = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="site-icon">
                        <img src=""></img>
                        <div class="icon-text"></div>
                    </div>
                    <div class="site-text">${node.text}</div>
                    <div class="close">
                        <svg class="icon-close" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            applyHashMap()
        })
        setIcon($li, node)
    })
}


$('.reset').on('click', () => {
    const string = JSON.stringify(originHashMap)
    localStorage.setItem('x', string)
    store = false
    location.reload()
})

$('.add-button')
    .on('click', () => {
        let url = window.prompt('请输入网址', 'https://')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        let text = window.prompt('请输入网址名称')
        if (!text) {
            text = simplifyUrl(url)
        }
        hashMap.push({
            url: url,
            text: text
        })
        applyHashMap()
    })

window.onbeforeunload = () => {
    if (!store) {
        store = !store
        return
    }
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

window.onload = () => {
    applyHashMap()
}

$(document).on('keypress', (e)=>{
    // const key = e.key 简写
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        // console.log(hashMap[i].text[0])
        if (!hashMap[i].text) {
            continue
        }
        if (hashMap[i].text[0].toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})