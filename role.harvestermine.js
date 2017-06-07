const roleHarvesterMine = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let sum = _.sum(creep.carry);
        if (creep.memory.transferring && sum == 0) {
            creep.memory.transferring = false;
            creep.say('harvesting');
        }
        if (!creep.memory.transferring && sum == creep.carryCapacity) {
            creep.memory.transferring = true;
            creep.say('transferring');
        }

        if (creep.memory.transferring) {
            const resource = _.filter(creep.carry, (resource, key) => key !== 'energy');
            if (resource.length > 0) {
                const labs = creep.room.find(
                    FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_LAB
                    });
                if (labs.length > 0) {
                    _.each(creep.carry, (resource, key) => {
                        let tansfer = creep.transfer(labs[0], key);
                        console.log(transfer);
                        if (tansfer == ERR_NOT_IN_RANGE) {
                            creep.moveTo(labs[0]);
                        } else if (tansfer == ERR_FULL){
                          console.log('full');
                        }
                    });
                }
            }
        } else {
            const sources = creep.room.find(FIND_MINERALS);
            let i = 0; // creep.memory.source;
            if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i]);
            }
        }
    }
};

module.exports = roleHarvesterMine;
