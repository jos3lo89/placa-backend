import { Router } from "express";
import { loginScheme, registerScheme } from "../schemas/auth.schema.js";
import { schemaValidator } from "../middleware/scheme.middleware.js";
import { compare, encrypt } from "../libs/bcypt.libs.js";
import db from "../config/db.js";
import { createToken } from "../libs/jwt.libs.js";

const router = Router();

router.post(
  "/auth/register",
  schemaValidator(registerScheme),
  async (req, res) => {
    try {
      const { nombre, apellido, email, password } = req.body;

      const pwdHash = await encrypt(password);

      const newUser = await db.users.create({
        data: {
          nombre,
          apellido,
          email,
          password: pwdHash,
        },
      });

      const { password: _, ...userWithNotPassword } = newUser;

      res.status(201).json({ ...userWithNotPassword });
    } catch (error) {
      console.log(error);

      res.status(400).json({ message: "Error registrando el usuario" });
    }
  }
);

router.post("/auth/login", schemaValidator(loginScheme), async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await db.users.findFirst({
      where: {
        email,
      },
    });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is not matched" });
    }

    const token = await createToken({
      email: userFound.email,
      rol: userFound.rol,
    });

    const { password: _, ...userWithNotPassword } = userFound;

    res.status(200).json({ ...userWithNotPassword, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al iniciar sesion" });
  }
});

export default router;
