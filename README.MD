# Litexa Name Free Invocation Extension
This extension adds the ability to add name free invocation support to Litexa.

## Setup

1. `npm install @litexa/name-free-invocation`
1. [Add a `buildCanFulfillIntentResponse` in your javascript files](https://www.litexa.com/book/interop.html#javascript-variables-and-functions)
1. Deploy!

### `buildCanFulfillIntentResponse` function documentation

Details on how and when to handle CanFulfillIntentRequest can be found in the Alexa Skills Kit documentation here: https://developer.amazon.com/en-US/docs/alexa/custom-skills/implement-canfulfillintentrequest-for-name-free-interaction.html#implement-canfulfillintent

```
type YesOrNo = 'YES' | 'NO'

interface CanFulfillSlotResponse {
    canUnderstand: YesOrNo;
    canFulfill: YesOrNo;
}

interface CanFulfillIntentResponse {
    canFulfill: YesOrNo;
    slots: {
        [key: string]: CanFulfillSlotResponse
    };
}

// Note this is not exhaustive and is just representative of intents I have logged/captured.
interface CFIRRequest {
    type: 'CanFulfillIntentRequest',
    requestId: string,
    locale: string,
    timestamp: string,
    intent: {
        name: string,
        confirmationStatus: string,
        slots: {
            [key: string]: {
                name: string,
                confirmationStatus: string,
                source: string,
                value?: string
                resolutions?: {
                    resolutionsPerAuthority: [{
                        authority: string,
                        status: { code: string },
                        values: [{ value: { name: string, id: string } }]
                    }]
                },
                slotValue?: {
                    type: string,
                    value: string,
                    resolutions: {
                        resolutionsPerAuthority: [{
                            authority: string,
                            status: { code: string },
                            values: [{ value: { name: string, id: string } }]
                        }]
                    }
                }
            }
        }
    }
}

// Simple example with no slot validation. 
function buildCanFulfillIntentResponse(request: any): CanFulfillIntentResponse {
    return { canFulfill: request.intent.name === 'MyCFIREligibleIntent' ? 'YES' : 'NO, slots: {} }
}
```