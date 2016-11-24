var getContainers = function(creep) {
  return creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
};

var getPickupTarget = function(creep) {
  var containers = getContainers(creep);
  var pickupTarget = containers[0];
  var _index = 0;
  containers.forEach(function(container, index) {
    if (container.store[RESOURCE_ENERGY] > pickupTarget.store[RESOURCE_ENERGY]) {
      _index = index;
    }
  });
  return _index;
};

var getDeliveryTarget = function(creep) {
  var containers = getContainers(creep);
  var deliveryTarget = containers[0];
  var _index = 0
  containers.forEach(function(container, index) {
    if (container.store[RESOURCE_ENERGY] < deliveryTarget.store[RESOURCE_ENERGY]) {
      _index = index;
    }
  });
  return _index;
};

var roleDelivery = {
  run: function(creep) {
    if (creep.memory.delivering && creep.carry.energy == 0) {
      creep.memory.delivering = false;
      creep.say('getting');
      creep.memory.pickupTarget = getPickupTarget(creep);
    }
    if (!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
      creep.memory.delivering = true;
      creep.say('delivering');
      creep.memory.deliveryTarget = getDeliveryTarget(creep);
    }

    if (creep.memory.delivering) {
      var deliveryTarget = getContainers(creep)[creep.memory.deliveryTarget];
      if (creep.transfer(deliveryTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(deliveryTarget);
      }
    } else {
      var pickupTarget = getContainers(creep)[creep.memory.pickupTarget];
      if (creep.withdraw(pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(pickupTarget);
      }
    }
  }
};
module.exports = roleDelivery;
