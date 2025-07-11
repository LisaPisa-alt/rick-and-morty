import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";
dotenv.config();

export const signUpUser = async (req, res) => {
  const { username, password } = req.body;
  const sanitizedUsername = username.toLowerCase();

  try {
    const userExists = await prisma.user.findUnique({
      where: { username: sanitizedUsername },
    });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { username: sanitizedUsername, password: hashedPassword },
    });
    const token = jwt.sign(
      { username: sanitizedUsername },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const sanitizedUsername = username.toLowerCase();
  try {
    const user = await prisma.user.findUnique({
      where: { username: sanitizedUsername },
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: sanitizedUsername },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
