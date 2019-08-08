

function simple_assembler(program) {
    let register;
    program.forEach(instruction => {
        Interpreter(instruction, register);
    });

    /* return a dictionary with the registers */
	return register;
}

function Interpreter(Instruction, register){
    let Steps=Instruction.split(" ");
    
    switch (Steps[0]) {
        case 'mov':
            register =Steps[1];
            break;
        case 'inc':
            register++;
            break;
        case 'dec':
            register--;
            break;
        case 'jnz':
            break;        
        default:
            break;
    }
    return register;
}

console.log(simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1','inc a']))