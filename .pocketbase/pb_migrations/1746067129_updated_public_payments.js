/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_782924383")

  // add field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation3685882489",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "cc",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation779734746",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "bcc",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation3271220173",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "to",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(15, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation1974466025",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "from",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_782924383")

  // remove field
  collection.fields.removeById("relation3685882489")

  // remove field
  collection.fields.removeById("relation779734746")

  // update field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation3271220173",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "to_contact",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2016998430",
    "hidden": false,
    "id": "relation1974466025",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "from_contacts",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
