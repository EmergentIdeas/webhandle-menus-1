const Sink = require('file-sink')
let log = require('filter-log')('webhandle:menu-loader')
const loadMenu = require('./load-menu')


const menuLoaderCreator = function(menuPath) {
	const sink = new Sink(menuPath)
	
	let menuLoader = async function(req, res, next) {
		let menuName = res.locals.page.menuName || 'main'
		let [top, items] = await loadMenu(sink, menuName)
		res.locals.menu = top
		res.locals.menuItems = items
		
		if(res.locals.page.menuNames) {
			res.locals.menus = {}
			for(let name of res.locals.page.menuNames) {
				let [top, items] = await loadMenu(sink, name)
				res.locals.menus[name] = top
			}
		}
		
		next()
	}
	
	return menuLoader
}

menuLoaderCreator.__dirname = __dirname


module.exports = menuLoaderCreator