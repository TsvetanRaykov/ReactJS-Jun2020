import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../../utils/test-wrapper'
import Progress from '.'
import Body from './Body'
import Nav from './Nav'
import QuizActive from './QuizActive'
import QuizResult from './QuizResult'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Progress />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Progress />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<Body />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Body question={{}} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<Nav />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Nav questions={[]} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<QuizActive />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<QuizActive quiz={{ data: { questions: [{ userAnswer: '' }] } }} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<QuizResult />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<QuizResult />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
