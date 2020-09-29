export type AuthRequest = {
    email: string
    password: string
}

export type AuthResponse = {
    token: string
}

export type AuthState = {
    token: string | null
    isAuthenticating: boolean
    error?: string
}

export type AuthContextType = {
    state: AuthState,
    signup: (request: AuthRequest) => void
    signin: (request: AuthRequest) => void
    signout: () => void
    clearErrors: () => void
}

export type AuthAction =
    | { type: 'SET_TOKEN', payload: string }
    | { type: 'REMOVE_TOKEN' }
    | { type: 'AUTHENTICATE', payload: boolean }
    | { type: 'ADD_ERROR', payload: string }
    | { type: 'REMOVE_ERROR' }