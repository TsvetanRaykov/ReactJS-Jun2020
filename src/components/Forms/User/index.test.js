import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import { Register } from './Register'
import { SignIn } from './Login'
import TestWrapper from '../../../utils/test-wrapper'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<RegisterForm />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Register classes={{ main: {} }} />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<LoginForm />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<SignIn classes={{ main: {} }} />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
