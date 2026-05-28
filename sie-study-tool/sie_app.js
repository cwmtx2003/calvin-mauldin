// ═══════════════════════════════════════════════════
// UNITS — Kaplan 3rd Ed. + FINRA Content Outline 2024
// ═══════════════════════════════════════════════════
const UNITS=[
{num:1,name:"Primary & Secondary Markets",topics:`PRIMARY MARKET: Issuers sell securities to raise capital — proceeds go to issuer. IPO: first-time issuance, Rule 5130 applies. APO/Follow-on: company already public, Rule 5130 does NOT apply. SECONDARY MARKET: investors trade among themselves — issuer does NOT receive proceeds. NYSE/Nasdaq (NMS securities); OTC (non-NMS). NYSE hours 9:30am–4:00pm ET. Dark pools: anonymous institutional block orders. THIRD MARKET: exchange-listed securities traded OTC. FOURTH MARKET: direct institutional trading via ECNs. SECURITIES ACT OF 1933 (Paper Act): governs primary market. Registration statement (S-1) filed with SEC. Cooling-off period: minimum 20 calendar days — no solicitation. Tombstone ads allowed. Prospectus: required for all purchasers. EXEMPT ISSUERS: US government, municipalities, national/state banks (NOT bank holding companies), S&Ls, charities, religious/educational nonprofits. EXEMPT ISSUES: commercial paper/bankers acceptances under 270 days; insurance policies; fixed annuity contracts (NOT variable annuities). REG A: Tier 1 up to $20M/12 months, Tier 2 up to $75M/12 months. REG D: private placements to accredited investors (net worth over $1M excluding primary residence OR income over $200K individual/$300K joint). RULE 144A: private resales to qualified institutional buyers (QIBs). SHELF REGISTRATION: WKSI registers securities to sell over 2-3 years. Supplemental prospectus required before each sale. MARKET PARTICIPANTS: SEC (primary federal regulator), FINRA (largest SRO), MSRB (municipal rules, NO enforcement authority), SIPC (customer protection if BD fails — NOT govt agency, $500K/$250K cash), FDIC ($250K bank deposits). Broker-dealers: introducing vs. clearing vs. prime. Investment advisers: fiduciaries under Investment Advisers Act 1940. Municipal advisors. Transfer agents. DTC/DTCC: depositories and clearing. ACCREDITED INVESTOR: net worth >$1M excluding primary residence OR income >$200K individual/$300K joint. ORDER TYPES: Market (immediate best price). Limit (specific price or better). Stop (triggers at stop price, becomes market). Stop-limit (triggers at stop, becomes limit). Buy limit = at or below. Sell limit = at or above. Buy stop = above market. Sell stop = below market. TIME RESTRICTIONS: Day order (default, EOD). GTC (auto-cancelled last business day of April and October). FILL RESTRICTIONS (limit only): FOK (all or nothing immediately). IOC (partial ok, rest cancelled). AON (all or nothing, can wait). SETTLEMENT: corporate T+1, options T+1, government T+1. PROSPECTUS DELIVERY: IPO NMS 25 days, IPO non-NMS 90 days, APO NMS 0 days, APO non-NMS 40 days. LONG = own, bullish. SHORT = borrowed and sold, bearish. METHODS OF DISTRIBUTION: Best efforts (underwriter not obligated to sell all). Firm commitment (underwriter buys all, resells). FEDERAL RESERVE tools: open market operations (MOST USED), discount rate, reserve requirement, fed funds rate (FOMC). Fiscal policy = Congress/President (NOT Fed). Monetary policy = Fed.`},
{num:2,name:"Equity Securities",topics:`COMMON STOCK: ownership in corporation. Authorized = total allowed. Issued = sold. Outstanding = issued minus treasury. Treasury stock = repurchased, no voting rights, no dividends, not outstanding. Formula: Issued - Treasury = Outstanding. Market cap = outstanding shares x CMV. RIGHTS: vote for BOD (one share one vote or cumulative voting), receive dividends if declared, preemptive rights (maintain proportional ownership), residual claim (LAST at bankruptcy after ALL creditors). LIMITED LIABILITY: shareholders cannot lose more than their investment. PREEMPTIVE RIGHTS: short-term (30-45 days), exercised BELOW current market (subscription price), traded on exchanges. One right per share. WARRANTS: long-term (years), exercise price ABOVE current market initially, issued with bonds as sweetener. DIVIDEND PROCESS: Declaration date (BOD declares). Ex-dividend date (buyer on/after does NOT get dividend; must buy day BEFORE ex-date). Record date (1 business day after ex-date). Payable date. Cash dividends = ordinary income. Stock dividends increase shares, reduce price proportionally, not taxable until sold. PREFERRED STOCK: fixed dividend (% of $100 par), priority over common for dividends and at liquidation, generally no voting rights. Par = $100 (assume unless stated). Straight/Noncumulative: missed dividends lost forever. Cumulative: missed dividends accumulate, paid before common. Callable: company can redeem at stated price. Convertible: exchange for fixed number of common shares. Participating: shares in additional profits. ADRs (American Depositary Receipts): US-traded certificates for foreign securities, traded in USD, dividends in USD, subject to currency risk and political risk. STOCK SPLITS: 2:1 doubles shares, halves price, no change in market cap. Reverse split decreases shares, increases price. CONVERSION: ratio = par value of bond / conversion price. Parity price of stock = bond price / conversion ratio. SEC RULE 144: controls sale of restricted and control securities. ORDER OF LIQUIDATION: secured creditors, unsecured creditors, preferred stockholders, common stockholders. CORPORATE ACTIONS: stock splits, reverse splits, buybacks/tender offers, rights offerings, mergers and acquisitions, proxy voting. INVESTMENT RISKS: Capital (loss of principal). Credit (default). Currency (foreign investments). Inflation/purchasing power (fixed income most affected). Interest rate/reinvestment. Liquidity (hard to sell). Market/systematic (affects all - CANNOT diversify away - measured by BETA). Non-systematic (company-specific - CAN diversify away). Political. Prepayment (MBS). BETA: 1=moves with market, >1=more volatile, <1=less volatile, <0=inverse. RISK MITIGATION: Diversification (reduces non-systematic). Portfolio rebalancing. Hedging.`},
{num:3,name:"Debt Securities",topics:`BOND BASICS: issuer promises to pay interest and repay par at maturity. Par = $1,000 corporate. Coupon rate = stated rate, fixed. Premium bond: price above par (coupon > market rates). Discount bond: price below par (coupon < market rates). KEY RULE: bond prices and interest rates move INVERSELY. CORPORATE QUOTES: % of par (95=$950, 102.5=$1,025). GOVERNMENT QUOTES: in 32nds (98:16 = 98+16/32 = 98.5 = $985). MUNICIPAL QUOTES: yield basis (YTM) or dollar price. BOND TYPES: Mortgage bond (secured by real estate). Collateral trust (secured by securities). Equipment trust certificate (secured by equipment). Debenture (unsecured). Subordinated debenture (junior to debentures). Convertible (can convert to common stock at conversion price). Zero-coupon (no periodic interest, issued at deep discount, accretes to par, taxed annually on OID phantom income). Callable (issuer can redeem early, bad for investor when rates fall). Putable (investor can sell back at par, good when rates rise). Income/adjustment bond (interest paid only if company earns it). Bankers acceptance: money market, short-term, international trade. Commercial paper: short-term unsecured corporate debt, under 270 days = exempt from registration. CD: certificate of deposit. PRIORITY AT LIQUIDATION: 1)Secured creditors 2)Debentures 3)Subordinated debentures 4)Preferred stockholders 5)Common stockholders. US GOVERNMENT: full faith and credit, no default risk. T-Bills: discount, 4/8/13/26/52 weeks, min $100. T-Notes: semi-annual interest, 2-10 years. T-Bonds: semi-annual interest, 30 years. TIPS: principal adjusted for CPI. STRIPS: zero-coupon. T+1 settlement. Taxable federal ONLY - exempt state/local. AGENCY: Ginnie Mae (GNMA) IS backed by US government, FHA/VA mortgages. Fannie Mae (FNMA) and Freddie Mac (FHLMC) NOT backed by US government. MBS: pool of mortgages, monthly principal+interest, prepayment risk. CMOs: tranches. PAC tranche most stable. Companion tranche absorbs prepayment risk. MUNICIPAL BONDS: interest EXEMPT from federal tax. May be exempt state tax if issued in investor's home state. GO bonds: full faith and credit, taxing power, voter approval required, competitive bidding. Revenue bonds: backed only by project revenues, no voter approval, higher yield than GO, negotiated underwriting. AMT bonds: private purpose, subject to Alternative Minimum Tax. TANs/RANs/BANs: short-term municipal notes. Official statement = muni disclosure document (like prospectus). BOND RATINGS: Moody's Aaa/Aa/A/Baa = investment grade, Ba and below = speculative/junk. S&P/Fitch AAA/AA/A/BBB = investment grade, BB and below = speculative. DURATION: higher = more volatile. Longer maturity + lower coupon = higher duration. YIELD RELATIONSHIPS (MEMORIZE): Premium: coupon > current yield > YTM. Discount: coupon < current yield < YTM. Par: coupon = current yield = YTM. YIELD CALCULATIONS: Current yield = annual income / CMV. Nominal yield = coupon rate (never changes). YTM = most accurate. YTC = use when premium bond likely called. ACCRUED INTEREST: corporate 30/360, government actual/actual. Buyer pays seller accrued interest. NEGOTIATED vs COMPETITIVE: corporate = negotiated. Municipal GO = competitive bidding. Revenue bonds = negotiated.`},
{num:4,name:"Investment Companies & Insurance",topics:`INVESTMENT COMPANY ACT OF 1940: regulates investment companies. Types: face-amount certificate companies, UITs, management investment companies (open-end and closed-end). OPEN-END FUNDS (Mutual Funds): continuously issue/redeem shares, priced at NAV once daily at 4pm ET (forward pricing). NAV = (assets - liabilities) / shares outstanding. Class A: front-end load (up to 8.5%), lower 12b-1 fees, best for large long-term. Class B: CDSC/back-end load declining over time, higher 12b-1 fees, converts to A. Class C: level load, small 12b-1 (~1%), no CDSC after 1 year, best for short-term. POP = NAV + sales charge. Sales charge % = (POP-NAV)/POP. No-load: POP = NAV. 12b-1 fee: annual distribution/marketing fee (Rule 12b-1). BREAKPOINTS: quantity discounts. Rights of accumulation (ROA - count past purchases). LOI: commit to breakpoint within 13 months, can backdate 90 days. Breakpoint selling = violation. Net transactions: redeem one fund to buy another without sales charge. CLOSED-END FUNDS: fixed shares from IPO, trade on exchange at market price (can be premium or discount to NAV), leverage possible. UITs: fixed unmanaged portfolio, no active management, units not shares, self-liquidating, no management fee, redeemable with sponsor. ETFs: legally open-end but trade on exchange throughout day. Active vs. passive (mostly index-tracking). Marginable. Tax efficient. Low expenses. ETNs: senior unsecured debt from bank, NOT a fund, primary risk = default of issuing bank. MONEY MARKET FUNDS: short-term high-quality debt, $1 NAV, NOT FDIC insured. VARIABLE ANNUITIES: registered security, separate account holds subaccounts, investor bears investment risk. Accumulation phase = accumulation units. Payout phase: accumulation units convert to annuity units (number fixed, value fluctuates). Death benefit = greater of account value or total premiums. Fees: M&E risk, admin, investment management, surrender charges. FINRA Rule 2330: BD responsibilities for deferred variable annuities. SUITABILITY: long-term supplemental retirement income, funded with cash. NOT suitable: short-term needs, needs lump sum, funded by replacing life insurance or home equity. PAYOUT OPTIONS: Life only (highest payment). Life with period certain. Joint and last survivor. FIXED ANNUITY: NOT a security, insurance company bears risk, guaranteed rate. HEDGE FUNDS: private funds, min investment ~$1M+, partnership structure, illiquid, accredited/qualified investors, not registered investment companies. REITs: distribute 90%+ taxable income, pass-through taxation. Private REITs: not listed, illiquid. Registered non-listed REITs. Listed REITs: trade on exchange. DPPs: pass-through income/losses, illiquid, limited partners passive, limited liability. MUNICIPAL FUND SECURITIES: 529 plans (tax-deferred, tax-free qualified education, 5-year gift tax averaging, 10% penalty on non-qualified, no income limits). ABLE accounts: disabled individuals. LGIPs: local government investment pools.`},
{num:5,name:"Other Investment Vehicles",topics:`OPTIONS: contract giving buyer RIGHT (not obligation) to buy or sell. One contract = 100 shares. Premium = price paid. Strike price = fixed exercise price. Expiration = 3rd Friday of month at 11:59pm ET. American style = any time before expiration. European style = only at expiration. Exercise and assignment: buyer exercises, writer (seller) is assigned. CALL: right to BUY. Buyer = bullish, max gain = unlimited, max loss = premium. Naked call writer = max gain = premium, max loss = unlimited. PUT: right to SELL. Buyer = bearish, max gain = strike - premium, max loss = premium. Short put writer = max gain = premium, max loss = strike - premium. COVERED CALL: own stock AND sell call. Income strategy. Max gain = strike - stock cost + premium. Max loss = stock cost - premium. Breakeven = stock cost - premium. BREAKEVENS (MEMORIZE): Long call BE = strike + premium. Long put BE = strike - premium. Short call BE = strike + premium. Short put BE = strike - premium. IN/AT/OUT OF MONEY: Call ITM: CMV > strike. Call OTM: CMV < strike. Put ITM: CMV < strike. Put OTM: CMV > strike. ATM: CMV = strike. INTRINSIC VALUE = amount in-the-money (zero if OTM). TIME VALUE = premium - intrinsic value. EQUITY OPTIONS: physical delivery. INDEX OPTIONS: cash settlement. OCC (Options Clearing Corporation): clears and guarantees listed options, T+1 settlement. ODD (Options Disclosure Document): provided at/before account approval. Account approved by ROP (Registered Options Principal). First trade immediately after approval. Signed options agreement within 15 days or closing transactions only. HEDGING: buy put to protect long stock (protective put). Sell call against long stock (covered call). SPECULATION: buy calls (bullish), buy puts (bearish). STRADDLE (long): buy call + buy put same strike/expiration. Profit = large price movement either direction. VARYING STRATEGIES: long, short, covered, uncovered. 529 PLANS: tax-deferred growth, tax-free withdrawal qualified education. 5-year gift tax averaging. No income limits. Can change beneficiary within family. Penalty = 10% + ordinary income on non-qualified. DPPs: general partner manages, unlimited liability. Limited partners passive, limited liability. At-risk rules. Passive activity rules. OIL AND GAS: IDCs (intangible drilling costs) deductible year incurred. EQUIPMENT LEASING: depreciation benefits.`},
{num:6,name:"Customer Accounts",topics:`ACCOUNT TYPES: Individual (one owner, TOD possible). JTWROS: joint tenants with right of survivorship — survivor inherits, equal undivided interest, most common for couples. TIC: tenants in common — stated percentages, deceased share goes to ESTATE not survivor. Can have unequal ownership. Partnership: all general partners sign. Corporate: corporate resolution required. Trust: trust document required. Revocable trust: grantor can modify. Irrevocable trust: cannot modify. CUSTODIAL (UGMA/UTMA): ONE custodian, ONE minor. Irrevocable. UTMA: real estate allowed, up to age 25 (49 states). Minor cannot sell or gift. Custodian has fiduciary duty — prudent investor standard. TRADITIONAL IRA: pre-tax contributions, tax-deferred growth, distributions = ordinary income. RMDs at age 73. Early withdrawal (before 59.5) = 10% penalty + taxes. Exceptions: death, disability, 72(t) equal periodic payments, medical expenses >7.5% AGI, first-time home ($10K lifetime), higher education, health insurance while unemployed. Limit $7,000/year ($8,000 if 50+). Must have earned income. ROTH IRA: after-tax contributions, tax-FREE growth and qualified distributions. No RMDs. Income limits. Qualified distribution: account 5+ years AND 59.5 or death/disability/first home. ROLLOVER: complete within 60 days. Direct rollover (no withholding) preferred. Indirect rollover: 20% mandatory withholding. SEP-IRA: employer-only contributions, 25% of compensation. SIMPLE IRA: 100 or fewer employees, employer and employee contribute, 2-year rule (25% penalty if transferred within 2 years). 401(k): employer-sponsored, pre-tax, employer match possible. DEFINED BENEFIT: pension, employer bears investment risk. DEFINED CONTRIBUTION: 401k, employee bears investment risk. Required minimum distributions at age 73. EDUCATIONAL ACCOUNTS: 529 plans, Coverdell ESAs. CASH ACCOUNT: pay in full by settlement. Freeriding = buy and sell before paying, account frozen 90 days. MARGIN ACCOUNT: Reg T = 50% initial margin. FINRA maintenance = 25% long. Minimum $2,000 to open. Equity = market value - debit. Margin call if equity < 25%. Short: initial = 50% of proceeds, maintenance = 30%. Margin agreement: credit agreement, hypothecation, loan consent. FEE-BASED vs COMMISSION: fee-based = percentage of assets, no per-trade commission. Commission = charged per transaction. DISCRETIONARY ACCOUNT: written authorization required, each trade approved by principal. NAF: before first trade, signed by principal, customer reviews within 30 days then every 36 months. KYC required. REG S-P: protects customer financial info, privacy notice required. OFAC: SDN list, prohibited persons. BCP (Business Continuity Plan): firm must have written plan. BOOKS AND RECORDS: confirmations, account statements, holding of customer mail. Customer protection and custody of assets.`},
{num:7,name:"Risk & Recommendations",topics:`SYSTEMATIC/MARKET RISK: affects ALL securities, CANNOT be diversified away. Measured by BETA. Beta 1=moves with market, >1=more volatile, <1=less volatile, <0=inverse. Includes: interest rate risk, inflation/purchasing power risk, market risk. NONSYSTEMATIC/BUSINESS RISK: specific to company/sector, CAN be diversified away. Includes: business risk, financial risk, default risk, credit risk, regulatory risk. OTHER RISKS: Liquidity (hard to sell). Reinvestment (reinvest at lower rates — zero-coupon bonds ELIMINATE reinvestment risk). Call risk (bond called when rates fall). Prepayment (MBS when rates fall). Currency/exchange rate. Political/legislative. Capital (loss of principal). Inflationary/purchasing power. Credit. DIVERSIFICATION: reduces nonsystematic, does NOT eliminate systematic. ASSET ALLOCATION: dividing portfolio among asset classes — most important portfolio decision. Portfolio rebalancing. Hedging. REGULATION BEST INTEREST (Reg BI): BDs must act in BEST INTEREST of retail customer for recommendations. Four obligations: Disclosure (Form CRS), Care (consider costs and alternatives), Conflict of Interest, Compliance. Higher standard than old suitability. Applies to recommendations specifically. What constitutes a recommendation under Reg BI. KNOW YOUR CUSTOMER (KYC): financial situation, risk tolerance, investment objectives, time horizon, liquidity needs, tax status. INVESTMENT OBJECTIVES: Capital preservation (lowest risk, most conservative), Income (bonds/dividends), Growth (stocks/long-term), Speculation (highest risk). BENCHMARKS AND INDICES: DJIA = 30 large-cap, price-weighted. S&P 500 = 500 large-cap, market-cap weighted, broadest US benchmark. Nasdaq Composite = all Nasdaq, tech-heavy. Russell 2000 = 2,000 small-cap. Barclays/Bloomberg Aggregate = bond index. MSCI EAFE = international stocks. FUNDAMENTAL ANALYSIS: company financials, earnings, P/E, EPS, book value. TECHNICAL ANALYSIS: price patterns, charts, volume, moving averages, resistance/support. FIDUCIARY: IAs under Investment Advisers Act 1940 must always put client's best interest first. BDs: Reg BI best interest standard for recommendations. TRADE CAPACITY: principal (BD for own account) vs. agency (BD as broker). COST BASIS: original purchase price (FIFO default). COMPONENTS OF RETURN: interest, dividends, realized/unrealized gains, return of capital.`},
{num:8,name:"Tax & Yields",topics:`CURRENT YIELD (CY) = annual income / current market value. For bonds: annual interest / current price. For stocks: annual dividend / CMV (dividend yield). NOMINAL YIELD = coupon rate. Stated rate. NEVER changes. YIELD TO MATURITY (YTM) = total return if held to maturity. Most accurate yield measure. YIELD TO CALL (YTC) = return if called at first call date. Use when bond trades at premium and likely to be called. YIELD RELATIONSHIPS (HEAVILY TESTED): Premium bond: coupon > current yield > YTM. Discount bond: coupon < current yield < YTM. Par bond: coupon = current yield = YTM. TOTAL RETURN: capital gains/losses + income. BASIS POINTS: 1 bp = 0.01%, 100 bp = 1%. CAPITAL GAINS: Short-term (<=1 year) = ordinary income. Long-term (>1 year) = preferential rates (0%, 15%, 20%). Capital loss offsets gains dollar-for-dollar. Net capital loss up to $3,000/year offsets ordinary income. Unused losses carry forward indefinitely. WASH SALE RULE: cannot claim loss if same/substantially identical security repurchased within 30 days before or after sale. Loss disallowed, added to cost basis. COST BASIS: original purchase price. FIFO = default IRS method. Specific identification allowed if designated at time of sale. COST BASIS REPORTING: BDs required to report cost basis to IRS. TAX TREATMENT: Corporate bond interest = taxable federal, state, local. US Treasury interest = taxable federal ONLY, exempt state/local. Municipal bond interest = generally exempt federal, may exempt state if issued in investor's home state. AMT bonds (private purpose) = subject to AMT. Qualified dividends = long-term capital gains rates (held >60 days). Non-qualified = ordinary income. ACCRUED INTEREST: buyer pays seller. Corporate bonds 30/360. Government bonds actual/actual. Seller reports as interest income. ANNUITY TAX: accumulation = tax-deferred. Withdrawals = LIFO (earnings out first, then principal). Earnings = ordinary income + 10% penalty if before 59.5. ZERO-COUPON: taxed annually on OID phantom interest even though no cash received. AMT: alternative minimum tax. Private purpose muni bonds subject to AMT. TAX-EQUIVALENT YIELD: muni yield / (1 - tax rate). Higher tax bracket = more valuable exemption.`},
{num:9,name:"Economics",topics:`BUSINESS CYCLE: Expansion, Peak, Contraction/Recession, Trough. Recession = 2+ consecutive quarters negative GDP growth. GDP: total value goods/services produced in country. Main economic measure. GNP: produced by country's residents regardless of location. GDP vs GNP distinction. CPI: measures inflation, basket of consumer goods. PPI: wholesale inflation, leading indicator for CPI. ECONOMIC INDICATORS: Leading (predict future): stock prices, building permits, consumer confidence, money supply, average weekly hours, initial unemployment claims. Coincident (current): GDP, employment levels, personal income. Lagging (confirm trends): corporate profits, CPI, prime rate, outstanding loans. INFLATION: too much money chasing too few goods. Demand-pull: excess demand. Cost-push: rising production costs (supply shock). STAGFLATION: high inflation + high unemployment + slow growth. MONETARY POLICY (Federal Reserve): Expansionary (easy money): buy government securities (open market ops - MOST FREQUENTLY USED), lower reserve requirement, lower discount rate = money supply up, rates fall. Contractionary (tight money): sell securities, raise reserve requirement, raise discount rate = money supply down, rates rise, inflation controlled. Federal funds rate = most important rate, target set by FOMC. Discount rate = rate Fed charges banks for borrowing. Reserve requirement = % deposits banks must hold. Fed buys securities = money supply up = rates fall. Fed sells securities = money supply down = rates rise. FISCAL POLICY: government spending and taxation. Set by Congress and President - NOT the Fed. Expansionary: increase spending, decrease taxes. Contractionary: decrease spending, increase taxes. BALANCE OF PAYMENTS: current account (trade in goods/services) + capital account (investment flows). Trade surplus = exports > imports. Trade deficit = imports > exports. CURRENCY: Strong dollar = imports cheaper, US exports more expensive (bad for US exporters). Weak dollar = imports expensive, exports cheaper (good for exporters). Rising US rates = dollar strengthens. ECONOMIC THEORIES: Keynesian (demand-side, government spending) = John Maynard Keynes. Monetarist (control money supply) = Milton Friedman. Supply-side (tax cuts/deregulation) = Arthur Laffer. FRB STRUCTURE: 12 regional Federal Reserve Banks. Board of Governors (7 members, 14-year terms, appointed by President). FOMC: sets fed funds rate target, meets 8 times per year. FINANCIAL STATEMENTS: Balance sheet (assets = liabilities + equity). Income statement (revenues - expenses = net income). Purpose: assess financial health. Basic effects on bond and equity markets: cyclical stocks (rise/fall with economy), defensive stocks (stable regardless), growth stocks.`},
{num:10,name:"Regulators",topics:`KEY LAWS: Securities Act 1933 (primary market, Paper Act, full disclosure). Securities Exchange Act 1934 (created SEC, governs secondary market, registration of BDs). Investment Advisers Act 1940 (IAs $100M+ register with SEC; under $100M register with state; IAs are FIDUCIARIES). Investment Company Act 1940 (mutual funds, ETFs, closed-end, UITs, variable annuities). Trust Indenture Act 1940 (corporate bonds over $5M require independent trustee). Securities Investor Protection Act 1970 (created SIPC). USA PATRIOT Act: AML requirements. SEC: PRIMARY federal regulator. Created by 1934 Act. CAN: censure, limit activities, suspend, bar, impose fines, cease and desist. CANNOT: revoke registration. Mission: protect investors, maintain fair orderly markets, facilitate capital formation. SIPC: protects customers if BD fails/insolvent. NOT government agency (funded by member BDs). Up to $500,000 per customer, max $250,000 cash. Does NOT protect: market losses, bad advice, commodity futures. FDIC: insures bank deposits $250,000 per depositor per institution per ownership category. Covers: checking, savings, CDs, money market DEPOSIT accounts. Does NOT cover: mutual funds, stocks, bonds, annuities. FINRA: SRO. Regulates BDs and registered representatives. Largest SRO. Created by merger of NASD and NYSE regulatory arm (2007). FINRA Rule 8312: BrokerCheck disclosure. MSRB: makes rules for municipal securities. NO enforcement authority — FINRA and bank regulators enforce MSRB rules. Does NOT regulate issuers. CBOE: primary options exchange, is an SRO. OCC (Options Clearing Corporation): clears and guarantees listed options. DTC: holds securities electronically, settles trades. Part of DTCC. NASAA: represents state securities regulators. No direct enforcement. Model rules for states. STATE ADMINISTRATORS (BLUE SKY LAWS): register securities, BDs, IAs at state level. TREASURY DEPARTMENT: OCC (Office of Comptroller of Currency) = national banks. IRS = taxes. FinCEN = receives SARs and CTRs, AML. FEDERAL RESERVE: regulates bank holding companies. Sets Regulation T (50% initial margin). SIPC vs FDIC: SIPC = securities accounts at broker-dealers. FDIC = bank deposit accounts. Key exam distinction.`},
{num:11,name:"Regulatory Issues & Ethics",topics:`BANK SECRECY ACT (BSA)/AML: institutions must detect and prevent money laundering. THREE STAGES: Placement (dirty money enters system — most vulnerable). Layering (complex transactions obscure origin). Integration (reintroduced as legitimate). CTR: cash transactions over $10,000, filed with FinCEN within 15 days. STRUCTURING = breaking up transactions to avoid $10K = ILLEGAL (smurfing). SAR: suspicious transactions $5,000+, filed within 30 days. Customer must NOT be told SAR filed (tipping off prohibited). No minimum for terrorist financing. AML COMPLIANCE PROGRAM: required for all BDs, four required elements. OFAC: Office of Foreign Asset Control. SDN (Specially Designated Nationals) list: cannot do business with. KYC/CIP (Customer Identification Program): collect name, DOB, address, SSN (EIN for businesses). Beneficial ownership: 25%+ of legal entity + one control person. USA PATRIOT Act Section 314: cooperative efforts. MARKET MANIPULATION (prohibited under SEC Rule 10b-5): Pump and dump (inflate with false info, sell). Front running (own order ahead of known large client order). Churning (excessive trading to generate commissions — fiduciary violation). Matching orders/painting the tape (artificial volume). Marking the open/close (orders to manipulate prices). Freeriding (buy and sell before paying, account frozen 90 days). Backing away (market maker refuses to honor published quote). INSIDER TRADING: trading on material nonpublic information (MNPI). Both tipper and tippee liable. Material = would reasonable investor consider important. CHINESE WALL/INFORMATION BARRIER: separates investment banking from sales/trading. PROHIBITED ACTIVITIES: Selling away (away from employing firm without knowledge = violation FINRA Rule 3280). Guaranteeing against loss (prohibited). Sharing in customer profits/losses (prohibited UNLESS same firm AND customer consent AND proportional to investment). Commingling (mixing customer funds with firm funds). Unauthorized trading (non-discretionary account). Financial exploitation of seniors (Rule 2165): prohibited, must report red flags. Unregistered persons: cannot pay commissions, cannot solicit, cannot take orders. Falsifying records/signatures of convenience: prohibited. COMMUNICATIONS: Retail (25+ retail investors in 30-day period, pre-approved by principal before first use). Correspondence (fewer than 25, reviewed). Institutional (institutional investors only, policies required). All: fair, balanced, not misleading. Social media: static posts = retail. Interactive real-time = correspondence. Do-not-call list must be honored. FINRA ARBITRATION: binding, faster and cheaper. FINRA Rule 2010: standards of commercial honor.`},
{num:12,name:"Joining & Leaving a Member Firm",topics:`REGISTRATION: Form U4 (Uniform Application): registration, amendments within 30 days of reportable event. Form U5 (Uniform Termination): filed by firm within 30 days, reason disclosed. Consequences of filing misleading information. CRD (Central Registration Depository): maintained by FINRA. Fingerprinting required. Background checks mandatory. LICENSING: SIE: prerequisite for most Series exams, can take WITHOUT firm sponsorship, 4-year window if inactive. Series 6: mutual funds/variable annuities. Supervised by Series 26. Series 7: general securities representative. Supervised by Series 24. Series 63: state law exam, required most states for RRs. Series 65: Investment Adviser Representative. Series 66: combines 63 and 65. Most top-off exams require firm sponsorship — SIE is the exception. STATUTORY DISQUALIFICATION: convicted of felony or certain financial misdemeanors within past 10 years, court injunction, bar order from SEC or SRO. Cannot associate without FINRA approval. Failing to register an associated person is itself a violation. CONTINUING EDUCATION (CE): Regulatory element: within 120 days of 2nd registration anniversary, then every 3 years (5th, 8th, 11th). Computer-based, FINRA sets content. Failure = registration DEACTIVATED. Firm element: annual training plan by member firm, completed by December 31, based on regulatory developments and scope of business. OUTSIDE BUSINESS ACTIVITIES (OBAs): FINRA Rule 3270. Prior written notice to employing firm for compensated outside employment or activities. Firm may reject or restrict. Passive investments generally do NOT require notice. PRIVATE SECURITIES TRANSACTIONS (Selling Away): FINRA Rule 3280. Prior written notice. Describe transaction and role. Disclose compensation. If approved with compensation: firm records and supervises. If no compensation: firm acknowledges. Violation = selling away. REPORTABLE EVENTS: Political contributions (MSRB Rule G-37 — 2-year ban on municipal securities business after contribution by covered associate exceeding $250). Gifts/gratuities: FINRA Rule 3220 — $100/year/person limit. Business entertainment: must be reasonable. Felony charges, financial misdemeanors, liens, bankruptcy: disclose on U4 within 30 days. Customer complaints: reportable via U4 amendment. SUPERVISION: WSPs required. Principal designated for each type of business. Annual review required. RECORD KEEPING: Blotter = 6 years. Communications = 3 years (first 2 easily accessible). Financial records = 6 years. ACATS: transfer accounts between firms, complete within 3 business days of validation. BROKERCHECK: public disclosure via FINRA Rule 8312.`}
];

