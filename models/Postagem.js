const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var hoje;
function retornaData() {
    var data = new Date(),
    dia = data.getDay().toString(),
    diaF = (dia.length == 1) ? '0'+ dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = (mes.length == 1) ? '0'+ mes : mes,
    anoF = data.getFullYear();
    return hoje = diaF + '/' + mesF + '/' + anoF
}
retornaData()

const Postagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    date: {
        type: String,
        default: hoje
    },
    dateOrder: {
        type: Date,
        default: Date.now()
    }
})



mongoose.model('postagens',Postagem)