/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2016998430")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation859837811",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "contacts",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2016998430")

  // remove field
  collection.fields.removeById("relation859837811")

  return app.save(collection)
})
