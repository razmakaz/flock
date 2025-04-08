/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3461338982")

  // update collection data
  unmarshal({
    "name": "public_purchases"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3461338982")

  // update collection data
  unmarshal({
    "name": "purchases"
  }, collection)

  return app.save(collection)
})
