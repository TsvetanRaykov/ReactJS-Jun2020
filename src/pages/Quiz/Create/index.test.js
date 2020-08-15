import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../../utils/test-wrapper'
import CreateQuiz from '.'
import AddQuestions from './AddQuestions'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<CreateQuiz />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<CreateQuiz />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<AddQuestions />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<AddQuestions />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
