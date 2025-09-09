export class userModel{
    constructor(
        public id: string | number | null,
        public nome: string | null,
        public endereco: string | null,
        public email: string | null,
        public datacad: Date | string | null,
        public saldo: string | number | null,
        public senha: string | null
    ){}
}