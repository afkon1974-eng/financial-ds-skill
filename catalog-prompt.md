# Каталог компонентов FinancialDS — словарь для генерации экранов

Сгенерирован `tools/gen-catalog-prompt.py` из `component-manifest.json`
(единственный источник). Рукописная правка = красные ворота
`catalog-prompt-fresh` (ds-gate). Перегенерация:
`python3 tools/gen-catalog-prompt.py`.

Правила для генерирующего агента:
1. Экран собирается ТОЛЬКО из компонентов `stable`. Остальные статусы —
   читать для контекста, в выдачу не включать.
2. Порядок выбора: `when` (сценарий совпал) → `not-for` (запрет перевешивает
   совпадение) → `pairs-with` (рядом ставят именно этих соседей) →
   `keywords` (RU+EN, маппинг описания/изображения).
3. `props` — имена и допустимые значения осей из кода (react_props);
   списки — исчерпывающие, менять/сужать значение вне списка нельзя,
   даже если тип TS шире. Примечания пропов (семантика, условия) —
   в спеке `components/<Имя>/`, код — по пути в первой строке.
4. Для экранов песочницы словарь блоков — MCP `list_blocks`; этот каталог —
   про React-ДС и маппинг «элемент описания → компонент».
5. Варианты/направления (темы, обложки, компоновки на выбор): любые ДВА
   варианта делят максимум ОДИН признак (палитра, типографика, композиция,
   плотность). Два+ общих признака = это одно направление в трёх оттенках —
   переделать, а не показывать (приём oil-ui, принято 21.11; анти-AI-slop).
6. Сетка метрик (DataItem): дефолт — ДВЕ колонки (эталон витрины
   site/preview/data-item.html: grid 1fr 1fr, паттерны label-value-pair /
   card-summary). Три и больше колонок — только если в задаче экрана названо
   обоснование (дашборд ключевых цифр), не дефолт генератора. Одна метрика —
   одна строка (detail-row). Статусные/текстовые метки — Tag, не ChipGroup
   (у ChipGroup not_for: status-only). Пара «основное + вторичное действие» —
   Buttons Group (ui_patterns: action-group).

Знаменатели: компонентов 74 · с ai_mapping 70 (нет: ListItem, SidebarMenu, StatusMessage, Slider) · с react_props 70 · с react_path 72 · статусы: stable 59, in-progress 12, planned 3.
generatedFrom: manifest v1.1.0, updated_at 2026-11-11.

## Компоненты

### DataItem — stable
src/components/DataItem/DataItem.tsx
when: label-value-pair, card-summary, detail-row, key-figure
not-for: form-field, section-heading, data-table, standalone-status
pairs-with: Badge, Tag, LinkText, Divider
keywords: подпись и значение, label value, data item, сводка, карточка, показатель, реквизит, key figure
props: size=[md|sm|lg] type:text | link | tag labelBottom:boolean label:string showHelp:boolean helpText:string value:ReactNode suffix:string valueIcon:ReactNode badge:ReactNode href:string onLinkClick:MouseEventHandler tagLabel:string tagSemantic:TagSemantic tagHighContrast:boolean

### Avatar — stable
src/components/Avatar/Avatar.tsx
when: user-identity, entity-marker, participant-list, account-owner
not-for: status-indicator, counter, clickable-label, decorative-image
pairs-with: Badge, Tag, DropdownMenu
keywords: аватар, avatar, инициалы, initials, фото профиля, profile picture, участники, стек аватаров, avatar stack, флаг, логотип
props: size=[xs|sm|md|lg|xl] shape:circle | square type:initials | icon | photo | flag | logo semantic:neutral | gold | dodger | sage | violet | coral | pink | olive fill:boolean highContrast:boolean initials:string icon:ReactNode src:string alt:string badge:boolean ring:boolean disabled:boolean label:string

### AvatarGroup — stable
src/components/Avatar/Avatar.tsx
when: participant-list, shared-with, team-members
not-for: named-list, table-column
pairs-with: Avatar
keywords: стек аватаров, avatar stack, avatar group, участники, +N
props: size=[xs|sm|md|lg|xl] max:number total:number children:ReactNode

### AvatarPair — stable
src/components/Avatar/Avatar.tsx
when: entity-relation, transfer-parties, currency-pair
not-for: participant-list, status-indicator
pairs-with: Avatar
keywords: пара аватаров, avatar pair, перевод между счетами, валютная пара, стороны сделки
props: size=[xs|sm|md|lg|xl] back:ReactElement<AvatarProps> front:ReactElement<AvatarProps>

### Alert — stable
src/components/Alert/Alert.tsx
when: inline-feedback, validation-message, system-message, warning-banner, info-block, error-block
not-for: toast-notification, modal, status-badge, passive-label
pairs-with: Button/Solid, Button/Ghost, Input
keywords: алерт, alert, предупреждение, ошибка, уведомление inline, сообщение системы, warning block, info block, validation error, ошибка валидации
props: intent=[info|positive|warning|negative] title:React.ReactNode description:React.ReactNode closable:boolean onClose:React.MouseEventHandler<HTMLButtonElement> closeAriaLabel:string children:React.ReactNode secondaryLabel:React.ReactNode onSecondaryClick:React.MouseEventHandler<HTMLButtonElement> tertiaryLabel:React.ReactNode onTertiaryClick:React.MouseEventHandler<HTMLButtonElement>

### Badge/Soft — stable
src/components/Badge/Badge.tsx
when: notification-count, unread-count, subtle-count, dot-indicator, semantic-count
not-for: text-status, status-label, category-label, compliance-status, action, navigation, filter, high-emphasis-status
pairs-with: Tag, Badge/Solid
keywords: мягкий бейдж, soft badge, приглушённый счётчик, счётчик на светлом фоне, количество без акцента
props: variant=[dot|solid|soft] semantic=[neutral|brand|info|positive|warning|negative] size=[sm|md] disabled:boolean highContrast:boolean children:React.ReactNode className:string aria-label:string role:string

