<template>
  <div class="vm-select d-flex align-items-center">
    <div v-if="icon" class="vm-select-icon">
      <img :src="icon" alt="selector icon" class="position-relative" />
    </div>
    <div  class="vm-select-container position-relative"
          :tabindex="tabindex"
          @blur="open = false">
      <div  class="vm-select-container_selected text-capitalize"
            :class="{ 'vm-select-container_selected--open': open }"
            @click="open = !open">
        {{ selected ? selected : defaultOption }}
      </div>
      <div   class="vm-select-container_items position-absolute"
            :class="{ 'd-none': !open }">
        <div  v-for="(option, i) of options"
              :key="i"
              class="vm-select-container_items_option text-capitalize"
              @click="selectOption(option)">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      required: false,
    },
    defaultOption: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    icon: String
  },
  setup(props, { emit }){
    let selected = ref(null);
    let open = ref(false);

    const selectOption = (e) => {
      selected.value = e;
      open.value = false;
      emit('select', selected.value);
    }

    return { selectOption, selected, open }
  }
};
</script>

<style  scoped>

.vm-select-container {
  min-width: 130px;
  outline: none;
  height: 32px;
  line-height: 32px;
  text-align: left;
}

.vm-select-container_selected {
  background-color: #0a0a0a;
  border-radius: 4px;
  color: #fff;
  padding-left: 16px;
  cursor: pointer;
  user-select: none;
}

.vm-select-container_selected::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-image: url('./../assets/select-arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.vm-select-container_selected.select-container_selected--open {
  border-radius: 4px 4px 0px 0px;
}

.vm-select-container_selected.select-container_selected--open::after { 
  transform: translateY(-50%) rotate(180deg); 
}

.vm-select-container_items {
  color: #fff;
  border-radius: 0px 0px 4px 4px;
  overflow: hidden;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
}

.vm-select-container_items div {
  color: #808080;
  border-top: 1px solid #3e3d3d;
  padding-left: 16px;
  cursor: pointer;
  user-select: none;
}

.vm-select-container_items div:hover { color: #fff; }

.vm-select-icon {
  height: 32px;
  width: 32px;
  margin-right: 4px;
}
</style>
