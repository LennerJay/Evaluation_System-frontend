<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-50"
  >
    <div
      class="relative p-5 bg-white md:max-w-lg max-w-sm mx-auto md:mt-20 md:min-h-[28rem] border-4 border-sky-950 rounded-xl overflow-y-auto"
    >
      <div class="flex flex-col w-full text-lg mt-32">
        <table class="border border-black w-full">
          <thead class="bg-sky-900 text-white text-center">
            <th>ID Number</th>
            <th>Department</th>
            <th>Year & Section</th>
          </thead>
          <tbody class="text-center">
            <tr>
              <td class="border-r border-black flex flex-col border-b border-black" v-for="idNumber in idNumbers">{{ idNumber }}</td>
              <td class="uppercase border-r border-black">{{ department.name }}</td>
              <td>{{ sectionYear.year_section }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    <div>
    </div>
      <div class="flex justify-end mt-40 items-center gap-5">
        <button
          @click="emits('closePreview')"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          @click="handleSave"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save 
        </button>
      </div>
      <Transition name="fade" v-if="showActionModal">
        <ActionModal data="Saved" @closeAction="showActionModal = false" />
      </Transition>
      <Transition name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" data="Saving" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useUserStore } from "../stores/users";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const store = useUserStore()

const showActionModal = ref(false);
const showActionSpinner = ref(false);

const props = defineProps([
    'department',
    'sectionYear',
    'idNumbers',
    'role_id'
])

const emits = defineEmits([
    'closePreview','success'
])

const handleSave = async()=>{
    const data = {
        department_id: props.department.id,
        s_y_id:props.sectionYear.id,
        role_id:props.role_id,
        ids:props.idNumbers
    }
    showActionSpinner.value = true
    await store.saveUsers(data)
    showActionSpinner.value = false
    if(store.isSuccess){
        showActionModal.value = true
        setTimeout(()=>{
            showActionModal.value = false
            emits('success')
        },2000)
    }else{
        alert('Something went wrong')
    }
}


</script>

<style lang="scss" scoped></style>
