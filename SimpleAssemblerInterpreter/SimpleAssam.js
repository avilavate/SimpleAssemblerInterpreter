
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
    let results= symbols.filter((item, index)=>{return symbols.indexOf(item)==index});
    return results;
}

function simple_assembler(program) {
    let register = {};

    program.forEach((instruction, index) => {

        register = Interpreter(instruction, register, program, index);
        // console.log(register);
    });

    /* return a dictionary with the registers */
    return { 'a': register };
}

function Interpreter(Instruction, register, program, index) {

    let Step = Instruction.split(" ");
    switch (Step[0]) {
        case 'mov':
            let Steps = Instruction.split(" ");
           // register = Number.isInteger(new Number(Steps[2])) ? Steps[2] : let Step[2];
            break;
        case 'inc':
            register++;
            break;
        case 'dec':
            register--;
            break;
        case 'jnz':
            let newSteps = Instruction.split(" ");
            let newInstruction = newSteps[1] ? program[new Number(index) + new Number(newSteps[2])]:null;
            return Interpreter(newInstruction, register, program);
            break;
        default:
            break;
    }
    return register;
}

console.log(simple_assembler(['mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2']));

console.log(lexicalSymbolExtractor(['mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2']));