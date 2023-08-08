# Webhandle Menu loader

Loads menu definitions from a folder ('menus' by default.)

## Install

It's installed when using the webhandle framework.

## Usage

This operates as a page preload routine. By default, it loads the file `main.json` 
in the menus directory. The assumption is that this is the main top menu.

To load a different file from that directory as the main menu, you can specify in
the page json file like:

```json
{
	"menuName": "something-else"
}

```

Whatever is specified by menuName, the root of the menu tree is put into `res.locals.menu` and the individual
items are put into `res.locals.menuItems`.

To have it load additional menus, add to the page json like this:


```json
{
	"menuName": "something-else",
	"menuNames": ["how-to"]
}

```

The root will be added to `res.locals.menus['how-to]`