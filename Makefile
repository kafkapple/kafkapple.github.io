.PHONY: sync serve build clean

# Sync Obsidian reading list → _data/reading_list.json
sync:
	python3 scripts/sync_reading_list.py

# Local dev server (uses _config.local.yml to override remote_theme → local gem)
serve: sync
	bundle exec jekyll serve --livereload --config _config.yml,_config.local.yml

# Production build
build: sync
	bundle exec jekyll build

clean:
	rm -rf _site .jekyll-cache .sass-cache
