/**
 * Constantes da Marketing API.
 *
 * Somente valores oficiais e atuais (ODAX). Nomes legados de objetivo
 * (LINK_CLICKS, CONVERSIONS, MESSAGES, LEAD_GENERATION como *objetivo*, ...)
 * NAO entram aqui de proposito: foram substituidos pelos OUTCOME_*.
 */

export const CAMPAIGN_OBJECTIVES = [
  'OUTCOME_AWARENESS',
  'OUTCOME_TRAFFIC',
  'OUTCOME_ENGAGEMENT',
  'OUTCOME_LEADS',
  'OUTCOME_APP_PROMOTION',
  'OUTCOME_SALES',
] as const;
export type CampaignObjective = (typeof CAMPAIGN_OBJECTIVES)[number];

export const OPTIMIZATION_GOALS = [
  'NONE',
  'APP_INSTALLS',
  'AD_RECALL_LIFT',
  'ENGAGED_USERS',
  'EVENT_RESPONSES',
  'IMPRESSIONS',
  'LEAD_GENERATION',
  'QUALITY_LEAD',
  'LINK_CLICKS',
  'OFFSITE_CONVERSIONS',
  'PAGE_LIKES',
  'POST_ENGAGEMENT',
  'QUALITY_CALL',
  'REACH',
  'LANDING_PAGE_VIEWS',
  'VISIT_INSTAGRAM_PROFILE',
  'VALUE',
  'THRUPLAY',
  'CONVERSATIONS',
  'SUBSCRIBERS',
  'REMINDERS_SET',
  'PROFILE_VISIT',
  'PROFILE_AND_PAGE_ENGAGEMENT',
  'MESSAGING_PURCHASE_CONVERSION',
  'MESSAGING_APPOINTMENT_CONVERSION',
] as const;
export type OptimizationGoal = (typeof OPTIMIZATION_GOALS)[number];

export const BILLING_EVENTS = [
  'APP_INSTALLS',
  'CLICKS',
  'IMPRESSIONS',
  'LINK_CLICKS',
  'NONE',
  'OFFER_CLAIMS',
  'PAGE_LIKES',
  'POST_ENGAGEMENT',
  'THRUPLAY',
  'PURCHASE',
  'LISTING_INTERACTION',
] as const;
export type BillingEvent = (typeof BILLING_EVENTS)[number];

export const DESTINATION_TYPES = [
  'WEBSITE',
  'APP',
  'MESSENGER',
  'WHATSAPP',
  'INSTAGRAM_DIRECT',
  'FACEBOOK',
  'ON_AD',
  'ON_POST',
  'ON_EVENT',
  'ON_VIDEO',
  'ON_PAGE',
  'INSTAGRAM_PROFILE',
  'FACEBOOK_PAGE',
  'MESSAGING_MESSENGER_WHATSAPP',
  'MESSAGING_INSTAGRAM_DIRECT_MESSENGER',
  'MESSAGING_INSTAGRAM_DIRECT_WHATSAPP',
  'MESSAGING_INSTAGRAM_DIRECT_MESSENGER_WHATSAPP',
  'SHOP_AUTOMATIC',
] as const;
export type DestinationType = (typeof DESTINATION_TYPES)[number];

export const CALL_TO_ACTION_TYPES = [
  'APPLY_NOW',
  'BOOK_TRAVEL',
  'BUY_NOW',
  'CALL_NOW',
  'CONTACT_US',
  'DOWNLOAD',
  'GET_OFFER',
  'GET_QUOTE',
  'GET_SHOWTIMES',
  'INSTALL_MOBILE_APP',
  'LEARN_MORE',
  'LIKE_PAGE',
  'MESSAGE_PAGE',
  'NO_BUTTON',
  'ORDER_NOW',
  'SEE_MORE',
  'SEND_MESSAGE',
  'SHOP_NOW',
  'SIGN_UP',
  'SUBSCRIBE',
  'WATCH_MORE',
  'WHATSAPP_MESSAGE',
] as const;
export type CallToActionType = (typeof CALL_TO_ACTION_TYPES)[number];

export const SPECIAL_AD_CATEGORIES = [
  'NONE',
  'EMPLOYMENT',
  'HOUSING',
  'CREDIT',
  'ISSUES_ELECTIONS_POLITICS',
  'ONLINE_GAMBLING_AND_GAMING',
  'FINANCIAL_PRODUCTS_SERVICES',
] as const;
export type SpecialAdCategory = (typeof SPECIAL_AD_CATEGORIES)[number];

