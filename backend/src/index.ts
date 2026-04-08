import express, { Express, Request, Response } from 'express';
import sequelize from './config/database';

// Importa o middleware CORS (Cross-Origin Resource Sharing)
// Permite que requisições de outros domínios acessem nosso servidor
import cors from 'cors';
// Importa dotenv para carregar variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes'; // Importa as rotas da API
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
// ============================================================================
// CONFIGURAÇÃO DA APLICAÇÃO
// ============================================================================
// Cria uma instância da aplicação Express com tipo TypeScript
const app: Express = express();
// Define a porta do servidor
// Tenta usar PORT do .env, caso contrário usa porta 3001 como padrão
const port = process.env.PORT || 3001;
// ============================================================================
// MIDDLEWARES
// ============================================================================
// Habilita CORS - permite requisições de outros domínios
app.use(cors());
// Middleware para parsear JSON no corpo das requisições

app.use(express.json());
// ============================================================================
// ROTAS
// ============================================================================
app.use('/api', apiRoutes); // Usa as rotas definidas em api.routes.ts para o caminho /api

// ============================================================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ============================================================================
/**
* Middleware global para tratamento de erros
* Captura erros lançados nas rotas e retorna resposta consistente
* IMPORTANTE: Este middleware deve estar por último no código
*/
app.use((err: any, req: express.Request, res: express.Response, next:
express.NextFunction) => {
// Log do erro no console para debugging
console.error('Error:', err);
// Retorna erro 500 com mensagem de erro
res.status(500).json({
error: 'Internal Server Error',
message: err.message
});
});
// ============================================================================
// INICIAR O SERVIDOR
// ============================================================================
/**
* Inicia o servidor na porta especificada
* Exibe mensagem de sucesso no console quando o servidor está rodando
*/
sequelize.sync().then(() => {
app.listen(3001, () => {
console.log('Servidor rodando em http://localhost:3001');
console.log('Banco de dados sincronizado com sucesso.');
});
}).catch(err => {
console.error('Falha ao conectar ao banco de dados:'
, err);

});