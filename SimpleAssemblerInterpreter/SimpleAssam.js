{"esversion": 6}

function simple_assembler(program) {
    let register;
    /* return a dictionary with the registers */
    

	return {}
}

function Interpreter(Instruction, register){
    let Steps=Instruction.split(" ");
    
    switch (Steps[0]) {
        case 'mov':
            register =Steps[1];
            break;
    
        default:
            break;
    }
}