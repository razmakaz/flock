/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3025479740")

  // update collection data
  unmarshal({
    "name": "public_invoice_item"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3025479740")

  // update collection data
  unmarshal({
    "name": "public_invoice_line"
  }, collection)

  return app.save(collection)
})
