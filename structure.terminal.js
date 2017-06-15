const home1 = 'E17N93';
const home2 = 'E19N94';
const home3 = 'E18N95';
const home4 = 'E18N93';

const structureTerminal = {

    run: () => {
        const terminal1 = Game.rooms[home1].terminal;
        const terminal2 = Game.rooms[home2].terminal;

        console.log(JSON.stringify(terminal1.store));

        let send = terminal1.send(RESOURCE_ENERGY, 100, home2, 'Energy send');
        console.log('terminal send', send);

        terminal2.send(RESOURCE_GHODIUM_OXIDE, 7, home1, 'send go');

    }
};
module.exports = structureTerminal;
