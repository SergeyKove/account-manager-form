<template>
  <q-form class="q-gutter-md" :model="formValue">
    <div class="col row">
      <q-input
        filled
        class="col q-mr-md"
        v-model="formValue.labels"
        placeholder="Значение"
        autogrow
        :maxlength="50"
        @blur="handleLabelsBlur"
      ></q-input>

      <q-select
        filled
        class="col"
        v-model="formValue.type"
        :options="typeOptions"
        @update:model-value="handleTypeChange"
      >
      </q-select>
    </div>

    <div class="col row">
      <q-input
        filled
        class="col"
        v-model="formValue.login"
        placeholder="Значение"
        :rules="[
          (val) => val.length > 0 || 'Поле не должно быть пустым',
          (val) => val.length < 100 || 'Макс. число символов 100',
        ]"
        @blur="handleBlur"
      ></q-input>

      <q-input
        v-if="formValue.type !== 'LDAP'"
        v-model="formValue.password"
        filled
        class="col q-ml-md"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) => val.length > 0 || 'Поле не должно быть пустым',
          (val) => val.length < 100 || 'Макс. число символов 100',
        ]"
        @blur="handleBlur"
      >
        <template #append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>

      <q-btn
        flat
        @click="handleRemoveAccount(props.account.id)"
        icon="delete"
        class="q-pb-md"
      ></q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Account } from '../types/account'
import { useAccountStore } from '../stores/accountStore'

const accountStore = useAccountStore()
const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'update', account: Account): void
}>()

const formValue = ref({
  labels: accountStore.stringifyLabels(props.account.labels),
  type: props.account.type,
  login: props.account.login,
  password: props.account.password,
})

const typeOptions = ['LDAP', 'Локальная']

const isPwd = ref(true)

const handleLabelsBlur = () => {
  const labels = accountStore.parseLabels(formValue.value.labels)
  emit('update', { ...props.account, labels })
}

const handleTypeChange = () => {
  const updates = {
    type: formValue.value.type,
    password: formValue.value.type === 'LDAP' ? null : formValue.value.password,
  }
  emit('update', { ...props.account, ...updates })
}

const handleBlur = () => {
  emit('update', {
    ...props.account,
    login: formValue.value.login,
    password: formValue.value.type === 'Локальная' ? formValue.value.password : null,
  })
}

const handleRemoveAccount = (id: number) => {
  accountStore.removeAccount(id)
}
</script>
