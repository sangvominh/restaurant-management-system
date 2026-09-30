<script setup>
import { useData } from 'vitepress';
const { frontmatter } = useData();
</script>
<template>
  <div class="doc-meta" aria-label="Thông tin tài liệu">
    <span>{{ frontmatter.id }}</span>
    <span>Đặc tả: {{ frontmatter.specStatus }}</span>
    <span>Code: {{ frontmatter.codeStatus }}</span>
    <span>Phụ trách: {{ frontmatter.owner }}</span>
    <span>Rà soát: {{ frontmatter.reviewed }}</span>
  </div>
</template>