// ═══════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════
let apiKey = '';
let selUnits = new Set();
let selJFs = new Set();
let selModes = new Set();
let pomoPresetChosen = false;
let stats = { total:0, correct:0, streak:0, best:0 };
let curQ = null;
let answered = false;
let fuOpen = false;
let drillHistory = [];
let inSession = false;
let currentSessionLog = [];
let prefetchedQ = null;
let prefetching = false;

// Job function → unit mapping
const JF_UNITS = {
  km: [1,9],
  pr: [2,3,4,5],
  tc: [6,7,8,11],
  rf: [10,12]
};
const JF_NAMES = {
  km: 'Knowledge of Capital Markets',
  pr: 'Understanding Products & Their Risks',
  tc: 'Trading, Customer Accounts & Prohibited Activities',
  rf: 'Overview of the Regulatory Framework'
};
const JF_SHORT = {
  km: 'Capital Markets',
  pr: 'Products & Risks',
  tc: 'Trading & Accounts',
  rf: 'Regulatory'
};

// ═══════════════════════════════════════════════════
// SOURCE GROUNDING (Phase 2)
// Uses window.SIE_SOURCES (loaded from sie_sources.js) to ground questions
// in the actual Kaplan Manual + FINRA Outline text instead of relying only
// on the curated topics string.
// ═══════════════════════════════════════════════════

// Feature flag — defaults ON when SIE_SOURCES is loaded; user can disable for A/B test.
let groundingEnabled = (() => {
  try {
    const v = localStorage.getItem('sie_grounding_enabled');
    if (v === 'off') return false;
    return true;
  } catch (e) { return true; }
})();

function setGroundingEnabled(on) {
  groundingEnabled = !!on;
  try { localStorage.setItem('sie_grounding_enabled', on ? 'on' : 'off'); } catch (e) {}
}

function isGroundingAvailable() {
  return groundingEnabled && typeof window.SIE_SOURCES === 'object' && window.SIE_SOURCES !== null;
}

// ═══════════════════════════════════════════════════
// ERRATA — corrections to the Kaplan 3rd Ed. manual
// Loaded from sie_errata.txt (plain text/markdown; sections like
// "## Global" and "## Unit 3"). Treated as authoritative over
// the manual so generated questions reflect up-to-date info.
// ═══════════════════════════════════════════════════
let SIE_ERRATA = { global: [], byUnit: {} };

