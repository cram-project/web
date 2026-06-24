import { create } from 'zustand'

interface AuthState {
    token: string | null
    refreshToken: string | null
    username: string | null
    setAuth: (token: string, refreshToken: string) => void
    setUsername: (username: string) => void
    logout: () => void
    loadFromStorage: () => void
}

function readTokensFromStorage(): { token: string | null; refreshToken: string | null; username: string | null } {
    if (typeof window === 'undefined') return { token: null, refreshToken: null, username: null }
    return {
        token: localStorage.getItem('access_token'),
        refreshToken: localStorage.getItem('refresh_token'),
        username: localStorage.getItem('username'),
    }
}

export const useAuthStore = create<AuthState>((set) => ({
    ...readTokensFromStorage(),

    setAuth: (token, refreshToken) => {
        localStorage.setItem('access_token', token)
        localStorage.setItem('refresh_token', refreshToken)
        set({ token, refreshToken })
    },

    setUsername: (username) => {
        localStorage.setItem('username', username)
        set({ username })
    },

    logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('username')
        set({ token: null, refreshToken: null, username: null })
    },

    loadFromStorage: () => {
        set(readTokensFromStorage())
    },
}))
