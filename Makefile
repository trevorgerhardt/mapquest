
clean:
	rm -fr node_modules

install:
	npm install

test:
	./node_modules/.bin/mocha --reporter spec --timeout 10s

.PHONY: clean install test
