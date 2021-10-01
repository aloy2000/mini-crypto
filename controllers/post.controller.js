const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require("../errors/error");
const fs = require('fs')

module.exports.getAllPosts = async (req, res) => {
    await postModel.find(
        (err, data) => {
            if (!err) res.send(data);
            else console.log("Error to get all posts");
        }
    )
}



module.exports.createPost = async (req, res) => {
    const { posterId, message, video } = req.body;
    let fileName;

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 5000000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
        fileName = req.body.posterId + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../clients/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = await postModel.create({
        posterId: posterId,
        message: message,
        likers: [],
        video: video,
        comments: [],
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",

    }).then(async (data) => {
        console.log("data", data)
        await data.save()
        return res.status(201).send({ newPost: data._id })
    })
        .catch((e) => {
            console.log("erreur create post", e)
            return res.status(500).send({ e });
        })



}

module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    postModel.findByIdAndRemove(
        req.params.id,
        (err, data) => {
            if (!err) res.send(data)
            else console.log("errors delete:", + err)
        }
    )

}

module.exports.updatePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    const postUpdate = {
        message: req.body.message
    };

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: postUpdate },
        { new: true },
        (err, data) => {
            if (!err) res.send(data)
            else console.log("errors:", + err)
        }
    );

}

module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, data) => {
                if (err) res.status(400).send(err)
            }
        )

        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err, data) => {
                if (!err) res.send(data)
                else res.status(400).send(err)
            }
        )

    } catch (e) {
        res.status(400).send({ e })
    }
}

module.exports.disLikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, data) => {
                if (err) res.status(400).send(err)
            }
        )

        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err, data) => {
                if (!err) res.send(data)
                else res.status(400).send(err)
            }
        )

    } catch (e) {
        res.status(400).send({ e })
    }
}

module.exports.commentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send('id not found: ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        idCommenter: req.body.idCommenter,
                        pseudoComment: req.body.commenterPseudo,
                        content: req.body.content,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, data) => {
                if (!err) return res.send(data);
                else return res.status(400).send(err);
            }
        );

    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports.commentEditPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return postModel.findById(req.params.id, (err, data) => {
            const theComment = data.comments.find((comment) =>
                comment._id.equals(req.body.idCommenter)
            );

            if (!theComment) return res.status(404).send("Comment not found");
            theComment.content = req.body.content;

            return data.save((err) => {
                if (!err) return res.status(200).send(data);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err);
    }

}

module.exports.commentDeletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.idCommenter,
                    },
                },
            },
            { new: true },
            (err, data) => {
                if (!err) return res.send(data);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
}

