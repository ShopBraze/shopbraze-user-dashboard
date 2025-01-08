import SummaryIcon from "assets/icons/sidebar/summary-icon"
import OrdersIcon from "assets/icons/sidebar/orders-icon"
import FinanceIcon from "assets/icons/sidebar/finance-icon"
import ProductsIcon from "assets/icons/sidebar/products-icon"
import OffersAndCouponsIcon from "assets/icons/sidebar/offers-and-coupons-icon"
import ShippingIcon from "assets/icons/sidebar/shipping-icon"
import WebsiteIcon from "assets/icons/sidebar/website-icon"
import SettingsIcon from "assets/icons/sidebar/settings-icon"

export const SidebarNavigationConstants = [
  {
    id: 1,
    name: "Summary",
    path: '/summary',
    icon: SummaryIcon,
    subNavItems: []
  },
  {
    id: 2,
    name: "Orders",
    path: '/orders',
    icon: OrdersIcon,
    subNavItems: [
      {
        id: 201,
        name: 'Process Orders',
        path: '/orders/process-orders',
      },
      {
        id: 202,
        name: 'Non-Delivery Report (NDR)',
        path: '/orders/ndr',
      },
      {
        id: 203,
        name: 'Return/Exchange Requests',
        path: '/orders/return-requests',
      },
      {
        id: 204,
        name: 'RTO & Returns',
        path: '/orders/rto-and-returns',
      },
      {
        id: 205,
        name: 'Track Orders',
        path: '/orders/track-orders',
      },
      {
        id: 206,
        name: 'Place Order',
        path: '/orders/place-order',
      }
    ]
  },
  {
    id: 3,
    name: "Finance",
    path: '/finance',
    icon: FinanceIcon,
    subNavItems: [
      {
        id: 301,
        name: 'Remittance',
        path: '/finance/remittance',
      },
      {
        id: 303,
        name: 'Expense Ledger',
        path: '/finance/expense-ledger',
      },
      {
        id: 303,
        name: 'Expenses',
        path: '/finance/expenses',
      },
      {
        id: 304,
        name: 'Billing Invoices',
        path: '/finance/billing-invoices',
      },
      {
        id: 305,
        name: 'Profit & Loss',
        path: '/finance/profit-and-loss',
      },
      {
        id: 306,
        name: 'Weight Delta',
        path: '/finance/weight-delta',
      }
    ]
  },
  {
    id: 4,
    name: "Products",
    path: '/products',
    icon: ProductsIcon,
    subNavItems: [
      {
        id: 401,
        name: "Catalogue",
        path: '/products/catalogue'
      },
      {
        id: 402,
        name: "Low Stock Products",
        path: '/products/low-stock-products'
      }
    ]
  },
  {
    id: 5,
    name: "Offers & Coupons",
    path: '/offers-and-coupons',
    icon: OffersAndCouponsIcon,
    subNavItems: [
      {
        id: 501,
        name: "Generic Coupons",
        path: "/offers-and-coupons/generic-coupons"
      },
      {
        id: 502,
        name: "Free Gift",
        path: "/offers-and-coupons/free-gift"
      }
    ]
  },
  {
    id: 6,
    name: "Shipping",
    path: '/shipping',
    icon: ShippingIcon,
    subNavItems: [
      {
        id: 601,
        name: "Rate Calculator",
        path: "/shipping/rate-calculator"
      },
      {
        id: 602,
        name: "Forward Rates",
        path: "/shipping/forward-rates"
      },
      {
        id: 603,
        name: "Return Rates",
        path: "/shipping/return-rates"
      }
    ]
  },
  {
    id: 7,
    name: "Website",
    path: '/website',
    icon: WebsiteIcon,
    subNavItems: [
      {
        id: 701,
        name: "Website Pages",
        path: "/website/website-pages"
      },
      {
        id: 702,
        name: "Web Configuration",
        path: "/website/web-configuration"
      },
      {
        id: 703,
        name: "Announcement Bar",
        path: "/website/announcement-bar"
      },
      {
        id: 704,
        name: "Global Theme",
        path: "/website/global-theme"
      },
      {
        id: 705,
        name: "Sales Event",
        path: "/website/sales-event"
      },
      {
        id: 706,
        name: "Collection",
        path: "/website/collection"
      },
      {
        id: 707,
        name: "Navigation",
        path: "/website/navigation"
      },
      {
        id: 708,
        name: "Testimonials",
        path: "/website/testimonials"
      },
      {
        id: 709,
        name: "Rating And Reviews",
        path: "/website/rating-and-reviews"
      },

    ]
  },
  {
    id: 8,
    name: "Settings",
    path: '/settings',
    icon: SettingsIcon,
    subNavItems: [
      {
        id: 801,
        name: "Users & Permissions",
        path: "/settings/user-and-permissions"
      },
      {
        id: 802,
        name: "Seller Whatsapp",
        path: "/settings/seller-whatsapp"
      },
      {
        id: 803,
        name: "Seller Community",
        path: "/settings/seller-community"
      },
      {
        id: 804,
        name: "Invoice & Charges",
        path: "/settings/invoice-and-charges"
      },
      {
        id: 805,
        name: "Coupons",
        path: "/settings/coupons"
      },
      {
        id: 806,
        name: "Courier Preferences",
        path: "/settings/courier-preferences"
      },
      {
        id: 807,
        name: "Catalogue Settings",
        path: "/settings/catalogue-settings"
      },
      {
        id: 808,
        name: "Orders",
        path: "/settings/orders"
      },
      {
        id: 809,
        name: "Return & Exchange Settings",
        path: "/settings/return--and-exchange"
      },
      {
        id: 810,
        name: "Marketing",
        path: "/settings/marketing"
      },
      {
        id: 811,
        name: "Facebook Analytics",
        path: "/settings/facebook-analytics"
      },
      {
        id: 812,
        name: "Communication Settings",
        path: "/settings/communication-settings"
      },
      {
        id: 813,
        name: "Bank",
        path: "/settings/bank"
      },
      {
        id: 814,
        name: "Shipping Label",
        path: "/settings/shipping-label"
      },
      {
        id: 815,
        name: "Addresses",
        path: "/settings/addresses"
      },
      {
        id: 816,
        name: "Order Cancellation",
        path: "/settings/order-cancellation"
      },
    ]
  }
]