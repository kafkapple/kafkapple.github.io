.PHONY: sync serve build clean

# Sync Obsidian reading list → _data/reading_list.json
sync:
	python3 scripts/sync_reading_list.py

# Local dev server
serve: sync
	bundle exec jekyll serve --livereload

# Production build
build: sync
	bundle exec jekyll build

clean:
	rm -rf _site .jekyll-cache .sass-cache
