import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import useToast from './toast'

vi.useFakeTimers()

describe('useToast', () => {
  let toasts
  let addToast
  let removeToast

  beforeEach(() => {
    ;({ toasts, addToast, removeToast } = useToast())
  })

  test('initializes with no toasts', () => {
    expect(toasts.value).toHaveLength(0)
  })

  test('adds a new toast', () => {
    addToast('New Toast!', 'success')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('New Toast!')
    expect(toasts.value[0].type).toBe('success')
  })

  test('adds a new toast with a custom type', () => {
    addToast(`Something's wrong`, 'error')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].type).toBe('error')
  })

  test('removes a toast by id', () => {
    addToast('Toast to be removed')
    const { id } = toasts.value[0]
    removeToast(id)
    expect(toasts.value).toHaveLength(0)
  })

  test('removes a toast after 3 seconds', async () => {
    addToast('Ephimeral Toast ')
    expect(toasts.value).toHaveLength(1)
    vi.runAllTimers()
    await nextTick()
    expect(toasts.value).toHaveLength(0)
  })
})
