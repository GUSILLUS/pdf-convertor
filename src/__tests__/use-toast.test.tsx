
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useToast } from 'shared/hooks';

describe('useToast', () => {
  it('should add a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });

  it('should update a toast', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      const newToast = result.current.toast({ title: 'Test Toast' });
      toastId = newToast.id;
      newToast.update({
        title: 'Updated Toast',
        id: toastId,
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Updated Toast');
  });
});