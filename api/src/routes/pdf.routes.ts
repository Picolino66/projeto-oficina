import {Router} from 'express';
import {PdfController} from '../controllers/pdfController';

const pdfController = new PdfController();
const pdfRoutes = Router();

pdfRoutes.get('/cupom/:id', pdfController.cupom);
//pdfController.get('/funcionario/:id', pdfController.funcionario);

export {pdfRoutes};