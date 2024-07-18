// src/app.js
import {express} from ('express');
const clienteRoutes = require('./routes/cliente.routes');
const funcionarioRoutes = require('./routes/funcionario.routes');
const orcamentoRoutes = require('./routes/orcamento.routes');
const veiculoRoutes = require('./routes/veiculo.routes');
const servicoRoutes = require('./routes/servico.routes');
const funcionarioServicoRoutes = require('./routes/funcionarioServico.routes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api', clienteRoutes);
app.use('/api', funcionarioRoutes);
app.use('/api', orcamentoRoutes);
app.use('/api', veiculoRoutes);
app.use('/api', servicoRoutes);
app.use('/api', funcionarioServicoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
