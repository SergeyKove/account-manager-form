export interface Account {
  id: number
  labels: Label[]
  type: string
  login: string
  password: string | null
}

export interface Label {
  text: string
}
