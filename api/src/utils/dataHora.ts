class DataHora {
    static padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
  
    static formatDate(date: Date) {
      return [
        DataHora.padTo2Digits(date.getDate()),
        DataHora.padTo2Digits(date.getMonth() + 1), // getMonth() retorna 0 para janeiro, 1 para fevereiro, etc.
        date.getFullYear()
      ].join('/') + ' ' + [
        DataHora.padTo2Digits(date.getHours()),
        DataHora.padTo2Digits(date.getMinutes()),
        DataHora.padTo2Digits(date.getSeconds())
      ].join(':');
    }

  }
  
  export default DataHora;