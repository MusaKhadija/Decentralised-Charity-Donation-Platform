;; Charity Treasury Management Contract
;; Enables charities to manage donations and earn yield through staking

;; Constants
(define-constant err-unauthorized (err u401))
(define-constant err-insufficient-funds (err u402))
(define-constant err-invalid-charity (err u403))
(define-constant err-already-staked (err u404))
(define-constant err-not-staked (err u405))
(define-constant err-emergency-only (err u406))
(define-constant staking-apy u800) ;; 8% APY in basis points

;; Data Variables
(define-data-var contract-owner principal tx-sender)
(define-data-var total-value-locked uint u0)
(define-data-var emergency-mode bool false)

;; Maps
(define-map charity-treasuries 
  principal 
  {
    total-balance: uint,
    staked-amount: uint,
    last-yield-claim: uint,
    yield-earned: uint,
    emergency-contact: principal
  })

(define-map staking-pools
  uint
  {
    charity: principal,
    principal-amount: uint,
    stake-start-height: uint,
    last-reward-height: uint
  })

(define-map authorized-charities principal bool)

;; Private Functions
(define-private (calculate-yield (principal-amount uint) (blocks-staked uint))
  (let ((annual-blocks u52560)) ;; Approximate blocks per year
    (/ (* (* principal-amount staking-apy) blocks-staked) (* annual-blocks u10000))))

(define-private (is-authorized-charity (charity principal))
  (default-to false (map-get? authorized-charities charity)))

;; Admin Functions
(define-public (authorize-charity (charity principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorized)
    (map-set authorized-charities charity true)
    (ok true)))

(define-public (toggle-emergency-mode)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-unauthorized)
    (var-set emergency-mode (not (var-get emergency-mode)))
    (ok (var-get emergency-mode))))

