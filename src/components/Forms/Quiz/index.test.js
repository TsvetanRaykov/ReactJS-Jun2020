import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../../utils/test-wrapper'
import Answers from './Answers'
import SetQuestion from './SetQuestion'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Answers />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Answers selectedValue={jest.fn()} answers={[]} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<SetQuestion />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<SetQuestion />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
