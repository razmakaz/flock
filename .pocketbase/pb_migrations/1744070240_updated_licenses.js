/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1065113382")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3461338982",
    "hidden": false,
    "id": "relation1628950843",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "purchase",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1065113382")

  // remove field
  collection.fields.removeById("relation1628950843")

  return app.save(collection)
})
