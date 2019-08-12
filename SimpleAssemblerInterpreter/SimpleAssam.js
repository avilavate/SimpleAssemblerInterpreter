function lexicalSymbolExtractor(program) {
    let symbols = [];
    program.forEach(element => {
    let instruction = element.split(" ");
        if (instruction[0] === 'mov' && instruction.length == 3) {
     if (instruction[1]) symbols.push(instruction[1]);
            if (instruction[2] && Number.isNaN(new Number(instruction[2]))) symbols.push(instruction[2]);

        }
        if (instruction[0] == 'inc' || instruction[0] === 'dec' && instruction.length == 2) {
            symbols.push(instruction[1]);
        }

    });
    let results = symbols.filter((item, index) => { return symbols.indexOf(item) == index });
    return results;
}

function simple_assembler(program) {
    let symbols = lexicalSymbolExtractor(program);       
    let register = {};
    symbols.forEach(element => {
        register[element] = undefined;
    });

            for (let index = 0; index < program.length; index++) {
                let resultIntermediate = Interpreter(program[index], register, program, index);
                if(resultIntermediate.index==-1) break;
                if (!!resultIntermediate.index) {
                    index = resultIntermediate.index;
                    resultIntermediate.index = undefined;
                    
                    resultIntermediate = Interpreter(program[index], resultIntermediate, program, index);
                }
                Object.keys(resultIntermediate).forEach(key => {
                    register[key] = resultIntermediate[key]/1;
                });
             
            } 

    delete register.index;
    Object.keys(register).forEach(key=>{
        if(isNaN(register[key])) delete register[key];
    });
    return register;
}

function Interpreter(Instruction, register, program, index) {
    let Steps = Instruction.split(" ");
    
    switch (Steps[0]) {
        case 'mov':
            if (!isNaN(new Number(Steps[2])) && Object.keys(register).includes(Steps[1])) {
                register[Steps[1]] = new Number(Steps[2]);
            }
            else
                if (isNaN(new Number(Steps[2])) && Object.keys(register).includes(Steps[2]) && Object.keys(register).includes(Steps[1])) {
                    register[Steps[1]] = new Number(register[Steps[2]]);
                }
            break;
        case 'inc':

            if (Steps[1] && !Number.isNaN(Steps[1]) && Object.keys(register).includes(Steps[1]))
                register[Steps[1]]++;
            break;
        case 'dec':

           if (Steps[1] && !Number.isNaN(Steps[1]) && Object.keys(register).includes(Steps[1]))
           register[Steps[1]]=register[Steps[1]]-1;
            break;
        case 'jnz':
            let newSteps = Instruction.split(" ");
            let newIndex=new Number(index) + new Number(newSteps[2]);
            register.index=register[ Steps[1]] !=0?newIndex:undefined;
            register.index= register.index>=program.length?-1:register.index;
            return register;
        default:
            break;
    }
    return register;
}

//console.log(simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a']));
console.log(simple_assembler([
    'mov a 1',
    'mov b 1 ',
    'mov d 26 ',
    'jnz c 2',
    'jnz 1 5',
    'mov c 7 ',
    'inc d',
    'dec c',
    'jnz c -2',
    'mov c a ',
    'inc a',
    'dec b',
    'jnz b -2',
    'mov b c',
    'dec d',
    'jnz d -6',
    'mov c 16 ',
    'mov d 17',
    'inc a',
    'dec d',
    'jnz d -2',
    'dec c',
    'jnz c -5'

]));
//console.log(lexicalSymbolExtractor(['mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2']));


