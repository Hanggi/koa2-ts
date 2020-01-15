
image:
	tsc
	docker image build -t koa-ts .

run:
	docker run -d -p 3210:3210 koa-ts

tar:
