import Swal from 'sweetalert2'

interface ConfirmDeleteOptions {
    title?: string
    text?: string
    confirmText?: string
    cancelText?: string
}

export async function confirmDelete(
    onConfirm: () => Promise<void>,
    options?: ConfirmDeleteOptions
) {
    const result = await Swal.fire({
        title: options?.title ?? 'Hapus data?',
        text:
            options?.text ??
            'Data yang dihapus tidak dapat dikembalikan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: options?.confirmText ?? 'Ya, hapus',
        cancelButtonText: options?.cancelText ?? 'Batal',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
        focusCancel: true,
    })

    if (result.isConfirmed) {
        await onConfirm()

        await Swal.fire({
            title: 'Berhasil!',
            text: 'Data berhasil dihapus',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        })
    }
}



interface AlertInfoOptions {
  title?: string
  text?: string
  icon?: 'success' | 'info' | 'warning' | 'error' | 'question'
  timer?: number
}

/**
 * Tampilkan alert informasi
 */
export async function alertInfo(options?: AlertInfoOptions) {
  await Swal.fire({
    title: options?.title ?? 'Info',
    text: options?.text ?? '',
    icon: options?.icon ?? 'info',
    timer: options?.timer ?? 2000,
    showConfirmButton: options?.timer ? false : true,
    timerProgressBar: !!options?.timer,
    toast: !!options?.timer, // kalau pakai timer, tampilkan seperti toast
  })
}
