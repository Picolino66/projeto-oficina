import { Request, Response } from 'express';
import { ServicoService } from '../services/servicoService';
import PDFDocument from 'pdfkit';
import DataHora from '../utils/dataHora';

const servicoService = new ServicoService();

export class PdfController {
    async cupom(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const servico = await servicoService.getServicoCompletoById(id);
            return criarPDFServico(res, servico);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

function criarCabecalho(res: Response) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=boleto.pdf');
    return res;
}

function criarPDFServico(res: Response, servico: any) {
    res = criarCabecalho(res);

    const doc = new PDFDocument({
        size: [229, 522], // As dimensões do cupom em pontos. Ajuste conforme necessário
        margins: { // Margens pequenas, já que o conteúdo toma quase toda a largura
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        }
    });

    doc.pipe(res);

    doc.font('Helvetica-Bold').fontSize(12);
    doc.fontSize(14).text('JF MECÂNICA', { align: 'center' });
    doc.fontSize(10).text('Rua Abel Batista de Abreu nº 194', { align: 'center' });
    doc.fontSize(10).text('Ouro Verde - Lavras', { align: 'center' });
    doc.fontSize(10).text('(35)3822-8650', { align: 'center' });
    doc.moveDown();

    // Obtém a data e hora atual
    const now = new Date();
    const formattedDate = DataHora.formatDate(now);
    doc.text(formattedDate, { align: 'center' });
    doc.moveDown();

    // Informações do atendimento
    doc.fontSize(10).text('Cliente: ' + servico.cliente.nome, { align: 'left' });
    doc.text('Número da nota: ' + servico.numeroNota, { align: 'left' });
    doc.fontSize(12).text('Serviço: ' + servico.nome, { align: 'left' });
    const descricaoLimpa = servico.descricao.replace(/<[^>]*>?/gm, '');
    doc.fontSize(12).text('Descrição: ' + descricaoLimpa, { align: 'left' });
    doc.moveDown();

    // Informações do veículo
    doc.fontSize(12).text('Informações do veículo', { align: 'center' });
    doc.fontSize(10).text('Modelo: ' + servico.veiculo.modelo, { align: 'left' });
    doc.fontSize(10).text('Placa: ' + servico.veiculo.placa, { align: 'left' });
    doc.fontSize(10).text('km: ' + servico.km, { align: 'left' });
    doc.moveDown();

    
    // Informações do pagamento
    doc.fontSize(12).text('Informações do preço', { align: 'center' });
    doc.fontSize(10).text('Preço Final: R$ ' + servico.preco, { align: 'left' });
    doc.fontSize(10).text('Pago Total: R$ ' + servico.pagamento, { align: 'left' });
    doc.moveDown();

    // Rodapé com instrução
    doc.font('Helvetica-Bold').fontSize(14)
        .text('CUPOM NÃO FISCAL', { align: 'center' });
    doc.font('Helvetica').fontSize(10)
        .text('30 DIAS PARA PAGAR O RESTANTE', { align: 'center' });

    // Finaliza o documento
    doc.end();

    // Listener para o fim da stream
    res.on('finish', () => {
        console.log('PDF criado com sucesso.');
    });
}