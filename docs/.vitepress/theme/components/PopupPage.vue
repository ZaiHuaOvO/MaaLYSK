<script lang="ts" setup>
function close() {
  window.history.back()
}
</script>

<template>
  <div class="p-popup-overlay">
    <div class="p-popup-card">
      <button class="p-popup-close" @click="close" title="关闭">✕</button>
      <div class="p-popup-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
}

.p-popup-card {
  position: relative;
  width: 680px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 32px 36px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
}

.p-popup-close {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.p-popup-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.p-popup-body {
  font-size: 14px;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}

.p-popup-body :deep(h2) { font-size: 18px; font-weight: 600; margin: 16px 0 8px; }
.p-popup-body :deep(h3) { font-size: 16px; font-weight: 600; margin: 14px 0 6px; }
.p-popup-body :deep(p) { margin: 0 0 10px; }
.p-popup-body :deep(ul) { padding-left: 20px; margin: 8px 0; }
.p-popup-body :deep(li) { list-style: disc; margin: 4px 0; }
.p-popup-body :deep(a) { color: var(--vp-c-brand-1); font-weight: 500; }
.p-popup-body :deep(strong) { font-weight: 600; }
</style>
