;; Charity Registration Contract
(define-map charities
  ((charity-id uint))
  ((owner principal) (metadata (string-utf8 256)) (verified bool) (status (string-utf8 32))))

(define-public (register-charity (charity-id uint) (metadata (string-utf8 256)))
  (begin
    (map-set charities ((charity-id charity-id)) ((owner tx-sender) (metadata metadata) (verified false) (status "pending")))
    (ok charity-id)))

(define-public (verify-charity (charity-id uint))
  (begin
    (asserts! (is-eq tx-sender 'SP000000000000000000002Q6VF78) (err u401)) ;; Only admin can verify
    (map-update charities ((charity-id charity-id)) ((verified true) (status "verified")))
    (ok charity-id)))

(define-public (update-charity-status (charity-id uint) (status (string-utf8 32)))
  (begin
    (asserts! (is-eq tx-sender (get owner (unwrap! (map-get? charities ((charity-id charity-id))) (err u404)))) (err u403))
    (map-update charities ((charity-id charity-id)) ((status status)))
    (ok charity-id)))

(define-read-only (get-charity (charity-id uint))
  (map-get? charities ((charity-id charity-id))))

;; --- Token Gating and Multi-Sig Withdrawal Enhancements (Refined) ---

;; Token gating: check if charity is verified (already implemented), and placeholder for token ownership check
;; To implement a real token gate, replace the placeholder with a call to an FT or NFT contract's read-only function

(define-public (propose-withdrawal (charity-id uint) (proposal-id uint) (amount uint) (to principal))
  (let ((charity (unwrap! (map-get? charities ((charity-id charity-id))) (err u404))))
    (begin
      (asserts! (is-eq tx-sender (get owner charity)) (err u403))
      (asserts! (get verified charity) (err u401))
      ;; Token gating placeholder: always true for now
      ;; Replace with (is-eq (contract-call? 'token-contract get-balance tx-sender) u1) or similar
      (map-set withdrawal-proposals ((charity-id charity-id) (proposal-id proposal-id)) ((amount amount) (to to) (approvals u0) (executed false)))
      (ok proposal-id))))

(define-map withdrawal-proposals
  ((charity-id uint) (proposal-id uint))
  ((amount uint) (to principal) (approvals uint) (executed bool)))

(define-map withdrawal-approvers
  ((charity-id uint) (proposal-id uint) (approver principal))
  ((approved bool)))

(define-constant REQUIRED-APPROVALS u2) ;; Example: 2 approvals required

(define-public (approve-withdrawal (charity-id uint) (proposal-id uint))
  (let ((proposal (unwrap! (map-get? withdrawal-proposals ((charity-id charity-id) (proposal-id proposal-id))) (err u404)))
        (charity (unwrap! (map-get? charities ((charity-id charity-id))) (err u404))))
    (begin
      (asserts! (get verified charity) (err u401))
      (asserts! (not (get executed proposal)) (err u405))
      (asserts! (is-none (map-get? withdrawal-approvers ((charity-id charity-id) (proposal-id proposal-id) (approver tx-sender)))) (err u406))
      (map-set withdrawal-approvers ((charity-id charity-id) (proposal-id proposal-id) (approver tx-sender)) ((approved true)))
      (map-update withdrawal-proposals ((charity-id charity-id) (proposal-id proposal-id)) ((approvals (+ (get approvals proposal) u1))))
      (ok true))))

(define-public (execute-withdrawal (charity-id uint) (proposal-id uint))
  (let ((proposal (unwrap! (map-get? withdrawal-proposals ((charity-id charity-id) (proposal-id proposal-id))) (err u404))))
    (begin
      (asserts! (not (get executed proposal)) (err u405))
      (asserts! (>= (get approvals proposal) REQUIRED-APPROVALS) (err u407))
      ;; Here, you would add logic to transfer funds (not implemented in this contract)
      (map-update withdrawal-proposals ((charity-id charity-id) (proposal-id proposal-id)) ((executed true)))
      (ok true))))
