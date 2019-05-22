const { Comment } = require('../models');
const Dao = require('../daos/dao');
const dao = new Dao();

module.exports = (function () {
    const C = {};

    C.comment = async (req, res, next) => {
        const { commentId: id } = req.params;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const comment = await dao.findByPk(Comment, id);
            if (comment)
                return res.status(200).json({ comment });
            else
                return res.status(404).send('Not Found');
        } catch (err) {
            return res.status(400).json({ err });
        }
    };

    C.create = async (req, res, next) => {
        try {
            const comment = await dao.create(Comment, req.body);
            if (comment)
                return res.status(200).json({ comment });
            else
                return res.status(400).send('Failed to Create!');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    C.update = async (req, res, next) => {
        const { content, author, commentId: id } = req.body;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const result = await dao.updateById(Comment, { content, author }, id);
            if (result == 1) {
                const comment = await dao.findByPk(Comment, id);
                return res.status(200).json({ comment });
            } else
                return res.status(400).send('Failed to Update!');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    C.delete = async (req, res, next) => {
        const { commentId: id } = req.body;
        if (!id) return res.status(400).send('Invalid Input');
        try {
            const result = await dao.destroyById(Comment, id);
            if (result == 1)
                return res.status(200).json({ result });
            else
                return res.status(400).send('Failed to Delete!');
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    };
    return C;
})();