const Joi = require("joi");

function makeRequired(schema) {
  return Object.keys(schema).reduce(function (result, key) {
    result[key] = schema[key].required();
    return result;
  }, {});
}

const user = {
  name: Joi.string().min(2).max(30),
  last_name: Joi.string().min(2).max(30),
  //email: Joi.string().email({ minDomainSegments: 2 }),
};

const user_required = makeRequired(user);

const personal_info = {
  document_type: Joi.string().valid("dni", "ci", "passport").insensitive(),
  document: Joi.string().length(8),
  telephone_type: Joi.string().valid("landline", "mobile").insensitive(),
  telephone: Joi.number().integer(),
  country: Joi.string(),
  province: Joi.string(),
  location: Joi.string(),
  zip: Joi.number().integer(),
  street: Joi.string(),
  street_number: Joi.string(),
};
const personal_info_required = makeRequired(personal_info);
// la id es serial en la base de datos
const lot = {
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  initial_price: Joi.number().positive(),
  quantity: Joi.number().positive(),
  lot_photos: Joi.array().items(Joi.number().integer()).required(),
};

const lot_required = makeRequired(lot);

// la id es serial en la base de datos
const bid = {
  user_id: Joi.string().required(),
  auc_id: Joi.string().required(),
  amount: Joi.number().required(),
  time: Joi.date().iso().required(),
};

const auction = {
  lot_id: Joi.number().integer().required(),
  last_bid_id: Joi.number().integer().required(),
  creation_date: Joi.date().timestamp().required(),
  deadline: Joi.date().timestamp().required(),
};

// la id es serial en la base de datos
const expert = {
  name: Joi.string(),
  last_name: Joi.string(),
  category: Joi.string(),
};

const auction_list = {
  sort: Joi.string()
    .valid("deadline", "popularity", "creation_date")
    .required(),

  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().positive(),
  filter: Joi.string().valid("bidding"),
  category: Joi.string(),
};

const following = {
  followed_id: Joi.string().required(),
};

const user_rating = {
  to_id: Joi.string().required(),
  from_id: Joi.string().required(),
  comment: Joi.string().required(),
  date: Joi.date().iso().required(),
  rating: Joi.number().min(0).max(5).required(),
};

const expert_asign = {
  id_exp: Joi.string().required(),
  id_auc: Joi.string().required(),
};

const message_list = {
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().positive(),
};

const message = {
  msg: Joi.string().required()
};

const expert_required = makeRequired(expert);

module.exports = {
  user,
  user_required,
  personal_info,
  personal_info_required,
  lot,
  lot_required,
  auction,
  expert,
  expert_required,
  auction_list,
  bid,
  following,
  user_rating,
  expert_asign,
  message_list,
  message,
};
