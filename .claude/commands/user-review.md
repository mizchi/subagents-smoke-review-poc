ユーザー視点でこのライブラリをブラックボックスとして、振る舞いをレビューします。

## Steps

- Check `Goal` by `README.md` and `CLAUDE.md`
- Build by `pnpm build` and emit `dist/index.ts`
- Review `dist/index.ts` with pubilc-api-reviewer
- Review `examples/*.ts` with examples-reviewer
- Review `tests/*.test.ts` with integration-reviewer
- Review `src/` with deprecated-reviewer
