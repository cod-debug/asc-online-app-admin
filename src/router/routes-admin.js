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
        // component: () => import('pages/Index.vue')
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
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'number-of-multiple-application-allowed',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'type-of-rational',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'screener-reviewer-pairs',
        // component: () => import('pages/Index.vue')
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
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'brands',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'product',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'type-of-medium',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'type-of-executions',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'medium-executions-controller',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'holidays',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 's1-s2-expiration-periods',
        // component: () => import('pages/Index.vue')
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
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'brand-penalties',
        // component: () => import('pages/Index.vue')
      },
      {
        path: 'company-penalties',
        // component: () => import('pages/Index.vue')
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
      }
    ]
  },
];

