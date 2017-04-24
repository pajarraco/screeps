const harvest = require('harvest');
const harvestContainer = require('harvest.container');
const harvestStorage = require('harvest.storage');
const harvestLink = require('harvest.link');
const harvestSource = require('harvest.source');
const harvestDrop = require('harvest.drop');

const roleUpgrader = {

    /** @param {Creep} creep **/
    run: (creep) => {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            creep.memory.htarget = '';
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                console.log('room', creep.room.name);
                if (creep.room.name === 'E17N93') {
                    creep.moveTo(creep.room.controller);
                } else {
                    creep.moveTo(28, 23);
                }
            }
        } else {
            if (!creep.memory.htarget) {
                if (!harvestStorage.run(creep, 0)) {
                    if (!harvestContainer.run(creep, 0)) {
                        harvestLink.run(creep, 500);
                        if (!harvestDrop.run(creep)) {
                            harvestSource.run(creep);
                        }
                    }
                }
            }
            harvest.run(creep);
        }
    }
};

module.exports = roleUpgrader;
