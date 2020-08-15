import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../utils/test-wrapper'
import ErrorBoundary from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<ErrorBoundary />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<ErrorBoundary>
					<h1>TEST</h1>
				</ErrorBoundary>
				)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
