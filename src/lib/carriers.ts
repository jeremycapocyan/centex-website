// Official support and payment sources are recorded per carrier.
// Reviewed October 14, 2026. See docs/carrier-contacts.md for routing details.
export type CarrierContact = { label: string; phone: string };
export type Carrier = { slug: string; name: string; website: string; contacts: CarrierContact[]; payment: { url: string; label: string; note: string }; sources: string[] };

export const carriers: Carrier[] = [
  {
    "slug": "bristol-west",
    "name": "Bristol West",
    "website": "https://www.bristolwest.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "888-888-0080"
      },
      {
        "label": "Claims",
        "phone": "800-274-7865"
      }
    ],
    "payment": {
      "url": "https://www.bristolwest.com/bwcss/bw-make-payment?lang=en",
      "label": "Make a payment",
      "note": "No login required. Have your policy details ready."
    },
    "sources": [
      "https://www.foremost.com/contact/",
      "https://www.bristolwest.com/",
      "https://www.bristolwest.com/bwcss/bw-make-payment?lang=en"
    ]
  },
  {
    "slug": "btis",
    "name": "BTIS",
    "website": "https://my.btisinc.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "877-649-6682"
      },
      {
        "label": "DirectPay billing",
        "phone": "888-494-4222"
      }
    ],
    "payment": {
      "url": "https://www.btisdirectpay.com/",
      "label": "BTIS DirectPay",
      "note": "For BTIS DirectPay accounts. Carrier-billed or agency-billed policies may use a different payment route; check your invoice."
    },
    "sources": [
      "https://marketplace.btisinc.com/about-btis/contact-department/",
      "https://marketplace.btisinc.com/producer-tools/payment-information/",
      "https://www.btisdirectpay.com/"
    ]
  },
  {
    "slug": "foremost",
    "name": "Foremost",
    "website": "https://www.foremost.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-527-3905"
      },
      {
        "label": "Billing & payments",
        "phone": "800-532-4221"
      },
      {
        "label": "Claims",
        "phone": "800-527-3907"
      }
    ],
    "payment": {
      "url": "https://www.myforemostaccount.com/",
      "label": "Pay your bill",
      "note": "Contact Centex Insurance Solutions first for policy changes. This service number can help if you cannot reach your agent."
    },
    "sources": [
      "https://www.foremost.com/contact/",
      "https://www.myforemostaccount.com/"
    ]
  },
  {
    "slug": "geico",
    "name": "GEICO",
    "website": "https://www.geico.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-207-7847"
      }
    ],
    "payment": {
      "url": "https://www.geico.com/information/make-a-payment/",
      "label": "Payment options",
      "note": "Select your policy type. Home and other partner policies may have different billing contacts."
    },
    "sources": [
      "https://www.geico.com/contact-us/phone/",
      "https://www.geico.com/information/make-a-payment/"
    ]
  },
  {
    "slug": "great-american-insurance-company",
    "name": "Great American Insurance Company",
    "website": "https://www.greatamericaninsurancegroup.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-545-4269"
      },
      {
        "label": "Claims",
        "phone": "844-424-4669"
      }
    ],
    "payment": {
      "url": "https://www.greatamericaninsurancegroup.com/login",
      "label": "Payment portals",
      "note": "Choose the payment portal for your policy. Crop and trucking have separate payment options."
    },
    "sources": [
      "https://www.greatamericaninsurancegroup.com/contact",
      "https://www.greatamericaninsurancegroup.com/login"
    ]
  },
  {
    "slug": "hiscox",
    "name": "Hiscox",
    "website": "https://www.hiscox.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "866-283-7545"
      },
      {
        "label": "Claims",
        "phone": "866-424-8508"
      }
    ],
    "payment": {
      "url": "https://www.hiscox.com/manage-your-policy",
      "label": "Policy & billing help",
      "note": "Call customer service for payment assistance or to update your credit card or billing address."
    },
    "sources": [
      "https://www.hiscox.com/contact-us",
      "https://www.hiscox.com/manage-your-policy"
    ]
  },
  {
    "slug": "homeowners-of-america",
    "name": "Homeowners of America",
    "website": "https://hoaic.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "866-407-9896"
      }
    ],
    "payment": {
      "url": "https://portal.hoaic.com/login",
      "label": "Billing & policy portal",
      "note": "Sign in to view billing and payment details. Contact customer service for payment assistance."
    },
    "sources": [
      "https://hoaic.com/contact-us/",
      "https://portal.hoaic.com/login"
    ]
  },
  {
    "slug": "liberty-mutual",
    "name": "Liberty Mutual",
    "website": "https://www.libertymutual.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-290-8711"
      },
      {
        "label": "Billing & payments",
        "phone": "800-824-7317"
      },
      {
        "label": "Claims",
        "phone": "800-225-2467"
      }
    ],
    "payment": {
      "url": "https://www.libertymutual.com/customer-support/billing-and-payment-options",
      "label": "Payment options",
      "note": "Personal insurance payments. The billing number is an automated payment service."
    },
    "sources": [
      "https://www.libertymutual.com/customer-support",
      "https://www.libertymutual.com/customer-support/billing-and-payment-options"
    ]
  },
  {
    "slug": "mercury",
    "name": "Mercury",
    "website": "https://www.mercuryinsurance.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-503-3724"
      },
      {
        "label": "Claims",
        "phone": "800-503-3724"
      }
    ],
    "payment": {
      "url": "https://www.mercuryinsurance.com/payment/one-time-payment.html",
      "label": "Make a payment",
      "note": "Customer service can also help with billing and claims."
    },
    "sources": [
      "https://www.mercuryinsurance.com/contact.html",
      "https://www.mercuryinsurance.com/payment/faq.html",
      "https://www.mercuryinsurance.com/payment/one-time-payment.html"
    ]
  },
  {
    "slug": "nationwide-life",
    "name": "Nationwide Life",
    "website": "https://www.nationwide.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-848-6331"
      },
      {
        "label": "Billing & payments",
        "phone": "800-543-3747"
      },
      {
        "label": "Claims",
        "phone": "800-848-6331"
      }
    ],
    "payment": {
      "url": "https://www.nationwide.com/bill-pay",
      "label": "Life payment options",
      "note": "Choose Life Insurance on Nationwide's payment page. Online payment eligibility depends on your policy number."
    },
    "sources": [
      "https://www.nationwide.com/personal/contact/call-us/?tab=insurance",
      "https://www.nationwide.com/bill-pay"
    ]
  },
  {
    "slug": "progressive",
    "name": "Progressive",
    "website": "https://www.progressive.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "888-671-4405"
      },
      {
        "label": "Claims",
        "phone": "800-776-4737"
      }
    ],
    "payment": {
      "url": "https://www.progressive.com/rp/ezpay",
      "label": "Make a payment",
      "note": "Have your policy details ready. Commercial customer service: 888-240-9839."
    },
    "sources": [
      "https://www.progressive.com/contact-us/",
      "https://www.progressive.com/manage-policy/",
      "https://www.progressive.com/rp/ezpay"
    ]
  },
  {
    "slug": "safeco",
    "name": "Safeco",
    "website": "https://www.safeco.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-290-8711"
      }
    ],
    "payment": {
      "url": "https://www.safeco.com/customer-support",
      "label": "Billing & account access",
      "note": "Safeco's public support page now directs customers to Liberty Mutual. Follow the instructions for your policy or contact Centex Insurance Solutions."
    },
    "sources": [
      "https://www.safeco.com/customer-support"
    ]
  },
  {
    "slug": "texas-fair-plan",
    "name": "Texas Fair Plan",
    "website": "https://www.texasfairplan.org/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-979-6440"
      },
      {
        "label": "Claims",
        "phone": "800-979-6440"
      }
    ],
    "payment": {
      "url": "https://www.texasfairplan.org/epayments/",
      "label": "Pay your premium",
      "note": "Policy questions: option 4. Claims: option 1. Use the TFPA payment system for FAIR Plan policies."
    },
    "sources": [
      "https://www.texasfairplan.org/about-us/contacts/",
      "https://www.texasfairplan.org/epayments/"
    ]
  },
  {
    "slug": "texas-mutual",
    "name": "Texas Mutual",
    "website": "https://www.texasmutual.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-859-5995"
      },
      {
        "label": "Claims",
        "phone": "800-859-5995"
      }
    ],
    "payment": {
      "url": "https://www.texasmutual.com/pay",
      "label": "Make a payment",
      "note": "For workers' compensation premiums. The automated phone system accepts outstanding invoices, not quote or renewal payments."
    },
    "sources": [
      "https://www.texasmutual.com/abouttxm/contact-us",
      "https://www.texasmutual.com/employers/employer-faq",
      "https://www.texasmutual.com/pay"
    ]
  },
  {
    "slug": "texas-windstorm",
    "name": "Texas Windstorm",
    "website": "https://www.twia.org/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "800-788-8247"
      },
      {
        "label": "Claims",
        "phone": "800-788-8247"
      }
    ],
    "payment": {
      "url": "https://www.twia.org/payments/",
      "label": "Payment options",
      "note": "Policy services: option 3. Claims: option 1. Guest Pay is for installments; use the portal for renewals or new policies. Phone payments are not offered."
    },
    "sources": [
      "https://www.twia.org/about-us/contact-us/",
      "https://www.twia.org/payments/"
    ]
  },
  {
    "slug": "travelers",
    "name": "Travelers",
    "website": "https://www.travelers.com/",
    "contacts": [
      {
        "label": "Customer service",
        "phone": "888-564-5043"
      },
      {
        "label": "Business billing",
        "phone": "800-252-2268"
      },
      {
        "label": "Claims",
        "phone": "800-252-4633"
      }
    ],
    "payment": {
      "url": "https://www.travelers.com/pay-your-bill?lob=pi",
      "label": "Payment options",
      "note": "Customer service is for personal policies. The business billing line is listed separately; choose Individuals or Business on the payment page."
    },
    "sources": [
      "https://www.travelers.com/contact-us",
      "https://www.travelers.com/pay-your-bill?lob=pi"
    ]
  },
  {
    "slug": "usli",
    "name": "USLI",
    "website": "https://www.usli.com/",
    "contacts": [
      {
        "label": "Billing & customer support",
        "phone": "866-632-2003"
      },
      {
        "label": "Claims (option 3)",
        "phone": "888-523-5545"
      }
    ],
    "payment": {
      "url": "https://myaccount.usli.com/",
      "label": "Pay your bill",
      "note": "For policies billed directly by USLI. This number handles billing, registration and payment assistance; contact Centex Insurance Solutions for other policy questions."
    },
    "sources": [
      "https://www.usli.com/support",
      "https://myaccount.usli.com/"
    ]
  }
];

export const premiumFinance = {
  "name": "Imperial PFS (IPFS)",
  "portal": "https://centexinsurance.ipfs.com/",
  "locations": "https://www.ipfs.com/en/locations",
  "contacts": [
    {
      "label": "TXA / Austin",
      "phone": "866-412-6701"
    },
    {
      "label": "TXP / Dallas",
      "phone": "855-891-2621"
    },
    {
      "label": "TXH / Houston",
      "phone": "800-247-6129"
    }
  ]
};
