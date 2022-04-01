class Carro {
    renavam;
    placa;
    marca;
    modelo;

    static copy({renavam, placa, marca = "", modelo = ""}) {
        const carro = new Carro();
        carro.renavam = renavam;
        carro.placa = placa;
        carro.marca = marca || "";
        carro.modelo = modelo || "";
        return carro;
    }
}

module.exports = {Carro};