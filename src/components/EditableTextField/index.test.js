import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../utils/test-wrapper'
import EditableTextField from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<EditableTextField />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<EditableTextField />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
