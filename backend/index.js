const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { z } = require("zod");

const dataSet = require("./utils/dataSet");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "your server is up and running",
  });
});

app.post("/api/v1/user/signup", async (req, res) => {
  try {
    const requestBodySchema = z.object({
      email: z.string().email().min(5).max(150),
      password: z.string().min(8).max(100),
      name: z.string().min(3).max(50),
    });

    const isparsedDataSuccess = requestBodySchema.safeParse(req.body);

    if (!isparsedDataSuccess.success) {
      return res.status(401).json({
        success: false,
        message: isparsedDataSuccess.error.issues[0].message,
        error: isparsedDataSuccess.error,
      });
    }

    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandetory",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    user.password = undefined;

    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User Registered Successfully",
        data: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while signing up",
      error,
    });
  }
});

app.post("/api/v1/user/signin", async (req, res) => {
  try {
    const requestBodySchema = z.object({
      email: z.string().email().min(5).max(150),
      password: z.string().min(8).max(100),
    });

    const isparsedDataSuccess = requestBodySchema.safeParse(req.body);

    if (!isparsedDataSuccess.success) {
      return res.status(401).json({
        success: false,
        message: isparsedDataSuccess.error.issues[0].message,
        error: isparsedDataSuccess.error,
      });
    }

    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandetory",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET
    );

    user.password = undefined;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User Registered Successfully",
        data: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while signing in",
      error,
    });
  }
});

app.get("/api/v1/user/userDetails", auth, async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token invalid",
      });
    }

    const validUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!validUser) {
      res.status(400).json({
        success: false,
        message: "Ivalid token",
        error,
      });
    }

    const user = await User.findOne({ email: validUser.email });

    user.password = undefined;

    return res.status(200).json({
      success: false,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details",
      error,
    });
  }
});

app.post("/api/v1/user/logout", (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      succcess: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while signing in",
      error,
    });
  }
});

app.get("/api/v1/data", auth, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Data sent successfully",
      data: dataSet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while signing in",
      error,
    });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
