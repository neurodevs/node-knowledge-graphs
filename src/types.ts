export interface Builder<T> {
	createOne(data: Partial<T>): T
}

export interface BuilderOptions {
	namespace?: string
	startingId?: number
}

export interface Node {
	id?: string
	name?: string
	abbreviation?: string
	color?: string
	uri?: string
	namespace?: string
}
export interface Edge {}
