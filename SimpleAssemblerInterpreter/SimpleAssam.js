

function simple_assembler(program) {
    let register;
    
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
            register = Number.isInteger (new Number(Steps[2]))?Steps[2]:let Step[2] ;
            break;
        case 'inc':
            register++;
            break;
        case 'dec':
            register--;
            break;
        case 'jnz':
            let newSteps = Instruction.split(" ");
            let newInstruction = program[new Number(index) + new Number(newSteps[2])];
            return Interpreter(newInstruction, register, program);
            break;
        default:
            break;
    }
    return register;
}

console.log(simple_assembler(['mov a -10','mov b a','inc a','dec b','jnz a -2']));