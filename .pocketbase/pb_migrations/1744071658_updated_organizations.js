/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2873630990")

  // update collection data
  unmarshal({
    "name": "public_organizations"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2873630990")

  // update collection data
  unmarshal({
    "name": "organizations"
  }, collection)

  return app.save(collection)
})
