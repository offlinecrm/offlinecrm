<template>
  <q-page>
    <div class="row">
      <q-file borderless v-model="fileRef" label="JSON" @input="onSelected">
        <template v-slot:prepend>
          <q-icon name="cloud_download" /> </template
      ></q-file>
    </div>
    <div class="row">
      <q-table :columns="colums" :data="result"></q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import {createComponent, reactive, ref, toRefs} from '@vue/composition-api';
// (optional) you can format the data with a function
const formatter = (val: any, row: any) => {
  if (Array.isArray(val)) {
    return val.length;
  }
  return `${val}`;
};

const columnConfig = function(item: any) {
  const fieldName = Object.keys(item);
  console.log('fieldName', fieldName);
  return fieldName.reduce((acc, name) => {
    const column = {
      name: name,
      label: name,
      field: name,
      format: formatter,
    };
    console.log('column', column);
    acc.push(column);
    return [...acc];
  }, []);
};

export default createComponent({
  setup(props, context) {
    const fileRef = ref(undefined);
    const data = reactive({
      result: [
        {
          field: '',
        },
      ],
    });
    const tableConfig = reactive({
      colums: [],
    });

    const onSelected = (files: File) => {
      console.log('itim', files);
      const file = files;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = theFile => {
        const jsonData = JSON.parse(reader.result as string);
        console.log('load', jsonData, theFile);
        data.result = jsonData.map((item: any) => {
          const i = item.document.receipt;
          delete i.rawData;
          return i;
        });
        tableConfig.colums = columnConfig(data.result[0]);
      };
    };
    return {
      fileRef,
      onSelected,
      ...toRefs(data),
      ...toRefs(tableConfig),
    };
  },
});
</script>
