/**
 * Creates a tree of items from an array of items where the items themselves
 * have a format like:
 * 
 * {
 *    "id": 2,
 *    "parentId": 0,
 * } 
 * @param {Array(object)} items 
 * @returns The root element of the constructed tree. Root element is determined
 * by the element which does not have a parent id.
 */
function createTree(items) {
	let top
	let all = {}
	
	items.forEach((item) => {
		if(typeof item.parentId == 'undefined') {
			top = item
		}
		item.children = item.children || []
		all[item.id] = item
	})
	items.forEach((item) => {
		if(typeof item.parentId != 'undefined' && all[item.parentId]) {
			all[item.parentId].children.push(item)
		}
	})					
	return top
}

module.exports = createTree