import { randomInt } from 'crypto'
import AbstractSpruceTest, {
	test,
	assert,
	errorAssert,
	generateId,
} from '@sprucelabs/test-utils'
import NodeBuilder from '../../NodeBuilder'
import { BuilderOptions, Node } from '../../types'

export default class NodeBuilderTest extends AbstractSpruceTest {
	private static builder: NodeBuilder
	private static inputNode: Node
	private static outputNode: Node

	protected static async beforeEach() {
		await super.beforeEach()
		this.builder = this.Builder()
		assert.isTruthy(this.builder)

		this.inputNode = this.generateRandomNode()
		this.outputNode = this.createOne(this.inputNode)
	}

	@test()
	protected static async createOneThrowsWithMissingRequiredOptions() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.builder.createOne())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['node'],
		})
	}

	@test()
	protected static async createOneDoesNotOverwriteNode() {
		assert.doesInclude(this.outputNode, this.inputNode)
	}

	@test()
	protected static async createOneAddsIdIfMissing() {
		assert.isTruthy(this.outputNode.id)
	}

	@test()
	protected static async createOneCalledTwiceReturnsAutoincrementedIds() {
		const node1 = this.createOne()
		const node2 = this.createOne()
		const id1 = Number(node1.id)
		const id2 = Number(node2.id)
		assert.isEqual(id1 + 1, id2)
	}

	@test()
	protected static async createOneAddsUriIfMissing() {
		assert.isTruthy(this.outputNode.uri)
	}

	@test()
	protected static canSetStartingId() {
		const startingId = randomInt(1, 100)
		const builder = this.Builder({ startingId })
		const node = builder.createOne(this.generateRandomNode())
		assert.isEqual(node.id, startingId.toString())
	}

	@test()
	protected static setsUriIfMissing() {
		const node = this.createOne({ uri: undefined })
		assert.isEqual(node.uri, `${node.namespace}/${node.id}`)
	}

	private static createOne(node?: Partial<Node>) {
		const defaultNode = this.generateRandomNode()
		return this.builder.createOne({ ...defaultNode, ...node })
	}

	private static generateRandomNode() {
		return {
			name: generateId(),
			abbreviation: generateId(),
			color: generateId(),
			uri: generateId(),
		}
	}

	private static Builder(options?: Partial<BuilderOptions>) {
		return new NodeBuilder({
			namespace: generateId(),
			startingId: randomInt(1, 100),
			...options,
		})
	}
}
