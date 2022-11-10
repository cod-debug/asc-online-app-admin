<template>
  <q-expansion-item :default-opened="true" v-if="hasChild">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="groups" />
      </q-item-section>

      <q-item-section>{{ title }}</q-item-section>
    </template>
    <q-card>
      <q-card-section class="q-pa-none">
        <q-item
          clickable
          tag="a"
          target="_blank"
          v-for="item in childItem"
          :key="item.title"
          v-bind="item"
          :href="item.link"
        >
          <q-item-section v-if="item.icon" avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>{{ caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <q-item v-if="!hasChild" clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    hasChilid: {
      type: Boolean,
      default: false,
    },
    childItem: {
      type: Array,
      default: null,
    },
  },
});
</script>
