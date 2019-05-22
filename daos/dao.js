class Dao {}

// PUT, UPDATE, DELETE
Dao.prototype.create = async (model, body) => {
    return await model.create(body);
};
Dao.prototype.updateById = async (model, body, id) => {
    return await model.update(body, { where: { id } });
};
Dao.prototype.destroyById = async (model, id) => {
    return await model.destroy({ where: { id } });
};

// GET
Dao.prototype.findByPk = async (model, pk) => {
    return await model.findByPk(pk);
};
Dao.prototype.findAll = async (model, limit, offset, order = [ ['createdAt', 'DESC'] ], where = {}) => {
    return await model.findAll({
        ...where,
        order,
        limit,
        offset
    });
};

// Dao.prototype.findOne = async (model, where = {}) => {
//     return await model.findOne({ where });
// }

module.exports = Dao;