
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

    program.forEach((instruction, index) => {

        let resultIntermediate = Interpreter(instruction, register, program, index);
        Object.keys(resultIntermediate).forEach(key => {
            register[key] = resultIntermediate[key];
        });
        // console.log(register);
    });
    return register;
    /* return a dictionary with the registers */
    //return { 'a': register };
}

function Interpreter(Instruction, register, program, index) {

    //let Step = Instruction.split(" ");
    let Steps = Instruction.split(" ");
    switch (Steps[0]) {
        case 'mov':

            // register = Number.isInteger(new Number(Steps[2])) ? Steps[2] : let Step[2];
            if (!isNaN(new Number(Steps[2])) && Object.keys(register).includes(Steps[1])) {
                register[Steps[1]] = Steps[2];
                
            }
            else
                if (isNaN(new Number(Steps[2])) && Object.keys(register).includes(Steps[2]) && Object.keys(register).includes(Steps[1])) {
                    register[Steps[1]] = register[Steps[2]];
                    var reset= Object.keys(register).includes(Steps[2])?register[Steps[2]]=0:null ;
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
            let newInstruction = newSteps[1] ? program[new Number(index) + new Number(newSteps[2])] : null;
            let newIndex=new Number(index) + new Number(newSteps[2]);
            return Interpreter(newInstruction, register, program, newIndex);
            break;
        default:
            break;
    }
    return register;
}

console.log(simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a']));
console.log(simple_assembler(['mov a -10','mov b a','inc a','dec b','jnz a -2']));
//console.log(lexicalSymbolExtractor(['mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2']));

