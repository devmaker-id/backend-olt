./web/
├── README.md
├── components.json
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
│   │   │   └── pages
│   │   │       └── dashboard.page.tsx
│   │   ├── endpoint
│   │   │   ├── api
│   │   │   │   └── endpoint.api.ts
│   │   │   ├── hooks
│   │   │   │   ├── use-endpoint-realtime.ts
│   │   │   │   └── use-endpoint.ts
│   │   │   ├── pages
│   │   │   │   ├── endpoint-detail.page.tsx
│   │   │   │   └── endpoint-list.page.tsx
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
│   │   │   ├── pages
│   │   │   │   ├── olt-create.page.tsx
│   │   │   │   ├── olt-detail.page.tsx
│   │   │   │   ├── olt-edit.page.tsx
│   │   │   │   └── olt-list.page.tsx
│   │   │   └── types
│   │   │       └── olt.types.ts
│   │   ├── onu
│   │   │   ├── api
│   │   │   │   └── onu.api.ts
│   │   │   ├── hooks
│   │   │   │   └── use-unauthorized-onus.ts
│   │   │   ├── pages
│   │   │   │   └── unregistered-onu.page.tsx
│   │   │   └── types
│   │   │       └── onu.types.ts
│   │   ├── onu-replacement
│   │   │   ├── api
│   │   │   │   └── onu-replacement.api.ts
│   │   │   ├── hooks
│   │   │   │   ├── use-onu-replacement.ts
│   │   │   │   ├── use-onu-replacements.ts
│   │   │   │   └── use-replace-onu.ts
│   │   │   ├── pages
│   │   │   │   ├── onu-replacement-detail.page.tsx
│   │   │   │   └── onu-replacement-list.page.tsx
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
│   │   │   ├── pages
│   │   │   │   └── telegram-access-logs.page.tsx
│   │   │   └── types
│   │   │       └── telegram-access-log.types.ts
│   │   ├── telegram
│   │   │   ├── api
│   │   │   │   └── telegram.api.ts
│   │   │   ├── hooks
│   │   │   │   ├── use-create-telegram-user.ts
│   │   │   │   ├── use-delete-telegram-user.ts
│   │   │   │   └── use-telegram-users.ts
│   │   │   ├── pages
│   │   │   │   └── telegram-users.page.tsx
│   │   │   └── types
│   │   │       └── telegram.types.ts
│   │   └── telegram-bot
│   │       ├── api
│   │       │   └── telegram-bot.api.ts
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
│   │       ├── pages
│   │       │   ├── telegram-bot-create.page.tsx
│   │       │   ├── telegram-bot-detail.page.tsx
│   │       │   ├── telegram-bot-edit.page.tsx
│   │       │   └── telegram-bot-list.page.tsx
│   │       └── types
│   │           └── telegram-bot.types.ts
│   ├── shared
│   │   ├── components
│   │   │   ├── confirm-delete.tsx
│   │   │   ├── data-table
│   │   │   │   ├── action-buttons.tsx
│   │   │   │   ├── data-table-pagination.tsx
│   │   │   │   ├── search-input.tsx
│   │   │   │   └── status-badge.tsx
│   │   │   ├── data-table-toolbar.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-state.tsx
│   │   │   ├── loading-state.tsx
│   │   │   ├── page-container.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── summary-card.tsx
│   │   ├── layouts
│   │   │   ├── auth.layout.tsx
│   │   │   └── dashboard.layout.tsx
│   │   ├── lib
│   │   │   └── api.ts
│   │   ├── pages
│   │   │   ├── error.page.tsx
│   │   │   └── not-found.page.tsx
│   │   └── utils
│   │       └── auth.ts
│   └── types
│       ├── auth.types.ts
│       └── onu.types.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

63 directories, 141 files