function parseErrata(text) {
  const out = { global: [], byUnit: {} };
  let cur = null; // 'global' | unit-number string | null
  text.split(/\r?\n/).forEach(raw => {
    const line = raw.replace(/\s+$/, '');
    const h = line.match(/^#{1,6}\s*(.+?)\s*$/);
    if (h) {
      const head = h[1].toLowerCase();
      const um = head.match(/unit\s+(\d+)/);
      if (um) { cur = um[1]; if (!out.byUnit[cur]) out.byUnit[cur] = []; }
      else if (/\b(global|general|all units|all)\b/.test(head)) cur = 'global';
      else cur = null; // unrecognized header → ignore its body
      return;
    }
    // Skip markdown table separator rows like |---|---| (pure noise, no content).
    if (/^\|?[\s:|-]+\|?$/.test(line) && line.includes('-')) return;
    const item = line.replace(/^\s*[-*+]\s+/, '').replace(/^\s*\d+\.\s+/, '').trim();
    if (!item) return;
    if (cur === 'global') out.global.push(item);
    else if (cur) out.byUnit[cur].push(item);
  });
  return out;
}

async function loadErrata() {
  // Source of truth is sie_errata.txt; .md kept as a fallback name.
  for (const fname of ['sie_errata.txt', 'sie_errata.md']) {
    try {
      const r = await fetch(fname, { cache: 'no-cache' });
      if (!r.ok) continue;
      const text = await r.text();
      if (!text.trim()) continue;
      SIE_ERRATA = parseErrata(text);
      renderErrataCallouts();
      return;
    } catch (e) { /* try next candidate */ }
  }
  // no errata file present — feature simply stays dormant
}

function hasErrata() {
  return SIE_ERRATA.global.length > 0 || Object.keys(SIE_ERRATA.byUnit).length > 0;
}

function errataForUnit(unitNum) {
  return { global: SIE_ERRATA.global, unit: SIE_ERRATA.byUnit[String(unitNum)] || [] };
}

function errataCalloutHtml(unitNum) {
  const eu = (unitNum != null) ? errataForUnit(unitNum) : { global: SIE_ERRATA.global, unit: [] };
  const entries = [...eu.global, ...eu.unit];
  if (!entries.length) return '';
  return `<div class="errata-callout">
    <div class="errata-callout-hdr">⚠ Errata / Corrections${unitNum != null ? ' — Unit ' + unitNum : ''}</div>
    <ul>${entries.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>
  </div>`;
}

function renderErrataCallouts() {
  const html = errataCalloutHtml(null); // global corrections on static study panes
  const fc = document.getElementById('fc-errata-host');
  if (fc) fc.innerHTML = html;
  const rs = document.getElementById('rs-errata-host');
  if (rs) rs.innerHTML = html;
}

// Lesson picker — given a unit and a question mode, return one lesson object.
// Strategy:
//   - For 'calculations' mode: prefer lessons with hasCalculations=true.
//   - For 'definitions' mode: prefer lessons with hasDefinitions=true (almost all).
//   - Otherwise: pick uniformly at random across the unit's lessons.
// Returns the lesson object, or null if SIE_SOURCES isn't loaded.
function pickLessonForUnit(unitNum, mode) {
  if (!isGroundingAvailable()) return null;
  const unitEntry = window.SIE_SOURCES.manual[String(unitNum)];
  if (!unitEntry || !unitEntry.lessons || unitEntry.lessons.length === 0) return null;
  let pool = unitEntry.lessons;
  if (mode === 'calculations') {
    const calcOnly = pool.filter(L => L.hasCalculations);
    if (calcOnly.length) pool = calcOnly;
  } else if (mode === 'definitions') {
    const defOnly = pool.filter(L => L.hasDefinitions);
    if (defOnly.length) pool = defOnly;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// JF-aware lesson picker — used by job-function quizzes. Picks from all lessons
// across all units whose jobFunction tag matches `jfKey`. This is more accurate
// than the unit-level JF_UNITS mapping because units 1, 7, 8, and 10 each split
// their content across multiple job functions at the lesson level.
function pickLessonForJF(jfKey, mode) {
  if (!isGroundingAvailable()) return null;
  const allLessons = [];
  for (let u = 1; u <= 12; u++) {
    const entry = window.SIE_SOURCES.manual[String(u)];
    if (!entry) continue;
    for (const L of entry.lessons) {
      if (L.jobFunction === jfKey) allLessons.push(L);
    }
  }
  if (allLessons.length === 0) return null;
  let pool = allLessons;
  if (mode === 'calculations') {
    const calcOnly = pool.filter(L => L.hasCalculations);
    if (calcOnly.length) pool = calcOnly;
  } else if (mode === 'definitions') {
    const defOnly = pool.filter(L => L.hasDefinitions);
    if (defOnly.length) pool = defOnly;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// Trim helper — Outline is small enough to send whole; lessons can be big.
// Most lessons stay under 35KB which is fine, but we cap at 60KB defensively
// in case a future source update produces a giant chunk.
function trimText(t, max = 60000) {
  if (!t) return '';
  if (t.length <= max) return t;
  return t.slice(0, max) + '\n\n[...truncated for context length...]';
}

// Pomodoro state
let pomoWorkMins = 25, pomoBreakMins = 5;
let pomoSecsLeft = 1500;
let pomoRunning = false;
let pomoIsWork = true;
let pomoInterval = null;
let pomoSessionEnded = false; // true while reviewing results after a focus block expired

// ═══════════════════════════════════════════════════
// QUIZ STATE (PASS 2 + PASS 3)
// ═══════════════════════════════════════════════════
let quizActive = false;
let quizQuestions = [];
let quizAnswers = [];
let quizIdx = 0;
let quizSecsLeft = 14 * 60;
let quizTimerInterval = null;
let quizStartTime = 0;
let quizConfig = null;
const QUIZ_PASS_PCT = 70;

// PASS 3: streaming state
let ptStreaming = false;
let ptReadyCount = 0;
let ptTotalCount = 0;
let ptGenAbort = false;

// FINRA Mini-SIE weight distribution (16/44/31/9%)
const FINRA_WEIGHTS = { km: 0.16, pr: 0.44, tc: 0.31, rf: 0.09 };

const QUIZ_JF_DIST_MINI = [
  { jf: 'km', count: 2 },
  { jf: 'pr', count: 5 },
  { jf: 'tc', count: 4 },
  { jf: 'rf', count: 1 }
];

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  renderUnits();
  renderQuizCards();
  renderHistory();
  loadErrata();
  pomoUpdateDisplay();
  const saved = sessionStorage.getItem('sie_key');
  if (saved) { apiKey = saved; } else { document.getElementById('api-prompt').classList.add('vis'); }
  updateScore();
});

// ═══════════════════════════════════════════════════
// QUIZ TAB SWITCHER + CARD RENDERING
// ═══════════════════════════════════════════════════
function switchQuizTab(pane) {
  document.querySelectorAll('.quiz-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.pane === pane);
  });
  document.querySelectorAll('.quiz-pane').forEach(p => {
    p.classList.toggle('vis', p.id === `pane-${pane}`);
  });
}

function renderQuizCards() {
  const ug = document.getElementById('unit-quiz-grid');
  if (ug) {
    ug.innerHTML = UNITS.map(u => `
      <button class="quiz-card" onclick="launchQuiz('unit-${u.num}')">
        <div class="quiz-card-head">
          <span class="quiz-card-tag">Unit ${u.num}</span>
          <span class="quiz-card-stat">12 Q · 14 MIN</span>
        </div>
        <div class="quiz-card-title">${u.name}</div>
        <div class="quiz-card-sub">All modes · drawn from this unit only</div>
      </button>`).join('');
  }

  const jg = document.getElementById('jf-quiz-grid');
  if (jg) {
    const jfDescs = {
      km: 'Units 1, 9 · Markets, products, indices, economics',
      pr: 'Units 2–5 · Equity, debt, funds, options, DPPs',
      tc: 'Units 6, 7, 8, 11 · Accounts, suitability, tax, ethics',
      rf: 'Units 10, 12 · SEC, FINRA, registration, U4/U5'
    };
    jg.innerHTML = Object.keys(JF_NAMES).map(jfKey => `
      <button class="quiz-card" onclick="launchQuiz('jf-${jfKey}')">
        <div class="quiz-card-head">
          <span class="quiz-card-tag">${JF_SHORT[jfKey]}</span>
          <span class="quiz-card-stat">25 Q · 30 MIN</span>
        </div>
        <div class="quiz-card-title">${JF_NAMES[jfKey]}</div>
        <div class="quiz-card-sub">${jfDescs[jfKey]}</div>
      </button>`).join('');
  }

  const tg = document.getElementById('type-quiz-grid');
  if (tg) {
    tg.innerHTML = Object.keys(TYPE_QUIZ_META).map(modeKey => {
      const meta = TYPE_QUIZ_META[modeKey];
      return `
        <button class="quiz-card" onclick="launchQuiz('type-${modeKey}')">
          <div class="quiz-card-head">
            <span class="quiz-card-tag">${modeKey.toUpperCase()}</span>
            <span class="quiz-card-stat">20 Q · 24 MIN</span>
          </div>
          <div class="quiz-card-title">${meta.title}</div>
          <div class="quiz-card-sub">${meta.sub}</div>
        </button>`;
    }).join('');
  }
}

// ═══════════════════════════════════════════════════
// API KEY
// ═══════════════════════════════════════════════════
function saveKey() {
  const v = document.getElementById('api-key-input').value.trim();
  if (!v.startsWith('sk-ant-')) { alert('Please enter a valid Anthropic API key (starts with sk-ant-)'); return; }
  apiKey = v;
  sessionStorage.setItem('sie_key', v);
  document.getElementById('api-ok').classList.add('vis');
  setTimeout(() => { document.getElementById('api-prompt').style.display = 'none'; }, 1500);
}

// ═══════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════
function saveStats() { /* session only */ }

function resetAll() {
  if (!confirm('Reset everything and start over?')) return;
  fullReset(false);
}

function updateScore() {
  const p = stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : null;
  document.getElementById('score-text').textContent = p !== null ? `${stats.correct}/${stats.total} (${p}%)` : '—';
}

function updateSessionScoreLive() {
  const el = document.getElementById('session-score-live');
  if (!el) return;
  if (stats.total === 0) { el.style.display = 'none'; return; }
  const pct = Math.round(stats.correct / stats.total * 100);
  el.textContent = `${stats.correct}/${stats.total} (${pct}%)`;
  el.style.display = 'inline-block';
  el.className = `pomo-live ${pct >= 70 ? 'rest' : 'focus'}`;
}
function updateStatBar() {
  document.getElementById('s-total').textContent = stats.total;
  document.getElementById('s-correct').textContent = stats.correct;
  document.getElementById('s-pct').textContent = stats.total > 0 ? Math.round(stats.correct / stats.total * 100) + '%' : '—';
  document.getElementById('s-streak').textContent = stats.streak;
  document.getElementById('s-best').textContent = stats.best;
}

// ═══════════════════════════════════════════════════
// POMODORO
// ═══════════════════════════════════════════════════
function pomoFmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function pomoUpdateDisplay() {
  const disp = document.getElementById('pomo-display');
  const phase = document.getElementById('pomo-phase');
  const live = document.getElementById('pomo-live');
  if (!pomoPresetChosen) {
    disp.textContent = '00:00';
    disp.className = 'unset';
    phase.textContent = '——';
    phase.className = 'unset';
    if (live) { live.textContent = ''; live.className = 'pomo-live'; }
    if (!quizActive) document.title = 'SIE Study Tool';
    return;
  }
  const fmt = pomoFmt(pomoSecsLeft);
  disp.textContent = fmt;
  disp.className = pomoIsWork ? 'focus' : 'rest';
  phase.textContent = pomoIsWork ? 'FOCUS' : 'REST';
  phase.className = pomoIsWork ? 'focus' : 'rest';
  if (live) {
    live.textContent = `${pomoIsWork ? 'FOCUS' : 'REST'} ${fmt}`;
    live.className = `pomo-live vis ${pomoIsWork ? 'focus' : 'rest'}`;
  }
  const restChip = document.getElementById('pomo-rest-chip');
  if (restChip && !restChip.classList.contains('over')) {
    restChip.textContent = `${pomoIsWork ? 'FOCUS' : 'REST'} ${fmt}`;
  }
  if (!quizActive) document.title = pomoRunning ? `${fmt} · SIE Study Tool` : 'SIE Study Tool';
}

function notifyRestOver() {
  const chip = document.getElementById('pomo-rest-chip');
  if (chip) { chip.textContent = 'Break over — ready when you are'; chip.classList.add('over'); }
  try {
    const a = new AudioContext(), o = a.createOscillator(), g = a.createGain();
    o.connect(g); g.connect(a.destination);
    o.frequency.value = 660;
    g.gain.setValueAtTime(0.4, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 1.2);
    o.start(); o.stop(a.currentTime + 1.2);
  } catch(e) {}
}

function pomoSetPreset(w, b) {
  const id = w === 25 ? 'preset-1' : w === 50 ? 'preset-2' : 'preset-3';
  const already = document.getElementById(id).classList.contains('selected');

  clearInterval(pomoInterval);
  pomoRunning = false;
  ['preset-1','preset-2','preset-3'].forEach(pid => document.getElementById(pid).classList.remove('selected'));

  if (already) {
    pomoPresetChosen = false;
    pomoIsWork = true;
    pomoUpdateDisplay();
    checkCanStart();
    return;
  }

  pomoWorkMins = w;
  pomoBreakMins = b;
  pomoPresetChosen = true;
  pomoIsWork = true;
  pomoSecsLeft = w * 60;
  document.getElementById(id).classList.add('selected');
  pomoUpdateDisplay();
  checkCanStart();
}

function pomoStartInterval() {
  pomoRunning = true;
  pomoInterval = setInterval(() => {
    pomoSecsLeft--;
    if (pomoSecsLeft <= 0) {
      clearInterval(pomoInterval);
      pomoRunning = false;
      try {
        const a = new AudioContext(), o = a.createOscillator(), g = a.createGain();
        o.connect(g); g.connect(a.destination);
        o.frequency.value = pomoIsWork ? 880 : 440;
        g.gain.setValueAtTime(0.4, a.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 1.2);
        o.start(); o.stop(a.currentTime + 1.2);
      } catch(e) {}
      const disp = document.getElementById('pomo-display');
      disp.classList.add('pomo-flash');
      setTimeout(() => disp.classList.remove('pomo-flash'), 1400);

      const wasWork = pomoIsWork;

      if (wasWork && inSession) {
        // FOCUS expired mid-drill → end the session, show results, keep the REST clock running during review
        pomoSessionEnded = true;
        pomoIsWork = false;
        pomoSecsLeft = pomoBreakMins * 60;
        finalizePomodoroSession();
        pomoUpdateDisplay();
        pomoStartInterval();
        return;
      }

      if (!wasWork && pomoSessionEnded) {
        // REST after a finished focus session ended → stop; don't auto-start another focus block
        pomoSessionEnded = false;
        pomoIsWork = true;
        pomoSecsLeft = pomoWorkMins * 60;
        pomoUpdateDisplay();
        notifyRestOver();
        return;
      }

      pomoIsWork = !pomoIsWork;
      pomoSecsLeft = pomoIsWork ? pomoWorkMins * 60 : pomoBreakMins * 60;
      pomoUpdateDisplay();
      pomoStartInterval();
    } else {
      pomoUpdateDisplay();
    }
  }, 1000);
}

// ═══════════════════════════════════════════════════
// UNIT GRID + STEP FLOW
// ═══════════════════════════════════════════════════
function renderUnits() {
  document.getElementById('unit-grid').innerHTML = UNITS.map(u =>
    `<button class="unit-btn" data-u="${u.num}" onclick="toggleUnit(${u.num})">
      <div class="unit-num">UNIT ${u.num}</div>
      <div class="unit-name">${u.name}</div>
    </button>`
  ).join('');
}

function toggleUnit(n) {
  const btn = document.querySelector(`[data-u="${n}"]`);
  if (selUnits.has(n)) { selUnits.delete(n); btn.classList.remove('active'); }
  else { selUnits.add(n); btn.classList.add('active'); }
  document.getElementById('surprise-preview').style.display = 'none';
  document.getElementById('surprise-btn').classList.remove('active');
  checkCanStart();
}

function toggleJF(el, jf) {
  if (selJFs.has(jf)) { selJFs.delete(jf); el.classList.remove('active'); }
  else { selJFs.add(jf); el.classList.add('active'); }
  document.getElementById('surprise-preview').style.display = 'none';
  document.getElementById('surprise-btn').classList.remove('active');
  checkCanStart();
}

function toggleMode(el, m) {
  if (selModes.has(m)) { selModes.delete(m); el.classList.remove('active'); }
  else { selModes.add(m); el.classList.add('active'); }
  document.getElementById('surprise-preview').style.display = 'none';
  document.getElementById('surprise-btn').classList.remove('active');
  checkCanStart();
}

function surpriseMe() {
  const modes = ['standard','hard','definitions','calculations'];
  const modeLabels = { standard:'Standard', hard:'Hard (EXCEPT/NOT)', definitions:'Definitions', calculations:'Calculations' };

  const presets = [{w:25,b:5,id:'preset-1'},{w:50,b:10,id:'preset-2'},{w:90,b:20,id:'preset-3'}];
  const pickedPreset = presets[Math.floor(Math.random() * presets.length)];

  const modeCount = Math.floor(Math.random() * 4) + 1;
  const shuffledModes = [...modes].sort(() => Math.random() - 0.5);
  const pickedModes = shuffledModes.slice(0, modeCount);

  const targetType = ['units','jfs','both'][Math.floor(Math.random() * 3)];

  const pickedUnits = [];
  const pickedJFs = [];

  if (targetType === 'units' || targetType === 'both') {
    const count = Math.floor(Math.random() * UNITS.length) + 1;
    const shuffled = [...UNITS].sort(() => Math.random() - 0.5);
    shuffled.slice(0, count).forEach(u => pickedUnits.push(u.num));
  }

  if (targetType === 'jfs' || targetType === 'both') {
    const jfKeys = Object.keys(JF_UNITS);
    const count = Math.floor(Math.random() * jfKeys.length) + 1;
    const shuffled = [...jfKeys].sort(() => Math.random() - 0.5);
    shuffled.slice(0, count).forEach(k => pickedJFs.push(k));
  }

  surpriseClear(true);

  pomoWorkMins = pickedPreset.w;
  pomoBreakMins = pickedPreset.b;
  pomoPresetChosen = true;
  pomoIsWork = true;
  pomoSecsLeft = pickedPreset.w * 60;
  ['preset-1','preset-2','preset-3'].forEach(id => document.getElementById(id).classList.remove('selected'));
  document.getElementById(pickedPreset.id).classList.add('selected');
  pomoUpdateDisplay();

  pickedUnits.forEach(n => {
    selUnits.add(n);
    const btn = document.querySelector(`[data-u="${n}"]`);
    if (btn) btn.classList.add('active');
  });

  pickedJFs.forEach(k => {
    selJFs.add(k);
    const btn = document.querySelector(`[data-jf="${k}"]`);
    if (btn) btn.classList.add('active');
  });

  pickedModes.forEach(m => {
    selModes.add(m);
    const btn = document.querySelector(`[data-mode="${m}"]`);
    if (btn) btn.classList.add('active');
  });

  const targetParts = [];
  if (pickedUnits.length > 0) targetParts.push(`Unit${pickedUnits.length > 1 ? 's' : ''} ${pickedUnits.join(', ')}`);
  if (pickedJFs.length > 0) targetParts.push(pickedJFs.map(k => JF_SHORT[k]).join(', '));
  const modePart = pickedModes.map(m => modeLabels[m]).join(', ');

  document.getElementById('surprise-text').textContent = `${pickedPreset.w}/${pickedPreset.b} · ${targetParts.join(' + ')} · ${modePart}`;
  document.getElementById('surprise-preview').style.display = 'flex';
  document.getElementById('surprise-preview').style.alignItems = 'center';
  document.getElementById('surprise-btn').classList.add('active');

  checkCanStart();
}

function surpriseClear(silent) {
  selUnits.clear();
  selJFs.clear();
  selModes.clear();
  document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.jf-btn').forEach(b => b.classList.remove('active'));
  ['preset-1','preset-2','preset-3'].forEach(id => document.getElementById(id).classList.remove('selected'));
  pomoPresetChosen = false;
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoIsWork = true;
  pomoUpdateDisplay();
  document.getElementById('surprise-preview').style.display = 'none';
  document.getElementById('surprise-btn').classList.remove('active');
  if (!silent) checkCanStart();
}

function checkCanStart() {
  const hasPreset = pomoPresetChosen;
  const hasTarget = selUnits.size > 0 || selJFs.size > 0;
  const hasMode = selModes.size > 0;
  const btn = document.getElementById('start-btn');

  if (hasPreset) setStep('pomo', 'done'); else setStep('pomo', 'current');
  if (hasTarget) setStep('unit', 'done'); else if (hasPreset) setStep('unit', 'current'); else setStep('unit', '');
  if (hasMode) setStep('mode', 'done'); else if (hasTarget) setStep('mode', 'current'); else setStep('mode', '');
  if (hasPreset && hasTarget && hasMode) setStep('go', 'current'); else setStep('go', '');

  if (hasPreset && hasTarget && hasMode) {
    btn.disabled = false;
    btn.textContent = `Begin Drilling`;
  } else {
    btn.disabled = true;
    if (!hasPreset) btn.textContent = 'Select a focus preset above';
    else if (!hasTarget) btn.textContent = 'Select at least one unit or job function';
    else btn.textContent = 'Select at least one question mode';
  }
}

function setStep(step, state) {
  const el = document.getElementById(`step-${step}`);
  if (el) el.className = 'step ' + state;
}

// ═══════════════════════════════════════════════════
// DRILLING
// ═══════════════════════════════════════════════════
async function startDrill() {
  if (!apiKey) { showErr('setup-err', 'Please enter your Anthropic API key first.'); return; }
  if (!pomoPresetChosen) { showErr('setup-err', 'Please select a focus preset.'); return; }
  if (selUnits.size === 0 && selJFs.size === 0) { showErr('setup-err', 'Please select at least one unit or job function.'); return; }
  if (selModes.size === 0) { showErr('setup-err', 'Please select at least one question mode.'); return; }
  inSession = true;
  currentSessionLog = [];
  clearCurrentSession();
  setStep('go', 'done');
  await genQ();
}

async function genQ() {
  const pool = new Set([...selUnits]);
  selJFs.forEach(jf => { (JF_UNITS[jf] || []).forEach(n => pool.add(n)); });
  const poolArr = [...pool];
  const pickedUnitNum = poolArr[Math.floor(Math.random() * poolArr.length)];
  const unit = UNITS.find(u => u.num === pickedUnitNum);

  const modesArr = [...selModes];
  const pickedMode = modesArr[Math.floor(Math.random() * modesArr.length)];

  document.getElementById('setup').style.display = 'none';
  document.getElementById('qarea').classList.add('vis');
  document.getElementById('ticker-bar').style.display = 'none';

  if (pomoRunning) { clearInterval(pomoInterval); pomoRunning = false; }

  document.getElementById('loading').classList.add('vis');
  document.getElementById('qcontent').style.display = 'none';
  document.getElementById('expl').classList.remove('vis');
  document.getElementById('fu-area').classList.remove('vis');
  document.getElementById('next-btn').classList.remove('vis');
  document.getElementById('next-btn').disabled = true;
  document.getElementById('fu-resp').classList.remove('vis');
  document.getElementById('fu-input').value = '';
  document.getElementById('back-arrow').style.display = '';
  showErr('q-err', '');
  answered = false;
  fuOpen = false;

  document.getElementById('q-tag').textContent = `Unit ${unit.num}: ${unit.name}`;
  document.getElementById('q-num').textContent = `Question ${stats.total + 1}`;
  document.getElementById('q-mode').textContent = pickedMode.toUpperCase();

  try {
    const q = await callGenQuestion(unit, pickedMode);
    q._unitNum = unit.num;
    curQ = q;
    drillHistory.push({ topic: q.topic, unit: unit.num });
    if (drillHistory.length > 20) drillHistory.shift();
    renderQ(q);
  } catch (err) {
    document.getElementById('loading').classList.remove('vis');
    showErr('q-err', `Error: ${err.message}`);
  }
}

// Shared question generation — used by drill, quiz, and practice test
async function callGenQuestion(unit, pickedMode, opts = {}) {
  const modeprompts = {
    standard: 'Generate a standard SIE exam-style multiple choice question testing one key concept clearly.',
    hard: 'Generate a challenging question using hedge clauses (if, not, all, none, except, LEAST, MOST), or combining multiple concepts, or Roman numeral format (I, II, III, IV). Make all four answer choices highly plausible.',
    definitions: 'Generate a question asking the student to define a specific term, rule, or concept from this unit.',
    calculations: 'Generate a calculation question requiring specific arithmetic with numbers (current yield, YTM relationship, breakeven, NAV, accrued interest, margin equity, conversion ratios, tax-equivalent yield, basis points, etc.).',
    surprise: 'Generate a question from any topic in this unit using a randomly chosen format — standard concept, definition, calculation, or EXCEPT/NOT style. Vary it each time.'
  };

  const recentSource = opts.recentTopics || drillHistory.slice(-10).map(h => h.topic);
  const recent = recentSource.join(', ');
  const avoid = recent ? `AVOID repeating these recently tested topics or close variations of them: ${recent}. Choose a genuinely different concept.` : '';

  // Variety nudge — rotate which sub-area of the lesson gets tested so questions
  // don't cluster on the same headline facts. Keeps content on-topic (still drawn
  // from the lesson) while diversifying the angle each generation.
  const varietyAngles = [
    'Choose a specific sub-topic from the lesson that differs from the recently tested ones.',
    'Pick a less commonly drilled but exam-relevant detail from this lesson.',
    'Target a common exam trap, exception, or edge case within this lesson.',
    'Center the question on a precise rule, number, threshold, or timeframe from the lesson.',
    'Draw from a different part of the lesson than the most obvious headline concept.',
    'Test how a rule from this lesson applies or what its consequence is, not just its definition.'
  ];
  const angle = varietyAngles[Math.floor(Math.random() * varietyAngles.length)];

  // ─── Phase 2: source grounding ───
  // If SIE_SOURCES is loaded and grounding is enabled, include the FINRA Outline
  // and the lesson text the question should be drawn from. The caller may pass
  // opts.lesson to override the picker (useful when the quiz planner already
  // chose a specific lesson for this slot).
  let lesson = opts.lesson || pickLessonForUnit(unit.num, pickedMode);
  let groundingBlock = '';
  let outlineBlock = '';
  let sourcesClaim = `Kaplan's 3rd Edition Securities Industry Essentials License Exam Manual and the official FINRA SIE Content Outline (2024)`;
  if (isGroundingAvailable() && lesson) {
    outlineBlock = `\n\nFINRA SIE CONTENT OUTLINE (official, full document):\n${window.SIE_SOURCES.outline.full}`;
    groundingBlock = `\n\nKAPLAN SIE MANUAL — Lesson ${lesson.unit}.${lesson.lesson}: ${lesson.title}\n(This is the authoritative source. Draw the question's content from this lesson.)\n\n${trimText(lesson.text)}`;
  } else {
    // Fall back to topics-only mode
    sourcesClaim = `Kaplan's 3rd Edition Securities Industry Essentials License Exam Manual and the official FINRA SIE Content Outline (2024)`;
  }

  // ─── Errata grounding: corrections that OVERRIDE the manual ───
  const errataUnit = (lesson && lesson.unit != null) ? lesson.unit : unit.num;
  const eu = errataForUnit(errataUnit);
  const errataEntries = [...eu.global, ...eu.unit];
  let errataBlock = '';
  let errataRule = '';
  if (errataEntries.length) {
    errataBlock = `\n\nERRATA — AUTHORITATIVE CORRECTIONS to the Kaplan 3rd Edition manual. The manual text above may be outdated or wrong where these entries apply; THESE ENTRIES ARE CORRECT AND CURRENT:\n${errataEntries.map(e => '- ' + e).join('\n')}`;
    errataRule = `\n7. ERRATA OVERRIDE: Where any ERRATA entry conflicts with the manual/outline, the ERRATA is correct. The question stem, the correct answer, and the explanation MUST reflect the corrected, up-to-date information — never test or affirm the outdated version.`;
  }

  const sys = `You are a FINRA SIE exam tutor using ${sourcesClaim} as your sources. Generate exam-realistic multiple choice questions that mirror the actual SIE exam.

RULES:
1. Base ALL content strictly on the provided Kaplan/FINRA material. Do not invent content not covered.
2. Exactly one correct answer. Four choices (A B C D), all plausible.
3. ${modeprompts[pickedMode] || modeprompts.standard}
4. ${avoid}
5. Keep questions concise and focused on one testable concept.
6. VARIETY: ${angle} Vary the wording, scenario framing, named securities/people, and any numbers so this question feels distinct from previous ones — while staying strictly within this lesson's material.${errataRule}
8. CITATIONS: Provide 1–3 citations to OFFICIAL PRIMARY sources the student can use to verify the explanation. Each citation is a structured object with three fields:
   - "source": one of "FINRA" (FINRA rule or guidance), "MSRB" (Municipal Securities Rulemaking Board rule), "SEC" (SEC rule/release/staff guidance), "SA33" (Securities Act of 1933 section), "SEA34" (Securities Exchange Act of 1934 section), "ICA40" (Investment Company Act of 1940 section), "IAA40" (Investment Advisers Act of 1940 section), "IRC" (Internal Revenue Code section), "FRB" (Federal Reserve regulation, e.g. Reg T), "SIPC", "USC" (other US Code), or "OUTLINE" (FINRA SIE Content Outline section)
   - "ref": the rule/section identifier the user can search on. Examples: "Rule 2090", "Rule 2111", "Rule G-17", "Reg BI / Rule 15l-1", "Reg T", "Section 5", "Rule 10b-5", "Section 26(c)", "Outline §2.1"
   - "title": a short plain-English label naming what the rule covers, e.g. "Know Your Customer", "Suitability", "Customer Identification Program (CIP)", "Initial margin requirement", "Prohibition on fraudulent conduct"
   Cite only rules/sections you are confident actually cover the tested concept — never fabricate a rule number. Do NOT cite Kaplan, study guides, or third-party material. Do NOT include URLs (URLs are built for you from the structured fields).

Respond ONLY with valid JSON — no markdown fences, no extra text:
{"topic":"brief topic name","question":"full question stem here","options":{"A":"...","B":"...","C":"...","D":"..."},"correct":"B","explanation":"Why the correct answer is right. Why each wrong answer is incorrect.","citations":[{"source":"FINRA","ref":"Rule 2090","title":"Know Your Customer"}]}`;

  const msg = `Generate a ${pickedMode} SIE question for Unit ${unit.num}: ${unit.name}.\n\nCURATED TOPIC SUMMARY (use this for the unit's key facts and exam-tested points):\n${unit.topics}${outlineBlock}${groundingBlock}${errataBlock}`;

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: sys,
      messages: [{ role: 'user', content: msg }]
    })
  });
  if (!r.ok) { const e = await r.json(); throw new Error(e.error?.message || `API error ${r.status}`); }
  const d = await r.json();
  const raw = d.content[0].text.trim();
  const m = raw.match(/\{[\s\S]*\}/);
  const q = JSON.parse(m ? m[0] : raw);
  // Attach grounding info so the caller / log can record which lesson was used
  if (lesson) {
    q._lesson = { unit: lesson.unit, lesson: lesson.lesson, title: lesson.title };
  }
  // Normalize citations to a clean array (model may omit, return null, or return malformed entries)
  if (!Array.isArray(q.citations)) q.citations = [];
  q.citations = q.citations.filter(c => c && typeof c === 'object' && (c.source || c.ref || c.title)).slice(0, 4);
  return q;
}