### Badge/Solid — stable
src/components/Badge/Badge.tsx
when: notification-count, unread-count, count-badge, dot-indicator, new-item-marker, semantic-count
not-for: text-status, status-label, semantic-label, compliance-status, action, navigation, filter, selection, removable-label
pairs-with: Tag
keywords: бейдж, badge, количество, count, счётчик, непрочитанные, unread, новый, new, цвет по семантике, красный счётчик ошибок
props: variant=[dot|solid|soft] semantic=[neutral|brand|info|positive|warning|negative] size=[sm|md] disabled:boolean highContrast:boolean children:React.ReactNode className:string aria-label:string role:string

### Breadcrumbs — stable
src/components/Breadcrumbs/Breadcrumbs.tsx
when: navigation-trail, page-path, hierarchical-nav, location-indicator
not-for: tab-navigation, action, status, filter
pairs-with: Link text, Divider/Vertical
keywords: хлебные крошки, breadcrumbs, навигация путь, page path, раздел / подраздел, текущий путь
props: size=[md|sm] items:BreadcrumbItem[] maxItems:number separator:ReactNode ariaLabel:string mobileFallback:boolean mobileLabel:ReactNode onMobileClick:MouseEventHandler

### Button/Ghost — stable
src/components/Button/index.ts
when: tertiary-action, inline-action, subtle-action, text-link-action
not-for: primary-cta, status-display, filter, prominent-action
pairs-with: Button/Solid, Button/Outline, ButtonsGroup, Divider
keywords: призрачная кнопка, ghost button, text button, ссылка-кнопка, subtle action, третичное действие
props: variant=[solid|outline|ghost|soft] intent=[brand|neutral|info|positive|negative] size=[sm|md|lg|xl] width=[hug|fill] active:boolean loading:boolean iconLeft:React.ReactNode iconRight:React.ReactNode badge:React.ReactNode iconOnly:boolean chevron:boolean highContrast:boolean children:React.ReactNode

### Button/Outline — stable
src/components/Button/index.ts
when: secondary-action, cancel-action, alternative-action, modal-cancel
not-for: primary-cta, status-display, filter, tab-navigation
pairs-with: Button/Solid, Button/Ghost, ButtonsGroup
keywords: вторичная кнопка, secondary button, outline button, cancel, отмена, назад, back, альтернатива
props: variant=[solid|outline|ghost|soft] intent=[brand|neutral|info|positive|negative] size=[sm|md|lg|xl] width=[hug|fill] active:boolean loading:boolean iconLeft:React.ReactNode iconRight:React.ReactNode badge:React.ReactNode iconOnly:boolean chevron:boolean highContrast:boolean children:React.ReactNode

### Button/Solid — stable
src/components/Button/index.ts
when: primary-action, form-submit, cta, destructive-action, modal-confirm, toolbar-action
not-for: status-display, label, filter, tab-navigation, passive-indicator, count
pairs-with: Input, Button/Outline, Button/Ghost, ButtonsGroup, Alert
keywords: кнопка, button, submit, отправить, сохранить, удалить, подтвердить, применить, confirm, save, delete, apply, primary button, главная кнопка, CTA, call to action
props: variant=[solid|outline|ghost|soft] intent=[brand|neutral|info|positive|negative] size=[sm|md|lg|xl] width=[hug|fill] active:boolean loading:boolean iconLeft:React.ReactNode iconRight:React.ReactNode badge:React.ReactNode iconOnly:boolean chevron:boolean highContrast:boolean children:React.ReactNode

### Buttons Group — stable
src/components/ButtonsGroup/ButtonsGroup.tsx
when: action-group, toolbar-buttons, modal-actions, form-actions, split-button
not-for: filter, tab-navigation, status, single-action
pairs-with: Divider/Vertical
keywords: группа кнопок, buttons group, тулбар, toolbar, action bar, набор действий, форма кнопки, сохранить/отмена
props: size=[sm|md|lg|xl]

### Calendar — stable
src/components/Calendar/index.ts
when: date-picker-panel, calendar-grid, date-range-panel, month-picker, year-picker, time-picker
not-for: inline-date-display, status-badge, navigation-breadcrumb
pairs-with: Date Picker, Input, Modal, Button/Solid
keywords: календарь, calendar, выбор дат, дата, date grid, месяц, month view, диапазон, date range, time picker, пресеты, presets
props: size=[sm|md] mode=[single|range] view=[day|month|year] showHeader:boolean showPresets:boolean showTime:boolean startTime:string ("HH:mm[:ss]"; controlled time of the section) endTime:string onStartTimeChange:(time: string) => void onEndTimeChange:(time: string) => void showFooter:boolean value:Date | null rangeValue:[Date | null, Date | null] minDate:Date maxDate:Date disabledDates:(date: Date) => boolean dayData:DayData[] onChange:(date: Date | null) => void onRangeChange:(range: [Date | null, Date | null]) => void presetsVariant=[default|list] weekStartsOn:0 | 1 highContrast:boolean onViewChange:(view: CalendarView) => void initialMonth:Date today:Date

### Check — stable
src/components/Checkbox/Check.tsx
when: checkbox-indicator-only, table-row-selector, embedded-selection
not-for: standalone-form-field, labelled-choice
pairs-with: Checkbox, Checkbox Group
keywords: чекбокс индикатор, check indicator, визуальный маркер, примитив выбора
props: size=[sm|md] checked:boolean indeterminate:boolean disabled:boolean validation:'negative' name:string value:string onChange:(checked: boolean) => void aria-labelledby:string aria-describedby:string

