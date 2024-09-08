class RecintosZoo {

    // Método para analisar os recintos
    analisaRecintos(animal, quantidade) {
      // Dados dos recintos e animais
      const recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: { 'MACACO': 3, 'LEAO': 0, 'GAZELA': 0, 'CROCODILO': 0, 'HIPOPOTAMO': 0 } },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: { 'MACACO': 0, 'LEAO': 0, 'GAZELA': 0, 'CROCODILO': 0, 'HIPOPOTAMO': 0 } },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { 'MACACO': 0, 'LEAO': 0, 'GAZELA': 1, 'CROCODILO': 0, 'HIPOPOTAMO': 0 } },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: { 'MACACO': 0, 'LEAO': 0, 'GAZELA': 0, 'CROCODILO': 0, 'HIPOPOTAMO': 0 } },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: { 'MACACO': 0, 'LEAO': 1, 'GAZELA': 0, 'CROCODILO': 0, 'HIPOPOTAMO': 0 } }
      ];
    
      const animais = {
        'LEAO': { tamanho: 3, bioma: 'savana', carnívoro: true },
        'LEOPARDO': { tamanho: 2, bioma: 'savana', carnívoro: true },
        'CROCODILO': { tamanho: 3, bioma: 'rio', carnívoro: true },
        'MACACO': { tamanho: 1, bioma: 'savana ou floresta', carnívoro: false },
        'GAZELA': { tamanho: 2, bioma: 'savana', carnívoro: false },
        'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio', carnívoro: false }
      };
  
      // Verificar se o animal é válido
      if (!animais[animal]) {
        return { erro: 'Animal inválido', recintosViaveis: [] };
      }
  
      // Verificar se a quantidade é válida
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida', recintosViaveis: [] };
      }
  
      // Informações sobre o animal
      const infoAnimal = animais[animal];
      const biomaAnimal = infoAnimal.bioma;
      const tamanhoAnimal = infoAnimal.tamanho;
      const carnívoro = infoAnimal.carnívoro;
  
      // Encontrar recintos viáveis
      const recintosViáveis = recintos.filter(recinto => {
        // Verificar se o bioma do recinto é adequado
        const biomaOk = recinto.bioma.includes(biomaAnimal) || (biomaAnimal.includes('savana e rio') && recinto.bioma.includes('savana e rio'));
        if (!biomaOk) return false;
  
        // Verificar se o recinto já possui animais carnívoros e o animal é carnívoro
        if (carnívoro && Object.keys(recinto.animais).some(esp => animais[esp].carnívoro && recinto.animais[esp] > 0)) {
          return false;
        }
  
        // Verificar se o recinto é adequado para macacos sozinhos
        if (animal === 'MACACO' && quantidade === 1 && Object.keys(recinto.animais).some(esp => recinto.animais[esp] > 0)) {
          return false;
        }
  
        // Verificar se o recinto é adequado para hipopótamos com outras espécies
        if (animal === 'HIPOPOTAMO' && !recinto.bioma.includes('savana e rio') && Object.keys(recinto.animais).some(esp => recinto.animais[esp] > 0)) {
          return false;
        }
  
        // Calcular o espaço ocupado e necessário
        const espaçoTotal = recinto.tamanho;
        const espaçoOcupado = Object.keys(recinto.animais).reduce((acc, esp) => acc + (recinto.animais[esp] * animais[esp].tamanho), 0);
        const espaçoNecessário = (quantidade * tamanhoAnimal) + (Object.keys(recinto.animais).length > 1 ? 1 : 0);
  
        return (espaçoTotal - espaçoOcupado >= espaçoNecessário);
      }).map(recinto => {
        const espaçoTotal = recinto.tamanho;
        const espaçoOcupado = Object.keys(recinto.animais).reduce((acc, esp) => acc + (recinto.animais[esp] * animais[esp].tamanho), 0);
        const espaçoLivre = espaçoTotal - espaçoOcupado - (quantidade * tamanhoAnimal) - (Object.keys(recinto.animais).length > 1 ? 1 : 0);
        return `Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${espaçoTotal})`;
      });
  
      // Retornar resultado
      if (recintosViáveis.length === 0) {
        return { erro: 'Não há recinto viável', recintosViaveis: [] };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo };
  