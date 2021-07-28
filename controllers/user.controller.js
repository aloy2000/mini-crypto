const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json({ users: users });
}

module.exports.userInfo = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    UserModel.findById(req.params.id, (err, data) => {
        if (!err) res.send(data)
        else console.log('id not found: ' + err);
    }).select('-password');
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    console.log(req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    biography: req.body.biography
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) return res.send(data);
                else return res.status(500).json({ message: err });
            }
        )
    } catch (e) {
        return res.status(500).json({ message: e });

    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: 'user deleted' });
    } catch (err) {
        res.status(500).json({ message: 'error occuring: ' + err });
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(404).send('id not found: ' + req.params.id);

    try {

        //ajouter la personne à suivre
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, data) => {
                if (!err) res.status(201).json(data);
                else return res.status(400).json({ message: err });
            }
        );

        //ajouter la personne qui suit

        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, data) => {
                if (err) return res.status(400).json({ message: err });
            }
        );


    } catch (err) {
        return res.status(400).json({ message: err });

    }
}

module.exports.unFollow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(404).send('id not found: ' + req.params.id)


    try {
        //retirer la personne à suivre
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true },
            (err, data) => {
                if (!err) res.status(201).json(data);
                else return res.status(400).json({ message: err });
            }
        );

        //retirer la personne qui suit

        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, data) => {
                if (err) return res.status(400).json({ message: err });
            }
        );

    } catch (err) {

    }
}