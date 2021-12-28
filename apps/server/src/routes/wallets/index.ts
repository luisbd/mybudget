import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { CurrencyCode, Money } from '@mybudget/types'

/**
 * /api/wallets
 */
const router = Router()

/**
 * Get wallets
 * GET /
 */
router.get('/', async function walletsGetHandler(req, res) {
  const data = await req.repository.getAllWallets()

  res.json({ data })
});

/**
 * Create wallet
 * POST /
 */
const allowedWalletCurrencies: CurrencyCode[] = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];

const createWalletSchema = yup.object().shape({
  currency: yup.string().oneOf(allowedWalletCurrencies).required(),
  initialBalance: yup.number().integer().optional().default(0)
})

router.post('/', async function walletsPostHandler(req, res, next) {
  try {
    const validPayload = await createWalletSchema.validate(req.body)

    const data = await req.repository.createWallet({
      currency: validPayload.currency as CurrencyCode,
      balance: validPayload.initialBalance as Money
    })

    res.status(StatusCodes.ACCEPTED).json({ data })
  } catch (error) {
    next(error)
  }
})

export default router
