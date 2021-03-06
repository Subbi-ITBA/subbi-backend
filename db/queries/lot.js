const knex = require("../knex.js");
const { select } = require("../knex.js");

//tables

module.exports = {
  createLot(info) {
    return knex("lot").insert(info, "*");
  },
  updateLot(id, info) {
    return knex("lot").where("id", id).update(info, "*");
  },
  deleteLot(id) {
    return knex("lot").where("id", id).del();
  },
  getLotsByOwner(uid) {
    return knex().select("id").from("lot").where("owner_id", uid);
  },
  getLotById(id) {
    return knex("lot").where("id", id).first();
  },

  getCategories() {
    return knex("categories");
  },

  postPhoto(info) {
    return knex("lotphotos").insert(info, "*");
  },

  getPhotos(id) {
    return knex().select("photo_id").from("lotphotos").where("lot_id", id);
  },
};
