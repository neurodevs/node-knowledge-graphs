import { assertOptions } from '@sprucelabs/schema'
import { Builder, BuilderOptions, Node } from './types'

export default class NodeBuilder implements Builder<Node> {
	private namespace?: string
	private currentId: number

	public constructor(options?: BuilderOptions) {
		const { namespace, startingId = 1 } = options ?? {}

		this.currentId = startingId
		this.namespace = namespace
	}

	public createOne(node: Partial<Node>): Node {
		assertOptions({ node }, ['node'])

		if (!node.id) {
			node.id = this.currentId.toString()
			this.currentId++
		}

		if (!node.namespace) {
			node.namespace = this.namespace
		}

		if (!node.uri) {
			node.uri = `${node.namespace}/${node.id}`
		}

		return { ...node }
	}
}
