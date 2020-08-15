import React from 'react'
import { createRender } from '@material-ui/core/test-utils'
import TestWrapper from '../../../utils/test-wrapper'
import AdminContent from '.'
import Questions from './Questions'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<AdminContent />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<AdminContent />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<Questions />', () => {
	let render

	beforeAll(() => {
		render = createRender()
	})

	it('Should match the snapshot', () => {
		const wrapper = render(
			<TestWrapper>
				<Questions questions={[]} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