// ─── Source citation links ───
// Map a structured citation to a URL on the official / primary source. When a
// rule number is present we link straight to the exact FINRA/MSRB rule page
// (these resolve reliably). When we CAN'T build a precise official deep link,
// we fall back to a curated, verified document or landing page rather than
// guessing a deep URL or bouncing through a search engine — so a citation
// link never 404s. Each fallback below has been confirmed to resolve.
const SOURCE_FALLBACKS = {
  FINRA:   'https://www.finra.org/rules-guidance/rulebooks',                                              // FINRA Manual (rulebooks)
  MSRB:    'https://www.msrb.org/rules-and-interpretations/msrb-rules',                                   // MSRB rule book
  SEC:     'https://www.sec.gov/rules-regulations/statutes-regulations/rules-regulations-securities-exchange-commission-major-securities-laws',
  SA33:    'https://udel.edu/~pollack/Acct351/handouts/Securities_Act_of_1933.pdf',                       // Securities Act of 1933 (full text)
  SEA34:   'https://www.nyse.com/publicdocs/nyse/regulation/nyse/sea34.pdf',                              // Securities Exchange Act of 1934 (full text)
  ICA40:   'https://elischolar.library.yale.edu/cgi/viewcontent.cgi?article=5050&context=ypfs-documents2',// Investment Company Act of 1940 (full text)
  IAA40:   'https://www.govinfo.gov/content/pkg/COMPS-1878/pdf/COMPS-1878.pdf',                           // Investment Advisers Act of 1940 (full text)
  IRC:     'https://www.law.cornell.edu/uscode/text/26',                                                  // Internal Revenue Code (Title 26)
  FRB:     'https://www.federalreserve.gov/supervisionreg/reglisting.htm',                                // Federal Reserve regulations (Reg T, etc.)
  SIPC:    'https://www.sipc.org/',
  USC:     'https://www.law.cornell.edu/uscode',
  OUTLINE: 'https://www.finra.org/rules-guidance/rulebooks/finra-rules',                                 // FINRA Rules (verify the actual rule, not the exam page)
  DEFAULT: 'https://www.sec.gov/rules-regulations/statutes-regulations',                                  // SEC Statutes and Regulations
};

function buildSourceUrl(c) {
  if (!c) return null;
  const src = String(c.source || '').toUpperCase().trim();
  const ref = String(c.ref || '').trim();

  if (src === 'FINRA') {
    const m = ref.match(/(\d{3,5})(?:\.\d+)?/);
    if (m) return `https://www.finra.org/rules-guidance/rulebooks/finra-rules/${m[1]}`;
    return SOURCE_FALLBACKS.FINRA;
  }
  if (src === 'MSRB') {
    const m = ref.match(/G-?\s*(\d+)/i);
    if (m) return `https://www.msrb.org/rules-and-interpretations/msrb-rules/general/rule-g-${m[1]}`;
    return SOURCE_FALLBACKS.MSRB;
  }
  if (src === 'FED') return SOURCE_FALLBACKS.FRB;
  // SEC / statute / agency citations: link to the curated official document or page.
  return SOURCE_FALLBACKS[src] || SOURCE_FALLBACKS.DEFAULT;
}

function renderCitationsHtml(citations) {
  if (!Array.isArray(citations) || !citations.length) return '';
  const items = citations.map(c => {
    const url = buildSourceUrl(c);
    const head = [c.source, c.ref].filter(Boolean).join(' ');
    const title = c.title ? ` — ${c.title}` : '';
    const label = escapeHtml(head + title);
    if (!url) return `<li>${label}</li>`;
    return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
  }).join('');
  return `<div class="expl-sources"><div class="expl-sources-hdr">Verify with official sources</div><ul class="expl-sources-list">${items}</ul><div class="expl-sources-note">Links go to the regulator's site. Citations are AI-generated — confirm the rule actually covers what's claimed.</div></div>`;
}

function renderQ(q) {
  document.getElementById('loading').classList.remove('vis');
  const c = document.getElementById('qcontent');
  c.style.display = 'block';
  c.classList.add('fi');
  document.getElementById('qtext').textContent = q.question;
  document.getElementById('opts').innerHTML = ['A', 'B', 'C', 'D'].map(l =>
    `<button class="opt" onclick="answer('${l}')" id="o-${l}">
      <span class="opt-l">${l}.</span><span class="opt-t">${q.options[l]}</span>
    </button>`
  ).join('');
  const nb = document.getElementById('next-btn');
  nb.classList.add('vis');
  nb.disabled = true;
  nb.textContent = 'Next →';
  calcShow(((document.getElementById('q-mode').textContent) || '').trim().toLowerCase() === 'calculations');
  if (!pomoRunning) pomoStartInterval();
  prefetchedQ = null;
  prefetchNextQ();
}

async function prefetchNextQ() {
  if (!apiKey || prefetching) return;
  prefetching = true;
  try {
    const pool = new Set([...selUnits]);
    selJFs.forEach(jf => { (JF_UNITS[jf] || []).forEach(n => pool.add(n)); });
    const poolArr = [...pool];
    const pickedUnitNum = poolArr[Math.floor(Math.random() * poolArr.length)];
    const unit = UNITS.find(u => u.num === pickedUnitNum);
    const modesArr = [...selModes];
    const pickedMode = modesArr[Math.floor(Math.random() * modesArr.length)];
    const q = await callGenQuestion(unit, pickedMode);
    q._unitNum = unit.num;
    q._mode = pickedMode;
    prefetchedQ = q;
  } catch(e) {
    prefetchedQ = null;
  }
  prefetching = false;
}

async function nextQ() {
  if (prefetchedQ) {
    const q = prefetchedQ;
    prefetchedQ = null;
    const unit = UNITS.find(u => u.num === q._unitNum);
    document.getElementById('q-tag').textContent = `Unit ${unit.num}: ${unit.name}`;
    document.getElementById('q-num').textContent = `Question ${stats.total + 1}`;
    document.getElementById('q-mode').textContent = (q._mode || 'standard').toUpperCase();
    drillHistory.push({ topic: q.topic, unit: q._unitNum });
    if (drillHistory.length > 20) drillHistory.shift();
    curQ = q;
    document.getElementById('expl').classList.remove('vis');
    document.getElementById('fu-area').classList.remove('vis');
    document.getElementById('fu-resp').classList.remove('vis');
    document.getElementById('fu-input').value = '';
    showErr('q-err', '');
    answered = false;
    fuOpen = false;
    if (pomoRunning) { clearInterval(pomoInterval); pomoRunning = false; }
    renderQ(q);
  } else {
    await genQ();
  }
}

