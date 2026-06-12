```prisma
backend-olt/web
├── README.md
├── components.json
├── dist
│   ├── assets
│   │   ├── dashboard.page-bV0JrOf9.js
│   │   ├── geist-cyrillic-ext-wght-normal-DjL33-gN.woff2
│   │   ├── geist-cyrillic-wght-normal-BEAKL7Jp.woff2
│   │   ├── geist-latin-ext-wght-normal-DC-KSUi6.woff2
│   │   ├── geist-latin-wght-normal-BgDaEnEv.woff2
│   │   ├── geist-vietnamese-wght-normal-6IgcOCM7.woff2
│   │   ├── index-BXI-OoGp.css
│   │   └── index-VPRj-YaY.js
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── auth.api.ts
│   │   ├── endpoint.api.ts
│   │   └── onu.api.ts
│   ├── app
│   │   ├── providers.tsx
│   │   └── router.tsx
│   ├── assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components
│   │   └── ui
│   │       ├── alert-dialog.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── pagination.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── hooks
│   │   ├── use-authorize-onu.ts
│   │   ├── use-endpoints.ts
│   │   ├── use-login.ts
│   │   └── use-unregistered-onus.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── modules
│   │   ├── auth
│   │   │   ├── components
│   │   │   │   ├── logout-button.tsx
│   │   │   │   └── protected-route.tsx
│   │   │   └── pages
│   │   │       ├── login.page.tsx
│   │   │       └── root.page.tsx
│   │   ├── dashboard
│   │   │   ├── api
│   │   │   │   └── dashboard.api.ts
│   │   │   ├── hooks
│   │   │   │   └── use-summary.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   └── dashboard.page.tsx
│   │   │   └── routes.tsx
│   │   ├── endpoint
│   │   │   ├── api
│   │   │   │   └── endpoint.api.ts
│   │   │   ├── components
│   │   │   │   ├── endpoint-actions.tsx
│   │   │   │   ├── endpoint-delete-button.tsx
│   │   │   │   ├── endpoint-form.tsx
│   │   │   │   ├── endpoint-info-card.tsx
│   │   │   │   ├── endpoint-onu-card.tsx
│   │   │   │   ├── endpoint-pagination.tsx
│   │   │   │   ├── endpoint-realtime-card.tsx
│   │   │   │   ├── endpoint-replace-onu-card.tsx
│   │   │   │   ├── endpoint-search.tsx
│   │   │   │   ├── endpoint-status-badge.tsx
│   │   │   │   └── endpoint-table.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-create-endpoint.ts
│   │   │   │   ├── use-delete-endpoint.ts
│   │   │   │   ├── use-endpoint-realtime.ts
│   │   │   │   ├── use-endpoint.ts
│   │   │   │   ├── use-endpoints.ts
│   │   │   │   └── use-update-endpoint.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   ├── endpoint-create.page.tsx
│   │   │   │   ├── endpoint-detail.page.tsx
│   │   │   │   ├── endpoint-edit.page.tsx
│   │   │   │   └── endpoint-list.page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── types
│   │   │       └── endpoint.types.ts
│   │   ├── olt
│   │   │   ├── api
│   │   │   │   └── olt.api.ts
│   │   │   ├── components
│   │   │   │   ├── olt-actions.tsx
│   │   │   │   ├── olt-form.tsx
│   │   │   │   ├── olt-info-card.tsx
│   │   │   │   ├── olt-table.tsx
│   │   │   │   ├── olt-vendor-badge.tsx
│   │   │   │   ├── optical-port-table.tsx
│   │   │   │   └── optical-status-badge.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-connect-olt.ts
│   │   │   │   ├── use-create-olt.ts
│   │   │   │   ├── use-delete-olt.ts
│   │   │   │   ├── use-olt-optical.ts
│   │   │   │   ├── use-olt.ts
│   │   │   │   ├── use-olts.ts
│   │   │   │   └── use-update-olt.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   ├── olt-create.page.tsx
│   │   │   │   ├── olt-detail.page.tsx
│   │   │   │   ├── olt-edit.page.tsx
│   │   │   │   └── olt-list.page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── types
│   │   │       └── olt.types.ts
│   │   ├── onu
│   │   │   ├── api
│   │   │   │   └── onu.api.ts
│   │   │   ├── components
│   │   │   │   ├── authorize-onu-dialog.tsx
│   │   │   │   ├── unregistered-onu-card.tsx
│   │   │   │   ├── unregistered-onu-pagination.tsx
│   │   │   │   ├── unregistered-onu-summary.tsx
│   │   │   │   ├── unregistered-onu-table.tsx
│   │   │   │   └── unregistered-onu-toolbar.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-authorize-onu.ts
│   │   │   │   └── use-unauthorized-onus.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   └── unregistered-onu.page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── types
│   │   │       └── onu.types.ts
│   │   ├── onu-replacement
│   │   │   ├── api
│   │   │   │   └── onu-replacement.api.ts
│   │   │   ├── components
│   │   │   │   ├── onu-replacement-detail-sheet.tsx
│   │   │   │   ├── onu-replacement-summary.tsx
│   │   │   │   ├── onu-replacement-table.tsx
│   │   │   │   └── onu-replacement-toolbar.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-onu-replacement.ts
│   │   │   │   ├── use-onu-replacements.ts
│   │   │   │   └── use-replace-onu.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   └── onu-replacements.page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── types
│   │   │       └── onu-replacement.types.ts
│   │   ├── system-logs
│   │   │   ├── api
│   │   │   │   └── telegram-access-log.api.ts
│   │   │   ├── components
│   │   │   │   ├── access-log-detail-sheet.tsx
│   │   │   │   ├── access-log-filter.tsx
│   │   │   │   ├── access-log-search.tsx
│   │   │   │   ├── access-log-sort.tsx
│   │   │   │   ├── access-log-status-badge.tsx
│   │   │   │   └── access-log-table.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-delete-telegram-access-log.ts
│   │   │   │   └── use-telegram-access-logs.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   └── telegram-access-logs.page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── types
│   │   │       └── telegram-access-log.types.ts
│   │   ├── telegram
│   │   │   ├── api
│   │   │   │   └── telegram.api.ts
│   │   │   ├── components
│   │   │   │   ├── create-telegram-user-dialog.tsx
│   │   │   │   ├── edit-telegram-user-dialog.tsx
│   │   │   │   ├── telegram-user-role-badge.tsx
│   │   │   │   ├── telegram-user-status-badge.tsx
│   │   │   │   ├── telegram-user-table.tsx
│   │   │   │   └── telegram-user-toolbar.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-create-telegram-user.ts
│   │   │   │   ├── use-delete-telegram-user.ts
│   │   │   │   ├── use-telegram-users.ts
│   │   │   │   └── use-update-telegram-user.ts
│   │   │   ├── navigation.ts
│   │   │   ├── pages
│   │   │   │   └── telegram-users.page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── types
│   │   │       └── telegram.types.ts
│   │   └── telegram-bot
│   │       ├── api
│   │       │   └── telegram-bot.api.ts
│   │       ├── components
│   │       │   ├── create-telegram-bot-dialog.tsx
│   │       │   ├── edit-telegram-bot-dialog.tsx
│   │       │   ├── telegram-bot-detail-sheet.tsx
│   │       │   ├── telegram-bot-status-badge.tsx
│   │       │   ├── telegram-bot-summary.tsx
│   │       │   ├── telegram-bot-table.tsx
│   │       │   └── telegram-bot-toolbar.tsx
│   │       ├── hooks
│   │       │   ├── use-create-telegram-bot.ts
│   │       │   ├── use-delete-telegram-bot.ts
│   │       │   ├── use-delete-webhook.ts
│   │       │   ├── use-set-webhook.ts
│   │       │   ├── use-telegram-bot.ts
│   │       │   ├── use-telegram-bots.ts
│   │       │   ├── use-test-telegram-bot.ts
│   │       │   ├── use-update-telegram-bot.ts
│   │       │   └── use-webhook-info.ts
│   │       ├── navigation.ts
│   │       ├── pages
│   │       │   └── telegram-bots.page.tsx
│   │       ├── routes.tsx
│   │       └── types
│   │           └── telegram-bot.types.ts
│   ├── shared
│   │   ├── components
│   │   │   ├── confirm-delete.tsx
│   │   │   ├── data-table
│   │   │   │   ├── action-buttons.tsx
│   │   │   │   ├── data-table-pagination.tsx
│   │   │   │   ├── empty-state.tsx
│   │   │   │   ├── loading-state.tsx
│   │   │   │   ├── page-size-select.tsx
│   │   │   │   ├── search-input.tsx
│   │   │   │   └── status-badge.tsx
│   │   │   ├── data-table-toolbar.tsx
│   │   │   ├── detail
│   │   │   │   ├── detail-field.tsx
│   │   │   │   └── detail-sheet-section.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-state.tsx
│   │   │   ├── loading-state.tsx
│   │   │   ├── page-container.tsx
│   │   │   ├── page-header.tsx
│   │   │   └── summary-card.tsx
│   │   ├── layouts
│   │   │   ├── auth.layout.tsx
│   │   │   └── dashboard.layout.tsx
│   │   ├── lib
│   │   │   ├── api.ts
│   │   │   ├── lazy-page.ts
│   │   │   └── toast.ts
│   │   ├── navigation
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── mobile-sidebar.tsx
│   │   │   ├── navigation.types.ts
│   │   │   ├── sidebar-config.ts
│   │   │   ├── sidebar-content.tsx
│   │   │   ├── sidebar-item.tsx
│   │   │   ├── sidebar-section.tsx
│   │   │   └── sidebar.tsx
│   │   ├── pages
│   │   │   ├── error.page.tsx
│   │   │   └── not-found.page.tsx
│   │   ├── types
│   │   │   └── app-route.types.ts
│   │   └── utils
│   │       └── auth.ts
│   └── types
│       ├── auth.types.ts
│       └── onu.types.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```