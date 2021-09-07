super-lint: # lint the codebase
	docker run -e RUN_LOCAL=true -e LOG_LEVEL=ERROR -v /Users/akhan/projects/napi:/tmp/lint github/super-linter
