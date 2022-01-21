module.exports = function (context) {
  return {
    requests: {
      /**
       * Only trigger for `CanFulfillIntentRequests`
       * @param {*} request - Alexa Skill Event
       */
      'CanFulfillIntentRequest': function (request) {
        context.cfirRequest = request
      }
    },
    events: {
      beforeFinalResponse: function (response) {
        // If it's not a CFIR don't do anything
        if (!context.cfirRequest) {
          return
        }
        response.response.canFulfillIntent = buildCanFulfillIntentResponse(context.cfirRequest)
      }
    }
  }
}
