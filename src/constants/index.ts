

export const BUSINESS_CONSTANTS = {

  DEFAULT_SHIPPING_COST: 19.9,

  FREE_SHIPPING_THRESHOLD: 1500.0,

  MAX_INSTALLMENTS: 12,

  FREE_INSTALLMENT_LIMIT: 6,

  MONTHLY_INTEREST_RATE: 0.0199,

  PIX_DISCOUNT_PERCENTAGE: 5,

  VALID_COUPONS: [
    {
      code: 'LAB10',
      discountPercentage: 10,
      description: '10% de desconto em todo o site',
    },
    {
      code: 'STORELAB10',
      discountPercentage: 10,
      description: '10% de desconto promocional',
    },
  ],
} as const;

export const STORAGE_KEYS = {
  USER_SESSION: 'user_session',
  ANON_ID: 'anon_id',
  REGISTERED_USERS: 'registered_users',
  USER_ADDRESSES_PREFIX: 'user_addresses_',
  USER_CARDS_PREFIX: 'user_cards_',
  USER_ORDERS_PREFIX: 'user_orders_',
  PRODUCT_REVIEWS_PREFIX: 'product_reviews_',
  CART: 'user_cart',
  GUEST_CART: 'guest_cart',
  SELECTED_PRODUCT_ID: 'selected_product_id',
} as const;

export const SECURITY_CONSTANTS = {
  SALT_PREFIX: 'sec_salt_',
  HASH_PREFIX: 'sec_hash_',
} as const;

