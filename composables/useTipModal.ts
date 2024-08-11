import { TipModal } from '#components'
import type { TipProps } from '~/components/global/TipModal.vue'
export const useTipModal = () => {
	const modal = useModal()
	const showTipModal = (config: TipProps) => {
		modal.open(TipModal, config)
	}
	const hideTipModal = () => {
		if (modal.isOpen) {
			modal.close()
		}
	}
	return { showTipModal, hideTipModal }
}