export const BID_STRATEGIES = [
  'LOWEST_COST_WITHOUT_CAP',
  'LOWEST_COST_WITH_BID_CAP',
  'COST_CAP',
  'LOWEST_COST_WITH_MIN_ROAS',
] as const;
export type BidStrategy = (typeof BID_STRATEGIES)[number];

/** Status permitidos pelo agente. DELETED e ARCHIVED nao existem aqui de proposito. */
export const EFFECTIVE_STATUSES = ['ACTIVE', 'PAUSED'] as const;
export type EffectiveStatus = (typeof EFFECTIVE_STATUSES)[number];

/** Eventos padrao do Pixel/Dataset usados em promoted_object.custom_event_type. */
export const STANDARD_EVENTS = [
  'PURCHASE',
  'LEAD',
  'COMPLETE_REGISTRATION',
  'ADD_TO_CART',
  'INITIATED_CHECKOUT',
  'ADD_PAYMENT_INFO',
  'CONTENT_VIEW',
  'SEARCH',
  'ADD_TO_WISHLIST',
  'SUBSCRIBE',
  'START_TRIAL',
  'CONTACT',
  'SCHEDULE',
  'SUBMIT_APPLICATION',
  'OTHER',
] as const;
export type StandardEvent = (typeof STANDARD_EVENTS)[number];

export const DATE_PRESETS = [
  'today',
  'yesterday',
  'this_week_mon_today',
  'last_week_mon_sun',
  'this_month',
  'last_month',
  'this_quarter',
  'last_3d',
  'last_7d',
  'last_14d',
  'last_28d',
  'last_30d',
  'last_90d',
  'maximum',
] as const;
export type DatePreset = (typeof DATE_PRESETS)[number];

/** Apelidos amigaveis do CLI -> date_preset oficial da Ads Insights API. */
export const PERIOD_ALIASES: Record<string, DatePreset> = {
  today: 'today',
  hoje: 'today',
  yesterday: 'yesterday',
  ontem: 'yesterday',
  'last-3-days': 'last_3d',
  'last-7-days': 'last_7d',
  'ultimos-7-dias': 'last_7d',
  'last-14-days': 'last_14d',
  'last-28-days': 'last_28d',
  'last-30-days': 'last_30d',
  'ultimos-30-dias': 'last_30d',
  'this-month': 'this_month',
  'mes-atual': 'this_month',
  'last-month': 'last_month',
  'mes-passado': 'last_month',
  maximum: 'maximum',
  tudo: 'maximum',
};

/** Campos de insights sempre pedidos. O resto depende do objetivo. */
export const BASE_INSIGHT_FIELDS = [
  'date_start',
  'date_stop',
  'spend',
  'reach',
  'impressions',
  'frequency',
  'cpm',
  'clicks',
  'ctr',
  'cpc',
  'inline_link_clicks',
  'inline_link_click_ctr',
] as const;

export const ACTION_INSIGHT_FIELDS = [
  'actions',
  'action_values',
  'cost_per_action_type',
] as const;

export const PURCHASE_INSIGHT_FIELDS = ['purchase_roas', 'website_purchase_roas'] as const;

/**
 * `action_type` retornado pela Ads Insights API para cada tipo de resultado.
 * A API nao garante presenca: se a campanha nao gerou aquele evento, o campo
 * simplesmente nao vem. O leitor precisa tratar ausencia, nunca presumir zero.
 */
export const ACTION_TYPES = {
  conversasWhatsapp: [
    'onsite_conversion.total_messaging_connection',
    'onsite_conversion.messaging_conversation_started_7d',
  ],
  leads: ['lead', 'onsite_conversion.lead_grouped', 'offsite_conversion.fb_pixel_lead'],
  compras: ['purchase', 'offsite_conversion.fb_pixel_purchase', 'omni_purchase'],
  cliquesNoLink: ['link_click'],
  visualizacoesDaPagina: ['landing_page_view'],
} as const;

export const AD_EFFECTIVE_STATUSES_COM_PROBLEMA = [
  'DISAPPROVED',
  'WITH_ISSUES',
  'PENDING_REVIEW',
  'PREAPPROVED',
  'CAMPAIGN_PAUSED',
  'ADSET_PAUSED',
] as const;
