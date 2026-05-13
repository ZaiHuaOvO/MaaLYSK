<script setup lang="ts">
import { watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useData } from 'vitepress'

const { lang: currentLang, page } = useData()
let el: HTMLDivElement | null = null

function createEl() {
  if (el) return
  el = document.createElement('div')
  el.className = 'reading-time'
}

function tryUpdate(): boolean {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return false
  const h1 = doc.querySelector('h1')
  if (!h1) return false

  const text = doc.textContent || ''
  const charCount = text.replace(/\s/g, '').length
  if (charCount === 0) return false

  // 阅读速度：中文约300字/分钟
  const readingTime = Math.max(1, Math.ceil(charCount / 300))
  const label = currentLang.value === 'zh-CN'
    ? `约 ${charCount} 字，大约 ${readingTime} 分钟`
    : `~${charCount} words, about ${readingTime} min read`

  createEl()
  el!.innerHTML = `<i class="ri-book-open-line"></i><span>${label}</span>`

  // 防止 SPA 导航时重复插入
  const existing = document.querySelector('.vp-doc .reading-time')
  if (existing && existing !== el) {
    existing.replaceWith(el!)
  } else if (!el!.parentNode) {
    h1.after(el!)
  }
  return true
}

// 轮询等待 markdown 异步渲染完成（nextTick 可能不够，h1 尚未出现在 DOM 中）
function update() {
  if (tryUpdate()) return
  let retries = 0
  const timer = setInterval(() => {
    if (tryUpdate() || ++retries > 20) clearInterval(timer)
  }, 100)
}

onMounted(async () => {
  await nextTick()
  update()
})

// SPA 导航时页面路由变化，重新计算并插入
watch(() => page.value.relativePath, () => {
  if (el?.parentNode) {
    el.remove()
    el = null
  }
  nextTick().then(update)
})

onUnmounted(() => {
  el?.remove()
  el = null
})
</script>

<template>
  <div class="reading-time-host" style="display:none"></div>
</template>

<style>
.vp-doc .reading-time {
  display: flex;
  align-items: center;
  gap: 6px;
  /* 文字大小，图标大小见下方 .reading-time i */
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
  /* 与一级标题的间距 */
  margin-top: 24px;
  /* 分割线到文字的距离 */
  padding-bottom: 12px;
  /* 分割线到下方内容的间距 */
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* 消除 VitePress h2 自带的顶部边框，避免双分割线 */
.vp-doc .reading-time + h2 {
  border-top: none;
  padding-top: 0;
}

.vp-doc .reading-time i {
  font-size: 0.85rem;
}
</style>
