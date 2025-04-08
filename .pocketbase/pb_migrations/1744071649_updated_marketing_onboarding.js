/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125589594")

  // update collection data
  unmarshal({
    "name": "public_marketing_onboarding"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125589594")

  // update collection data
  unmarshal({
    "name": "marketing_onboarding"
  }, collection)

  return app.save(collection)
})
