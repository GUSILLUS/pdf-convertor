import { renderHook } from "@testing-library/react";
import { act } from 'react';
import { useLocalStorage } from 'shared/hooks';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => delete store[key],
        clear: () => { store = {} }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should initialize with the value from localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should initialize with the initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('initialValue');
  });

  it('should update localStorage when the state changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });
});