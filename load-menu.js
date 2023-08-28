const createTree = require('./create-tree')

let log = require('filter-log')('webhandle:menu-loader')

async function loadMenu(sink, name) {
	try {
		log.debug('load menu: ' + name)
		let data = await sink.read(name + '.json')
		let items = JSON.parse(data)
		let top = createTree(items)
		return [top, items]
	}
	catch(e) {
		log.error({msg: `Could not load menu: ${name}`, error: e})
	}
	return [{}, []]
}

module.exports = loadMenu
