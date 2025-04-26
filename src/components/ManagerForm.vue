<template>
  <div class="flex column">
    <div class="flex justify-start">
      <h5>Учетные записи</h5>
      <q-btn @click="handleAddAccount" class="q-ml-md"> + </q-btn>
    </div>

    <div v-if="accounts.length !== 0" class="q-mt-md">
      <div
        class="q-my-sm q-pa-sm"
        style="background-color: rgb(231, 231, 231); border-radius: 10px"
      >
        <q-icon name="warning" size="30px" color="grey"></q-icon>
        <span>
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </span>
      </div>

      <AccountItemTitle />
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update="handleUpdateAccount"
        class="flex justify-beetwen"
      />
    </div>

    <div v-else>
      <h6>Учетные записи не добавлены.</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountItem from './AccountItem.vue'
import AccountItemTitle from './AccountItemTitle.vue'
import { useAccountStore } from '@/stores/accountStore'
import type { Account } from '@/types/account'

const accountStore = useAccountStore()
const accounts = accountStore.accounts

const handleAddAccount = () => {
  accountStore.addAccount()
}

const handleUpdateAccount = (account: Account) => {
  accountStore.updateAccount(account.id, account)
}
</script>
