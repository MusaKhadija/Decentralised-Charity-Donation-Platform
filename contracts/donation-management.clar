;; Donation Management Contract
(define-map donations
  ((donation-id uint))
  ((charity-id uint) (donor principal) (amount uint) (timestamp uint)))

(define-map recurring-donations
  ((donor principal) (charity-id uint))
  ((interval uint) (last-donation uint) (amount uint)))

(define-public (donate (charity-id uint))
  (let ((amount (stx-get-transfer-amount)))
    (begin
      (asserts! (> amount u0) (err u400))
      (let ((donation-id (block-height)))
        (map-set donations ((donation-id donation-id)) ((charity-id charity-id) (donor tx-sender) (amount amount) (timestamp donation-id)))
        (ok donation-id)))))

(define-public (set-recurring-donation (charity-id uint) (interval uint) (amount uint))
  (begin
    (map-set recurring-donations ((donor tx-sender) (charity-id charity-id)) ((interval interval) (last-donation (block-height)) (amount amount)))
    (ok true)))

(define-read-only (get-donation (donation-id uint))
  (map-get? donations ((donation-id donation-id))))

(define-read-only (get-donations-for-charity (charity-id uint))
  ;; This would be implemented off-chain for efficiency
  (ok "Query off-chain"))
