let path = require('path');
const fs = require('fs')
const Sink = require('file-sink')

let log = require('filter-log')('webhandle:menu-loader')

const menuLoaderCreator = function(menuPath) {
	const sink = new Sink(menuPath)
	let menuLoader = function(req, res, next) {
		let menuName = res.locals.page.menuName || 'main'
		sink.read(menuName + '.json', function(err, data) {
			log.debug('load menu: ' + menuName)
			if(!err) {
				try {
					let items = JSON.parse(data.toString())
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
					
					res.locals.menu = top
					res.locals.menuItems = items
				}
				catch(e) {
					log.error('Could not parse menu: ' + menuName)
				}
			}
			
			res.locals.menu = res.locals.menu || {}
			return next()
		})
	}
	
	return menuLoader
}

menuLoaderCreator.__dirname = __dirname


module.exports = menuLoaderCreator