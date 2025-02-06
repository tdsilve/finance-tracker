import '@tanstack/react-query'
import { HTTPError } from './lib/error'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: HTTPError
  }
}