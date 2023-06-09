# HAPPY-KAMP

> [GitHub Repository](https://github.com/61130061/happy-kamp) & [Try demo](https://happy-kamp.vercel.app)

Frontend - happy kids!

## Stack

- Next.js
  - Eslint with [Next.js default rule](https://nextjs.org/docs/basic-features/eslint)
  - Typescript
- Tailwind: UI library
- Playwright: e2e testing
- Prettier: code formatter
- [React-slider](https://zillow.github.io/react-slider/#reactsliderhttps://zillow.github.io/react-slider): price filter range slider component.
- [React-cookie](https://github.com/reactivestack/cookies.git): working with authorization api

## Added Feature

- [x] fix product image not found
- [x] filter show number of product showing rn/all product
- [x] Show saving price
- [ ] Out of stock
- [ ] Multiple currencies

## Dev

### Test Structure

> Every tests are including both desktop and mobile viewport size

- Home page

  - Visibility test
  - Cart modal test
  - Auth modal test
  - Quick view and Add to cart modal test
  - Shop all button test

- Shop Collection page
  - Visibility test
  - Cart modal test
  - Auth modal test
  - Quick view and Add to cart modal test
  - Add to cart workflow test

### Emo Syntax for commit

- ➕ = add new feature
- ♻️ = update exist feature
- 🔨 = fix bugs
- 🗑 = remove feature
