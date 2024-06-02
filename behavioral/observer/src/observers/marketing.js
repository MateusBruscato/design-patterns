export default class Marketing {
    update({ userName, id }) {
        //importante lembrar que o update é responsável por gerenciar seus erros/exceções
        //não deve-se ter await no notify porque a responsabilidade dele é emitir eventos
        //só notificar todo mundo
        console.log(`[${id}] Marketing will send an email to ${userName}`);
    }
}