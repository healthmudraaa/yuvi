export type Param = {
  name: string;
  desc: string;
  req: 'M' | 'O' | 'OM';
  type: string;
};

export type Endpoint = {
  method: 'GET' | 'POST' | 'DELETE';
  title: string;
  path: string;
  desc?: string;
  params?: Param[];
  headers: { name: string; value: string; desc: string }[];
  requestExample: string;
  responseExample: string | null;
};

export type DocSection = {
  id: string;
  title: string;
  intro?: string[];
  endpoints: Endpoint[];
};

const AUTH_HEADER = { name: 'Authorization', value: 'apiKey clientKey:clientSecret', desc: 'Yuvi-assigned clientKey:clientSecret pair for the partner.' };
const JSON_HEADER = { name: 'Content-Type', value: 'application/json', desc: '' };

export const DOC_SECTIONS: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    intro: [
      'Authorization in headers is mandatory in all APIs.',
      'partnerCode is mandatory wherever defined.',
      'planCode is mandatory wherever defined.',
      'additionalFields in the request body of each API will return the same data in the response.',
    ],
    endpoints: [],
  },
  {
    id: 'plans',
    title: 'Plans',
    intro: [
      'A plan can come from the Yuvi catalog, or be submitted by the partner itself — brokers and HR platforms can provide their own package and insurance details rather than being limited to a fixed Yuvi list.',
    ],
    endpoints: [
      {
        method: 'POST',
        title: 'Submit Partner Package',
        path: 'https://qa.gateway.yuvi.co/api/v1/plans/submit',
        desc: 'Let a partner provide its own package and insurance details — plan name, category, coverage and premium — for Yuvi to list alongside the standard catalog.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planName', desc: "The partner's name for this package.", req: 'M', type: 'String' },
          { name: 'category', desc: 'OPD, COPAY_WAIVER, CRITICAL_ILLNESS, or another supported category.', req: 'M', type: 'String' },
          { name: 'coverageDetails', desc: "The package's coverage terms, limits and exclusions.", req: 'M', type: 'Complex' },
          { name: 'premium', desc: 'Premium for the package, in the partner’s stated currency.', req: 'M', type: 'Number' },
          { name: 'additionalFields', desc: 'Additional fields which the API response will return as-is.', req: 'O', type: 'Complex' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/plans/submit' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "planName": "String",
    "category": "COPAY_WAIVER",
    "coverageDetails": {
        "coversUpTo": 100000,
        "exclusions": ["String"]
    },
    "premium": 2000,
    "additionalFields": { "dummyField1": "String" }
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Package submitted for review",
  "entity": { "planCode": "PARTNER-PKG-01", "status": "PENDING_REVIEW" }
}`,
      },
      {
        method: 'GET',
        title: 'List Plans',
        path: 'https://qa.gateway.yuvi.co/api/v1/plans',
        desc: 'List the add-on plans available to a partner — Yuvi catalog and partner-submitted packages alike — optionally filtered to what is compatible with a specific linked group policy.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'groupPolicyId', desc: 'Filter to plans compatible with this linked group policy.', req: 'O', type: 'String' },
          { name: 'additionalFields', desc: 'Additional fields which the API response will return as-is.', req: 'O', type: 'Complex' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/plans' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "groupPolicyId": "String",
    "additionalFields": {
        "dummyField1": "String"
    }
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Plans fetched successfully",
  "entity": {
    "plans": [
      {
        "planCode": "YUVI-OPD-01",
        "planName": "OPD & Teleconsults",
        "category": "OPD",
        "premium": 1200
      },
      {
        "planCode": "YUVI-CPW-01",
        "planName": "Copay Waiver",
        "category": "COPAY_WAIVER",
        "premium": 2000
      },
      {
        "planCode": "YUVI-CI-01",
        "planName": "Critical Illness Top-up",
        "category": "CRITICAL_ILLNESS",
        "premium": 1800
      }
    ],
    "additionalFields": { "dummyField1": "String" }
  }
}`,
      },
      {
        method: 'GET',
        title: 'Get Plan Details',
        path: 'https://qa.gateway.yuvi.co/api/v1/plans/{planCode}',
        desc: 'Fetch coverage, benefits and eligibility rules for a single add-on plan.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/plans/YUVI-CPW-01?partnerCode=String' \\
--header 'Authorization: apiKey clientKey:clientSecret'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Plan details fetched successfully",
  "entity": {
    "planCode": "YUVI-CPW-01",
    "planName": "Copay-Gap Protection",
    "coversUpTo": 100000,
    "eligibility": "Requires a linked group policy with a copay clause",
    "exclusions": ["Pre-existing conditions outside base policy terms"]
  }
}`,
      },
      {
        method: 'POST',
        title: 'Get Premium',
        path: 'https://qa.gateway.yuvi.co/api/v1/plans/premium',
        desc: 'Calculate the premium for a plan given the employee’s linked policy and chosen cover amount.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
          { name: 'groupPolicyId', desc: 'The linked group policy the premium is calculated against.', req: 'M', type: 'String' },
          { name: 'coverAmount', desc: 'Requested cover amount for the add-on.', req: 'O', type: 'Number' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/plans/premium' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "planCode": "YUVI-CPW-01",
    "groupPolicyId": "String",
    "coverAmount": 100000
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Premium calculated successfully",
  "entity": { "planCode": "YUVI-CPW-01", "premium": 2000, "currency": "INR" }
}`,
      },
    ],
  },
  {
    id: 'proposal-and-policy',
    title: 'Proposal and Policy',
    endpoints: [
      {
        method: 'POST',
        title: 'Bulk Submit Enrollment',
        path: 'https://qa.gateway.yuvi.co/api/v1/bulk-submit-enrollment',
        desc: 'Enroll a batch of employees into one or more add-on plans against their existing linked group policy. Returns an applicationNumber per enrollment.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
          { name: 'enrollments', desc: 'Array of enrollments for bulk submission.', req: 'M', type: 'Array' },
          { name: 'externalReferenceNumber', desc: 'Partner-side de-dupe ID for the enrollment.', req: 'M', type: 'String' },
          { name: 'employeeDetails', desc: 'Employee being enrolled.', req: 'M', type: 'Complex' },
          { name: 'firstName', desc: "Employee's first name.", req: 'M', type: 'String' },
          { name: 'lastName', desc: "Employee's last name.", req: 'M', type: 'String' },
          { name: 'dateOfBirth', desc: "Employee's date of birth, DD-MM-YYYY.", req: 'M', type: 'String' },
          { name: 'gender', desc: "Employee's gender.", req: 'M', type: 'String' },
          { name: 'email', desc: "Employee's email.", req: 'O', type: 'String' },
          { name: 'mobile', desc: "Employee's mobile number.", req: 'M', type: 'String' },
          { name: 'employeeId', desc: "Employee's ID in the partner's HRMS.", req: 'M', type: 'String' },
          { name: 'groupPolicyNumber', desc: "The employer's existing group policy this enrollment stacks on top of.", req: 'M', type: 'String' },
          { name: 'planSpecifics', desc: 'Details required to compute the add-on premium.', req: 'M', type: 'Complex' },
          { name: 'selectedAddons', desc: 'Array of add-on plan codes selected.', req: 'M', type: 'Array' },
          { name: 'copayWaiverOptIn', desc: 'Whether the employee opted into the copay-waiver add-on.', req: 'O', type: 'Boolean' },
          { name: 'dependentDetails', desc: 'Array of dependents covered under the add-on.', req: 'O', type: 'Array' },
          { name: 'relationship', desc: "Dependent's relationship to the employee: Spouse, Son, Daughter, Father, Mother.", req: 'O', type: 'String' },
          { name: 'additionalFields', desc: 'Additional fields which the API response will return as-is.', req: 'O', type: 'Complex' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/bulk-submit-enrollment' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "planCode": "String",
    "enrollments": [
        {
            "externalReferenceNumber": "String",
            "employeeDetails": {
                "firstName": "String",
                "lastName": "String",
                "dateOfBirth": "String (Format: DD-MM-YYYY)",
                "gender": "String",
                "email": "String",
                "mobile": "String",
                "employeeId": "String",
                "groupPolicyNumber": "String"
            },
            "planSpecifics": {
                "selectedAddons": ["YUVI-OPD-01", "YUVI-CPW-01"],
                "copayWaiverOptIn": true
            },
            "dependentDetails": [
                {
                    "firstName": "String",
                    "lastName": "String",
                    "relationship": "Spouse",
                    "dateOfBirth": "String (Format: DD-MM-YYYY)"
                }
            ],
            "additionalFields": { "dummyField1": "String" }
        }
    ]
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Enrollment Accepted",
  "entity": {
    "enrollments": [
      {
        "externalReferenceNumber": "xx123xxuuu",
        "applicationNumber": "xxxxxxxx-yyyy-zzzz-uuuu-xxxxxxxxxxxx",
        "status": "ACCEPTED",
        "additionalFields": { "dummyField1": "String" }
      }
    ]
  }
}`,
      },
      {
        method: 'POST',
        title: 'Download Policy',
        path: 'https://qa.gateway.yuvi.co/api/v1/policies/download',
        desc: 'Download the add-on certificate(s) issued against a submitted enrollment. If the plan bundles more than one benefit, one policyNumber and policyUrl is returned per benefit.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
          { name: 'applicationNumber', desc: 'applicationNumber received in the Bulk Submit Enrollment response.', req: 'M', type: 'String' },
          { name: 'additionalFields', desc: 'Additional fields which the API response will return as-is.', req: 'O', type: 'Complex' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/policies/download' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "planCode": "String",
    "applicationNumber": "String",
    "additionalFields": { "dummyField1": "String" }
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Policy issued successfully",
  "entity": {
    "policies": [
      {
        "planKey": "YUVI-OPD-01",
        "policyNumber": "D01234567",
        "policyUrl": "http://yuvi.co/sample.pdf"
      },
      {
        "planKey": "YUVI-CPW-01",
        "policyNumber": "D01234568",
        "policyUrl": "http://yuvi.co/sample.pdf"
      }
    ],
    "additionalFields": { "dummyField1": "String" }
  }
}`,
      },
      {
        method: 'POST',
        title: 'Cancel Policy',
        path: 'https://qa.gateway.yuvi.co/api/v1/policies/cancel',
        desc: 'Cancel one or more add-on enrollments for an employee, e.g. on exit or plan downgrade.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
          { name: 'externalReferenceNumber', desc: "Partner's de-dupe ID for the original enrollment.", req: 'M', type: 'String' },
          { name: 'applicationNumber', desc: 'applicationNumber of the enrollment to cancel.', req: 'M', type: 'String' },
          { name: 'cancelPlanNames', desc: 'Specific add-ons to cancel; omit to cancel all.', req: 'O', type: 'Array' },
          { name: 'cancellationReasons', desc: 'Reasons for cancellation.', req: 'O', type: 'Array' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/policies/cancel' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "planCode": "String",
    "externalReferenceNumber": "String",
    "applicationNumber": "String",
    "cancelPlanNames": [],
    "cancellationReasons": ["Employee exit", "Plan downgrade"]
}'`,
        responseExample: null,
      },
    ],
  },
  {
    id: 'consent',
    title: 'Consent',
    endpoints: [
      {
        method: 'POST',
        title: 'Send Employee Consent',
        path: 'https://qa.gateway.yuvi.co/api/v1/send-consent',
        desc: 'Send a consent link to the employee, authorizing Yuvi to read the linked group policy and process copay-waiver claims on their behalf.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
          { name: 'firstName', desc: "Employee's first name.", req: 'M', type: 'String' },
          { name: 'lastName', desc: "Employee's last name.", req: 'M', type: 'String' },
          { name: 'mobile', desc: "Employee's mobile number.", req: 'M', type: 'String' },
          { name: 'referenceIdType', desc: 'Type of reference, e.g. "EmployeeId".', req: 'M', type: 'String' },
          { name: 'referenceId', desc: 'Reference value for the given referenceIdType.', req: 'M', type: 'String' },
          { name: 'additionalFields', desc: 'Additional fields which the API response will return as-is.', req: 'O', type: 'Complex' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER, { name: 'partnercode', value: 'partnerCode', desc: 'Yuvi-assigned partner code, repeated as a header.' }],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/send-consent' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--header 'partnercode: partnerCode' \\
--data '{
    "partnerCode": "String",
    "planCode": "String",
    "firstName": "String",
    "lastName": "String",
    "mobile": "String",
    "referenceId": "String",
    "referenceIdType": "EmployeeId",
    "additionalFields": { "dummyField1": "String" }
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Consent Sent Successfully",
  "entity": {
    "referenceId": "xxxxxxxx-yyyy-zzzz-uuuu-xxxxxxxxxxxx",
    "consentUrl": "abc.xyz/123",
    "additionalFields": { "dummyField1": "String" }
  }
}`,
      },
    ],
  },
  {
    id: 'callback-webhook',
    title: 'Callback/Notify Webhook',
    intro: [
      'Register a webhook URL once via POST /v1/webhooks. Yuvi will POST an event payload to that URL whenever an enrollment, claim or copay-waiver changes state.',
    ],
    endpoints: [
      {
        method: 'POST',
        title: 'Register Webhook',
        path: 'https://qa.gateway.yuvi.co/api/v1/webhooks',
        desc: 'Register a callback URL to receive asynchronous event notifications.',
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'callbackUrl', desc: 'HTTPS URL Yuvi will POST events to.', req: 'M', type: 'String' },
          { name: 'events', desc: 'Event names to subscribe to, e.g. policy.linked, claim.settled, waiver.approved.', req: 'M', type: 'Array' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/webhooks' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "callbackUrl": "https://partner.example.com/webhooks/yuvi",
    "events": ["policy.linked", "claim.settled", "waiver.approved"]
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Webhook registered successfully",
  "entity": { "webhookId": "wh_7f3a1c" }
}`,
      },
      {
        method: 'POST',
        title: 'Example Callback Payload: waiver.approved',
        path: '(sent by Yuvi to your callbackUrl)',
        desc: 'Yuvi POSTs this payload to your registered callbackUrl when a copay-waiver claim is approved.',
        headers: [JSON_HEADER],
        requestExample: `POST https://partner.example.com/webhooks/yuvi
Content-Type: application/json

{
  "event": "waiver.approved",
  "data": {
    "waiverId": "wv_019a",
    "groupPolicyNumber": "grp_8f2c1a",
    "employeeId": "emp_2291",
    "waivedAmount": 50000
  }
}`,
        responseExample: null,
      },
    ],
  },
  {
    id: 'renewal',
    title: 'Renewal',
    endpoints: [
      {
        method: 'POST',
        title: 'Renew Policy',
        path: 'https://qa.gateway.yuvi.co/api/v1/policies/renew',
        desc: "Renew a linked group policy or an employee's add-on subscription for the next policy year.",
        params: [
          { name: 'partnerCode', desc: 'Yuvi-assigned partner code.', req: 'M', type: 'String' },
          { name: 'planCode', desc: 'Yuvi-generated 6 character plan code.', req: 'M', type: 'String' },
          { name: 'groupPolicyId', desc: 'The group policy or add-on enrollment to renew.', req: 'M', type: 'String' },
          { name: 'renewalTerm', desc: 'Renewal term in months, defaults to 12.', req: 'O', type: 'String' },
          { name: 'additionalFields', desc: 'Additional fields which the API response will return as-is.', req: 'O', type: 'Complex' },
        ],
        headers: [AUTH_HEADER, JSON_HEADER],
        requestExample: `curl --location 'https://qa.gateway.yuvi.co/api/v1/policies/renew' \\
--header 'Authorization: apiKey clientKey:clientSecret' \\
--header 'Content-Type: application/json' \\
--data '{
    "partnerCode": "String",
    "planCode": "String",
    "groupPolicyId": "String",
    "renewalTerm": "12",
    "additionalFields": { "dummyField1": "String" }
}'`,
        responseExample: `{
  "statusCode": 200,
  "message": "Policy renewed successfully",
  "entity": {
    "groupPolicyId": "grp_8f2c1a",
    "status": "RENEWED",
    "newPolicyNumber": "D01239900",
    "additionalFields": { "dummyField1": "String" }
  }
}`,
      },
    ],
  },
];

export const INTEGRATION_STEPS: { step: number; capability: string; desc: string }[] = [
  { step: 1, capability: 'Get Plans', desc: 'Show available add-on plans' },
  { step: 2, capability: 'Get Plan Details', desc: 'Display coverage and eligibility rules' },
  { step: 3, capability: 'Get Premium', desc: 'Calculate the add-on price' },
  { step: 4, capability: 'Bulk Submit Enrollment', desc: "Submit the employee's enrollment" },
  { step: 5, capability: 'Download Policy', desc: 'Retrieve the issued add-on certificate' },
  { step: 6, capability: 'Callback / Webhook', desc: 'Get notified on enrollment and claim events' },
  { step: 7, capability: 'Cancel Policy', desc: 'Request cancellation' },
  { step: 8, capability: 'Renew Policy', desc: 'Support policy renewal workflows' },
];

export const API_USERS = [
  'Software developers at fintech and HR-tech companies',
  'Engineering teams at NBFCs and insurance brokers',
  'Developers at HR, payroll and benefits platforms',
];
