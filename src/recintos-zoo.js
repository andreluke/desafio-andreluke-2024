class RecintosZoo {
    constructor() {
      this.recintos = [
        {
          numero: 1,
          bioma: ["savana"],
          tamanho: 10,
          animais: [{ especie: "MACACO", quantidade: 3 }],
        },
        { numero: 2, bioma: ["floresta"], tamanho: 5, animais: [] },
        {
          numero: 3,
          bioma: ["savana e rio"],
          tamanho: 7,
          animais: [{ especie: "GAZELA", quantidade: 1 }],
        },
        { numero: 4, bioma: ["rio"], tamanho: 8, animais: [] },
        {
          numero: 5,
          bioma: ["savana"],
          tamanho: 9,
          animais: [{ especie: "LEAO", quantidade: 1 }],
        },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, bioma: ["savana", "savana e rio"], carnivoro: true },
        LEOPARDO: {
          tamanho: 2,
          bioma: ["savana", "savana e rio"],
          carnivoro: true,
        },
        CROCODILO: {
          tamanho: 3,
          bioma: ["rio"],
          carnivoro: true,
        },
        MACACO: {
          tamanho: 1,
          bioma: ["savana", "floresta", "savana e rio"],
          carnivoro: false,
        },
        GAZELA: {
          tamanho: 2,
          bioma: ["savana", "savana e rio"],
          carnivoro: false,
        },
        HIPOPOTAMO: {
          tamanho: 4,
          bioma: ["savana", "rio", "savana e rio"],
          carnivoro: false,
        },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: "Animal inválido" };
      }
  
      if (typeof quantidade !== "number" || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animais[animal];
      const espacoNecessario = quantidade * animalInfo.tamanho;
      let recintosViaveis = [];
  
      this.recintos.forEach((recinto) => {
        const espacoOcupado = recinto.animais.reduce(
          (total, animal) =>
            total + animal.quantidade * this.animais[animal.especie].tamanho,
          0
        );
        let espacoLivre = recinto.tamanho - espacoOcupado;
  
        if (!recinto.bioma.some((b) => animalInfo.bioma.includes(b))) {
          return;
        }
  
        const carnivorosNoRecinto = recinto.animais.some(
          (animal) => this.animais[animal.especie].carnivoro
        );
        
        if (carnivorosNoRecinto && animalInfo.carnivoro) {
          const diferentesEspecies = recinto.animais.some(
            (animalRecinto) => animalRecinto.especie !== animal
          );
          if (diferentesEspecies) {
            return;
          }
        }
  
        if (
          recinto.animais.length > 0 &&
          !animalInfo.carnivoro &&
          carnivorosNoRecinto
        ) {
          return;
        }
  
        if (
          recinto.animais.length > 0 &&
          animal === "HIPOPOTAMO" &&
          recinto.bioma.includes("savana") &&
          recinto.bioma.includes("rio")
        ) {
          return;
        }
  
        if (recinto.animais.length === 0 && animal === "MACACO") {
          if (quantidade === 1) {
            return;
          }
        }
  
        const jaExisteOutraEspecie =
          recinto.animais.length > 0 && recinto.animais[0].especie !== animal;
        if (jaExisteOutraEspecie) {
          espacoLivre -= 1;
        }
  
        if (espacoLivre >= espacoNecessario) {
          recintosViaveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${
              espacoLivre - espacoNecessario
            } total: ${recinto.tamanho})`
          );
        }
      });
  
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: "Não há recinto viável" };
      }
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  