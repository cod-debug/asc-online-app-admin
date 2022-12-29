export const maintenanceRoutes = [
  {
    path: 'maintenance',
    component: () => import('pages/Admin/AdminIndex.vue'),
    children: [
      {
        path: 'accounts',
        component: () => import('pages/Admin/Account/Account/AccountIndex.vue')
      },
      {
        path: 'announcement-content',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'affiliation',
        component: () => import('pages/Admin/Maintenance/Affiliation/AffiliationIndex.vue')
      },
      {
        path: 'login-image',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'type-of-application',
        component: () => import('components/Admin/TypeOfApplication/ApplicationTypeIndex.vue'),
        children: [
          {
            path: '',
            name: 'type-of-application-lists',
            component: () => import('components/Admin/TypeOfApplication/ApplicationTypeLists.vue'),
          },
          {
            path: 'add',
            name: 'type-of-application-add',
            component: () => import('components/Admin/TypeOfApplication/ApplicationTypeAdd.vue'),
          }
        ]
      },
      {
        path: 'dialects',
        component: () => import('components/Admin/Dialect/DialectIndex.vue'),
        children: [
          {
            path: '',
            name: 'dialect-lists',
            component: () => import('components/Admin/Dialect/DialectLists.vue'),
          },
          {
            path: 'add',
            name: 'dialect-add',
            component: () => import('components/Admin/Dialect/DialectAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'dialect-update',
            component: () => import('components/Admin/Dialect/DialectAdd.vue'),
          }
        ]
      },
      {
        path: 'type-of-document',
        component: () => import('components/Admin/TypeOfDocu/DocuTypeIndex.vue'),
        children: [
          {
            path: '',
            name: 'type-of-document-lists',
            component: () => import('components/Admin/TypeOfDocu/DocuTypeLists.vue'),
          },
          {
            path: 'add',
            name: 'type-of-document-add',
            component: () => import('components/Admin/TypeOfDocu/DocuTypeAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'type-of-document-update',
            component: () => import('components/Admin/TypeOfDocu/DocuTypeAdd.vue'),
          }
        ]
      },
      {
        path: 'type-of-main-documents',
        component: () => import('components/Admin/TypeOfMainDocu/MainDocuTypeIndex.vue'),
        children: [
          {
            path: '',
            name: 'type-of-main-document-lists',
            component: () => import('components/Admin/TypeOfMainDocu/MainDocuTypeLists.vue'),
          },
          {
            path: 'add',
            name: 'type-of-main-document-add',
            component: () => import('components/Admin/TypeOfMainDocu/MainDocuTypeAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'type-of-main-document-update',
            component: () => import('components/Admin/TypeOfMainDocu/MainDocuTypeAdd.vue'),
          }
        ]
      },
      {
        path: 'document-size',
        component: () => import('components/Admin/DocumentFileSize/DocuFSIndex.vue'),
        children: [
          {
            path: '',
            name: 'document-size-lists',
            component: () => import('components/Admin/DocumentFileSize/DocuFSLists.vue'),
          },
          {
            path: 'add',
            name: 'document-size-add',
            component: () => import('components/Admin/DocumentFileSize/DocuFSAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'document-size-update',
            component: () => import('components/Admin/DocumentFileSize/DocuFSAdd.vue'),
          }
        ]
      },
      {
        path: 'email-notification',
        component: () => import('components/Admin/Email/EmailIndex.vue'),
        children: [
          {
            path: '',
            name: 'email-lists',
            component: () => import('components/Admin/Email/EmailLists.vue'),
          },
          {
            path: 'add',
            name: 'email-add',
            component: () => import('components/Admin/Email/EmailAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'email-update',
            component: () => import('components/Admin/Email/EmailAdd.vue'),
          }
        ]
      },
      {
        path: 'payment-type',
        component: () => import('components/Admin/PaymentType/PaymentIndex.vue'),
        children: [
          {
            path: '',
            name: 'payment-lists',
            component: () => import('components/Admin/PaymentType/PaymentLists.vue'),
          },
          {
            path: 'add',
            name: 'payment-add',
            component: () => import('components/Admin/PaymentType/PaymentAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'payment-update',
            component: () => import('components/Admin/PaymentType/PaymentAdd.vue'),
          }
        ]
      },
      {
        path: 'weekly-user-schedule',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'type-of-reason',
        component: () => import('components/Admin/Reason/ReasonIndex.vue'),
        children: [
          {
            path: '',
            name: 'reason-lists',
            component: () => import('components/Admin/Reason/ReasonLists.vue'),
          },
          {
            path: 'add',
            name: 'reason-add',
            component: () => import('components/Admin/Reason/ReasonAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'reason-update',
            component: () => import('components/Admin/Reason/ReasonAdd.vue'),
          }
        ]
      },
      {
        path: 'number-of-multiple-application-allowed',
        component: () => import('components/Admin/NumberOfMultipleAppAllowed/NOMAIndex.vue'),
        children: [
          {
            path: '',
            name: 'noma-lists',
            component: () => import('components/Admin/NumberOfMultipleAppAllowed/NOMALists.vue'),
          },
          {
            path: 'add',
            name: 'noma-add',
            component: () => import('components/Admin/NumberOfMultipleAppAllowed/NOMAAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'noma-update',
            component: () => import('components/Admin/NumberOfMultipleAppAllowed/NOMAAdd.vue'),
          }
        ]
      },
      {
        path: 'type-of-rational',
        component: () => import('components/Admin/Rationale/RationaleIndex.vue'),
        children: [
          {
            path: '',
            name: 'rational-lists',
            component: () => import('components/Admin/Rationale/RationaleLists.vue'),
          },
          {
            path: 'add',
            name: 'rational-add',
            component: () => import('components/Admin/Rationale/RationaleAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'rational-update',
            component: () => import('components/Admin/Rationale/RationaleAdd.vue'),
          }
        ]
      },
      {
        path: 'screener-reviewer-pairs',
        component: () => import('components/Admin/ScreenerReviewerPair/SRPIndex.vue'),
        children: [
          {
            path: '',
            name: 'srp-lists',
            component: () => import('components/Admin/ScreenerReviewerPair/SRPLists.vue'),
          },
          {
            path: 'add',
            name: 'srp-add',
            component: () => import('components/Admin/ScreenerReviewerPair/SRPAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'srp-update',
            component: () => import('components/Admin/ScreenerReviewerPair/SRPAdd.vue'),
          }
        ]
      },
      {
        path: 'qr-and-bar-code-checker',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'accounts',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'category',
        component: () => import('components/Admin/Category/CategoryIndex.vue'),
        children: [
          {
            path: '',
            name: 'category-lists',
            component: () => import('components/Admin/Category/CategoryLists.vue'),
          },
          {
            path: 'add',
            name: 'category-add',
            component: () => import('components/Admin/Category/CategoryAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'category-update',
            component: () => import('components/Admin/Category/CategoryAdd.vue'),
          }
        ]
      },
      {
        path: 'brands',
        component: () => import('components/Admin/Brand/BrandIndex.vue'),
        children: [
          {
            path: '',
            name: 'brand-lists',
            component: () => import('components/Admin/Brand/BrandLists.vue'),
          },
          {
            path: 'add',
            name: 'brand-add',
            component: () => import('components/Admin/Brand/BrandAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'brand-update',
            component: () => import('components/Admin/Brand/BrandAdd.vue'),
          }
        ]
      },
      {
        path: 'product',
        component: () => import('components/Admin/Product/ProductIndex.vue'),
        children: [
          {
            path: '',
            name: 'product-lists',
            component: () => import('components/Admin/Product/ProductLists.vue'),
          },
          {
            path: 'add',
            name: 'product-add',
            component: () => import('components/Admin/Product/ProductAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'product-update',
            component: () => import('components/Admin/Product/ProductAdd.vue'),
          }
        ]
      },
      {
        path: 'type-of-clearance',
        component: () => import('components/Admin/TypeOfClearance/ClearanceIndex.vue'),
        children: [
          {
            path: '',
            name: 'clearance-lists',
            component: () => import('components/Admin/TypeOfClearance/ClearanceLists.vue'),
          },
          {
            path: 'add',
            name: 'clearance-add',
            component: () => import('components/Admin/TypeOfClearance/ClearanceAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'clearance-update',
            component: () => import('components/Admin/TypeOfClearance/ClearanceAdd.vue'),
          }
        ]
      },
      {
        path: 'type-of-medium',
        component: () => import('components/Admin/Medium/MediumIndex.vue'),
        children: [
          {
            path: '',
            name: 'medium-lists',
            component: () => import('components/Admin/Medium/MediumLists.vue'),
          },
          {
            path: 'add',
            name: 'medium-add',
            component: () => import('components/Admin/Medium/MediumAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'medium-update',
            component: () => import('components/Admin/Medium/MediumAdd.vue'),
          }
        ]
      },
      {
        path: 'type-of-executions',
        component: () => import('components/Admin/Execution/ExecutionIndex.vue'),
        children: [
          {
            path: '',
            name: 'execution-lists',
            component: () => import('components/Admin/Execution/ExecutionLists.vue'),
          },
          {
            path: 'add',
            name: 'execution-add',
            component: () => import('components/Admin/Execution/ExecutionAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'execution-update',
            component: () => import('components/Admin/Execution/ExecutionAdd.vue'),
          }
        ]
      },
      {
        path: 'medium-executions-controller',
        component: () => import('components/Admin/MediumExecution/MediumExecutionIndex.vue'),
        children: [
          {
            path: '',
            name: 'medium-execution-lists',
            component: () => import('components/Admin/MediumExecution/MediumExecutionLists.vue'),
          },
          {
            path: 'add',
            name: 'medium-execution-add',
            component: () => import('components/Admin/MediumExecution/MediumExecutionAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'medium-execution-update',
            component: () => import('components/Admin/MediumExecution/MediumExecutionAdd.vue'),
          }
        ]
      },
      {
        path: 'holidays',
        component: () => import('components/Admin/Holiday/HolidayIndex.vue'),
        children: [
          {
            path: '',
            name: 'holiday-lists',
            component: () => import('components/Admin/Holiday/HolidayLists.vue'),
          },
          {
            path: 'add',
            name: 'holiday-add',
            component: () => import('components/Admin/Holiday/HolidayAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'holiday-update',
            component: () => import('components/Admin/Holiday/HolidayAdd.vue'),
          }
        ]
      },
      {
        path: 's1-s2-expiration-periods',
        component: () => import('components/Admin/S1S2Expiration/ExpirationIndex.vue'),
        children: [
          {
            path: '',
            name: 's1-s2-expiration-lists',
            component: () => import('components/Admin/S1S2Expiration/ExpirationLists.vue'),
          },
          {
            path: 'add',
            name: 's1-s2-expiration-add',
            component: () => import('components/Admin/S1S2Expiration/ExpirationAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 's1-s2-expiration-update',
            component: () => import('components/Admin/S1S2Expiration/ExpirationAdd.vue'),
          }
        ]
      },
      {
        path: 's1-fees-settlement-period',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 's1-incomplete-decision-expiration-period',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'promissory-note-periods',
        component: () => import('components/Admin/PromissoryNotePeriod/PNPIndex.vue'),
        children: [
          {
            path: '',
            name: 'promissory-note-period-lists',
            component: () => import('components/Admin/PromissoryNotePeriod/PNPLists.vue'),
          },
          {
            path: 'add',
            name: 'promissory-note-period-add',
            component: () => import('components/Admin/PromissoryNotePeriod/PNPAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'promissory-note-period-update',
            component: () => import('components/Admin/PromissoryNotePeriod/PNPAdd.vue'),
          }
        ]
      },
      {
        path: 'brand-penalties',
        component: () => import('components/Admin/BrandPenalty/BrandPenaltyIndex.vue'),
        children: [
          {
            path: '',
            name: 'brand-penalty-lists',
            component: () => import('components/Admin/BrandPenalty/BrandPenaltyLists.vue'),
          },
          {
            path: 'add',
            name: 'brand-penalty-add',
            component: () => import('components/Admin/BrandPenalty/BrandPenaltyAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'brand-penalty-update',
            component: () => import('components/Admin/BrandPenalty/BrandPenaltyAdd.vue'),
          }
        ]
      },
      {
        path: 'company-penalties',
        component: () => import('components/Admin/CompanyPenalty/CompanyPenaltyIndex.vue'),
        children: [
          {
            path: '',
            name: 'company-penalty-lists',
            component: () => import('components/Admin/CompanyPenalty/CompanyPenaltyLists.vue'),
          },
          {
            path: 'add',
            name: 'company-penalty-add',
            component: () => import('components/Admin/CompanyPenalty/CompanyPenaltyAdd.vue'),
          },
          {
            path: 'update/:id',
            name: 'company-penalty-update',
            component: () => import('components/Admin/CompanyPenalty/CompanyPenaltyAdd.vue'),
          }
        ]
      },
      {
        path: 'asc-rates',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'asc-rates-special',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'announcement-content',
        component: () => import('components/Admin/Announcement/AnnouncementIndex.vue'),
        children: [
          {
            path: 'lists',
            name: 'announcement-lists',
            component: () => import('components/Admin/Announcement/AnnouncementLists.vue'),
          },
          {
            path: 'add',
            name: 'announcement-add',
            component: () => import('components/Admin/Announcement/AnnouncementAdd.vue'),
          },
          {
            path: 'update/:id',

            name: 'announcement-update',
            component: () => import('components/Admin/Announcement/AnnouncementAdd.vue'),
          }
        ]
      },
    ],
  },
];

export const accountRoutes = [
  {
    path: 'account/user-role',
    component: () => import('components/Admin/Account/UserRole.vue'),
  },
];

export const applicationRoutes = [
  {
    path: 'reassignment',
    // component: () => import('layouts/MainLayout.vue'),
  },
];

export const companyRoutes = [
  {
    path: 'company',
    component: () => import('components/Admin/Company/CompanyIndex.vue'),
    children: [
      {
        path: 'lists',
        name: 'company-lists',
        component: () => import('components/Admin/Company/CompanyList.vue')
      },
      {
        path: 'add',
        name: 'company-add',
        component: () => import('components/Admin/Company/CompanyAdd.vue')
      },
      {
        path: 'update/:id',

        name: 'company-update',
        component: () => import('components/Admin/Company/CompanyAdd.vue'),
      }
    ]
  },
];

export const S1applicationRoutes = [
  {
    path: 'application/s1',
    component: () => import('components/Admin/S1Applications/MainForm.vue'),
    children: [
      {
        path: 'lists',
        name: 's1-individual-lists',
        component: () => import('components/Admin/S1Applications/IndividualIndex.vue'),
      },
      {
        path: 'multiple',
        name: 's1-multiple-lists',
        component: () => import('components/Admin/S1Applications/MultipleIndex.vue'),
      },
      {
        path: 'special',
        name: 's1-special-lists',
        component: () => import('components/Admin/S1Applications/SpecialIndex.vue'),
      },
      {
        path: 'for-release',
        name: 's1-for-release-lists',
        component: () => import('components/Admin/S1Applications/ForRelease.vue'),
      },
      {
        path: 'released',
        name: 's1-released-lists',
        component: () => import('components/Admin/S1Applications/ReleasedIndex.vue'),
      },
      {
        name: "individual-application-update",
        path: "update/:id",
        component: () => import("pages/S1Applications/DetailsIndex.vue"),
      },
    ]
  },
];


export const S2applicationRoutes = [
  {
    path: 'application/s2',
    component: () => import('components/Admin/S2Applications/MainForm.vue'),
    children: [
      {
        path: 'lists',
        name: 's2-individual-lists',
        component: () => import('components/Admin/S2Applications/IndividualIndex.vue'),
      },
      {
        path: 'multiple',
        name: 's2-multiple-lists',
        component: () => import('components/Admin/S2Applications/MultipleIndex.vue'),
      },
      {
        path: 'special',
        name: 's2-special-lists',
        component: () => import('components/Admin/S2Applications/SpecialIndex.vue'),
      },
      {
        name: "s2-individual-application-update",
        path: "update/:id",
        component: () => import("pages/S2Applications/DetailsIndex.vue"),
      },
    ]
  },
];
