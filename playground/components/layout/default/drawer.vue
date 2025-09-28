<template lang="pug">
q-drawer.q-pb-md.q-pl-md(
  v-model="drawer"
  side="left" :mini="true" :breakpoint="0" :mini-width="72"
  :style="{background: $q.dark.isActive ? 'var(--q-dark-page) !important' : ''}"
  persistent
)
  q-card.full-height.bg-transparent(flat)
    .row.no-wrap.column.full-height
      q-card.bg-primary.full-height.overflow-y-auto.flex.column.q-custom-mini-scrollbar(flat style='flex-flow: column; overflow-x: hidden;')
        q-list(dark)
          q-item.rounded-borders(v-for="item in list" clickable v-ripple :to="item.to" :key="item.name" active-class="text-orange")
            q-item-section(avatar)
              q-icon(:name="item.icon || 'mdi-square-rounded'")
            q-tooltip.text-body2(anchor="center left" self="center right") {{ item.name }}
        q-space
        q-separator
        q-list(dark)
          q-item.rounded-borders(v-for="item in list2" clickable v-ripple :to="item.to" :key="item.name" active-class="text-orange")
            q-item-section(avatar)
              q-icon(:name="item.icon || 'mdi-square-rounded'")
            q-tooltip.text-body2(anchor="center left" self="center right") {{ item.name }}
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'

const drawer = inject('drawer')

const list = ref([
  {
    name: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/',
  },
])

const list2 = ref([
  {
    name: 'Settings',
    icon: 'mdi-cog',
    to: '/settings',
  },
])
</script>
