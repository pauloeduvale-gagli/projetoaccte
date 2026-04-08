import { Router, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();
/**
* GET /api/health
*/
router.get('/health', (req: Request, res: Response) => {
res.json({
status: 'OK',
message: 'Backend is running',
timestamp: new Date().toISOString()
});

});
/**
* GET /api/hello
*/
router.get('/hello', (req: Request, res: Response) => {
res.json({
message: 'Hello from Express Backend!'
});
});
router.post('/register', async (req: Request, res: Response) => {
try {
const { email, password } = req.body;
await User.create({ email, password });
res.status(201).json({ message: "Usuário criado com sucesso" });
} catch (error) {
console.error("ERRO NO REGISTRO:", error);
res.status(400).json({ error: "Erro ao registrar usuário. O e-mail pode já existir." });
}
});
router.post('/login', async (req: Request, res: Response) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (user && await bcrypt.compare(password, user.password)) {
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  res.status(500).json({ error: "JWT_SECRET não está configurado" });
  return;
}
const token = jwt.sign(
{ id: user.id },
jwtSecret,
{ expiresIn: '1h' }
);
res.json({ token });
} else {
res.status(401).json({ error: "Credenciais inválidas" });
}
} catch (error) {
console.error("ERRO NO LOGIN:", error);
res.status(500).json({ error: "Erro interno no servidor" });
}
});

export default router;