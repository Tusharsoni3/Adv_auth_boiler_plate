import {z} from 'zod';
import jwt  from 'jsonwebtoken';

export const registerSchema = z.object({
    name :z.string().min(5,"Name must be of at least 5 characters"),
    email: z.email("Invalid email"),
    password : z.string()
                        .min(8, "Password must be at least 8 characters")
                        .regex(/[A-Z]/, "Must contain one uppercase letter")
                        .regex(/[0-9]/, "Must contain one number"),}).refine((data) => data.name !== data.email, {
    message: "Username cannot be the same as your Email",
    path: ["username"]
})

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password : z.string(1,"Password is required")
})

export const tfaSchema = z.object({
    input : z.boolean({
    required_error: "twoFactorAuth is required",
    invalid_type_error: "twoFactorAuth must be a boolean",
  }),
});

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      errors: error.flatten().fieldErrors,
    });
  }
};

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
