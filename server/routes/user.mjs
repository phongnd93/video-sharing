import express from "express";
import db from "../db/conn.mjs";
import md5 from "md5";
import Utils from "../db/utils.mjs";

const router = express.Router();
const _COLLECTION_USER = 'user';

// User join section
router.post("/", async (req, res, next) =>
{
    if (req.session?.currentUser)
    {
        const user = req.session.currentUser;
        res.send({ value: user.email }).status(200);
    } else res.send({ value: null, message: "Not found" }).status(404);
});

// User join section
router.post("/join", async (req, res, next) =>
{
    const { email, password } = req.body;
    if (email?.length > 0 && password?.length > 0)
    {
        const collection = await db.collection(_COLLECTION_USER);
        const session = req.session;
        const md5Password = md5(password);
        const account = await collection.findOne({ email });
        const accountWithPath = await collection.findOne({ email: email, password: md5Password });

        //Email is not existed
        if (!account)
        {
            const newDocument = {
                email: email,
                password: md5Password,
            };

            const result = await collection.insertOne(newDocument);
            if (result)
            {
                session.currentUser = newDocument;
                res.send({ value: email }).status(200);
                // session.regenerate((err) =>
                // {
                //   if (err) next(err);

                //   session.save(function (err)
                //   {
                //     if (err) return next(err);

                //   });
                // });
            }
        }

        //Email is existed but wrong password
        if (account && !accountWithPath)
        {
            res.send({ value: null, message: "Not found" }).status(404);
        }

        //Correct login info
        if (account && accountWithPath)
        {
            session.currentUser = accountWithPath;
            res.send({ value: email }).status(200);
            // session.regenerate((err) =>
            // {
            //   if (err) next(err);

            //   session.save(function (err)
            //   {
            //     if (err) return next(err);

            //   });
            // });
        }

    } else res.send({ value: null, message: "Email and password is not allowed empty!" }).status(204);
});

// Register new user section
router.post("/register", async (req, res) =>
{
    const { email, password } = req.body;
    if (email?.length > 0 && password?.length > 0)
    {
        const collection = await db.collection(_COLLECTION_USER);
        const account = await collection.findOne({ email });
        if (account) res.send('Duplicated').status(409);
        else
        {
            const newDocument = {
                email: email,
                password: md5(password),
            };

            let result = await collection.insertOne(newDocument);
            res.send(result).status(200);
        }
    } else res.send("Email and password is not allowed empty!").status(204);
});

// User login section
router.post("/login", async (req, res) =>
{
    const { email, password } = req.body;
    if (email?.length && password?.length)
    {
        const collection = await db.collection(_COLLECTION_USER);
        const result = await collection.findOne({ email, password });
        if (result) res.send(result).status(200);
        res.send('Not found').status(404);
    } else res.send("Email and password is not allowed empty!").status(204);
});

router.get('/logout', async (req, res) =>
{
    try
    {
        Utils.getCurrentSession(req);
        req.session.destroy((err) =>
        {
            if (err)
            {
                res.send({ value: null, message: err.message }).status(400);
            } else
            {
                res.send({ value: true }).status(200);
            }
        });
    } catch (error)
    {
        res.send({ value: null, message: error.message }).status(400);
    }
});
export default router;