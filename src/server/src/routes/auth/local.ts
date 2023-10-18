import { faker } from "@faker-js/faker";
import { Router } from "express";
import { requireLocalAuth } from "../../middleware/requireAuth";
import User from "../../models/user.model";
import { registerSchema } from "../../services/validators";

const router = Router();

router.post("/login", requireLocalAuth, (req: any, res) => {
  if (!req.user) {
    res.redirect("/"); // send a response instead?
    return;
  }
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.json({ token, me });
});

router.post("/register", async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { email, password, name, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: "Email is in use" });
    }

    try {
      const newUser = new User({
        provider: "email",
        email,
        password,
        username,
        name,
        avatar: faker.image.avatar(),
      });

      newUser.registerUser(newUser, (err: Error | null, user: typeof User) => {
        if (err) throw err;
        res.json({ message: "Register success." }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", (req, res) => {
  req.logout({}, () => res.send(false));
});

export default router;
