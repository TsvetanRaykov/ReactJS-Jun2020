import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../utils/test-wrapper'
import ProtectedRoute from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<ProtectedRoute />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<ProtectedRoute exact path='/' component={<h1>TEST</h1>}>
					<h1>TEST</h1>
				</ProtectedRoute>
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
