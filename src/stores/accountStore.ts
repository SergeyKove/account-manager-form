import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account, Label } from '../types/account'

const storageKey = 'accounts'

export const useAccountStore = defineStore('accountStore', () => {
  const accounts = ref<Account[]>(loadAccounts())

  function loadAccounts(): Account[] {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : []
  }

  function saveAccounts() {
    localStorage.setItem(storageKey, JSON.stringify(accounts.value))
  }

  const addAccount = () => {
    const newAccount: Account = {
      id: Math.random() * 10,
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
    saveAccounts()
  }

  const removeAccount = (id: number) => {
    const index = accounts.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      saveAccounts()
    }
  }

  const updateAccount = (id: number, updates: Partial<Account>) => {
    const account = accounts.value.find((acc) => acc.id === id)
    if (account) {
      Object.assign(account, updates)
      saveAccounts()
    }
  }

  const parseLabels = (labelsString: string): Label[] => {
    if (!labelsString) return []
    return labelsString
      .split(';')
      .map((label) => label.trim())
      .filter((label) => label)
      .map((label) => ({ text: label }))
  }

  const stringifyLabels = (labels: Label[]): string => {
    return labels.map((label) => label.text).join(';')
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    parseLabels,
    stringifyLabels,
  }
})
