# Makefile - Astro Boilerplate
PROJECT_NAME = astro-boilerplate
PROJECT_TAG = $(shell node -p "require('./package.json').version")

install:
	pnpm i

dev: install
	pnpm dev

prod: install
	pnpm build && pnpm start

preview: install
	pnpm preview

clean:
	rm -rf node_modules .astro dist >/dev/null 2>&1 || true

help:
	@echo ""
	@echo "$(PROJECT_NAME) v$(PROJECT_TAG)"
	@echo "──────────────────────────────────────────────"
	@echo ""
	@echo "Local Commands:"
	@echo "  make install            Install dependencies using bun"
	@echo "  make dev                Run the app locally in development mode"
	@echo "  make preview            Run the app in preview mode"
	@echo ""
	@echo "Production Commands:"
	@echo "  make prod               Run the app in production mode (Test local)"
	@echo ""
