var roleMiner = {
  run: function(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      var i = creep.memory.source;
      if (creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[i]);
      }
    } else {
      var container = creep.pos.findClosestByRange(
          FIND_STRUCTURES,
          {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity});
      if (container) {
        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  }
};
module.exports = roleMiner;
