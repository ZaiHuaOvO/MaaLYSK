<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'

const { theme } = useData()
const router = useRouter()

const visible = ref(false)
const step = ref<'choice' | 'beginner'>('choice')

const version = computed(() => {
  const meta: any = theme.value.latestReleaseMeta
  return meta?.version ?? 'v0.0.1'
})

function show() {
  step.value = 'choice'
  visible.value = true
}

function dismiss() {
  visible.value = false
}

function goNotBeginner() {
  visible.value = false
  router.go('/zh_cn/manual/1.1#下载方式')
}

function goSimple() {
  visible.value = false
  router.go('/zh_cn/manual/1.1')
}

function goDetailed() {
  visible.value = false
  router.go('/zh_cn/manual/1.3')
}

onMounted(() => {
  const handler = (e: Event) => {
    const target = e.target as Element
    const el = target.closest('a[href="#version-popup"]')
    if (!el) return
    e.preventDefault()
    e.stopImmediatePropagation()
    show()
  }
  document.addEventListener('click', handler, true)
  document.addEventListener('mousedown', handler, true)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="vp-overlay" @click.self="dismiss">
      <div class="vp-dialog">
        <button class="vp-close" @click="dismiss" title="关闭">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <template v-if="step === 'choice'">
          <div class="vp-body">
            <div class="vp-version-tag">{{ version }}</div>
            <p class="vp-subtitle">欢迎使用 MaaLYSK，请选择你的使用方式</p>
            <div class="vp-actions">
              <button class="vp-btn vp-btn-primary" @click="dismiss(); goNotBeginner()">
                <span class="vp-btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </span>
                <span class="vp-btn-text">
                  <span class="vp-btn-title">我不是新手</span>
                  <span class="vp-btn-desc">直接跳转下载</span>
                </span>
              </button>
              <button class="vp-btn vp-btn-outline" @click="step = 'beginner'">
                <span class="vp-btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </span>
                <span class="vp-btn-text">
                  <span class="vp-btn-title">我是新手</span>
                  <span class="vp-btn-desc">查看新手教程指引</span>
                </span>
              </button>
            </div>
          </div>
        </template>

        <template v-if="step === 'beginner'">
          <div class="vp-body">
            <p class="vp-subtitle">请选择适合你的教程</p>
            <div class="vp-actions">
              <button class="vp-btn vp-btn-primary" @click="dismiss(); goSimple()">
                <span class="vp-btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"/><rect x="6" y="4" width="14" height="16" rx="2"/></svg>
                </span>
                <span class="vp-btn-text">
                  <span class="vp-btn-title">简单版教程</span>
                  <span class="vp-btn-desc">阅读快速开始文档</span>
                </span>
              </button>
              <button class="vp-btn vp-btn-outline" @click="dismiss(); goDetailed()">
                <span class="vp-btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </span>
                <span class="vp-btn-text">
                  <span class="vp-btn-title">详细版教程</span>
                  <span class="vp-btn-desc">查看图文教程</span>
                </span>
              </button>
            </div>
            <button class="vp-back" @click="step = 'choice'">← 返回上一步</button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.vp-overlay {
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.vp-dialog {
  position: relative;
  width: 480px;
  max-width: calc(100vw - 32px);
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.vp-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
}

.vp-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.vp-body {
  padding: 32px 28px 28px;
  text-align: center;
}

.vp-version-tag {
  display: inline-block;
  padding: 4px 16px;
  margin-bottom: 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.vp-subtitle {
  margin: 0 0 24px;
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.vp-actions {
  display: flex;
  gap: 12px;
}

.vp-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.vp-btn-primary {
  background: var(--vp-c-brand-2);
  color: #fff;
  border-color: var(--vp-c-brand-2);
}

.vp-btn-primary:hover {
  background: var(--vp-c-brand-3);
  border-color: var(--vp-c-brand-3);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(106, 90, 205, 0.25);
}

.vp-btn-outline {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.vp-btn-outline:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.vp-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.vp-btn-outline .vp-btn-icon {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.vp-btn-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.vp-btn-title {
  font-size: 15px;
  font-weight: 600;
}

.vp-btn-desc {
  font-size: 12px;
  opacity: 0.75;
}

.vp-back {
  margin-top: 16px;
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
}

.vp-back:hover {
  color: var(--vp-c-brand-1);
}
</style>
