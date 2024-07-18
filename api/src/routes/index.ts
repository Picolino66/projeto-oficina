import PDFDocument from 'pdfkit';
import { Router } from "express"
import { clienteRoutes } from "./cliente.routes"
import { funcionarioRoutes } from "./funcionario.routes"
import { orcamentoRoutes } from "./orcamento.routes"
import { veiculoRoutes } from "./veiculo.routes"
import { servicoRoutes } from "./servico.routes"
import { funcionarioServicoRoutes } from "./funcionarioServico.routes"
import { pdfRoutes } from "./pdf.routes"
import { userRoutes } from "./user.routes"
import { authRoutes } from './auth.routes';
import { authenticate } from '../middlewares/authMiddleware'; 

const routes = Router();

routes.use("/clientes", authenticate, clienteRoutes);
routes.use("/funcionarios", authenticate, funcionarioRoutes);
routes.use("/orcamentos",authenticate, orcamentoRoutes);
routes.use("/veiculos",authenticate, veiculoRoutes);
routes.use("/servicos", authenticate, servicoRoutes);
routes.use("/funcionarioServico", authenticate, funcionarioServicoRoutes);
routes.use("/pdf", authenticate, pdfRoutes);
routes.use("/usuarios", authenticate, userRoutes);
routes.use("/login", authRoutes);

export { routes }