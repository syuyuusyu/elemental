'use strict';

module.exports = function (agent) {

    agent.messenger.on('egg-ready', function () {
        agent.logger.info('egg-ready');

        agent.messenger.on('entityCache', function (data) {
            return agent.messenger.sendToApp('entityCache', data);
        });
        agent.messenger.on('invokeEntitys', function (data) {
            return agent.messenger.sendToApp('invokeEntitys', data);
        });
    });
};
//# sourceMappingURL=agent.js.map