function answer(chosen) {
  if (answered) return;
  answered = true;
  const correct = curQ.correct;
  const ok = chosen === correct;

  stats.total++;
  if (ok) { stats.correct++; stats.streak++; if (stats.streak > stats.best) stats.best = stats.streak; }
  else { stats.streak = 0; }
  saveStats(); updateScore(); updateStatBar(); updateSessionScoreLive();

  currentSessionLog.push({
    question: curQ.question,
    options: curQ.options,
    correct: curQ.correct,
    chosen,
    ok,
    explanation: curQ.explanation,
    citations: curQ.citations || [],
    unitNum: curQ._unitNum,
    unitName: curQ.unitName || UNITS.find(u => u.num === curQ._unitNum)?.name,
    mode: curQ.mode || 'standard',
    timestamp: Date.now()
  });
  persistCurrentSession();
  document.getElementById('stats-bar').classList.add('vis');

  ['A', 'B', 'C', 'D'].forEach(l => {
    const b = document.getElementById(`o-${l}`);
    b.disabled = true;
    if (l === correct) { b.classList.add(chosen === correct ? 'correct' : 'reveal'); }
    else if (l === chosen && !ok) { b.classList.add('wrong'); }
  });

  const hdr = document.getElementById('expl-hdr');
  hdr.className = 'expl-hdr ' + (ok ? 'ok' : 'no');
  hdr.innerHTML = ok ? `✓ Correct — answer ${correct}` : `✗ Incorrect — correct answer is ${correct}`;
  document.getElementById('expl-body').innerHTML = curQ.explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') + renderCitationsHtml(curQ.citations);
  document.getElementById('expl').classList.add('vis');
  const nb = document.getElementById('next-btn');
  nb.disabled = false;
  nb.textContent = 'Next →';
  document.getElementById('fu-area').classList.add('vis');
  document.getElementById('fu-resp').classList.remove('vis');
  document.getElementById('fu-input').value = '';
  setTimeout(() => document.getElementById('expl').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

// ═══════════════════════════════════════════════════
// FOLLOW-UP
// ═══════════════════════════════════════════════════
async function sendFU() {
  if (!apiKey) return;
  const q = document.getElementById('fu-input').value.trim();
  if (!q) return;
  const btn = document.getElementById('fu-send');
  const resp = document.getElementById('fu-resp');
  const think = document.getElementById('fu-thinking');
  btn.disabled = true; think.classList.add('vis'); resp.classList.remove('vis');
  const unit = UNITS.find(u => u.num === (curQ._unitNum || [...selUnits][0] || 1));
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: `You are a FINRA SIE exam tutor using Kaplan's 3rd Edition SIE materials and the FINRA SIE Content Outline (2024). Answer the student's follow-up question clearly and concisely, focused on exam-relevant content. Under 200 words. Plain text only.`,
        messages: [{ role: 'user', content: `We just covered Unit ${unit.num} (${unit.name}). Question: ${curQ.question}. Correct answer: ${curQ.correct} — ${curQ.options[curQ.correct]}. Explanation: ${curQ.explanation}\n\nFollow-up question: ${q}` }]
      })
    });
    const d = await r.json();
    resp.textContent = d.content[0].text;
    resp.classList.add('vis');
  } catch (err) {
    resp.textContent = `Error: ${err.message}`;
    resp.classList.add('vis');
  } finally {
    btn.disabled = false;
    think.classList.remove('vis');
  }
}

// ═══════════════════════════════════════════════════
// NAVIGATION (drill)
// ═══════════════════════════════════════════════════
function fullReset(keepSelections) {
  calcShow(false);
  clearInterval(pomoInterval);
  pomoRunning = false;
  inSession = false;
  prefetchedQ = null;
  prefetching = false;
  clearCurrentSession();
  stats = { total:0, correct:0, streak:0, best:0 };
  drillHistory = [];
  updateScore();
  updateSessionScoreLive();
  const sb = document.getElementById('stats-bar');
  if (sb) sb.classList.remove('vis');
  const qa = document.getElementById('qarea');
  if (qa) qa.classList.remove('vis');
  const sp = document.getElementById('setup');
  if (sp) sp.style.display = 'block';
  const tb = document.getElementById('ticker-bar');
  if (tb) tb.style.display = '';

  if (!keepSelections) {
    pomoPresetChosen = false;
    pomoIsWork = true;
    pomoSecsLeft = 25 * 60;
    ['preset-1','preset-2','preset-3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('selected');
    });
    pomoUpdateDisplay();
    selUnits.clear(); selJFs.clear(); selModes.clear();
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.jf-btn').forEach(b => b.classList.remove('active'));
    const prev = document.getElementById('surprise-preview');
    if (prev) prev.style.display = 'none';
    const sbtn = document.getElementById('surprise-btn');
    if (sbtn) sbtn.classList.remove('active');
  }
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    if (keepSelections && (selUnits.size > 0 || selJFs.size > 0) && selModes.size > 0 && pomoPresetChosen) {
      startBtn.disabled = false;
      startBtn.textContent = 'Begin Drilling';
    } else if (!keepSelections) {
      startBtn.disabled = true;
      startBtn.textContent = 'Select a preset, unit/job function, and mode to begin';
    }
  }
}

function resetSession() {
  if (!confirm('Reset session score? Your selections will stay.')) return;
  fullReset(true);
}

function exitSession() {
  if (!confirm('Quit this session and return to home?')) return;
  fullReset(false);
}

function goBack() {
  calcShow(false);
  document.getElementById('qarea').classList.remove('vis');
  document.getElementById('setup').style.display = 'block';
  document.getElementById('ticker-bar').style.display = '';
  if (pomoRunning) { clearInterval(pomoInterval); pomoRunning = false; }
  if (inSession && stats.total > 0) {
    const btn = document.getElementById('start-btn');
    btn.disabled = false;
    btn.textContent = 'Resume Drilling';
  }
}

function persistCurrentSession() {
  const entry = {
    type: 'drill',
    status: 'in_progress',
    date: new Date().toLocaleString(),
    correct: stats.correct,
    total: stats.total,
    pct: stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0,
    questions: currentSessionLog
  };
  localStorage.setItem('sie_current_session', JSON.stringify(entry));
}

function clearCurrentSession() {
  currentSessionLog = [];
  localStorage.removeItem('sie_current_session');
}

function finalizeSession() {
  const raw = localStorage.getItem('sie_current_session');
  if (!raw || currentSessionLog.length === 0) return;
  const entry = JSON.parse(raw);
  entry.id = Date.now();
  entry.status = 'complete';
  const hist = getHistory();
  hist.unshift(entry);
  if (hist.length > 50) hist.pop();
  localStorage.setItem('sie_history', JSON.stringify(hist));
  clearCurrentSession();
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem('sie_history') || '[]'); }
  catch(e) { return []; }
}

// Pomodoro FOCUS block expired → end the drill like a quiz: score it, persist, show reviewable results.
function finalizePomodoroSession() {
  inSession = false;
  answered = true;
  if (prefetching) prefetchedQ = null;

  const records = currentSessionLog.map((r, i) => ({
    idx: i,
    question: r.question,
    options: r.options,
    correct: r.correct,
    chosen: r.chosen,
    ok: r.ok,
    explanation: r.explanation,
    citations: r.citations || [],
    unitNum: r.unitNum,
    unitName: r.unitName,
    jfShort: (r.mode || 'standard').toUpperCase(),
    mode: r.mode,
    unscored: false,
    failed: false
  }));

  const correct = records.filter(r => r.ok).length;
  const total = records.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  const entry = {
    id: Date.now(),
    type: 'pomodoro',
    status: 'complete',
    date: new Date().toLocaleString(),
    focusMins: pomoWorkMins,
    breakMins: pomoBreakMins,
    correct, total, pct,
    questions: records
  };

  const hist = getHistory();
  hist.unshift(entry);
  if (hist.length > 50) hist.pop();
  localStorage.setItem('sie_history', JSON.stringify(hist));
  clearCurrentSession();

  currentResults = entry;
  resultsFilter = records.some(q => !q.ok) ? 'wrong' : 'all';
  renderPomodoroResults(entry);
}