### Checkbox — stable
src/components/Checkbox/Checkbox.tsx
when: multi-selection, boolean-toggle, form-checkbox, agreement-field, select-all
not-for: single-selection, radio-choice, filter-toggle, status
pairs-with: Radio, Input, Button/Solid
keywords: чекбокс, checkbox, галочка, флажок, согласие, выбрать все, select all, agreement, множественный выбор
props: size=[sm|md]

### Checkbox Group — planned
react_path: —
when: checkbox-group, multi-select-list, filter-group, batch-selection
not-for: single-selection, more-than-10-options, toggle-switch
pairs-with: Checkbox, Input, Button/Solid
keywords: группа чекбоксов, checkbox group, множественный выбор группа, выбрать все, batch select, фильтры группа
props: —

### Chip/Outline — stable
src/components/Chip/Chip.tsx
when: outlined-filter, bordered-toggle, outlined-category-selector
not-for: primary-action, status-only, removable-label
pairs-with: Chip/Soft, Tag/Outline, ButtonsGroup
keywords: чип обводка, outline chip, filter outline, bordered chip, контурный фильтр
props: variant=[soft|outline] semantic=[neutral|info] size=[xs|sm|md] active:boolean disabled:boolean highContrast:boolean iconLeft:React.ReactNode badge:React.ReactNode dropdown:boolean onClose:() => void children:React.ReactNode className:string onClick:React.MouseEventHandler<HTMLButtonElement>

### Chip/Soft — stable
src/components/Chip/Chip.tsx
when: filter-control, toggle-option, toolbar-toggle, category-selector, segmented-option
not-for: primary-action, status-only, removable-label, navigation-tab
pairs-with: Chip/Outline, ButtonsGroup, Tag, Input
keywords: чип, chip, фильтр, filter chip, переключатель категории, toggle, selector, опция фильтра, выбор категории, сегмент
props: variant=[soft|outline] semantic=[neutral|info] size=[xs|sm|md] active:boolean disabled:boolean highContrast:boolean iconLeft:React.ReactNode badge:React.ReactNode dropdown:boolean onClose:() => void children:React.ReactNode className:string onClick:React.MouseEventHandler<HTMLButtonElement>

### ChipGroup — stable
src/components/Chip/ChipGroup.tsx
when: filter-chip-group, single-choice-chips, multi-choice-chips, category-filter, quick-filters
not-for: primary-action, navigation-tab, status-only, removable-label-set, more-than-10-options
pairs-with: Chip/Soft, Chip/Outline, TableCell, Radiobutton Group, Checkbox Group
keywords: группа чипсов, chips group, chip group, фильтры чипсами, быстрые фильтры, выбор одного чипсами, несколько чипсов, чипс Все
props: items:ChipGroupItem[] selectionMode=[single|multiple|none] value:string[] defaultValue:string[] onChange:(next: string[]) => void size=[xs|sm|md] variant=[soft|outline] semantic=[neutral|info] selectAll:{ id: string; label: ReactNode } maxVisible:number overflowLabel:(hiddenCount: number) => ReactNode removable:boolean onRemove:(id: string) => void aria-label:string className:string

### Collapse — stable
src/components/Collapse/Collapse.tsx
when: accordion, expandable-section, collapsible-content, faq-item
not-for: modal, tab, status, navigation
pairs-with: Divider/Horizontal, Button/Ghost
keywords: аккордеон, accordion, collapse, раскрыть, свернуть, expandable, скрытый контент, FAQ, show more
props: variant=[ghost|outline] size=[md|sm] chevronPosition=[left|right] open:boolean defaultOpen:boolean divider:boolean disabled:boolean badge:ReactNode switcher:SwitchProps button:Omit<ButtonProps, 'variant' | 'intent' | 'size' | 'highContrast'> headingLevel=[2|3|4|5|6]

### Date Picker — stable
src/components/DatePicker/index.ts
when: date-input, date-range-input, date-field, period-selector
not-for: status, navigation, filter-chip
pairs-with: Input, Calendar, Button/Solid, Modal
keywords: дата пикер, datepicker, date picker, выбор даты, период, диапазон дат, с по дата, from to date, date input, calendar popup
props: size=[sm|md|lg|xl] mode=[single|range|datetime|datetime-range] type=[date|time|datetime] labelVariant=[out|in] label:string placeholder:string value:Date | null rangeValue:[Date | null, Date | null] disabled:boolean readOnly:boolean required:boolean errorText:string helperText:string showTime:boolean showPresets:boolean onChange:(date: Date | null) => void onRangeChange:(range: [Date | null, Date | null]) => void

### Divider/Horizontal — stable
src/components/Divider/Divider.tsx
when: section-separator, list-divider, content-separator, layout-rule
not-for: content, action, status, label
pairs-with: Button/Ghost, ButtonsGroup
keywords: разделитель, divider, separator, горизонтальная линия, hr, граница секции, раздел
props: orientation=[horizontal|vertical] contrast=[low|medium|high] padding:DividerPadding

### Divider/Vertical — stable
src/components/Divider/Divider.tsx
when: toolbar-separator, inline-separator, column-divider, button-group-separator
not-for: content, action, status
pairs-with: ButtonsGroup
keywords: вертикальный разделитель, vertical divider, разделитель тулбара, separator inline
props: orientation=[horizontal|vertical] contrast=[low|medium|high] padding:DividerPadding

### Drawer — planned
react_path: —
when: side-panel, bottom-sheet, filter-panel, entity-details, create-entity, edit-entity
not-for: confirmation-dialog, destructive-confirm, toast-notification, inline-alert, dropdown-menu, anchored-popover, persistent-sidebar
pairs-with: —
keywords: —
props: backLink:boolean title:string subtitle:string showSubtitle:boolean showScrollbar:boolean children:ReactNode (Figma: Swap Container, тип SLOT) mobile:boolean (вьюпортная ось Mobile Off|On: боковая панель / нижний лист)

