import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../utils/test-wrapper'
import AvailableQuizList from './AvailableQuizList'
import CompletedQuizList from './CompletedQuizList'
import CompletedUsers from './CompletedUsers'
import OwnQuizList from './OwnQuizList'
import UserData from './UserData'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<AvailableQuizList />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<AvailableQuizList />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<CompletedQuizList />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<CompletedQuizList />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<CompletedUsers />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<CompletedUsers />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<OwnQuizList />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<OwnQuizList />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<UserData />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<UserData />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
