import { create } from 'zustand'
import { User } from '~/model/types'

const initial: User = {
  id: undefined,
  username: "",
  email: "",
}

type UserStore = {
    user: User
    setUser: (user: User) => void
  }

export const userStore = create<UserStore>()((set) => ({
  user: initial,
  setUser: (user) => set({user}),
}))