### DropdownMenu — stable
src/components/DropdownMenu/index.ts
when: context-menu, action-menu, single-select-list, multi-select-list, overflow-menu, command-list
not-for: always-visible-navigation, mutually-exclusive-options-shown-at-once, free-text-filter, irreversible-confirmation, inline-notification
pairs-with: Button, SelectField, Divider
keywords: dropdown, menu, выпадающее меню, меню, контекстное меню, context menu, select list, список выбора, action menu, overflow menu, single select, multi select, мультиселект
props: trigger:React.ReactNode | ((props: DropdownMenuTriggerProps) => React.ReactNode) children:React.ReactNode open:boolean defaultOpen:boolean onOpenChange:(open: boolean) => void size=[sm|md] select=[none|single|multi] value:string | string[] defaultValue:string | string[] onValueChange:(value: string | string[]) => void placement=[bottom-start|bottom-end|top-start|top-end] anchorKeepsFocus:boolean header:React.ReactNode aria-label:string className:string

### Input — stable
src/components/Input/index.ts
when: text-entry, form-field, search-field, login-field, email-field, number-field, amount-field
not-for: selection-only, toggle, status-display, navigation
pairs-with: Button/Solid, Badge, Alert, SelectField
keywords: поле ввода, input, текстовое поле, форма, логин, email, поиск, сумма, amount, search input, form field, ввод, имя, name field
props: size=[sm|md|lg|xl] validation=[none|negative|positive|warning] disabled:boolean readOnly:boolean required:boolean label:string helperText:string leadingIcon:ReactNode trailingIcon:ReactNode

### Input Password — stable
src/components/InputPassword/index.ts
when: password-entry, secure-field, login-password, masked-input
not-for: visible-text, search, number
pairs-with: Input, Button/Solid
keywords: пароль, password, секретное поле, masked, скрытый ввод, поле пароля
props: size=[sm|md|lg|xl]

### InputLabelIn — stable
src/components/InputLabelIn/InputLabelIn.tsx
when: floating-label-input, inline-label-field, compact-form-field, material-input
not-for: standard-above-label, search-field, password-standalone
pairs-with: Button/Solid, Alert, Input
keywords: floating label, плавающий лейбл, внутренний лейбл, input label inside, compact input, поле с лейблом внутри, material design input
props: size=[sm|md|lg|xl] validation=[none|negative|positive|warning] disabled:boolean readOnly:boolean required:boolean label:string helperText:string leadingIcon:ReactNode trailingIcon:ReactNode

### InputSearch — stable
src/components/InputSearch/index.ts
when: search-field, filter-input, table-search
not-for: plain-text-input, value-select, multiline, native-type-search
pairs-with: Input
keywords: поиск, input search, строка поиска, поле поиска, search, фильтр
props: labelVariant=[out|in] size=[sm|md|lg|xl] validation=[none|negative|positive|warning]

### InputAmount — in-progress
src/components/InputAmount/index.ts
when: amount-field, money-entry, transfer-amount, limit-amount, price-entry
not-for: count-without-currency, read-only-amount-display, table-cell-edit, native-type-number
pairs-with: Input, InputNumber, Button/Solid, Alert
keywords: сумма, поле суммы, amount, amount input, деньги, валюта, перевод, платёж, лимит, цена
props: currency:string, ISO 4217 currencyLabel:string integer:boolean min:string (точная дробь) max:string (точная дробь) value:string (точная дробь, «1250.70») defaultValue:string onValueChange:(value: string, code: AMT-400…AMT-404 | null) => void onClear:() => void size=[sm|md|lg|xl] validation=[none|negative|positive|warning] disabled:boolean readOnly:boolean required:boolean label:string helperText:string labelOrientation=[top|left] labelAlign=[left|right] labelWidth:string | number labelVariant=[out|in]

### InputNumber — in-progress
src/components/InputNumber/index.ts
when: number-field, quantity-stepper, count-entry, percent-entry, number-stepper
not-for: money-amount, negative-number, short-option-set, range-slider, native-type-number
pairs-with: InputAmount, Input, Button/Solid
keywords: число, количество, шаг, штуки, процент, number input, stepper, spinbutton, плюс минус
props: min:string (точная дробь, по умолчанию '0') max:string (точная дробь) step:string (по умолчанию '1') fractionDigits:number (по умолчанию 0) unit:string value:string (точная дробь) defaultValue:string onValueChange:(value: string, code: NUM-400…NUM-404 | null) => void onClear:() => void size=[sm|md|lg|xl] validation=[none|negative|positive|warning] disabled:boolean readOnly:boolean required:boolean label:string helperText:string labelOrientation=[top|left] labelAlign=[left|right] labelWidth:string | number labelVariant=[out|in]

### Card — in-progress
src/components/Card/Card.tsx
when: container-card, panel, content-card, summary-block, form-group-container
not-for: alert, data-pair, document-card, list-row, menu-item
pairs-with: Button, Tag, DocumentCard, DataItem
keywords: карточка, панель, контейнер, card, panel, container
props: —

### DocumentCard — in-progress
src/components/DocumentCard/DocumentCard.tsx
when: document-item, file-card, attachment-row, document-list-entry
not-for: file-upload, generic-container, list-row, menu-item
pairs-with: Tag, Button, Upload, Card
keywords: карточка документа, файл, документ, document card, file card
props: —

### AutoComplete — in-progress
src/components/AutoComplete/AutoComplete.tsx
when: autocomplete, search-suggest, combobox-single, typeahead, async-search-field, entity-lookup
not-for: multi-select, tag-select, fixed-small-option-set, no-typing-select, status-display
pairs-with: InputSearch, MultiSelect, SelectField, SelectControl, DropdownMenu
keywords: автокомплит, подсказки, поле с списком, autocomplete, suggestions, typeahead, combobox
props: size=[sm|md|lg|xl]

