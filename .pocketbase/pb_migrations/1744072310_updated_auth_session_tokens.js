/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2553593573")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date2593941644",
    "max": "",
    "min": "",
    "name": "expires",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2553593573")

  // remove field
  collection.fields.removeById("date2593941644")

  return app.save(collection)
})
