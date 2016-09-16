export function In (target, parent){
	let path = []
	let parentNode = target
	while (parentNode && parentNode !== document.body) {
		path.push(parentNode)
		parentNode = parentNode.parentNode
	}
	return path.indexOf(parent) !== -1
}