;; Core Treasury Functions
(define-public (deposit-to-treasury (amount uint))
  (let ((charity tx-sender)
        (treasury (default-to 
          {total-balance: u0, staked-amount: u0, last-yield-claim: u0, yield-earned: u0, emergency-contact: tx-sender}
          (map-get? charity-treasuries charity))))
    (begin
      (asserts! (is-authorized-charity charity) err-invalid-charity)
      (asserts! (> amount u0) err-insufficient-funds)
      
      ;; Transfer STX to contract
      (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
      
      ;; Update treasury balance
      (map-set charity-treasuries charity 
        (merge treasury {total-balance: (+ (get total-balance treasury) amount)}))
      
      (ok amount))))

(define-public (stake-treasury-funds (amount uint))
  (let ((charity tx-sender)
        (treasury (unwrap! (map-get? charity-treasuries charity) err-invalid-charity))
        (available-balance (- (get total-balance treasury) (get staked-amount treasury))))
    (begin
      (asserts! (is-authorized-charity charity) err-invalid-charity)
      (asserts! (<= amount available-balance) err-insufficient-funds)
      (asserts! (> amount u0) err-insufficient-funds)
      
      ;; Create staking pool entry
      (map-set staking-pools (+ (var-get total-value-locked) u1)
        {
          charity: charity,
          principal-amount: amount,
          stake-start-height: block-height,
          last-reward-height: block-height
        })
      
      ;; Update treasury
      (map-set charity-treasuries charity 
        (merge treasury {staked-amount: (+ (get staked-amount treasury) amount)}))
      
      ;; Update total value locked
      (var-set total-value-locked (+ (var-get total-value-locked) amount))
      
      (ok amount))))

(define-public (claim-staking-yield (pool-id uint))
  (let ((pool (unwrap! (map-get? staking-pools pool-id) err-not-staked))
        (charity (get charity pool))
        (treasury (unwrap! (map-get? charity-treasuries charity) err-invalid-charity))
        (blocks-staked (- block-height (get last-reward-height pool)))
        (yield-amount (calculate-yield (get principal-amount pool) blocks-staked)))
    (begin
      (asserts! (is-eq tx-sender charity) err-unauthorized)
      (asserts! (> yield-amount u0) err-insufficient-funds)
      
      ;; Update pool last reward height
      (map-set staking-pools pool-id 
        (merge pool {last-reward-height: block-height}))
      
      ;; Update treasury with earned yield
      (map-set charity-treasuries charity 
        (merge treasury {
          yield-earned: (+ (get yield-earned treasury) yield-amount),
          total-balance: (+ (get total-balance treasury) yield-amount),
          last-yield-claim: block-height
        }))
      
      ;; Transfer yield to charity (simulated mint)
      (try! (as-contract (stx-transfer? yield-amount tx-sender charity)))
      
      (ok yield-amount))))

(define-public (unstake-funds (pool-id uint) (amount uint))
  (let ((pool (unwrap! (map-get? staking-pools pool-id) err-not-staked))
        (charity (get charity pool))
        (treasury (unwrap! (map-get? charity-treasuries charity) err-invalid-charity)))
    (begin
      (asserts! (is-eq tx-sender charity) err-unauthorized)
      (asserts! (<= amount (get principal-amount pool)) err-insufficient-funds)
      
      ;; First claim any pending yield
      (try! (claim-staking-yield pool-id))
      
      ;; Update staking pool
      (if (is-eq amount (get principal-amount pool))
        ;; Complete unstake - remove pool
        (map-delete staking-pools pool-id)
        ;; Partial unstake - update pool
        (map-set staking-pools pool-id 
          (merge pool {principal-amount: (- (get principal-amount pool) amount)})))
      
      ;; Update treasury
      (map-set charity-treasuries charity 
        (merge treasury {staked-amount: (- (get staked-amount treasury) amount)}))
      
      ;; Update total value locked
      (var-set total-value-locked (- (var-get total-value-locked) amount))
      
      (ok amount))))

(define-public (emergency-withdraw (amount uint))
  (let ((charity tx-sender)
        (treasury (unwrap! (map-get? charity-treasuries charity) err-invalid-charity)))
    (begin
      (asserts! (var-get emergency-mode) err-emergency-only)
      (asserts! (is-authorized-charity charity) err-invalid-charity)
      (asserts! (<= amount (get total-balance treasury)) err-insufficient-funds)
      
      ;; Transfer funds directly from contract
      (try! (as-contract (stx-transfer? amount tx-sender charity)))
      
      ;; Update treasury balance
      (map-set charity-treasuries charity 
        (merge treasury {total-balance: (- (get total-balance treasury) amount)}))
      
      (ok amount))))

(define-public (withdraw-available-funds (amount uint))
  (let ((charity tx-sender)
        (treasury (unwrap! (map-get? charity-treasuries charity) err-invalid-charity))
        (available-balance (- (get total-balance treasury) (get staked-amount treasury))))
    (begin
      (asserts! (is-authorized-charity charity) err-invalid-charity)
      (asserts! (<= amount available-balance) err-insufficient-funds)
      (asserts! (> amount u0) err-insufficient-funds)
      
      ;; Transfer available funds to charity
      (try! (as-contract (stx-transfer? amount tx-sender charity)))
      
      ;; Update treasury balance
      (map-set charity-treasuries charity 
        (merge treasury {total-balance: (- (get total-balance treasury) amount)}))
      
      (ok amount))))

;; Read-only Functions
(define-read-only (get-charity-treasury (charity principal))
  (map-get? charity-treasuries charity))

(define-read-only (get-staking-pool (pool-id uint))
  (map-get? staking-pools pool-id))

(define-read-only (get-available-balance (charity principal))
  (let ((treasury (map-get? charity-treasuries charity)))
    (match treasury
      treasury-data (- (get total-balance treasury-data) (get staked-amount treasury-data))
      u0)))

(define-read-only (calculate-pending-yield (pool-id uint))
  (let ((pool (map-get? staking-pools pool-id)))
    (match pool
      pool-data (let ((blocks-staked (- block-height (get last-reward-height pool-data))))
        (calculate-yield (get principal-amount pool-data) blocks-staked))
      u0)))

(define-read-only (get-total-value-locked)
  (var-get total-value-locked))

(define-read-only (is-emergency-mode)
  (var-get emergency-mode))

(define-read-only (get-contract-owner)
  (var-get contract-owner))

(define-read-only (is-charity-authorized (charity principal))
  (is-authorized-charity charity))
