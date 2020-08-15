import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../utils/test-wrapper'
import NotFound from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<NotFound />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<NotFound />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
