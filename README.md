To generate the static file:

`````cd front
ng build````

Then copy the files in front/dist to back/front.


To build (on MacOS to run on Linux):

`````

docker buildx build --load --platform linux/amd64 -t flothomas/pwc:main .

```

```
