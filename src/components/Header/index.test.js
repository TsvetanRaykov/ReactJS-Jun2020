import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../utils/test-wrapper'
import Header from '.'
import AuthMenu from './AuthMenu'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<AuthMenu />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<AuthMenu />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<Header />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Header />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
