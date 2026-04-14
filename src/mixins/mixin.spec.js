import { describe, expect, test } from 'vitest'
import { formatEditorContent, getEditorMode, getFilePanelType, mixin } from './mixin'

describe('getFilePanelType', () => {
	test.each([
		['notes.md', 'code-editor'],
		['events.jsonl', 'code-editor'],
	])('routes %s to %s', (name, expectedType) => {
		expect(getFilePanelType(name)).toBe(expectedType)
	})
})

describe('getEditorMode', () => {
	test('resolves markdown files to markdown mode', () => {
		expect(getEditorMode('md')).toBe('text/x-markdown')
	})

	test('resolves jsonl files to plain text mode', () => {
		expect(getEditorMode('jsonl')).toBe('text/plain')
	})
})

describe('formatEditorContent', () => {
	test('keeps jsonl string responses unchanged', () => {
		expect(formatEditorContent('jsonl', '{"message":"line one"}')).toBe('{"message":"line one"}')
	})

	test('serializes jsonl arrays as compact newline-delimited JSON', () => {
		expect(formatEditorContent('jsonl', [{ message: 'line one' }, { message: 'line two' }])).toBe('{"message":"line one"}\n{"message":"line two"}')
	})

	test('serializes jsonl objects compactly without pretty formatting', () => {
		expect(formatEditorContent('jsonl', { message: 'line one' })).toBe('{"message":"line one"}')
	})

	test('keeps existing JSON pretty-print behavior for other object responses', () => {
		expect(formatEditorContent('json', { enabled: true })).toBe(`{
  "enabled": true
}`)
	})
})
