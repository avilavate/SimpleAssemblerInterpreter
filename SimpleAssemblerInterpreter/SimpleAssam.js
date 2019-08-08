

function simple_assembler(program) {
    let register;
    program.forEach(instruction => {
      register=  Interpreter(instruction, register);
      console.log(register);
    });

    /* return a dictionary with the registers */
	return register;
}

function Interpreter(Instruction, register){
   
   let Step= Instruction.split(" ");
    switch (Step[0]) { 
        case 'mov':
            let Steps=Instruction.split(" ");
            register =Steps[2];
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

console.log(simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1','inc a']));