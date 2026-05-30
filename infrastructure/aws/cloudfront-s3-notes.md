# AWS Static Delivery Notes

Use this path when serving the Angular build from S3 and CloudFront instead of the bundled Nginx container.

1. Run `npm --prefix frontend run build`.
2. Upload `frontend/dist/mk-ai-command-center/browser` to an S3 bucket configured for private origin access.
3. Create a CloudFront distribution with an Origin Access Control for the bucket.
4. Set the default root object to `index.html`.
5. Add custom error responses mapping `403` and `404` to `/index.html` with HTTP `200` for Angular routes.
6. Set `/api/*` and `/ws/*` behaviors to the EC2 or load balancer origin running FastAPI.
7. Attach an ACM certificate in `us-east-1` and point DNS to CloudFront.

