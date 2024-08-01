import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import type { FileType } from '~/api/resources'
import { resultSuccess, resultListSuccess, resultWrapListSuccess, getOnePic } from '../_utils'

const RESOURCES_TARGET = '/resources'

const generateFileList = (num: number) => {
	return Array.from({ length: num }, () => ({
		fileName: `${mockjs.Random.name()}.jpg`,
		url: getOnePic(150, 150),
		id: mockjs.Random.guid()
	}))
}

export default [
	{
		url: `${RESOURCES_TARGET}/files/upload`,
		method: 'put',
		response: () => resultWrapListSuccess(generateFileList(3))
	}
] as MockMethod[]