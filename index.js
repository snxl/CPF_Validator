class ValidaCPF{

    constructor( cpf ){

        Object.defineProperty(
            this,
            "CPFLimpo", {
                writable:false,
                enumerable:false,
                configurable:false,
                value: cpf.replace(/\D+/g, '')
            }
        )

    }

    newCPF(){

        const withoutDigit = this.CPFLimpo.slice(0, -2)
        const digitOne = ValidaCPF.generateDigit(withoutDigit)
        const digitTwo = ValidaCPF.generateDigit(withoutDigit + digitOne)

        this.leatestCPF = withoutDigit + digitOne + digitTwo
        return

    }

    static generateDigit(withoutDigit){

        let total = 0
        let reverse = withoutDigit.length + 1

        for(let numStr of withoutDigit){

            total += reverse * Number(numStr)
            reverse--

        }

        const digit = 11 - ( total % 11 )
        return digit <= 9 ? String(digit) : "0"


    }

    sequencial(){

        return this.CPFLimpo.charAt(0).repeat(this.CPFLimpo.length) === this.CPFLimpo

    }

    validator(){

        if(!this.CPFLimpo) return "Deve inserir um CPF"
        if(typeof this.CPFLimpo !== "string") return "Deve inserir uma string"
        if(this.CPFLimpo.length !== 11) return "CPF deve conter 11 dígitos"
        if(this.sequencial()) return "CPF não deve ser sequencial"
        this.newCPF()

        return this.leatestCPF === this.CPFLimpo ?
                     "CPF valido" : 
                     `CPF inválido`
        
    }

}


process.stdout._write("escreva o seu cpf : ")

process.stdin.on("data", data =>{

    const cpf = new ValidaCPF(String(data))

    process.stdout.write(cpf.validator())

    process.exit()
})