### InputMask — in-progress
src/components/InputMask/index.ts
when: masked-field, phone-entry, card-number-entry, account-number-entry, bik-entry, inn-entry, passport-entry
not-for: money-amount, number-without-fixed-length, date-or-time, free-text, read-only-value-display
pairs-with: Input, InputAmount, Button/Solid
keywords: маска, поле по маске, телефон, номер карты, счёт, БИК, ИНН, паспорт, input mask, masked input
props: preset=[phone|card|account|bik|inn|passport] mask:string prefix:string (у phone value:string (знаки ячеек без разделителей, «9991234567») defaultValue:string onValueChange:(value: string, state: { complete: boolean; error: MSK-400 | MSK-401 | MSK-410… onClear:() => void placeholder:string name:string (скрытое поле формы, значение только когда введено целиком) size=[sm|md|lg|xl] validation=[none|negative|positive|warning] disabled:boolean readOnly:boolean required:boolean label:string helperText:string labelOrientation=[top|left] labelAlign=[left|right] labelWidth:string | number labelVariant=[out|in]

### Link text — stable
src/components/LinkText/LinkText.tsx
when: inline-link, text-navigation, anchor, contextual-link
not-for: primary-action, button, navigation-tab, status
pairs-with: Button/Ghost, Breadcrumbs
keywords: ссылка, link, гиперссылка, hyperlink, текстовая ссылка, inline link, подробнее, read more
props: size=[sm|md|lg]

### ListItem — in-progress
src/components/ListItem/ListItem.tsx
when: —
not-for: —
pairs-with: —
keywords: —
props: size=[sm|md]

### Modal — stable
src/components/Modal/Modal.tsx
when: confirmation-dialog, form-modal, destructive-confirm, detail-panel, create-entity, edit-entity
not-for: toast-notification, inline-alert, tooltip, popover, non-blocking-feedback
pairs-with: Button/Solid, Button/Outline, Input, Notification
keywords: модалка, modal, диалог, dialog, подтверждение, confirmation, попап, popup, окно, window, удалить подтверждение, confirm delete, форма модальная
props: isOpen:boolean onClose:function title:string description:string size=[sm|md|lg|fullscreen] closeOnBackdrop:boolean closeOnEscape:boolean footer:ReactNode children:ReactNode

### MultiSelect — stable
src/components/MultiSelect/MultiSelect.tsx
when: multi-select, tag-select, multi-value-field, chips-select, filter-multi, combobox, search-select
not-for: single-select, text-entry, status-display, navigation
pairs-with: DropdownMenu, SelectField, Tag/Solid
keywords: мультиселект, multiselect, multi select, множественный выбор, выбор нескольких, теги выбор, tag select, chips, multi-value
props: options:MultiSelectOption[] value:string[] defaultValue:string[] onChange:(values: string[]) => void size=[sm|md|lg|xl] labelVariant=[out|in] state=[default|error|disabled|readonly] label:string placeholder:string hint:string errorMessage:string maxTags:number

### Notification — stable
src/components/Notification/Notification.tsx
when: feedback, status-message, auto-dismiss, action-result
not-for: blocking-errors, confirmation-dialogs, inline-validation
pairs-with: Button, Modal
keywords: notification, toast, уведомление, тост, сообщение, алерт, feedback
props: variant=[info|positive|warning|negative] duration=[number] action=[object]

### Pagination — stable
src/components/Pagination/Pagination.tsx
when: page-navigation, table-pagination, list-pagination
not-for: tab-navigation, filter, status
pairs-with: SelectField
keywords: пагинация, pagination, страницы, следующая страница, next page, номер страницы, page control
props: page:number pageCount:number onPageChange:(page: number) => void size=[md|sm] mobile:boolean (Figma ось Mobile) showRange:boolean (Figma ось Select Range) showJump:boolean (Figma «Show Page_Number») rangeText:string (Figma TEXT «↳ Edit Range») pageSize:number (спека § Количество отображаемых результатов) pageSizeOptions:number[] onPageSizeChange:(size: number) => void onEllipsisClick:(from, to) => void disabled:boolean (ось Disabled набора «.Parts / Page»)

### Popover — stable
src/components/Popover/Popover.tsx
when: contextual-popup, floating-panel, dropdown-info, inline-detail
not-for: modal, toast, inline-alert, permanent-content
pairs-with: Button/Ghost, Tooltip
keywords: поповер, popover, всплывающая панель, floating panel, dropdown panel, контекст
props: direction=[top|right|bottom|left] arrowPlacement=[start|center|end] showArrow:boolean (Figma «Show Pointer») showClose:boolean (Figma «Show Close Button») actionsReverse:boolean (спека § Direction у Actions group) title:ReactNode (Figma TEXT «↳ Edit Title») description:ReactNode (Figma TEXT «↳ Edit Description» + «Show Description») children:ReactNode (Figma SLOT «Swap Container» + «Show Swap Container») actions:ReactNode (Figma «Show Actions group» + «Show Secondary Button» + «Show LinkTex… onClose:() => void

### ProgressBar — stable
src/components/ProgressBar/ProgressBar.tsx
when: determinate-progress, upload-progress, loading-bar, completion-indicator, task-progress, file-progress
not-for: indeterminate-loading, step-progress, status-badge, spinner
pairs-with: Spinner, Notification, Button/Solid
keywords: прогресс бар, progress bar, загрузка файла, upload progress, completion, прогресс, progress, полоса загрузки, индикатор прогресса, task completion
props: value:number (0–100; не задано = indeterminate) size=[sm|md] validation=[none|info|positive|warning|negative] label=[none|right|bottom] caption:string

### Radio — stable
src/components/Radiobutton/Radio.tsx
when: single-selection, radio-group, option-choice, settings-option, exclusive-choice
not-for: multiple-selection, toggle-switch, status-display, filter-chip
pairs-with: Checkbox, Input, Button/Solid
keywords: радиокнопка, radio, radio button, выбор одного, один из, опция, single choice, выбор варианта, настройки выбор
props: value:string label:string description:string size=[sm|md] disabled:boolean checked:boolean validation:'negative' name:string onChange:(value: string) => void aria-describedby:string

### Radiobutton — stable
src/components/Radiobutton/Radiobutton.tsx
when: labelled-radio, form-radio-option, settings-option
not-for: indicator-only, multiple-selection
pairs-with: Radiobutton Group, Radio
keywords: радиокнопка с лейблом, radiobutton, radio option, опция с подписью
props: value:string label:string caption:string iconHelp:boolean helpText:React.ReactNode variant=[ghost|container] size=[sm|md] disabled:boolean checked:boolean name:string validation:'negative' onChange:(value: string) => void aria-describedby:string

### Radiobutton Group — planned
src/components/Radiobutton/RadioGroup.tsx
when: radio-group, exclusive-option-list, settings-group, form-fieldset
not-for: multiple-selection, single-boolean, more-than-7-options
pairs-with: Radiobutton, Input, Button/Solid
keywords: группа радио, radio group, выбор одного из группы, взаимоисключающий список, настройки группа
props: name:string label:string value:string onChange:(value: string) => void options:RadioOption[] orientation=[vertical|horizontal] size=[sm|md] error:string required:boolean children:React.ReactNode

### Scrollbar — stable
src/components/Scrollbar/Scrollbar.tsx
when: scroll-indicator, overflow-control
not-for: action, navigation, status
pairs-with: SelectField
keywords: скроллбар, scrollbar, прокрутка, scroll, полоса прокрутки
props: size=[md|lg] context=[overlay|table] axis=[vertical|horizontal|both] hidden:boolean children:ReactNode className:string

### Select Control — stable
src/components/SelectControl/SelectControl.tsx
when: segmented-control, view-switcher, mode-selector, timeframe-selector, sub-tabs, unit-switcher, content-filter, exclusive-choice
not-for: multi-select, toolbar, formatting-tools, long-labels, search-select, combobox, more-than-5-options, section-navigation, on-off-toggle, status
pairs-with: Tabs, Tag, SelectField
keywords: сегментированный контрол, segmented control, плашка на треке, pill switch, переключатель режимов, переключатель периода, таймфрейм, выбор одного из 2-5, фильтрация контента
props: size=[sm|md|lg]

### SelectField — stable
src/components/SelectField/index.ts
when: single-select, dropdown-field, form-select
not-for: multi-select, free-text, search-list, menu-actions
pairs-with: DropdownMenu, Input
keywords: селект, select field, выпадающий список, поле выбора, dropdown, выбор значения
props: options:SelectOption[] value:string defaultValue:string onChange:(value: string) => void size=[sm|md|lg|xl] labelVariant=[out|in] validation=[none|negative] label:string placeholder:string helperText:string required:boolean disabled:boolean readOnly:boolean name:string

### SidebarMenu — in-progress
src/components/SidebarMenu/SidebarMenu.tsx
when: —
not-for: —
pairs-with: —
keywords: —
props: —

### Skeleton — stable
src/components/Skeleton/Skeleton.tsx
when: loading-state, loading-placeholder, table-loading, content-placeholder
not-for: button-loading, determinate-progress, empty-state, error-state
pairs-with: Table Cell, Avatar, Spinner
keywords: skeleton, скелетон, заготовка, placeholder loading, загрузка таблицы, shimmer
props: variant=[text|rect|circle] lines=[number] width=[number|string] height=[number|string] delay=[number]

### Spinner — stable
src/components/Spinner/Spinner.tsx
when: loading-state, async-feedback, button-loading
not-for: progress-tracking, determinate-progress
pairs-with: Button, Progress Bar
keywords: spinner, loader, loading, индикатор загрузки, спиннер
props: size=[sm|md|lg] delay=[number]

### Stepper — stable
src/components/Stepper/Stepper.tsx
when: step-progress, wizard-nav, multi-step-form, onboarding-steps
not-for: tab-navigation, filter, status-badge, pagination
pairs-with: Button/Solid, Button/Outline, Divider/Horizontal
keywords: степер, stepper, шаги, steps, wizard, прогресс шагов, мастер, многошаговая форма
props: size=[md|sm] orientation=[horizontal|vertical] labelPlace=[top|bottom|inline] pointType=[number|status|dot] semantic=[neutral|warning|negative] interactive:boolean showCaption:boolean showPoint:boolean

### StepperProgress — stable
src/components/Stepper/Stepper.tsx
when: step-progress, multi-step-form, onboarding-steps
not-for: tab-navigation, loading-indicator, status-badge, pagination
pairs-with: ProgressBar, Button/Solid
keywords: прогресс шагов, шаг N из M, progress stepper, counter steps, полоса прогресса шагов
props: label:string caption:string nextLabel:string value:number (обязательный) heightBig:boolean

### Switch — stable
src/components/Switcher/Switch.tsx
when: toggle-indicator-only, embedded-toggle
not-for: standalone-form-field, labelled-toggle
pairs-with: Switcher
keywords: переключатель трек, switch track, toggle indicator, примитив переключателя
props: size=[sm|md] checked:boolean disabled:boolean validation:'negative' onChange:(checked: boolean) => void aria-label:string aria-labelledby:string aria-describedby:string id:string name:string value:string

### Switcher — stable
src/components/Switcher/index.ts
when: binary-toggle, on-off-setting, feature-toggle, instant-apply-control
not-for: multi-option-choice, radio-choice, form-checkbox
pairs-with: Switch, Checkbox, Radio
keywords: переключатель, switcher, toggle, вкл выкл, on off, настройка мгновенная
props: label:string caption:string iconHelp:boolean variant=[ghost|container] labelPosition=[right|left] size=[sm|md] checked:boolean disabled:boolean validation:'negative' onChange:(checked: boolean) => void aria-describedby:string id:string name:string value:string

### Table — in-progress
src/components/Table/Table.tsx
when: data-table, registry-table, sortable-table, selectable-rows, table-container
not-for: record-card, key-value-pairs, pinned-columns, column-resize, virtualization, mobile-table
pairs-with: TableCell, Checkbox, Tag/Soft, Skeleton, Pagination
keywords: таблица, table, реестр, сортировка, выбор строк, массовое действие, итоговая строка
props: size=[sm|md|lg]

### TableCell — stable
src/components/TableCell/TableCell.tsx
when: table-cell, column-header, data-row-cell, amount-cell, total-row, editable-cell, registry-table
not-for: record-card, form-field, menu-list, table-container, sorting, virtualization
pairs-with: Tag/Soft, LinkText, Checkbox, Radio, Tooltip, Pagination
keywords: ячейка таблицы, table cell, заголовок колонки, column header, строка данных, реестр, итоговая строка, зебра, zebra, правка в таблице
props: variant=[text|amount|element|swap|edit-text|edit-amount] header:boolean size=[sm|md|lg] align=[start|end|center] valign=[center|top|bottom] wrap:boolean total:boolean zebra:boolean selected:boolean hovered:boolean pressed:boolean focused:boolean error:boolean secondLevel:boolean borderLeft:boolean borderRight:boolean borderBottom:boolean caption:React.ReactNode suffix:React.ReactNode captionSuffix:React.ReactNode helpIcon:React.ReactNode actions:React.ReactNode icon:React.ReactNode value:string onValueChange:(next: string) => void placeholder:string readOnly:boolean colSpan:number rowSpan:number className:string children:React.ReactNode onClick:React.MouseEventHandler<HTMLTableCellElement>

### Tabs — stable
src/components/Tabs/Tabs.tsx
when: tab-navigation, section-switcher, content-tabs, view-switcher
not-for: filter-toggle, primary-action, status, breadcrumb, primary-navigation, side-menu
pairs-with: Chip, Divider/Horizontal
keywords: табы, tabs, вкладки, tab bar, переключение разделов, tab switch, навигация вкладки
props: size=[sm|md|lg]

### Tag/Outline — stable
src/components/Tag/Tag.tsx
when: outline-filter-tag, bordered-label, selectable-category, text-status
not-for: numeric-count, notification-count, primary-action, navigation
pairs-with: Tag/Solid, Tag/Soft, Chip/Outline
keywords: тег обводка, outline tag, border tag, контурная метка
props: variant=[fill|soft|outline] semantic=[neutral|brand|info|positive|warning|negative] size=[sm|md] active:boolean disabled:boolean highContrast:boolean iconLeft:React.ReactNode onClose:() => void children:React.ReactNode className:string onClick:React.MouseEventHandler<HTMLButtonElement> closeTabIndex:number onCloseMouseDown:React.MouseEventHandler<HTMLButtonElement> interactive:boolean

### Tag/Soft — stable
src/components/Tag/Tag.tsx
when: soft-removable-label, muted-filter-tag, subtle-category, multi-select-soft, text-status, soft-status
not-for: numeric-count, notification-count, primary-action, navigation
pairs-with: Input, Chip/Soft, Badge/Soft, Tag/Solid
keywords: мягкий тег, soft tag, метка приглушённая, категория тихая, фоновый тег
props: variant=[fill|soft|outline] semantic=[neutral|brand|info|positive|warning|negative] size=[sm|md] active:boolean disabled:boolean highContrast:boolean iconLeft:React.ReactNode onClose:() => void children:React.ReactNode className:string onClick:React.MouseEventHandler<HTMLButtonElement> closeTabIndex:number onCloseMouseDown:React.MouseEventHandler<HTMLButtonElement> interactive:boolean

### Tag/Solid — stable
src/components/Tag/Tag.tsx
when: removable-label, filter-tag, category-tag, multi-select-item, selected-item, text-status, status-label, compliance-status
not-for: numeric-count, notification-count, primary-action, navigation
pairs-with: Input, Chip, Badge, Tag/Soft
keywords: тег, tag, ярлык, метка с крестиком, removable tag, фильтр выбранный, категория, удалить метку, мультиселект
props: variant=[fill|soft|outline] semantic=[neutral|brand|info|positive|warning|negative] size=[sm|md] active:boolean disabled:boolean highContrast:boolean iconLeft:React.ReactNode onClose:() => void children:React.ReactNode className:string onClick:React.MouseEventHandler<HTMLButtonElement> closeTabIndex:number onCloseMouseDown:React.MouseEventHandler<HTMLButtonElement> interactive:boolean

### TagsGroup — stable
src/components/TagsGroup/TagsGroup.tsx
when: tag-group, label-set, filter-chips, selected-values
not-for: single-tag, action-group, multi-select-input
pairs-with: Tag/Solid, MultiSelect
keywords: группа тегов, tags group, теги, метки, чипы, tag group
props: size=[sm|md]

### TextArea — stable
src/components/TextArea/TextArea.tsx
when: multiline-text-entry, comment-field, description-field, notes-field, message-input, long-text-form
not-for: single-line-input, number-field, password-field, selection-only
pairs-with: Input, Button/Solid, Alert
keywords: многострочное поле, textarea, text area, комментарий, comment, описание, description field, заметки, notes, сообщение, message field, многострочный ввод
props: size=[sm|md|lg|xl] validation=[none|negative] labelVariant=[out|in] labelOrientation=[top|left] disabled:boolean readOnly:boolean required:boolean label:string helperText:string maxLength:number

### TimePicker — in-progress
src/components/TimePicker/index.ts
when: time-input, time-field, time-of-day
not-for: date, duration, relative-time, approximate-time, read-only-display
pairs-with: Date Picker, DropdownMenu
keywords: выбор времени, время, time picker, timepicker, time input, часы минуты, время операции, отсечка
props: value:string ("HH:mm:ss" | "HH:mm" | "") defaultValue:string onChange:(value: string) => void showSeconds:boolean (default true) step:number, minutes between list options (default 30) min:string max:string hourCycle=[12|24] size=[sm|md|lg|xl] labelVariant=[out|in] labelOrientation=[top|left] disabled:boolean readOnly:boolean errorText:string helperText:string label:string iconHelpLabel:ReactNode placeholder:string required:boolean labelAlign=[left|right] labelWidth:string | number

### ToggleGroupButton — stable
src/components/ToggleGroupButton/ToggleGroupButton.tsx
when: toolbar-toggle-group, formatting-tools, multi-select-toggle, discrete-actions, exclusive-toggle
not-for: primary-action, view-switcher, timeframe-selector, more-than-5-options, on-off-toggle, long-form-field, filter-chip, tab-navigation, status-display
pairs-with: SplitButton, Chip/Soft, Chip/Outline, Divider/Vertical, ButtonsGroup
keywords: TGB, toggle group, toggle group button, переключатель группа, тоггл группа, тулбар, toolbar, панель инструментов, форматирование текста, начертание, мультивыбор, multi-select, несколько активных сразу
props: size=[sm|md|lg|xl] variant=[secondary|ghost] highContrast:boolean value:string onChange:(value: string) => void children:ReactNode (TGBItem)

### SplitButton — stable
src/components/SplitButton/SplitButton.tsx
when: split-button, primary-action-with-alternatives, export-with-formats, save-as, toolbar-dominant-action
not-for: equal-weight-actions, mode-switch, destructive-primary, long-menu, single-action
pairs-with: DropdownMenu, Badge/Soft, Buttons Group
keywords: split button, сплит-кнопка, кнопка с меню, троеточие, основное действие, дополнительные действия, save as, сохранить как, экспорт форматы
props: size=[sm|md|lg|xl] icon:ReactNode badge:ReactNode onClick:(e) => void disabled:boolean menuLabel:string (required) menuIcon:ReactNode menu:ReactNode menuPlacement=[bottom-start|bottom-end|top-start|top-end] menuOpen:boolean defaultMenuOpen:boolean onMenuOpenChange:(open) => void

### Tooltip — stable
src/components/Tooltip/Tooltip.tsx
when: contextual-help, label-hint, icon-explanation
not-for: interactive-content, long-text, actions
pairs-with: Button, Input, Popover
keywords: tooltip, hint, подсказка, тултип
props: placement=[top|right|bottom|left] disabled=[boolean] delay=[number]

### Upload/Box — stable
src/components/Upload/Upload.tsx
when: file-picker, drag-and-drop-zone, attach-document, file-upload
not-for: task-progress, indeterminate-loading, uploaded-file-row, status-display
pairs-with: Upload/File, Upload/Group, Notification
keywords: загрузка файла, выбор файла, перетащить, drag and drop, dropzone, upload, прикрепить файл, attach
props: size=[md|lg] title:ReactNode accent:ReactNode description:ReactNode error:boolean disabled:boolean accept:string multiple:boolean onFilesSelected:(files: File[]) => void inputRef:Ref<HTMLInputElement>

### Upload/File — stable
src/components/Upload/Upload.tsx
when: uploaded-file-row, file-list-item, upload-status, file-actions
not-for: file-picker, drag-and-drop-zone, task-progress, clickable-label
pairs-with: Upload/Box, Upload/Group, Spinner, Button/Ghost
keywords: строка файла, список файлов, file row, file list, загруженный файл, uploaded file, статус файла
props: name:string caption:string status=[uploaded|loading|error] progress:number size=[md|lg] disabled:boolean icon:ReactNode onRemove:() => void onCancel:() => void onRetry:() => void action:UploadFileAction

### Upload/Group — stable
src/components/Upload/Upload.tsx
when: file-upload-form, attach-documents, upload-with-file-list
not-for: single-file-picker-without-list, task-progress, status-display, uploaded-file-label
pairs-with: Upload/Box, Upload/File, Notification
keywords: загрузка файлов, прикрепить документы, список файлов, добавить файл, upload group, add file
props: size=[md|lg] trigger=[box|button] title:ReactNode accent:ReactNode description:ReactNode error:boolean disabled:boolean accept:string multiple:boolean onFilesSelected:(files: File[]) => void children:UploadFile[]

### ActionToast — stable
src/components/ActionToast/ActionToast.tsx
when: bulk-actions-bar, selection-toolbar, table-selection-actions, floating-action-bar
not-for: notification, single-action, row-actions, navigation, status-display, confirmation-dialog
pairs-with: TableCell, Checkbox, DropdownMenu, Notification
keywords: панель действий, массовые действия, выбрано строк, снять выделение, bulk actions, action toast, selection bar
props: open:boolean count:ReactNode actions:ActionToastAction[] moreActions:ActionToastAction[] moreLabel:string onClear:() => void clearLabel:string type=[text|icon] size=[sm|md] loadingAction:string floating:boolean offset=[16|24|32|40|48|56] onExited:() => void

### StatusMessage — in-progress
src/components/StatusMessage/StatusMessage.tsx
when: —
not-for: —
pairs-with: —
keywords: —
props: size=[sm|md]

### Slider — in-progress
src/components/Slider/Slider.tsx
when: —
not-for: —
pairs-with: —
keywords: —
props: size=[sm|md|lg|xl]
