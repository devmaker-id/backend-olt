```prisma
backend-olt/
├── README.md
├── docs
│   ├── API_view.md
│   ├── INSTALLATION.md
│   ├── api
│   │   ├── auth.md
│   │   ├── endpoint.md
│   │   ├── olt.md
│   │   ├── onu.md
│   │   ├── replacement.md
│   │   ├── telegram-bot.md
│   │   ├── telegram.md
│   │   └── users.md
│   ├── dev
│   │   ├── api-conventions.md
│   │   ├── backend-architecture.md
│   │   ├── changelog.md
│   │   ├── frontend-architecture.md
│   │   ├── project-context-2.md
│   │   ├── project-context.md
│   │   ├── roadmap.md
│   │   └── structur-project-full.md
│   ├── dev_frontend.md
│   ├── episode_1_backend_olt_documentation.md
│   ├── folder_structure.md
│   ├── frontend_web.md
│   ├── list-folder.md
│   ├── runing_cloudflared.md
│   ├── syslog.md
│   ├── telegram.modules.doc.md
│   ├── tree
│   │   ├── 1.md
│   │   ├── backend.md
│   │   └── web_structur.md
│   └── v0.6.0.md
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20260524125034_network
│   │   │   └── migration.sql
│   │   ├── 20260525061456_add_no_internet_endpoint
│   │   │   └── migration.sql
│   │   ├── 20260526045041_add_telegram_users
│   │   │   └── migration.sql
│   │   ├── 20260526050843_fixed_role_telegram
│   │   │   └── migration.sql
│   │   ├── 20260526051118_fixed_role_telegram
│   │   │   └── migration.sql
│   │   ├── 20260526055516_fix_telegramrole
│   │   │   └── migration.sql
│   │   ├── 20260528144240_add
│   │   │   └── migration.sql
│   │   ├── 20260529053431_add_name_comm_olt
│   │   │   └── migration.sql
│   │   ├── 20260529060038_fix_commentname_onu
│   │   │   └── migration.sql
│   │   ├── 20260529071834_add_optik_info
│   │   │   └── migration.sql
│   │   ├── 20260530040542_add_onu_event
│   │   │   └── migration.sql
│   │   ├── 20260531040144_fix_internet_no
│   │   │   └── migration.sql
│   │   ├── 20260605185118_add_telegrambot_manage
│   │   │   └── migration.sql
│   │   ├── 20260605185318_add_telegrambot_manage
│   │   │   └── migration.sql
│   │   ├── 20260605195157_add_telegram_bot_id
│   │   │   └── migration.sql
│   │   ├── 20260607130403_add_onu_replacment
│   │   │   └── migration.sql
│   │   ├── 20260607151612_add_onu_status_replaced
│   │   │   └── migration.sql
│   │   ├── 20260608161541_add_telegram_access_log
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── app.ts
│   ├── bootstrap
│   │   └── start-schedulers.ts
│   ├── config
│   │   ├── env.ts
│   │   └── prisma.ts
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.service.ts
│   │   ├── endpoint
│   │   │   ├── endpoint.controller.ts
│   │   │   ├── endpoint.routes.ts
│   │   │   ├── endpoint.service.ts
│   │   │   ├── endpoint.types.ts
│   │   │   └── endpoint.validation.ts
│   │   ├── logs
│   │   │   ├── logs.controller.ts
│   │   │   ├── logs.routes.ts
│   │   │   └── logs.service.ts
│   │   ├── olt
│   │   │   ├── olt.controller.ts
│   │   │   ├── olt.routes.ts
│   │   │   ├── olt.service.ts
│   │   │   ├── olt.sync.service.ts
│   │   │   ├── olt.types.ts
│   │   │   ├── olt.validation.ts
│   │   │   └── parsers
│   │   │       └── onu-list.parser.ts
│   │   ├── onu
│   │   │   ├── inventory
│   │   │   │   ├── onu-inventory.controller.ts
│   │   │   │   ├── onu-inventory.routes.ts
│   │   │   │   ├── onu-inventory.service.ts
│   │   │   │   └── onu-inventory.types.ts
│   │   │   ├── onu.controller.ts
│   │   │   ├── onu.routes.ts
│   │   │   ├── onu.service.ts
│   │   │   ├── onu.types.ts
│   │   │   ├── onu.validation.ts
│   │   │   └── reconciliation
│   │   │       ├── onu-event.service.ts
│   │   │       ├── onu-reconcile.scheduler.ts
│   │   │       ├── onu-reconcile.service.ts
│   │   │       └── onu-reconcile.types.ts
│   │   ├── onu-replacement
│   │   │   ├── onu-replacement.controller.ts
│   │   │   ├── onu-replacement.routes.ts
│   │   │   ├── onu-replacement.service.ts
│   │   │   └── onu-replacement.types.ts
│   │   ├── telegram
│   │   │   ├── telegram.auth.ts
│   │   │   ├── telegram.controller.ts
│   │   │   ├── telegram.routes.ts
│   │   │   ├── telegram.service.ts
│   │   │   ├── telegram.types.ts
│   │   │   └── telegram.validation.ts
│   │   ├── telegram-bot
│   │   │   ├── telegram-bot.controller.ts
│   │   │   ├── telegram-bot.routes.ts
│   │   │   ├── telegram-bot.service.ts
│   │   │   ├── telegram-bot.types.ts
│   │   │   ├── telegram-bot.utils.ts
│   │   │   └── telegram-bot.validation.ts
│   │   └── users
│   │       ├── dto
│   │       │   ├── change-password.dto.ts
│   │       │   ├── reate-user.dto.ts
│   │       │   ├── update-profile.dto.ts
│   │       │   └── update-user.dto.ts
│   │       ├── types
│   │       │   └── user.types.ts
│   │       ├── users.controller.ts
│   │       ├── users.routes.ts
│   │       ├── users.service.ts
│   │       └── validation
│   │           └── users.validation.ts
│   ├── plugins
│   │   └── jwt.ts
│   ├── scripts
│   │   ├── hisfocus
│   │   │   ├── test-adapter.ts
│   │   │   ├── test-connect.ts
│   │   │   ├── test-delete-onu.ts
│   │   │   ├── test-enable.ts
│   │   │   ├── test-login.ts
│   │   │   ├── test-onu-info.ts
│   │   │   ├── test-onu-list.ts
│   │   │   ├── test-reconcile-olt-v2.ts
│   │   │   ├── test-reconcile-olt.ts
│   │   │   └── test-reconcile.ts
│   │   ├── test-reconcile-olt.ts
│   │   └── test-reconcile.ts
│   ├── server.ts
│   ├── services
│   │   ├── cache
│   │   │   └── event.cooldown.ts
│   │   ├── network
│   │   │   ├── core
│   │   │   │   ├── connection.manager.ts
│   │   │   │   └── network.factory.ts
│   │   │   ├── hisfocus
│   │   │   │   ├── hisfocus.adapter.ts
│   │   │   │   ├── hisfocus.commands.ts
│   │   │   │   ├── hisfocus.parser.ts
│   │   │   │   ├── hisfocus.types.ts
│   │   │   │   ├── telnet.session.ts
│   │   │   │   └── telnet.transport.ts
│   │   │   ├── transport
│   │   │   │   └── telnet.transport_v1.ts
│   │   │   └── vendors
│   │   │       └── hisfocus
│   │   │           ├── hisfocus.adapter.ts
│   │   │           ├── hisfocus.commands.ts
│   │   │           ├── hisfocus.parser.ts
│   │   │           └── hisfocus.types.ts
│   │   ├── syslog
│   │   │   ├── core
│   │   │   │   ├── syslog.server.ts
│   │   │   │   └── syslog.types.ts
│   │   │   └── vendors
│   │   │       └── hisfocus
│   │   │           ├── hisfocus.syslog.parser.ts
│   │   │           └── hisfocus.syslog.service.ts
│   │   └── telegram
│   │       ├── commands
│   │       │   ├── authorize.command.ts
│   │       │   ├── help.command.ts
│   │       │   ├── inet.command.ts
│   │       │   ├── onu-offline.command.ts
│   │       │   └── signal.command.ts
│   │       ├── messages
│   │       │   └── build-onu-alert.ts
│   │       ├── session
│   │       │   ├── telegram-session.handler.ts
│   │       │   └── telegram.session.ts
│   │       ├── telegram.commands.ts
│   │       ├── telegram.router.ts
│   │       ├── telegram.service.ts
│   │       ├── telegram.types.ts
│   │       └── telegram.webhook.ts
│   ├── types
│   │   └── fastify.d.ts
│   └── utils
│       ├── classify-rx-power.ts
│       ├── formatter.ts
│       ├── generate-internet-no.ts
│       └── normalize-onu.ts
├── struktur-folder.md
├── tsconfig.json
└── web
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