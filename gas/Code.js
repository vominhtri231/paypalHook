function doPost(e) {
   const postBodyJson = e.postData.contents;

   // samples for testing
   // tesing saveOrder
   // const postBodyJson = '{\"id\":\"WH-4PE28336B4302694M-2RY014725M284500Y\",\"event_version\":\"1.0\",\"create_time\":\"2020-09-25T05:53:43.815Z\",\"resource_type\":\"checkout-order\",\"resource_version\":\"2.0\",\"event_type\":\"CHECKOUT.ORDER.APPROVED\",\"summary\":\"An order has been approved by buyer\",\"resource\":{\"create_time\":\"2020-09-25T05:53:18Z\",\"purchase_units\":[{\"reference_id\":\"default\",\"amount\":{\"currency_code\":\"JPY\",\"value\":\"123\"},\"payee\":{\"email_address\":\"sb-ixlne3191888@business.example.com\",\"merchant_id\":\"9HRHDZTHR9NZC\"},\"shipping\":{\"name\":{\"full_name\":\"John Doe\"},\"address\":{\"address_line_1\":\"1 Main St\",\"admin_area_2\":\"San Jose\",\"admin_area_1\":\"CA\",\"postal_code\":\"95131\",\"country_code\":\"US\"}}}],\"links\":[{\"href\":\"https://api.sandbox.paypal.com/v2/checkout/orders/72Y08408NK085872X\",\"rel\":\"self\",\"method\":\"GET\"},{\"href\":\"https://api.sandbox.paypal.com/v2/checkout/orders/72Y08408NK085872X\",\"rel\":\"update\",\"method\":\"PATCH\"},{\"href\":\"https://api.sandbox.paypal.com/v2/checkout/orders/72Y08408NK085872X/capture\",\"rel\":\"capture\",\"method\":\"POST\"}],\"id\":\"72Y08408NK085872X\",\"intent\":\"CAPTURE\",\"payer\":{\"name\":{\"given_name\":\"John\",\"surname\":\"Doe\"},\"email_address\":\"sb-h1l6m3283490@personal.example.com\",\"payer_id\":\"84A4WBAVQ5LCJ\",\"address\":{\"country_code\":\"US\"}},\"status\":\"APPROVED\"},\"links\":[{\"href\":\"https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-4PE28336B4302694M-2RY014725M284500Y\",\"rel\":\"self\",\"method\":\"GET\"},{\"href\":\"https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-4PE28336B4302694M-2RY014725M284500Y/resend\",\"rel\":\"resend\",\"method\":\"POST\"}]}'

   // testing save plan product
   // const postBodyJson = "{\"id\":\"WH-5CF95636AH916115S-36S38333AN807124H\",\"event_version\":\"1.0\",\"create_time\":\"2020-09-26T05:22:37.585Z\",\"resource_type\":\"plan\",\"resource_version\":\"2.0\",\"event_type\":\"BILLING.PLAN.CREATED\",\"summary\":\"Plan created\",\"resource\":{\"quantity_supported\":false,\"create_time\":\"2020-09-26T05:22:16Z\",\"payment_preferences\":{\"service_type\":\"PREPAID\",\"auto_bill_outstanding\":true,\"setup_fee\":{\"currency_code\":\"USD\",\"value\":\"0.0\"},\"setup_fee_failure_action\":\"CANCEL\",\"payment_failure_threshold\":0},\"version\":1,\"payee\":{\"merchant_id\":\"9HRHDZTHR9NZC\",\"display_data\":{\"business_email\":\"cs-sb-ixlne3191888@business.example.com\"}},\"update_time\":\"2020-09-26T05:22:16Z\",\"usage_type\":\"LICENSED\",\"product_id\":\"PROD-09B05145J4290842L\",\"name\":\"Video Streaming Service Plan\",\"billing_cycles\":[{\"pricing_scheme\":{\"version\":1,\"fixed_price\":{\"currency_code\":\"USD\",\"value\":\"10.0\"},\"create_time\":\"2020-09-26T05:22:16Z\",\"update_time\":\"2020-09-26T05:22:16Z\"},\"frequency\":{\"interval_unit\":\"MONTH\",\"interval_count\":1},\"tenure_type\":\"REGULAR\",\"sequence\":1,\"total_cycles\":1}],\"links\":[{\"href\":\"https://api.sandbox.paypal.com/v1/billing/plans/P-3FJ39713M0083880CL5XNACA\",\"rel\":\"self\",\"method\":\"GET\",\"encType\":\"application/json\"},{\"href\":\"https://api.sandbox.paypal.com/v1/billing/plans/P-3FJ39713M0083880CL5XNACA\",\"rel\":\"edit\",\"method\":\"PATCH\",\"encType\":\"application/json\"},{\"href\":\"https://api.sandbox.paypal.com/v1/billing/plans/P-3FJ39713M0083880CL5XNACA/deactivate\",\"rel\":\"self\",\"method\":\"POST\",\"encType\":\"application/json\"},{\"href\":\"https://www.sandbox.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3FJ39713M0083880CL5XNACA\",\"rel\":\"subscribe\",\"method\":\"GET\",\"encType\":\"application/json\"}],\"id\":\"P-3FJ39713M0083880CL5XNACA\",\"status\":\"ACTIVE\"},\"links\":[{\"href\":\"https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-5CF95636AH916115S-36S38333AN807124H\",\"rel\":\"self\",\"method\":\"GET\"},{\"href\":\"https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-5CF95636AH916115S-36S38333AN807124H/resend\",\"rel\":\"resend\",\"method\":\"POST\"}]}";

   // tesing save new subscription
   //const postBodyJson = '{ "id": "WH-8GW13668TP983531H-86P59138XM295835R", "create_time": "2020-09-20T08:01:08.690Z", "resource_type": "subscription", "event_type": "BILLING.SUBSCRIPTION.ACTIVATED", "summary": "Subscription activated", "resource": { "quantity": "1", "subscriber": { "name": { "given_name": "John", "surname": "Doe" }, "email_address": "sb-cax47h3188802@personal.example.com", "payer_id": "D3Y35LBJK354G", "shipping_address": { "address": { "address_line_1": "1 Main St", "admin_area_2": "San Jose", "admin_area_1": "CA", "postal_code": "95131", "country_code": "US" } } }, "create_time": "2020-09-20T07:59:26Z", "plan_overridden": false, "shipping_amount": { "currency_code": "AUD", "value": "0.0" }, "start_time": "2020-09-20T07:00:00Z", "update_time": "2020-09-20T08:00:45Z", "billing_info": { "outstanding_balance": { "currency_code": "AUD", "value": "0.0" }, "cycle_executions": [ { "tenure_type": "REGULAR", "sequence": 1, "cycles_completed": 0, "cycles_remaining": 3, "current_pricing_scheme_version": 1, "total_cycles": 3 } ], "last_payment": { "amount": { "currency_code": "AUD", "value": "115.0" }, "time": "2020-09-20T08:00:44Z" }, "next_billing_time": "2020-09-20T08:00:43Z", "final_payment_time": "2020-11-20T10:00:00Z", "failed_payments_count": 0 }, "links": [ { "href": "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-M7T16HXWA27J/cancel", "rel": "cancel", "method": "POST", "encType": "application/json" }, { "href": "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-M7T16HXWA27J", "rel": "edit", "method": "PATCH", "encType": "application/json" }, { "href": "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-M7T16HXWA27J", "rel": "self", "method": "GET", "encType": "application/json" }, { "href": "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-M7T16HXWA27J/suspend", "rel": "suspend", "method": "POST", "encType": "application/json" }, { "href": "https://api.sandbox.paypal.com/v1/billing/subscriptions/I-M7T16HXWA27J/capture", "rel": "capture", "method": "POST", "encType": "application/json" } ], "id": "I-M7T16HXWA27J", "plan_id": "P-8U653148NE5673816L5TQXVI", "status": "ACTIVE", "status_update_time": "2020-09-20T08:00:45Z" }, "status": "SUCCESS", "links": [ { "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-8GW13668TP983531H-86P59138XM295835R", "rel": "self", "method": "GET", "encType": "application/json" }, { "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-8GW13668TP983531H-86P59138XM295835R/resend", "rel": "resend", "method": "POST", "encType": "application/json" } ], "event_version": "1.0", "resource_version": "2.0" }';

   // testing save payment
   //const postBodyJson = '{ "id": "WH-0BN93889V1674820X-47Y49208T9581160K", "create_time": "2020-09-20T06:35:34.160Z", "resource_type": "sale", "event_type": "PAYMENT.SALE.PENDING", "summary": "Payment pending for AUD 115.0 AUD", "resource": { "reason_code": "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION", "billing_agreement_id": "I-M7T16HXWA27J", "amount": { "total": "115.00", "currency": "AUD", "details": { "subtotal": "115.00" } }, "payment_mode": "INSTANT_TRANSFER", "update_time": "2020-09-20T06:34:46Z", "create_time": "2020-09-20T06:34:46Z", "protection_eligibility_type": "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE", "protection_eligibility": "ELIGIBLE", "links": [ { "method": "GET", "rel": "self", "href": "https://api.sandbox.paypal.com/v1/payments/sale/30D7788414781802G" }, { "method": "POST", "rel": "refund", "href": "https://api.sandbox.paypal.com/v1/payments/sale/30D7788414781802G/refund" } ], "id": "30D7788414781802G", "state": "pending", "invoice_number": "" }, "status": "SUCCESS", "links": [ { "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-0BN93889V1674820X-47Y49208T9581160K", "rel": "self", "method": "GET", "encType": "application/json" }, { "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-0BN93889V1674820X-47Y49208T9581160K/resend", "rel": "resend", "method": "POST", "encType": "application/json" } ], "event_version": "1.0" }';

   debug(e);
   const postObject = JSON.parse(postBodyJson);
   const { event_type, id } = postObject;

   if (isHookHandled(id)) {
      return;
   }

   Logger.log(event_type);
   switch (event_type) {
      case 'CHECKOUT.ORDER.APPROVED':
         saveOrder(postObject, id);
         break;
      case 'BILLING.PLAN.CREATED':
         savePlanProduct(postObject);
         break;
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
         saveNewSubscription(postObject, id);
         break;
      case 'PAYMENT.SALE.PENDING':
         savePayment(postObject);
         break;
   }

   saveHandledHook(id);

   return;
}

function doGet(e) {
   const productCode = e.parameter.productCode;
   const orderId = e.parameter.orderId;

   if (productCode && orderId) {
      updateExistingOrders({ productCode, orderId });
      saveOrderProduct({ productCode, orderId })
   }

   return ContentService.createTextOutput('<html></html>')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
}