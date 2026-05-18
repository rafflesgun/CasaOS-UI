import { describe, expect, test, vi } from 'vitest'

vi.mock('./sidebar/TreeList.vue', () => ({ default: {} }))
vi.mock('./sidebar/MountList.vue', () => ({ default: {} }))
vi.mock('./shared/ShareEntryButton.vue', () => ({ default: {} }))
vi.mock('./shared/ShareListPage.vue', () => ({ default: {} }))
vi.mock('./shared/SelectShareModal.vue', () => ({ default: {} }))
vi.mock('./shared/ShareDetial.vue', () => ({ default: {} }))
vi.mock('./components/GirdView.vue', () => ({ default: {} }))
vi.mock('./components/ListView.vue', () => ({ default: {} }))
vi.mock('./components/FileBreadcrumb.vue', () => ({ default: {} }))
vi.mock('./components/EmptyHolder.vue', () => ({ default: {} }))
vi.mock('./components/ErrorHolder.vue', () => ({ default: {} }))
vi.mock('./components/SidebarMenuButton.vue', () => ({ default: {} }))
vi.mock('./modals/DetailModal.vue', () => ({ default: {} }))
vi.mock('./modals/NewFolderModal.vue', () => ({ default: {} }))
vi.mock('./modals/NewFileModal.vue', () => ({ default: {} }))
vi.mock('./modals/RenameModal.vue', () => ({ default: {} }))
vi.mock('./uploader/components/uploader.vue', () => ({ default: {} }))
vi.mock('./uploader/components/unsupport.vue', () => ({ default: {} }))
vi.mock('./uploader/components/list.vue', () => ({ default: {} }))
vi.mock('./components/OperationToolbar.vue', () => ({ default: {} }))
vi.mock('./components/OperationStatusBar.vue', () => ({ default: {} }))
vi.mock('./components/GlobalActionButton.vue', () => ({ default: {} }))
vi.mock('./components/MountActionButton.vue', () => ({ default: {} }))
vi.mock('@/components/Storage/MergeStorages.vue', () => ({ default: {} }))
vi.mock('./drop/DropEntryButton.vue', () => ({ default: {} }))

import FilePanel from './FilePanel.vue'

describe('FilePanel showDetailModal', () => {
	test.each([
		['notes.md', 'code-editor'],
		['events.jsonl', 'code-editor'],
	])('opens %s in the code editor viewer', (name, expectedPanelType) => {
		const open = vi.fn()
		const item = { name, path: `/DATA/${name}` }
		const ctx = {
			isModalOpen: false,
			panelType: null,
			currentItem: null,
			isShowDetial: false,
			getFileExt: FilePanel.mixins[0].methods.getFileExt,
			getPanelType: FilePanel.mixins[0].methods.getPanelType,
			$buefy: {
				modal: {
					open,
				},
			},
		}

		FilePanel.methods.showDetailModal.call(ctx, item)

		expect(ctx.panelType).toBe(expectedPanelType)
		expect(ctx.currentItem).toEqual(item)
		expect(ctx.isShowDetial).toBe(true)
		expect(ctx.isModalOpen).toBe(true)
		expect(open).not.toHaveBeenCalled()
	})

	test('opens unknown text files in the code editor by default', () => {
		const open = vi.fn()
		const item = { name: 'config.unknown', path: '/DATA/config.unknown' }
		const ctx = {
			isModalOpen: false,
			panelType: null,
			currentItem: null,
			isShowDetial: false,
			getFileExt: FilePanel.mixins[0].methods.getFileExt,
			getPanelType: FilePanel.mixins[0].methods.getPanelType,
			$buefy: {
				modal: {
					open,
				},
			},
		}

		FilePanel.methods.showDetailModal.call(ctx, item)

		expect(ctx.panelType).toBe('code-editor')
		expect(ctx.currentItem).toEqual(item)
		expect(ctx.isShowDetial).toBe(true)
		expect(open).not.toHaveBeenCalled()
	})

	test('opens the detail modal for binary files', () => {
		const open = vi.fn()
		const item = { name: 'archive.zip', path: '/DATA/archive.zip' }
		const ctx = {
			isModalOpen: false,
			panelType: null,
			currentItem: null,
			isShowDetial: false,
			getFileExt: FilePanel.mixins[0].methods.getFileExt,
			getPanelType: FilePanel.mixins[0].methods.getPanelType,
			$buefy: {
				modal: {
					open,
				},
			},
		}

		FilePanel.methods.showDetailModal.call(ctx, item)

		expect(open).toHaveBeenCalledTimes(1)
		expect(ctx.panelType).toBe(null)
		expect(ctx.currentItem).toBe(null)
		expect(ctx.isShowDetial).toBe(false)
		expect(ctx.isModalOpen).toBe(true)
	})
})
