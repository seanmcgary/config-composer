.PHONY: clean all

all: clean
	./node_modules/.bin/tsc -p .

clean:
	rm -rf dist || true

publish: clean all
	npm publish