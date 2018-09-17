module.exports = agent => {


    agent.messenger.on('egg-ready', () => {
        agent.logger.info('egg-ready');

        agent.messenger.on('entityCache',data=>agent.messenger.sendToApp('entityCache', data));
        agent.messenger.on('invokeEntitys',data=>agent.messenger.sendToApp('invokeEntitys', data));



    });




};