function renderPomodoroResults(entry) {
  calcShow(false);
  document.getElementById('qarea').classList.remove('vis');
  document.getElementById('quiz-prog-bar').style.display = 'none';
  const root = document.getElementById('quiz-results');
  root.classList.add('vis');

  const banner = `
    <div class="qr-banner ${entry.pct >= 70 ? 'pass' : 'fail'}">
      <div class="qr-verdict">⏱ Focus block complete — time's up</div>
      <div class="qr-score">${entry.pct}%</div>
      <div class="qr-score-frac">${entry.correct} / ${entry.total} correct</div>
      <div class="qr-time">${entry.focusMins}-min focus done · <span id="pomo-rest-chip" class="pomo-rest-chip rest">REST ${pomoFmt(pomoSecsLeft)}</span></div>
    </div>`;

  if (entry.questions.length === 0) {
    root.innerHTML = banner + `
      <div style="text-align:center;padding:2rem 1rem;color:var(--muted);font-family:'DM Mono',monospace;font-size:12px;line-height:1.7">
        No questions answered this block.<br>Take your break — the clock above is counting down your rest.
      </div>
      <div class="qr-actions">
        <button class="qr-btn qr-btn-primary" onclick="newQuiz()">Start another focus block</button>
        <button class="qr-btn qr-btn-ghost" onclick="resultsBackHome()">← Back to home</button>
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const wrongCount = entry.questions.filter(q => q.chosen && !q.ok).length;
  const skippedCount = entry.questions.filter(q => !q.chosen).length;
  const correctCount = entry.questions.filter(q => q.ok).length;

  const filterRow = `
    <div class="qr-filter-row">
      <div class="qr-filter-group">
        <button class="qr-filter-btn" data-f="all" onclick="setResultsFilter('all')">All <span class="qr-filter-count">${entry.questions.length}</span></button>
        <button class="qr-filter-btn" data-f="wrong" onclick="setResultsFilter('wrong')">Wrong <span class="qr-filter-count">${wrongCount}</span></button>
        <button class="qr-filter-btn" data-f="skipped" onclick="setResultsFilter('skipped')">Skipped <span class="qr-filter-count">${skippedCount}</span></button>
        <button class="qr-filter-btn" data-f="correct" onclick="setResultsFilter('correct')">Correct <span class="qr-filter-count">${correctCount}</span></button>
      </div>
    </div>`;

  root.innerHTML = banner + `
    <div class="qr-section-title">Review questions</div>
    ${filterRow}
    <div id="qr-q-list" class="qr-q-list"></div>
    <div class="qr-actions">
      <button class="qr-btn qr-btn-primary" onclick="newQuiz()">Start another focus block</button>
      <button class="qr-btn qr-btn-ghost" onclick="resultsBackHome()">← Back to home</button>
    </div>`;

  document.querySelectorAll('.qr-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.f === resultsFilter);
  });
  renderResultsQList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle('vis', !!msg);
}

// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════
// PASS 2 — TIMED QUIZZES + PASS 3 — PRACTICE TEST
// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distributeByWeight(weights, total) {
  const keys = Object.keys(weights);
  const raw = keys.map(k => ({ key: k, exact: weights[k] * total }));
  const floors = raw.map(r => ({ ...r, floor: Math.floor(r.exact), rem: r.exact - Math.floor(r.exact) }));
  let used = floors.reduce((s, r) => s + r.floor, 0);
  const sorted = [...floors].sort((a, b) => b.rem - a.rem);
  let i = 0;
  while (used < total) {
    sorted[i % sorted.length].floor++;
    used++;
    i++;
  }
  const out = {};
  floors.forEach(f => { out[f.key] = f.floor; });
  return out;
}

function buildEvenModePool(total) {
  const modes = ['standard','hard','definitions','calculations'];
  const dist = distributeByWeight({ standard: 0.25, hard: 0.25, definitions: 0.25, calculations: 0.25 }, total);
  const pool = [];
  modes.forEach(m => { for (let i = 0; i < dist[m]; i++) pool.push(m); });
  return shuffle(pool);
}

// ─────────────────────────────────────────────
// PLAN BUILDERS
// ─────────────────────────────────────────────

function planMiniSIE() {
  const modePool = [
    ...Array(3).fill('standard'),
    ...Array(3).fill('hard'),
    ...Array(3).fill('definitions'),
    ...Array(3).fill('calculations')
  ];
  const jfSlots = [];
  QUIZ_JF_DIST_MINI.forEach(({ jf, count }) => {
    for (let i = 0; i < count; i++) jfSlots.push(jf);
  });
  const shuffledJF = shuffle(jfSlots);
  const shuffledModes = shuffle(modePool);
  return shuffledJF.map((jf, i) => {
    const mode = shuffledModes[i];
    if (isGroundingAvailable()) {
      const lesson = pickLessonForJF(jf, mode);
      const unitNum = lesson ? lesson.unit : JF_UNITS[jf][0];
      return {
        jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
        unit: UNITS.find(u => u.num === unitNum),
        mode, lesson
      };
    }
    const units = JF_UNITS[jf];
    const unitNum = units[Math.floor(Math.random() * units.length)];
    return {
      jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
      unit: UNITS.find(u => u.num === unitNum),
      mode
    };
  });
}

function planUnitQuiz(unitNum) {
  const unit = UNITS.find(u => u.num === unitNum);
  let jf = 'pr';
  for (const [k, units] of Object.entries(JF_UNITS)) {
    if (units.includes(unitNum)) { jf = k; break; }
  }
  const modePool = buildEvenModePool(12);
  return modePool.map(mode => ({
    jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
    unit, mode
  }));
}

function planJFQuiz(jfKey) {
  const modePool = buildEvenModePool(25);

  // Phase 2: when grounding is available, pick lessons by their JF tag
  // (more accurate than the unit-level JF_UNITS mapping). Each slot still
  // gets a `unit` ref (for UI labels / drilldown), but the bound lesson
  // determines what content the model actually sees.
  if (isGroundingAvailable()) {
    return modePool.map(mode => {
      const lesson = pickLessonForJF(jfKey, mode);
      const unitNum = lesson ? lesson.unit : JF_UNITS[jfKey][0];
      return {
        jf: jfKey, jfName: JF_NAMES[jfKey], jfShort: JF_SHORT[jfKey],
        unit: UNITS.find(u => u.num === unitNum),
        mode,
        lesson
      };
    });
  }

  // Fallback (no grounding) — original behavior
  const units = JF_UNITS[jfKey];
  const perUnit = {};
  units.forEach(u => perUnit[u] = 1 / units.length);
  const unitCounts = distributeByWeight(perUnit, 25);
  const unitSlots = [];
  units.forEach(u => {
    for (let i = 0; i < unitCounts[u]; i++) unitSlots.push(u);
  });
  const shuffledUnits = shuffle(unitSlots);
  return shuffledUnits.map((unitNum, i) => ({
    jf: jfKey, jfName: JF_NAMES[jfKey], jfShort: JF_SHORT[jfKey],
    unit: UNITS.find(u => u.num === unitNum),
    mode: modePool[i]
  }));
}

function planTypeQuiz(modeKey) {
  const jfCounts = distributeByWeight(FINRA_WEIGHTS, 20);
  const slots = [];
  Object.entries(jfCounts).forEach(([jf, count]) => {
    for (let i = 0; i < count; i++) slots.push(jf);
  });
  const shuffledJF = shuffle(slots);

  if (isGroundingAvailable()) {
    return shuffledJF.map(jf => {
      const lesson = pickLessonForJF(jf, modeKey);
      const unitNum = lesson ? lesson.unit : JF_UNITS[jf][0];
      return {
        jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
        unit: UNITS.find(u => u.num === unitNum),
        mode: modeKey,
        lesson
      };
    });
  }

  return shuffledJF.map(jf => {
    const units = JF_UNITS[jf];
    const unitNum = units[Math.floor(Math.random() * units.length)];
    return {
      jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
      unit: UNITS.find(u => u.num === unitNum),
      mode: modeKey
    };
  });
}

// ─── PASS 3: 85-question practice test ──────────────────
// FINRA weights × 85 → distributeByWeight gives 14/37/26/8 = 85.
// We then mark 10 random slots as `unscored: true` (still indistinguishable).
function planPracticeTest() {
  const jfCounts = distributeByWeight(FINRA_WEIGHTS, 85);
  const modePool = buildEvenModePool(85);
  const jfSlots = [];
  Object.entries(jfCounts).forEach(([jf, count]) => {
    for (let i = 0; i < count; i++) jfSlots.push(jf);
  });
  const shuffledJF = shuffle(jfSlots);
  const plan = shuffledJF.map((jf, i) => {
    const mode = modePool[i];
    if (isGroundingAvailable()) {
      const lesson = pickLessonForJF(jf, mode);
      const unitNum = lesson ? lesson.unit : JF_UNITS[jf][0];
      return {
        jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
        unit: UNITS.find(u => u.num === unitNum),
        mode, lesson,
        unscored: false
      };
    }
    const units = JF_UNITS[jf];
    const unitNum = units[Math.floor(Math.random() * units.length)];
    return {
      jf, jfName: JF_NAMES[jf], jfShort: JF_SHORT[jf],
      unit: UNITS.find(u => u.num === unitNum),
      mode,
      unscored: false
    };
  });
  // Randomly designate 10 slots as unscored
  const unscoredIdx = shuffle([...Array(85).keys()]).slice(0, 10);
  unscoredIdx.forEach(i => { plan[i].unscored = true; });
  return plan;
}

// ─────────────────────────────────────────────
// QUIZ REGISTRY
// ─────────────────────────────────────────────
const QUIZ_REGISTRY = {
  'mini-sie': {
    id: 'mini-sie',
    title: 'Mini-SIE',
    tagLabel: 'Mini-SIE',
    total: 12,
    durationSec: 14 * 60,
    planBuilder: () => planMiniSIE()
  },
  'practice-test': {
    id: 'practice-test',
    title: 'SIE Practice Test',
    tagLabel: 'Practice Test',
    total: 85,
    scoredTotal: 75,
    unscoredTotal: 10,
    durationSec: 105 * 60,
    streaming: true,
    concurrency: 5,
    planBuilder: () => planPracticeTest()
  }
};

UNITS.forEach(u => {
  const id = `unit-${u.num}`;
  QUIZ_REGISTRY[id] = {
    id,
    title: `Unit ${u.num}: ${u.name}`,
    tagLabel: `Unit ${u.num}`,
    total: 12,
    durationSec: 14 * 60,
    planBuilder: () => planUnitQuiz(u.num)
  };
});

Object.keys(JF_NAMES).forEach(jfKey => {
  const id = `jf-${jfKey}`;
  QUIZ_REGISTRY[id] = {
    id,
    title: JF_NAMES[jfKey],
    tagLabel: JF_SHORT[jfKey],
    total: 25,
    durationSec: 30 * 60,
    planBuilder: () => planJFQuiz(jfKey)
  };
});

const TYPE_QUIZ_META = {
  standard: { title: 'Standard Questions', sub: 'Clean concept-tests across all 12 units' },
  hard: { title: 'Hard (EXCEPT / NOT)', sub: 'Hedge clauses, Roman numerals, multi-concept traps' },
  definitions: { title: 'Definitions', sub: 'Term, rule, and concept identification' },
  calculations: { title: 'Calculations', sub: 'Yields, NAV, breakeven, accrued interest, margin equity' }
};
Object.keys(TYPE_QUIZ_META).forEach(modeKey => {
  const id = `type-${modeKey}`;
  QUIZ_REGISTRY[id] = {
    id,
    title: TYPE_QUIZ_META[modeKey].title,
    tagLabel: modeKey.toUpperCase(),
    total: 20,
    durationSec: 24 * 60,
    planBuilder: () => planTypeQuiz(modeKey)
  };
});

// ─────────────────────────────────────────────
// QUIZ LAUNCHER
// ─────────────────────────────────────────────
function launchQuiz(quizId) {
  const config = QUIZ_REGISTRY[quizId];
  if (!config) {
    showErr('quiz-err', `Unknown quiz: ${quizId}`);
    return;
  }
  startQuiz(config);
}

function launchPracticeTest() {
  if (!apiKey) {
    document.getElementById('api-prompt').classList.add('vis');
    showErr('pt-err', 'Please enter your Anthropic API key first (see top of page).');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (!confirm('Begin the 85-question practice test?\n\n• 105-minute countdown starts when the first question appears\n• Auto-submit when time runs out\n• Pass at 70% (53 of 75 scored questions correct)\n• 10 unscored questions are mixed in but don\'t count toward your score\n\nQuestions stream in as they\'re generated — you can start answering immediately.')) return;
  showErr('pt-err', '');
  startQuiz(QUIZ_REGISTRY['practice-test']);
}


// ─────────────────────────────────────────────
// QUIZ START — generates questions, with streaming support for practice test
// ─────────────────────────────────────────────
async function startQuiz(config) {
  if (!apiKey) {
    document.getElementById('api-prompt').classList.add('vis');
    showErr('quiz-err', 'Please enter your Anthropic API key first.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  quizActive = true;
  quizConfig = config;
  quizQuestions = [];
  quizAnswers = new Array(config.total).fill(null);
  quizIdx = 0;
  quizSecsLeft = config.durationSec;
  ptStreaming = !!config.streaming;
  ptReadyCount = 0;
  ptTotalCount = config.total;
  ptGenAbort = false;
  const concurrency = config.concurrency || 3;

  // Hide setup, show qarea
  document.getElementById('setup').style.display = 'none';
  document.getElementById('qarea').classList.add('vis');
  document.getElementById('ticker-bar').style.display = 'none';
  document.getElementById('qcontent').style.display = 'none';
  document.getElementById('loading').classList.remove('vis');
  document.getElementById('drill-act-row').style.display = 'none';
  document.getElementById('quiz-act-row').style.display = '';
  document.getElementById('back-arrow').style.display = 'none';
  document.getElementById('expl').classList.remove('vis');
  document.getElementById('fu-area').classList.remove('vis');
  document.getElementById('fu-resp').classList.remove('vis');
  document.getElementById('quiz-prog-bar').style.display = 'block';
  document.getElementById('q-tag').textContent = config.tagLabel;
  document.getElementById('q-num').textContent = `Question 1 of ${config.total}`;
  document.getElementById('q-mode').style.display = 'none';

  // Hide pomo, show quiz timer
  const pomoBar = document.querySelector('.pomo-bar');
  if (pomoBar) pomoBar.style.display = 'none';
  if (pomoRunning) { clearInterval(pomoInterval); pomoRunning = false; }
  document.getElementById('pomo-live').classList.remove('vis');
  document.getElementById('session-score-live').style.display = 'none';

  // Init screen
  const init = document.getElementById('quiz-init');
  init.classList.add('vis');
  document.getElementById('quiz-init').querySelector('.quiz-init-title').textContent = `Building your ${config.title}`;
  document.getElementById('quiz-init').querySelector('.quiz-init-sub').textContent = ptStreaming
    ? `Generating ${config.total} questions — you'll start answering as soon as Q1 is ready`
    : `Generating ${config.total} questions across all 4 job functions`;
  document.getElementById('quiz-init-prog').textContent = `0 / ${config.total} ready`;
  document.getElementById('quiz-init-prog-fill').style.width = '0%';

  showErr('q-err', '');

  // Build plan
  const plan = config.planBuilder();

  // Initialize question slots
  quizQuestions = plan.map((p, i) => ({
    idx: i,
    jf: p.jf, jfName: p.jfName, jfShort: p.jfShort,
    unitNum: p.unit.num, unitName: p.unit.name,
    mode: p.mode,
    unscored: !!p.unscored,
    _planUnit: p.unit,
    _planLesson: p.lesson || null,
    _ready: false,
    _failed: false,
    question: null, options: null, correct: null, explanation: null, citations: []
  }));

  // Generator: pulls next un-generated slot
  let nextSlot = 0;
  let firstReadyResolved = false;
  let firstReadyResolve = null;
  const firstReady = new Promise(r => { firstReadyResolve = r; });

  async function worker() {
    while (!ptGenAbort) {
      const myIdx = nextSlot++;
      if (myIdx >= plan.length) return;
      const slot = quizQuestions[myIdx];
      try {
        const recentTopics = quizQuestions
          .slice(Math.max(0, myIdx - 6), myIdx)
          .filter(s => s._ready)
          .map(s => s.question?.slice(0, 80));
        const q = await callGenQuestion(slot._planUnit, slot.mode, { recentTopics, lesson: slot._planLesson });
        slot.question = q.question;
        slot.options = q.options;
        slot.correct = q.correct;
        slot.explanation = q.explanation;
        slot.citations = q.citations || [];
        slot._ready = true;
        ptReadyCount++;

        // Update init progress bar (if init still visible)
        const progEl = document.getElementById('quiz-init-prog');
        if (progEl) progEl.textContent = `${ptReadyCount} / ${config.total} ready`;
        const fill = document.getElementById('quiz-init-prog-fill');
        if (fill) fill.style.width = `${(ptReadyCount / config.total) * 100}%`;

        // Update streaming badge (visible during the test)
        if (ptStreaming) updateStreamBadge();

        // If we're in streaming mode and Q1 just became ready, resolve so test can begin
        if (ptStreaming && !firstReadyResolved && myIdx === 0) {
          firstReadyResolved = true;
          firstReadyResolve();
        }
        // If we're in streaming mode and the user is waiting on this specific question, re-render
        if (ptStreaming && firstReadyResolved && myIdx === quizIdx) {
          renderQuizQuestion(quizIdx);
        }
      } catch(err) {
        slot._failed = true;
        slot._err = err.message;
        ptReadyCount++;
      }
    }
  }

  const workers = [];
  for (let w = 0; w < concurrency; w++) workers.push(worker());

  if (ptStreaming) {
    // Streaming mode: wait only for Q1
    await firstReady;
    init.classList.remove('vis');
    document.getElementById('qcontent').style.display = 'block';
    document.getElementById('quiz-timer').classList.add('vis');
    document.getElementById('pt-stream-badge').classList.add('vis');
    updateStreamBadge();
    quizStartTime = Date.now();
    startQuizTimer();
    renderQuizQuestion(0);
    // Let remaining workers continue in background
    Promise.all(workers).then(() => {
      // All done — let badge show "complete"
      updateStreamBadge();
    });
  } else {
    // Non-streaming: wait for all
    await Promise.all(workers);
    const ready = quizQuestions.filter(q => q._ready);
    if (ready.length === 0) {
      init.classList.remove('vis');
      document.getElementById('drill-act-row').style.display = '';
      document.getElementById('quiz-act-row').style.display = 'none';
      document.getElementById('back-arrow').style.display = '';
      document.getElementById('back-arrow').textContent = '← Back to Home';
      showErr('q-err', 'Could not generate questions. Check your API key and try again.');
      quizActive = false;
      const pomoBar2 = document.querySelector('.pomo-bar');
      if (pomoBar2) pomoBar2.style.display = '';
      return;
    }
    init.classList.remove('vis');
    document.getElementById('qcontent').style.display = 'block';
    document.getElementById('quiz-timer').classList.add('vis');
    quizStartTime = Date.now();
    startQuizTimer();
    renderQuizQuestion(0);
  }
}

function updateStreamBadge() {
  const badge = document.getElementById('pt-stream-badge');
  const txt = document.getElementById('pt-stream-text');
  if (!badge || !txt) return;
  txt.textContent = `${ptReadyCount} / ${ptTotalCount} ready`;
  if (ptReadyCount >= ptTotalCount) badge.classList.add('complete');
  else badge.classList.remove('complete');
}

function startQuizTimer() {
  clearInterval(quizTimerInterval);
  updateQuizTimerDisplay();
  quizTimerInterval = setInterval(() => {
    quizSecsLeft--;
    if (quizSecsLeft <= 0) {
      clearInterval(quizTimerInterval);
      submitQuiz(true);
      return;
    }
    updateQuizTimerDisplay();
  }, 1000);
}

function updateQuizTimerDisplay() {
  const m = Math.floor(quizSecsLeft / 60);
  const s = quizSecsLeft % 60;
  const fmt = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.getElementById('quiz-timer-val').textContent = fmt;
  document.title = `${fmt} · ${quizConfig.title}`;
  const total = quizConfig.durationSec;
  const t = document.getElementById('quiz-timer');
  t.classList.remove('ok','warn','critical');
  if (quizSecsLeft <= 60) t.classList.add('critical');
  else if (quizSecsLeft <= total * 0.25) t.classList.add('warn');
  else t.classList.add('ok');
}

function updateQuizProgress() {
  const answered = quizAnswers.filter(a => a !== null).length;
  const pct = (answered / quizConfig.total) * 100;
  document.getElementById('quiz-prog-fill').style.width = `${pct}%`;
}

// Renders the question at index i. Handles the streaming case where the slot isn't ready yet.
function renderQuizQuestion(i) {
  quizIdx = i;
  const slot = quizQuestions[i];
  const cfg = quizConfig;

  document.getElementById('q-tag').textContent = `${slot.jfShort} · U${slot.unitNum}`;
  document.getElementById('q-num').textContent = `Question ${i + 1} of ${cfg.total}`;

  const prevBtn = document.getElementById('quiz-prev-btn');
  if (prevBtn) prevBtn.style.display = i > 0 ? '' : 'none';

  calcShow(slot.mode === 'calculations');

  // If question not yet generated, show a generating state and poll
  if (!slot._ready && !slot._failed) {
    document.getElementById('qtext').innerHTML = `<span style="color:var(--muted);font-family:'DM Mono',monospace;font-size:14px">Generating question ${i + 1}...</span>`;
    document.getElementById('opts').innerHTML = `
      <div style="text-align:center;padding:2rem 1rem">
        <div class="loading-ring" style="margin:0 auto"></div>
        <div class="loading-text" style="margin-top:.75rem">This one's still being prepared. It'll appear in a moment.</div>
      </div>`;
    document.getElementById('expl').classList.remove('vis');
    document.getElementById('quiz-next-btn').disabled = true;
    return;
  }

  if (slot._failed) {
    document.getElementById('qtext').innerHTML = `<span style="color:var(--red);font-size:14px">⚠ This question couldn't be generated (${slot._err || 'unknown error'}). Move on — it won't count against you.</span>`;
    document.getElementById('opts').innerHTML = '';
    document.getElementById('expl').classList.remove('vis');
    document.getElementById('quiz-next-btn').disabled = false;
    document.getElementById('quiz-next-btn').textContent = i < cfg.total - 1 ? 'Skip →' : 'Submit quiz';
    return;
  }

  document.getElementById('qtext').textContent = slot.question;
  const chosen = quizAnswers[i];
  document.getElementById('opts').innerHTML = ['A','B','C','D'].map(l => `
    <button class="opt ${chosen === l ? 'picked' : ''}" onclick="quizPick('${l}')" id="o-${l}">
      <span class="opt-l">${l}.</span><span class="opt-t">${slot.options[l]}</span>
    </button>`).join('');

  document.getElementById('expl').classList.remove('vis');
  const nb = document.getElementById('quiz-next-btn');
  nb.disabled = false;
  nb.textContent = i < cfg.total - 1 ? 'Next →' : 'Submit quiz';
  updateQuizProgress();
}

function quizPick(letter) {
  if (!quizActive) return;
  quizAnswers[quizIdx] = letter;
  ['A','B','C','D'].forEach(l => {
    const b = document.getElementById(`o-${l}`);
    if (b) b.classList.toggle('picked', l === letter);
  });
  updateQuizProgress();
}

function quizNext() {
  if (quizIdx < quizConfig.total - 1) {
    renderQuizQuestion(quizIdx + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    submitQuiz(false);
  }
}

function quizPrev() {
  if (quizIdx > 0) {
    renderQuizQuestion(quizIdx - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function exitQuiz() {
  if (!confirm('Exit this quiz? Your progress will be lost.')) return;
  ptGenAbort = true;
  quizActive = false;
  calcShow(false);
  clearInterval(quizTimerInterval);
  document.title = 'SIE Study Tool';
  document.getElementById('qarea').classList.remove('vis');
  document.getElementById('setup').style.display = 'block';
  document.getElementById('ticker-bar').style.display = '';
  document.getElementById('drill-act-row').style.display = '';
  document.getElementById('quiz-act-row').style.display = 'none';
  document.getElementById('back-arrow').style.display = '';
  document.getElementById('quiz-prog-bar').style.display = 'none';
  document.getElementById('quiz-timer').classList.remove('vis');
  document.getElementById('pt-stream-badge').classList.remove('vis');
  document.getElementById('q-mode').style.display = '';
  const pomoBar = document.querySelector('.pomo-bar');
  if (pomoBar) pomoBar.style.display = '';
}

// ─────────────────────────────────────────────
// QUIZ SUBMIT + RESULTS
// ─────────────────────────────────────────────
let currentResults = null;
let resultsFilter = 'wrong'; // 'all' | 'wrong' | 'skipped' | 'correct'

function submitQuiz(autoSubmitted) {
  if (!autoSubmitted) {
    const unanswered = quizAnswers.filter(a => a === null).length;
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Submit anyway?`)) return;
    }
  }
  quizActive = false;
  ptGenAbort = true;
  clearInterval(quizTimerInterval);
  document.title = 'SIE Study Tool';

  const cfg = quizConfig;
  const isPracticeTest = cfg.id === 'practice-test';

  // Build per-question records
  const records = quizQuestions.map((slot, i) => {
    const chosen = quizAnswers[i];
    const ok = slot._ready && chosen && chosen === slot.correct;
    return {
      idx: i,
      question: slot.question,
      options: slot.options,
      correct: slot.correct,
      chosen,
      ok: !!ok,
      explanation: slot.explanation,
      citations: slot.citations || [],
      jf: slot.jf, jfName: slot.jfName, jfShort: slot.jfShort,
      unitNum: slot.unitNum, unitName: slot.unitName,
      mode: slot.mode,
      unscored: slot.unscored,
      failed: slot._failed
    };
  });

  // For practice test: score only scored questions (75 total)
  // For other quizzes: score all questions
  let scoredCorrect = 0, scoredTotal = 0;
  let unscoredCorrect = 0, unscoredTotal = 0;
  records.forEach(r => {
    if (r.unscored) {
      unscoredTotal++;
      if (r.ok) unscoredCorrect++;
    } else {
      scoredTotal++;
      if (r.ok) scoredCorrect++;
    }
  });

  let correct, total, pct, passed;
  if (isPracticeTest) {
    correct = scoredCorrect;
    total = scoredTotal; // 75
    pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    passed = correct >= 53; // 70% of 75
  } else {
    correct = records.filter(r => r.ok).length;
    total = cfg.total;
    pct = Math.round((correct / total) * 100);
    passed = pct >= QUIZ_PASS_PCT;
  }

  const timeUsed = cfg.durationSec - quizSecsLeft;

  // Build job-function breakdown (scored only for practice test)
  const jfStats = {};
  records.forEach(r => {
    if (isPracticeTest && r.unscored) return;
    if (!jfStats[r.jf]) jfStats[r.jf] = { name: r.jfName, short: r.jfShort, correct: 0, total: 0 };
    jfStats[r.jf].total++;
    if (r.ok) jfStats[r.jf].correct++;
  });
  const jfBreakdown = Object.entries(jfStats).map(([k, v]) => ({
    key: k, name: v.name, short: v.short,
    correct: v.correct, total: v.total,
    pct: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0
  })).sort((a, b) => b.pct - a.pct);

  // Persist to history
  const entry = {
    id: Date.now(),
    type: 'quiz',
    subtype: cfg.id,
    quizTitle: cfg.title,
    quizTagLabel: cfg.tagLabel,
    status: 'complete',
    date: new Date().toLocaleString(),
    correct, total, pct, passed,
    timeUsed,
    autoSubmitted,
    jfBreakdown,
    questions: records
  };
  if (isPracticeTest) {
    entry.scoredCorrect = scoredCorrect;
    entry.scoredTotal = scoredTotal;
    entry.unscoredCorrect = unscoredCorrect;
    entry.unscoredTotal = unscoredTotal;
  }

  const hist = getHistory();
  hist.unshift(entry);
  if (hist.length > 50) hist.pop();
  localStorage.setItem('sie_history', JSON.stringify(hist));

  currentResults = entry;
  resultsFilter = entry.questions.some(q => !q.ok) ? 'wrong' : 'all';
  renderQuizResults(entry, autoSubmitted);
}

function renderQuizResults(entry, autoSubmitted) {
  const isPracticeTest = entry.subtype === 'practice-test';

  calcShow(false);
  document.getElementById('qarea').classList.remove('vis');
  document.getElementById('quiz-prog-bar').style.display = 'none';
  document.getElementById('quiz-timer').classList.remove('vis');
  document.getElementById('pt-stream-badge').classList.remove('vis');
  document.getElementById('q-mode').style.display = '';
  const pomoBar = document.querySelector('.pomo-bar');
  if (pomoBar) pomoBar.style.display = '';

  const root = document.getElementById('quiz-results');
  root.classList.add('vis');

  const minsUsed = Math.floor(entry.timeUsed / 60);
  const secsUsed = entry.timeUsed % 60;
  const timeStr = `${minsUsed}:${String(secsUsed).padStart(2,'0')}`;

  let practiceTestSplit = '';
  if (isPracticeTest) {
    practiceTestSplit = `
      <div class="pt-result-split">
        <div class="pt-result-cell">
          <div class="pt-result-cell-label">Scored (counted)</div>
          <div class="pt-result-cell-val">${entry.scoredCorrect} / ${entry.scoredTotal}</div>
          <div class="pt-result-cell-sub">${Math.round(entry.scoredCorrect / entry.scoredTotal * 100)}% — need 53 to pass (70%)</div>
        </div>
        <div class="pt-result-cell">
          <div class="pt-result-cell-label">Unscored (didn't count)</div>
          <div class="pt-result-cell-val">${entry.unscoredCorrect} / ${entry.unscoredTotal}</div>
          <div class="pt-result-cell-sub">FYI only — same format as real SIE</div>
        </div>
      </div>`;
  }

  // Banner
  const bannerHTML = `
    <div class="qr-banner ${entry.passed ? 'pass' : 'fail'}">
      <div class="qr-verdict">${entry.passed ? '✓ Passed' : '✗ Did not pass'}${autoSubmitted ? ' · Auto-submitted at time' : ''}</div>
      <div class="qr-score">${entry.pct}%</div>
      <div class="qr-score-frac">${entry.correct} / ${entry.total} correct${isPracticeTest ? ' (scored)' : ''}</div>
      <div class="qr-time">Time used: <strong>${timeStr}</strong> of ${Math.floor(quizConfig.durationSec / 60)}:00 · ${entry.quizTitle}</div>
    </div>`;

  // JF breakdown
  let jfHTML = '';
  if (entry.jfBreakdown && entry.jfBreakdown.length > 0) {
    jfHTML = `
      <div class="qr-section-title">By job function${isPracticeTest ? ' (scored only)' : ''}</div>
      <div class="qr-jf-table">
        <div class="qr-jf-row hdr">
          <div>Job function</div>
          <div>Score</div>
          <div>%</div>
        </div>
        ${entry.jfBreakdown.map(row => {
          let cls = 'empty';
          if (row.total > 0) {
            if (row.pct >= 80) cls = 'ok';
            else if (row.pct >= 60) cls = 'mid';
            else cls = 'bad';
          }
          return `
            <div class="qr-jf-row">
              <div>
                <div class="qr-jf-tag">${row.short}</div>
                <div class="qr-jf-name">${row.name}</div>
              </div>
              <div class="qr-jf-score">${row.correct} / ${row.total}</div>
              <div class="qr-jf-pct ${cls}">${row.pct}%</div>
            </div>`;
        }).join('')}
      </div>`;
  }

  // Filter row
  const wrongCount = entry.questions.filter(q => q.chosen && !q.ok).length;
  const skippedCount = entry.questions.filter(q => !q.chosen).length;
  const correctCount = entry.questions.filter(q => q.ok).length;

  const filterRow = `
    <div class="qr-filter-row">
      <div class="qr-filter-group">
        <button class="qr-filter-btn" data-f="all" onclick="setResultsFilter('all')">All <span class="qr-filter-count">${entry.questions.length}</span></button>
        <button class="qr-filter-btn" data-f="wrong" onclick="setResultsFilter('wrong')">Wrong <span class="qr-filter-count">${wrongCount}</span></button>
        <button class="qr-filter-btn" data-f="skipped" onclick="setResultsFilter('skipped')">Skipped <span class="qr-filter-count">${skippedCount}</span></button>
        <button class="qr-filter-btn" data-f="correct" onclick="setResultsFilter('correct')">Correct <span class="qr-filter-count">${correctCount}</span></button>
      </div>
    </div>`;

  root.innerHTML = `
    ${bannerHTML}
    ${practiceTestSplit}
    ${jfHTML}
    <div class="qr-section-title">Review questions</div>
    ${filterRow}
    <div id="qr-q-list" class="qr-q-list"></div>
    <div class="qr-actions">
      <button class="qr-btn qr-btn-primary" onclick="newQuiz()">${isPracticeTest ? 'Try another practice test' : 'Try another quiz'}</button>
      <button class="qr-btn qr-btn-ghost" onclick="resultsBackHome()">← Back to home</button>
    </div>
  `;

  document.querySelectorAll('.qr-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.f === resultsFilter);
  });
  renderResultsQList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setResultsFilter(f) {
  resultsFilter = f;
  document.querySelectorAll('.qr-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.f === f);
  });
  renderResultsQList();
}

function renderResultsQList() {
  const entry = currentResults;
  if (!entry) return;
  const list = document.getElementById('qr-q-list');
  if (!list) return;

  let filtered = entry.questions;
  if (resultsFilter === 'wrong') filtered = filtered.filter(q => q.chosen && !q.ok);
  else if (resultsFilter === 'skipped') filtered = filtered.filter(q => !q.chosen);
  else if (resultsFilter === 'correct') filtered = filtered.filter(q => q.ok);

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--muted);font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.05em">No questions match this filter.</div>`;
    return;
  }

  list.innerHTML = filtered.map((q, fi) => {
    const status = q.failed ? 'skipped' : (!q.chosen ? 'skipped' : (q.ok ? 'correct' : 'wrong'));
    const cls = status === 'correct' ? '' : status === 'wrong' ? 'wrong' : 'skipped';
    const mark = q.failed ? '⊘ FAILED' : (!q.chosen ? '— SKIPPED' : (q.ok ? '✓ CORRECT' : '✗ WRONG'));
    const markCls = q.failed ? 'sk' : (!q.chosen ? 'sk' : (q.ok ? 'ok' : 'no'));

    let ansHTML = '';
    if (q.failed) {
      ansHTML = `<div class="qr-q-ans" style="color:var(--red)">This question failed to generate during the quiz.</div>`;
    } else if (!q.chosen) {
      ansHTML = `<div class="qr-q-ans">You did not answer. Correct answer: <span class="right-ans">${q.correct}. ${escapeHtml(q.options[q.correct])}</span></div>`;
    } else if (q.ok) {
      ansHTML = `<div class="qr-q-ans">Your answer: <span class="right-ans">${q.chosen}. ${escapeHtml(q.options[q.chosen])}</span></div>`;
    } else {
      ansHTML = `
        <div class="qr-q-ans">Your answer: <span class="your-ans-wrong">${q.chosen}. ${escapeHtml(q.options[q.chosen])}</span></div>
        <div class="qr-q-ans">Correct answer: <span class="right-ans">${q.correct}. ${escapeHtml(q.options[q.correct])}</span></div>`;
    }

    const explBlock = q.explanation ? `
      <button class="qr-q-expand" onclick="toggleExpl(${q.idx})">
        <span id="expl-toggle-${q.idx}">▸ Show explanation</span>
      </button>
      <div class="qr-q-expl" id="expl-${q.idx}">${q.explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}${renderCitationsHtml(q.citations)}</div>` : '';

    return `
      <div class="qr-q-card ${cls}">
        <div class="qr-q-head">
          <span class="qr-q-num">Q${q.idx + 1}</span>
          <span class="qr-q-mark ${markCls}">${mark}</span>
          ${q.unscored ? '<span class="qr-q-unscored">UNSCORED</span>' : ''}
          <span class="qr-q-jf">${q.jfShort} · U${q.unitNum}</span>
        </div>
        <div class="qr-q-text">${escapeHtml(q.question || '(question failed to generate)')}</div>
        ${ansHTML}
        ${explBlock}
      </div>`;
  }).join('');
}

function toggleExpl(idx) {
  const el = document.getElementById(`expl-${idx}`);
  const t = document.getElementById(`expl-toggle-${idx}`);
  if (!el) return;
  el.classList.toggle('vis');
  t.textContent = el.classList.contains('vis') ? '▾ Hide explanation' : '▸ Show explanation';
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function newQuiz() {
  if (pomoSessionEnded) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoSessionEnded = false;
    pomoIsWork = true;
    pomoSecsLeft = pomoWorkMins * 60;
    pomoUpdateDisplay();
  }
  calcShow(false);
  const root = document.getElementById('quiz-results');
  root.classList.remove('vis');
  root.innerHTML = '';
  document.getElementById('setup').style.display = 'block';
  document.getElementById('ticker-bar').style.display = '';
  document.getElementById('drill-act-row').style.display = '';
  document.getElementById('quiz-act-row').style.display = 'none';
  document.getElementById('back-arrow').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resultsBackHome() {
  newQuiz();
}

// ═══════════════════════════════════════════════════
// PASS 5 — ACTIVITY HISTORY
// ═══════════════════════════════════════════════════
function historyLabel(e) {
  if (e.type === 'pomodoro') return `${e.focusMins ? e.focusMins + '-min ' : ''}Pomodoro block`;
  if (e.type === 'drill') return 'Drill session';
  if (e.subtype === 'practice-test') return 'Practice Test';
  return e.quizTitle || 'Quiz';
}

function historyTag(e) {
  if (e.type === 'pomodoro') return 'POMODORO';
  if (e.type === 'drill') return 'DRILL';
  if (e.subtype === 'practice-test') return 'TEST';
  return 'QUIZ';
}

function renderHistory() {
  const host = document.getElementById('history-host');
  if (!host) return;
  const hist = getHistory();
  if (!hist.length) {
    host.innerHTML = `<div class="history-empty">No activity yet. Finish a pomodoro block, quiz, or practice test and it'll appear here for review.</div>`;
    return;
  }
  const cards = hist.map(e => {
    const pct = typeof e.pct === 'number' ? e.pct : 0;
    const scoreCls = pct >= 70 ? 'ok' : (pct >= 50 ? 'mid' : 'bad');
    const n = (e.questions && e.questions.length) || e.total || 0;
    return `<button class="history-card" onclick="openHistoryEntry('${e.id}')">
      <div class="history-card-left">
        <div class="history-card-row">
          <span class="history-card-tag tag-${e.type || 'quiz'}">${historyTag(e)}</span>
          <span class="history-card-title">${escapeHtml(historyLabel(e))}</span>
        </div>
        <div class="history-card-meta">${escapeHtml(e.date || '')} · ${n} question${n === 1 ? '' : 's'}</div>
      </div>
      <div class="history-card-score ${scoreCls}">${pct}%<span class="history-card-frac">${e.correct ?? 0}/${e.total ?? n}</span></div>
    </button>`;
  }).join('');
  host.innerHTML = `
    <div class="history-toolbar"><button class="history-clear" onclick="clearHistory()">Clear history</button></div>
    <div class="history-list">${cards}</div>`;
}

function clearHistory() {
  if (!confirm('Clear all saved activity history on this device? This cannot be undone.')) return;
  localStorage.removeItem('sie_history');
  renderHistory();
}

function openHistoryEntry(id) {
  const entry = getHistory().find(e => String(e.id) === String(id));
  if (!entry) return;
  renderHistoryReview(entry);
}

function renderHistoryReview(entry) {
  calcShow(false);
  document.getElementById('setup').style.display = 'none';
  document.getElementById('qarea').classList.remove('vis');
  const root = document.getElementById('quiz-results');
  root.classList.add('vis');

  currentResults = entry;
  const qs = entry.questions || [];
  resultsFilter = qs.some(q => !q.ok) ? 'wrong' : 'all';

  const pct = typeof entry.pct === 'number' ? entry.pct : 0;
  const bannerCls = entry.type === 'pomodoro' || entry.type === 'drill'
    ? (pct >= 70 ? 'pass' : 'fail')
    : (entry.passed ? 'pass' : 'fail');
  const verdict = (entry.type === 'pomodoro' || entry.type === 'drill')
    ? historyLabel(entry)
    : (entry.passed ? '✓ Passed' : '✗ Did not pass');

  const banner = `
    <div class="qr-banner ${bannerCls}">
      <div class="qr-verdict">${escapeHtml(verdict)}</div>
      <div class="qr-score">${pct}%</div>
      <div class="qr-score-frac">${entry.correct ?? 0} / ${entry.total ?? qs.length} correct</div>
      <div class="qr-time">${escapeHtml(historyLabel(entry))} · ${escapeHtml(entry.date || '')}</div>
    </div>`;

  const backRow = `
    <div class="qr-actions">
      <button class="qr-btn qr-btn-ghost" onclick="historyBackHome()">← Back to history</button>
    </div>`;

  if (qs.length === 0) {
    root.innerHTML = banner + `<div class="history-empty">This session has no saved questions to review.</div>` + backRow;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const wrongCount = qs.filter(q => q.chosen && !q.ok).length;
  const skippedCount = qs.filter(q => !q.chosen).length;
  const correctCount = qs.filter(q => q.ok).length;
  const filterRow = `
    <div class="qr-filter-row">
      <div class="qr-filter-group">
        <button class="qr-filter-btn" data-f="all" onclick="setResultsFilter('all')">All <span class="qr-filter-count">${qs.length}</span></button>
        <button class="qr-filter-btn" data-f="wrong" onclick="setResultsFilter('wrong')">Wrong <span class="qr-filter-count">${wrongCount}</span></button>
        <button class="qr-filter-btn" data-f="skipped" onclick="setResultsFilter('skipped')">Skipped <span class="qr-filter-count">${skippedCount}</span></button>
        <button class="qr-filter-btn" data-f="correct" onclick="setResultsFilter('correct')">Correct <span class="qr-filter-count">${correctCount}</span></button>
      </div>
    </div>`;

  root.innerHTML = banner + `
    <div class="qr-section-title">Review questions</div>
    ${filterRow}
    <div id="qr-q-list" class="qr-q-list"></div>` + backRow;

  document.querySelectorAll('.qr-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.f === resultsFilter);
  });
  renderResultsQList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function historyBackHome() {
  calcShow(false);
  const root = document.getElementById('quiz-results');
  root.classList.remove('vis');
  root.innerHTML = '';
  document.getElementById('setup').style.display = 'block';
  renderHistory();
  const sec = document.getElementById('history-section');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ═══════════════════════════════════════════════════
// EMBEDDED CALCULATOR (calculation-mode questions)
// ═══════════════════════════════════════════════════
let calcOpen = false;

function calcShow(on) {
  const fab = document.getElementById('calc-fab');
  if (!fab) return;
  fab.style.display = on ? 'flex' : 'none';
  if (!on) {
    calcOpen = false;
    const p = document.getElementById('calc-panel');
    if (p) p.style.display = 'none';
  }
}

function calcToggle() {
  const p = document.getElementById('calc-panel');
  if (!p) return;
  calcOpen = !calcOpen;
  p.style.display = calcOpen ? 'block' : 'none';
  if (calcOpen) { const d = document.getElementById('calc-display'); if (d) d.focus(); }
}

function calcInput(ch) {
  const d = document.getElementById('calc-display');
  if (!d) return;
  if (d.dataset.result === '1') {
    // After '=', a digit/decimal/open-paren starts a new calc; an operator continues from the result.
    if (/[0-9.(]/.test(ch)) d.value = '';
    d.dataset.result = '';
  }
  d.value += ch;
  d.focus();
}

function calcClear() {
  const d = document.getElementById('calc-display');
  if (!d) return;
  d.value = ''; d.dataset.result = ''; d.focus();
}

function calcBack() {
  const d = document.getElementById('calc-display');
  if (!d) return;
  d.value = d.value.slice(0, -1); d.dataset.result = ''; d.focus();
}

function calcEval() {
  const d = document.getElementById('calc-display');
  if (!d) return;
  let expr = d.value.trim();
  if (!expr) return;
  expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)'); // N% -> (N/100)
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) { d.value = 'Error'; d.dataset.result = '1'; return; }
  try {
    const val = Function('"use strict";return (' + expr + ')')();
    if (val === null || val === undefined || Number.isNaN(val) || !Number.isFinite(val)) {
      d.value = 'Error';
    } else {
      d.value = String(Math.round((val + Number.EPSILON) * 1e8) / 1e8);
    }
  } catch (e) {
    d.value = 'Error';
  }
  d.dataset.result = '1';
  d.focus();
}

function calcKey(e) {
  if (e.key === 'Enter') { e.preventDefault(); calcEval(); }
  else if (e.key === 'Escape') { e.preventDefault(); calcToggle(); }
}

// ═══════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea') return;

  // Drill question page
  if (document.getElementById('qarea').classList.contains('vis') && !quizActive) {
    if (!answered && curQ) {
      const k = e.key.toLowerCase();
      if (['a','b','c','d'].includes(k)) { e.preventDefault(); answer(k.toUpperCase()); return; }
    }
    if (answered && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      const nb = document.getElementById('next-btn');
      if (nb && !nb.disabled) nextQ();
      return;
    }
  }

  // Quiz / Practice test question page
  if (quizActive) {
    const k = e.key.toLowerCase();
    if (['a','b','c','d'].includes(k)) {
      const slot = quizQuestions[quizIdx];
      if (slot && slot._ready) { e.preventDefault(); quizPick(k.toUpperCase()); }
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const nb = document.getElementById('quiz-next-btn');
      if (nb && !nb.disabled) quizNext();
      return;
    }
  }
});

// ═══════════════════════════════════════════════════════════════════════
// DEEP STUDY (PASS 4) — Flashcards, Study Guides, Reference Sheets, Concept Index
// All offline. Powered by window.SIE_STUDY_DATA (loaded from sie_study_data.js).
// ═══════════════════════════════════════════════════════════════════════

const DS = {
  data: null,
  currentDeck: null,        // {key, title, cards[]}
  cardIndex: 0,
  flipped: false,
  shuffleSeed: 0,
  shuffleOrder: [],         // mapping of display index → real card index
  currentRefKey: null,
  currentGuide: null,       // {type:'unit'|'jf', key}
};

function dsInit() {
  if (typeof window.SIE_STUDY_DATA !== 'object' || !window.SIE_STUDY_DATA) {
    console.warn('SIE_STUDY_DATA not loaded — Deep Study disabled.');
    return;
  }
  DS.data = window.SIE_STUDY_DATA;
  // Set initial tab counts
  const ciCount = DS.data.conceptIndex?.term_count || 0;
  const ciTabCount = document.getElementById('ci-tab-count');
  if (ciTabCount) ciTabCount.textContent = ciCount.toLocaleString();
  // Render default panes
  dsShowDeckGroup('unit');
  dsShowGuideGroup('unit');
  dsRenderRefGrid();
  dsRenderConceptIndex('');
  // Search wire-up
  const search = document.getElementById('ci-search');
  if (search) search.addEventListener('input', e => dsRenderConceptIndex(e.target.value));
}

function dsSwitchTab(p) {
  document.querySelectorAll('.ds-tab').forEach(t => t.classList.toggle('active', t.dataset.pane === p));
  document.querySelectorAll('.ds-pane').forEach(pane => pane.classList.toggle('vis', pane.id === 'ds-pane-' + p));
}

// ─── FLASHCARDS ──────────────────────────────────────────────────────

function dsShowDeckGroup(group) {
  document.querySelectorAll('#ds-pane-fc .deck-group-tab').forEach(b => b.classList.toggle('active', b.dataset.group === group));
  const host = document.getElementById('deck-grid-host');
  document.getElementById('fc-viewer-host').innerHTML = '';
  if (!DS.data) { host.innerHTML = '<div class="ci-empty">Study data not loaded.</div>'; return; }
  const fc = DS.data.flashcards;
  let decks = [];
  if (group === 'unit') {
    for (let u = 1; u <= 12; u++) {
      const d = fc.byUnit[String(u)];
      if (!d) continue;
      decks.push({ key: 'unit-' + u, tag: `Unit ${u}`, title: d.unit_name, count: d.cards.length, cards: d.cards });
    }
  } else if (group === 'jf') {
    const jfMap = { km: 'Capital Markets', pr: 'Products & Risks', tc: 'Trading & Accounts', rf: 'Regulatory' };
    for (const jf of ['km','pr','tc','rf']) {
      const d = fc.byJF[jf];
      if (!d) continue;
      decks.push({ key: 'jf-' + jf, tag: 'Job Function', title: jfMap[jf], count: d.cards.length, cards: d.cards });
    }
  } else if (group === 'type') {
    const titleMap = { standard: 'Standard', hard: 'Hard (EXCEPT/NOT/Multi)', definitions: 'Definitions', calculations: 'Calculations' };
    for (const t of ['standard','hard','definitions','calculations']) {
      const d = fc.byType[t];
      if (!d) continue;
      decks.push({ key: 'type-' + t, tag: 'Question Type', title: titleMap[t], count: d.cards.length, cards: d.cards });
    }
  }
  host.innerHTML = '<div class="deck-grid">' + decks.map(d => `
    <button class="deck-card" onclick='dsOpenDeck(${JSON.stringify(d.key).replace(/'/g, "&#39;")})'>
      <div class="deck-card-tag">${dsEsc(d.tag)}</div>
      <div class="deck-card-title">${dsEsc(d.title)}</div>
      <div class="deck-card-count">${d.count} cards</div>
    </button>`).join('') + '</div>';
  DS._currentDeckPool = {};
  decks.forEach(d => DS._currentDeckPool[d.key] = d);
}

function dsOpenDeck(key) {
  const deck = DS._currentDeckPool[key];
  if (!deck) return;
  DS.currentDeck = deck;
  DS.cardIndex = 0;
  DS.flipped = false;
  DS.shuffleOrder = deck.cards.map((_, i) => i);  // identity, no shuffle yet
  dsRenderViewer();
}

function dsRenderViewer() {
  const host = document.getElementById('fc-viewer-host');
  const deck = DS.currentDeck;
  if (!deck) { host.innerHTML = ''; return; }
  if (DS.cardIndex >= deck.cards.length) {
    host.innerHTML = `
      <div class="fc-viewer">
        <div class="fc-complete">
          <div class="fc-complete-icon">✓</div>
          <div class="fc-complete-title">Deck complete</div>
          <div class="fc-complete-sub">${deck.cards.length} cards reviewed — ${dsEsc(deck.title)}</div>
          <button class="fc-ctrl-btn primary" onclick="dsResetDeck()">Restart</button>
          <button class="fc-ctrl-btn" onclick="dsShuffleDeck()" style="margin-left:.5rem">Shuffle &amp; restart</button>
          <button class="fc-ctrl-btn" onclick="dsCloseDeck()" style="margin-left:.5rem">Close</button>
        </div>
      </div>`;
    return;
  }
  const realIdx = DS.shuffleOrder[DS.cardIndex];
  const card = deck.cards[realIdx];
  const front = card.front || '';
  const back = card.back || '';
  const typeLabel = (card.type || 'qa').toUpperCase();
  const progPct = Math.round(((DS.cardIndex) / deck.cards.length) * 100);
  host.innerHTML = `
    <div class="fc-viewer">
      <div class="fc-viewer-hdr">
        <div class="fc-viewer-title">${dsEsc(deck.title)}</div>
        <div class="fc-viewer-meta">Card ${DS.cardIndex + 1} of ${deck.cards.length}</div>
      </div>
      <div class="fc-card" id="fc-card-clickable" onclick="dsFlipCard()">
        <div class="fc-card-type">${dsEsc(typeLabel)}</div>
        <div class="fc-card-face ${DS.flipped ? 'back' : ''}">${dsEsc(DS.flipped ? back : front)}</div>
        <div class="fc-card-hint">${DS.flipped ? 'Click to see front · Space ↔ flip' : 'Click to reveal · Space ↔ flip'}</div>
      </div>
      <div class="fc-controls">
        <div>
          <button class="fc-ctrl-btn" onclick="dsCloseDeck()">← Back</button>
          <button class="fc-ctrl-btn" onclick="dsShuffleDeck()" style="margin-left:.4rem">Shuffle</button>
        </div>
        <div class="fc-prog">${progPct}% complete</div>
        <div>
          <button class="fc-ctrl-btn" onclick="dsPrevCard()" ${DS.cardIndex === 0 ? 'disabled' : ''}>← Prev</button>
          <button class="fc-ctrl-btn primary" onclick="dsNextCard()" style="margin-left:.4rem">${DS.cardIndex === deck.cards.length - 1 ? 'Finish →' : 'Next →'}</button>
        </div>
      </div>
      <div class="fc-prog-bar"><div class="fc-prog-fill" style="width:${progPct}%"></div></div>
    </div>`;
}

function dsFlipCard() { DS.flipped = !DS.flipped; dsRenderViewer(); }
function dsNextCard() { DS.cardIndex++; DS.flipped = false; dsRenderViewer(); }
function dsPrevCard() { if (DS.cardIndex > 0) { DS.cardIndex--; DS.flipped = false; dsRenderViewer(); } }
function dsResetDeck() { DS.cardIndex = 0; DS.flipped = false; DS.shuffleOrder = DS.currentDeck.cards.map((_, i) => i); dsRenderViewer(); }
function dsShuffleDeck() {
  if (!DS.currentDeck) return;
  const n = DS.currentDeck.cards.length;
  const arr = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  DS.shuffleOrder = arr;
  DS.cardIndex = 0;
  DS.flipped = false;
  dsRenderViewer();
}
function dsCloseDeck() {
  DS.currentDeck = null;
  document.getElementById('fc-viewer-host').innerHTML = '';
}

// Spacebar flips when a deck is open. Only when no input/textarea is focused.
document.addEventListener('keydown', e => {
  if (!DS.currentDeck) return;
  const focused = document.activeElement;
  if (focused && ['INPUT', 'TEXTAREA'].includes(focused.tagName)) return;
  const fcPaneVisible = document.getElementById('ds-pane-fc')?.classList.contains('vis');
  if (!fcPaneVisible) return;
  if (e.key === ' ') { e.preventDefault(); dsFlipCard(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); dsNextCard(); }
  else if (e.key === 'ArrowLeft')  { e.preventDefault(); dsPrevCard(); }
});

// ─── STUDY GUIDES ────────────────────────────────────────────────────

function dsShowGuideGroup(group) {
  document.querySelectorAll('#ds-pane-sg .deck-group-tab').forEach(b => b.classList.toggle('active', b.dataset.group === group));
  const host = document.getElementById('guide-grid-host');
  document.getElementById('guide-detail-host').innerHTML = '';
  if (!DS.data) return;
  const sg = DS.data.studyGuides;
  let items = [];
  if (group === 'unit') {
    for (let u = 1; u <= 12; u++) {
      const g = sg.byUnit[String(u)];
      if (!g) continue;
      items.push({ key: 'unit-' + u, tag: `Unit ${u}`, title: g.unit_name, count: g.sections.length });
    }
  } else {
    const jfMap = { km: 'Capital Markets', pr: 'Products & Risks', tc: 'Trading & Accounts', rf: 'Regulatory' };
    for (const jf of ['km','pr','tc','rf']) {
      const g = sg.byJF[jf];
      if (!g) continue;
      items.push({ key: 'jf-' + jf, tag: 'Job Function', title: jfMap[jf], count: g.sections.length });
    }
  }
  host.innerHTML = '<div class="deck-grid">' + items.map(i => `
    <button class="deck-card" onclick='dsOpenGuide(${JSON.stringify(i.key).replace(/'/g, "&#39;")})'>
      <div class="deck-card-tag">${dsEsc(i.tag)}</div>
      <div class="deck-card-title">${dsEsc(i.title)}</div>
      <div class="deck-card-count">${i.count} sections</div>
    </button>`).join('') + '</div>';
}

function dsOpenGuide(key) {
  const sg = DS.data.studyGuides;
  let guide = null, title = '';
  if (key.startsWith('unit-')) {
    const u = key.slice(5);
    guide = sg.byUnit[u];
    title = `Unit ${u}: ${guide.unit_name}`;
  } else if (key.startsWith('jf-')) {
    const jf = key.slice(3);
    guide = sg.byJF[jf];
    title = guide.jf_name;
  }
  if (!guide) return;
  const host = document.getElementById('guide-detail-host');
  const sectionsHtml = guide.sections.map((s, i) => {
    const unitTag = s._unit ? ` <span class="sg-unit-tag">Unit ${s._unit}</span>` : '';
    const overview = s.overview ? `<div class="sg-overview">${dsEsc(s.overview)}</div>` : '';
    const concepts = (s.key_concepts && s.key_concepts.length) ? `
      <div class="sg-subhead">Key Concepts</div>
      <ul class="sg-list">${s.key_concepts.map(c => `<li>${dsEsc(c)}</li>`).join('')}</ul>` : '';
    const rules = (s.rules && s.rules.length) ? `
      <div class="sg-subhead">Rules &amp; Regulations</div>
      <ul class="sg-list">${s.rules.map(r => `<li>${dsEsc(r)}</li>`).join('')}</ul>` : '';
    const formulas = (s.formulas && s.formulas.length) ? `
      <div class="sg-subhead">Formulas</div>
      ${s.formulas.map(f => `<div class="sg-formula">${dsEsc(f)}</div>`).join('')}` : '';
    const mnemonics = (s.mnemonics && s.mnemonics.length) ? `
      <div class="sg-subhead">Mnemonics</div>
      ${s.mnemonics.map(m => `<div class="sg-mnemonic">${dsEsc(m)}</div>`).join('')}` : '';
    return `
      <div class="sg-section" id="sg-sec-${i}">
        <div class="sg-header" onclick="dsToggleSection(${i})">
          <span>${dsEsc(s.title || ('Section ' + (i + 1)))}${unitTag}</span>
          <span class="sg-chevron">›</span>
        </div>
        <div class="sg-body">
          ${overview}${concepts}${rules}${formulas}${mnemonics}
        </div>
      </div>`;
  }).join('');
  host.innerHTML = `
    <div class="rs-detail-hdr" style="margin-top:1rem">
      <div class="rs-detail-title">${dsEsc(title)}</div>
      <button class="rs-back" onclick="dsCloseGuide()">← All guides</button>
    </div>
    ${sectionsHtml}`;
  document.getElementById('guide-grid-host').style.display = 'none';
}

function dsToggleSection(i) {
  document.getElementById('sg-sec-' + i)?.classList.toggle('open');
}

function dsCloseGuide() {
  document.getElementById('guide-detail-host').innerHTML = '';
  document.getElementById('guide-grid-host').style.display = '';
}

// ─── REFERENCE SHEETS ────────────────────────────────────────────────

function dsRenderRefGrid() {
  const host = document.getElementById('rs-grid-host');
  document.getElementById('rs-detail-host').innerHTML = '';
  if (!DS.data) return;
  const sheets = DS.data.referenceSheets || [];
  host.innerHTML = '<div class="rs-grid">' + sheets.map(s => `
    <button class="rs-card" onclick='dsOpenRefSheet(${JSON.stringify(s.key).replace(/'/g, "&#39;")})'>
      <div class="rs-card-title">${dsEsc(s.title)}</div>
      <div class="rs-card-meta">${s.sections.length} sections · ${s.common_traps.length} traps</div>
    </button>`).join('') + '</div>';
}

function dsOpenRefSheet(key) {
  const sheet = DS.data.referenceSheets.find(s => s.key === key);
  if (!sheet) return;
  const host = document.getElementById('rs-detail-host');
  const sectionsHtml = sheet.sections.map(sec => {
    let body = '';
    const items = sec.items || [];
    const isColRowTable = sec.type === 'table' && items && !Array.isArray(items) && Array.isArray(items.columns) && Array.isArray(items.rows);
    if (isColRowTable) {
      // Render table in {columns, rows} format
      const cols = items.columns;
      body = `<table class="rs-table"><thead><tr>${cols.map(c => `<th>${dsEsc(String(c))}</th>`).join('')}</tr></thead><tbody>${items.rows.map(row => `<tr>${(Array.isArray(row) ? row : cols.map(c => row[c])).map(cell => `<td>${dsEsc(String(cell ?? ''))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    } else if (sec.type === 'table' && Array.isArray(items) && items.length && typeof items[0] === 'object') {
      // Render table in array-of-objects format
      const cols = Object.keys(items[0]);
      body = `<table class="rs-table"><thead><tr>${cols.map(c => `<th>${dsEsc(c)}</th>`).join('')}</tr></thead><tbody>${items.map(row => `<tr>${cols.map(c => `<td>${dsEsc(String(row[c] ?? ''))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    } else if (sec.type === 'formula') {
      const arr = Array.isArray(items) ? items : [];
      body = arr.map(f => `<div class="rs-formula">${dsEsc(typeof f === 'string' ? f : JSON.stringify(f))}</div>`).join('');
    } else {
      // bullets or rule — render as list
      const arr = Array.isArray(items) ? items : [];
      const flat = arr.map(it => typeof it === 'string' ? it : JSON.stringify(it));
      body = `<ul class="rs-sec-items">${flat.map(t => `<li>${dsEsc(t)}</li>`).join('')}</ul>`;
    }
    return `<div class="rs-sec"><div class="rs-sec-head">${dsEsc(sec.heading || '')}</div>${body}</div>`;
  }).join('');
  const trapsHtml = sheet.common_traps?.length ? `
    <div class="rs-traps">
      <div class="rs-traps-head">Common Traps</div>
      <ul>${sheet.common_traps.map(t => `<li>${dsEsc(t)}</li>`).join('')}</ul>
    </div>` : '';
  host.innerHTML = `
    <div class="rs-detail">
      <div class="rs-detail-hdr">
        <div class="rs-detail-title">${dsEsc(sheet.title)}</div>
        <button class="rs-back" onclick="dsCloseRefSheet()">← All sheets</button>
      </div>
      ${sectionsHtml}
      ${trapsHtml}
    </div>`;
  document.getElementById('rs-grid-host').style.display = 'none';
}

function dsCloseRefSheet() {
  document.getElementById('rs-detail-host').innerHTML = '';
  document.getElementById('rs-grid-host').style.display = '';
}

// ─── CONCEPT INDEX ───────────────────────────────────────────────────

function dsRenderConceptIndex(q) {
  const wrap = document.getElementById('ci-results');
  const stat = document.getElementById('ci-stat');
  if (!DS.data || !wrap) return;
  const terms = DS.data.conceptIndex.terms || [];
  if (!q.trim()) {
    const sorted = [...terms].sort((a, b) => a.term_lower.localeCompare(b.term_lower));
    wrap.innerHTML = '';
    sorted.forEach(t => wrap.appendChild(dsRenderConceptCard(t, '')));
    stat.textContent = `${sorted.length.toLocaleString()} of ${terms.length.toLocaleString()} terms`;
    return;
  }
  const ql = q.toLowerCase().trim();
  const scored = [];
  for (const t of terms) {
    let score = 0;
    if (t.term_lower === ql) score = 1000;
    else if (t.term_lower.startsWith(ql)) score = 500;
    else if (t.term_lower.includes(ql)) score = 250;
    else if ((t.definition || '').toLowerCase().includes(ql)) score = 100;
    if (score) scored.push({ t, score });
  }
  scored.sort((a, b) => b.score - a.score);
  wrap.innerHTML = '';
  if (scored.length === 0) {
    wrap.innerHTML = '<div class="ci-empty">No matches. Try a different term or shorter query.</div>';
    stat.textContent = '0 matches';
    return;
  }
  scored.forEach(({ t }) => wrap.appendChild(dsRenderConceptCard(t, ql)));
  stat.textContent = `${scored.length.toLocaleString()} matches`;
}

function dsRenderConceptCard(t, q) {
  const card = document.createElement('div');
  card.className = 'ci-card';
  const isXref = /^See\s+/i.test(t.definition || '');
  const head = document.createElement('div');
  head.className = 'ci-card-head';
  const termEl = document.createElement('div');
  termEl.className = 'ci-card-term';
  termEl.innerHTML = dsHighlight(t.term, q);
  head.appendChild(termEl);
  if (isXref) {
    const tag = document.createElement('div');
    tag.className = 'ci-card-xref';
    tag.textContent = 'CROSS-REF';
    head.appendChild(tag);
  }
  card.appendChild(head);
  const defn = document.createElement('div');
  defn.className = 'ci-card-defn';
  defn.innerHTML = dsHighlight(t.definition || '', q);
  card.appendChild(defn);
  if ((t.manual_refs && t.manual_refs.length) || (t.outline_refs && t.outline_refs.length)) {
    const refs = document.createElement('div');
    refs.className = 'ci-card-refs';
    (t.manual_refs || []).slice(0, 3).forEach(r => {
      const tag = document.createElement('div');
      tag.className = 'ci-ref manual';
      const trimTitle = (r.title || '').slice(0, 30) + ((r.title || '').length > 30 ? '…' : '');
      tag.textContent = `Manual ${r.unit}.${r.lesson}: ${trimTitle}`;
      refs.appendChild(tag);
    });
    (t.outline_refs || []).slice(0, 2).forEach(r => {
      const tag = document.createElement('div');
      tag.className = 'ci-ref outline';
      tag.textContent = `Outline [${(r.jf || '?').toUpperCase()}]`;
      refs.appendChild(tag);
    });
    card.appendChild(refs);
  }
  return card;
}

function dsHighlight(text, q) {
  if (!q) return dsEsc(text);
  const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
  return dsEsc(text).replace(re, '<mark>$1</mark>');
}

function dsEsc(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Boot Deep Study after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', dsInit);
} else {
  dsInit();
}
